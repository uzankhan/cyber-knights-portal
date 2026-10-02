# backend/routes/auth.py
"""
AuthShield 360 / Cyber Knights – Authentication Routes
Simple password-only auth for all roles.
"""

from datetime import datetime
from flask import Blueprint, request, jsonify, current_app, make_response, g
import json

from backend.database import db
from backend.models import User, Session, StudentRecord
from backend.security import (
    verify_password, hash_password, generate_token, sha256_hex,
    create_session, set_session_cookie, clear_session_cookie,
    get_session_from_cookie, is_locked, record_failure, clear_failures,
    login_required,
)
from backend.services.audit import log_event

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


def _json():
    return request.get_json(silent=True) or {}


# ============================================================
# LOGIN (Password only — all roles)
# ============================================================
@auth_bp.route("/login", methods=["POST"])
def login():
    data = _json()
    username = (data.get("username") or "").strip().lower()
    password = data.get("password") or ""

    if not username or not password or len(username) > 64 or len(password) > 256:
        log_event("Login Attempt", "Password", "FAIL", "Malformed input", username)
        return jsonify({"ok": False, "message": "Access denied"}), 400

    user = User.query.filter_by(username=username).first()

    # Timing equalization — dummy verify
    if not user or not user.is_active:
        verify_password(
            "$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHRzb21lc2FsdA$"
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", password,
        )
        log_event("Login Attempt", "Password", "FAIL", "Unknown user", username)
        return jsonify({"ok": False, "message": "Access denied"}), 401

    locked, remaining = is_locked(user)
    if locked:
        log_event("Login Attempt", "Password", "LOCKED",
                  f"Locked, {remaining} min remaining", username, user.role)
        return jsonify({"ok": False, "locked": True, "remaining": remaining,
                        "message": f"Account locked. Try again in {remaining} min."}), 423

    if not verify_password(user.password_hash, password):
        count = record_failure(user)
        log_event("Login Attempt", "Password", "FAIL",
                  f"Invalid password (attempt {count})", username, user.role)
        if count >= current_app.config["LOCKOUT_THRESHOLD"]:
            return jsonify({"ok": False, "locked": True,
                            "remaining": current_app.config["LOCKOUT_MINUTES"],
                            "message": "Too many failed attempts. Account locked."}), 423
        return jsonify({"ok": False, "message": "Access denied"}), 401

    # Success
    clear_failures(user)

    token, sess = create_session(
        user_id=user.id, stage="authenticated", mode="password",
        lifetime=current_app.config["PERMANENT_SESSION_LIFETIME"],
    )
    user.last_login = datetime.utcnow()
    db.session.commit()

    log_event("Access Granted", "Password", "SUCCESS",
              f"Session {sess.token_hash[:16]}… created · Welcome {user.display_name}",
              user.username, user.role, session_ref=sess.token_hash[:16])

    resp = make_response(jsonify({
        "ok": True,
        "status": "authenticated",
        "mode": "password",
        "message": "Access Granted",
        "user": user.to_public_dict(),
    }))
    set_session_cookie(resp, token,
                       int(current_app.config["PERMANENT_SESSION_LIFETIME"].total_seconds()))
    return resp


# ============================================================
# SESSION INFO
# ============================================================
@auth_bp.route("/session", methods=["GET"])
def session_info():
    sess = get_session_from_cookie()
    if not sess or sess.stage != "authenticated" or not sess.user_id:
        return jsonify({"ok": False, "message": "Not authenticated"}), 401
    user = User.query.get(sess.user_id)
    if not user or not user.is_active:
        return jsonify({"ok": False, "message": "Not authenticated"}), 401
    return jsonify({
        "ok": True,
        "user": user.to_public_dict(),
        "mode": sess.mode,
        "session_id": sess.token_hash[:16],
        "login_at": sess.created_at.isoformat() + "Z",
    })


# ============================================================
# LOGOUT
# ============================================================
@auth_bp.route("/logout", methods=["POST"])
def logout():
    sess = get_session_from_cookie()
    if sess:
        sess.revoked = True
        db.session.commit()
        user = User.query.get(sess.user_id) if sess.user_id else None
        if user:
            log_event("Logout", "Session", "SUCCESS", "User logged out",
                      user.username, user.role, session_ref=sess.token_hash[:16])
    resp = make_response(jsonify({"ok": True}))
    clear_session_cookie(resp)
    return resp


# ============================================================
# SELF PROFILE
# ============================================================
@auth_bp.route("/profile", methods=["GET"])
@login_required
def get_profile():
    return jsonify({"ok": True, "user": g.user.to_public_dict()})


@auth_bp.route("/profile", methods=["PUT"])
@login_required
def update_profile():
    data = _json()
    user = g.user

    if "username" in data and data["username"]:
        new_uname = data["username"].strip().lower()
        if new_uname != user.username:
            if User.query.filter_by(username=new_uname).first():
                return jsonify({"ok": False, "message": "Username already taken"}), 400
            if len(new_uname) < 3 or len(new_uname) > 64:
                return jsonify({"ok": False, "message": "Username must be 3-64 chars"}), 400
            user.username = new_uname

    for field in ("display_name", "email", "mobile"):
        if field in data and data[field]:
            setattr(user, field, str(data[field]).strip())

    if "password" in data and data["password"]:
        if len(data["password"]) < 6:
            return jsonify({"ok": False, "message": "Password must be at least 6 characters"}), 400
        user.password_hash = hash_password(data["password"])
        # Sync display_name to StudentRecord so all views reflect the change
    if "display_name" in data and data["display_name"]:
        rec = StudentRecord.query.filter_by(owner_username=user.username).first()
        if rec:
            rec.name = user.display_name

    db.session.commit()
    log_event("Profile Updated", "Self", "SUCCESS",
              f"User {user.username} updated own profile",
              user.username, user.role)
    return jsonify({"ok": True, "user": user.to_public_dict()})