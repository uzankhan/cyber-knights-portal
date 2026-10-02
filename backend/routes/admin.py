# backend/routes/admin.py
from flask import Blueprint, jsonify, request, g
from datetime import datetime, timedelta
import json

from backend.database import db
from backend.models import (
    User, Session, AuditLog, TestMatrixResult, StudentRecord,
    Assignment, AssignmentSubmission, Quiz, QuizQuestion, QuizSubmission,
    Exam, ExamResult,
)
from backend.security import role_required, hash_password
from backend.middleware import admin_ip_guard
from backend.services.audit import log_event

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")


# ============================================================
# Overview
# ============================================================
@admin_bp.route("/overview", methods=["GET"])
@admin_ip_guard
@role_required("admin")
def overview():
    return jsonify({"ok": True, "data": {
        "total_users": User.query.count(),
        "students": User.query.filter_by(role="student").count(),
        "teachers": User.query.filter_by(role="teacher").count(),
        "admins": User.query.filter_by(role="admin").count(),
        "active_sessions": Session.query.filter_by(stage="authenticated", revoked=False).count(),
        "total_assignments": Assignment.query.count(),
        "total_quizzes": Quiz.query.count(),
        "total_exams": Exam.query.count(),
    }})


# ============================================================
# Users CRUD
# ============================================================
@admin_bp.route("/users", methods=["GET"])
@admin_ip_guard
@role_required("admin")
def list_users():
    users = User.query.order_by(User.role, User.username).all()
    return jsonify({"ok": True, "data": [{
        "id": u.id, "username": u.username, "display_name": u.display_name,
        "email": u.email, "mobile": u.mobile, "role": u.role,
        "class_name": u.class_name, "is_active": u.is_active,
        "profile": json.loads(u.profile_data) if u.profile_data else {},
        "last_login": u.last_login.isoformat() + "Z" if u.last_login else None,
    } for u in users]})


@admin_bp.route("/users", methods=["POST"])
@admin_ip_guard
@role_required("admin")
def create_user():
    d = request.get_json() or {}
    username = (d.get("username") or "").strip().lower()
    if not username or User.query.filter_by(username=username).first():
        return jsonify({"ok": False, "message": "Username exists or invalid"}), 400

    role = d.get("role", "student")

    u = User(
        username=username,
        display_name=d.get("display_name", username),
        email=d.get("email", f"{username}@cyberknights.edu"),
        mobile=d.get("mobile", "+92-300-0000000"),
        password_hash=hash_password(d.get("password", "Student@123")),
        role=role,
        class_name=d.get("class_name"),
        profile_data=json.dumps(d.get("profile")) if d.get("profile") else None,
    )
    db.session.add(u)
    db.session.flush()  # get u.id for student_code

    # ============================================================
    # Auto-create StudentRecord for student users so they appear
    # in the Records tab automatically
    # ============================================================
    if role == "student":
        # Generate a unique student code (S-XXXX)
        student_code = f"S-{1000 + u.id}"
        db.session.add(StudentRecord(
            student_code=student_code,
            name=u.display_name,
            class_name=u.class_name or "—",
            attendance="—",
            status="Active",
            owner_username=u.username,
        ))

    db.session.commit()
    log_event("User Created", "Admin", "INFO", f"User {username} ({role}) created",
              g.user.username, g.user.role)
    return jsonify({"ok": True, "id": u.id})


@admin_bp.route("/users/<int:uid>", methods=["PUT"])
@admin_ip_guard
@role_required("admin")
def update_user(uid):
    u = User.query.get(uid)
    if not u:
        return jsonify({"ok": False, "message": "User not found"}), 404
    d = request.get_json() or {}

    old_username = u.username
    old_role = u.role

    if "username" in d and d["username"]:
        new_uname = d["username"].strip().lower()
        if new_uname != u.username:
            if User.query.filter_by(username=new_uname).first():
                return jsonify({"ok": False, "message": "Username already taken"}), 400
            u.username = new_uname

    for field in ("display_name", "email", "mobile", "role", "class_name"):
        if field in d: setattr(u, field, d[field])

    if "password" in d and d["password"]:
        if len(d["password"]) < 6:
            return jsonify({"ok": False, "message": "Password must be at least 6 chars"}), 400
        u.password_hash = hash_password(d["password"])

    if "is_active" in d: u.is_active = bool(d["is_active"])

    if "profile" in d:
        if d["profile"] is None:
            u.profile_data = None
        elif isinstance(d["profile"], dict):
            u.profile_data = json.dumps(d["profile"])

    # ============================================================
    # Sync to StudentRecord if this user is a student
    # ============================================================
    if u.role == "student":
        rec = StudentRecord.query.filter_by(owner_username=old_username).first()

        # If role changed from non-student to student, create record
        if not rec and old_role != "student":
            db.session.flush()
            rec = StudentRecord(
                student_code=f"S-{1000 + u.id}",
                name=u.display_name,
                class_name=u.class_name or "—",
                attendance="—",
                status="Active",
                owner_username=u.username,
            )
            db.session.add(rec)
        elif rec:
            # Update existing record
            rec.name = u.display_name
            rec.class_name = u.class_name or "—"
            # If username changed, update the owner_username reference
            if old_username != u.username:
                rec.owner_username = u.username

    # If role changed FROM student to something else, remove the record
    if old_role == "student" and u.role != "student":
        StudentRecord.query.filter_by(owner_username=old_username).delete()

    db.session.commit()
    log_event("User Updated", "Admin", "INFO", f"User {u.username} updated",
              g.user.username, g.user.role)
    return jsonify({"ok": True, "user": u.to_public_dict()})

@admin_bp.route("/users/<int:uid>", methods=["DELETE"])
@admin_ip_guard
@role_required("admin")
def delete_user(uid):
    u = User.query.get(uid)
    if not u:
        return jsonify({"ok": False, "message": "Not found"}), 404
    if u.username == g.user.username:
        return jsonify({"ok": False, "message": "Cannot delete yourself"}), 400
    Session.query.filter_by(user_id=uid).update({"revoked": True})
    StudentRecord.query.filter_by(owner_username=u.username).delete()
    db.session.delete(u)
    db.session.commit()
    log_event("User Deleted", "Admin", "INFO", f"User {u.username} deleted",
              g.user.username, g.user.role)
    return jsonify({"ok": True})


@admin_bp.route("/users/<int:uid>/force-logout", methods=["POST"])
@admin_ip_guard
@role_required("admin")
def force_logout(uid):
    count = Session.query.filter_by(user_id=uid, revoked=False).update({"revoked": True})
    db.session.commit()
    return jsonify({"ok": True, "revoked": count})


# ============================================================
# Teacher: manage students
# ============================================================
@admin_bp.route("/students", methods=["GET"])
@role_required("teacher", "admin")
def list_students():
    rows = User.query.filter_by(role="student").order_by(User.username).all()
    return jsonify({"ok": True, "data": [{
        "id": u.id, "username": u.username, "display_name": u.display_name,
        "email": u.email, "mobile": u.mobile, "role": u.role,
        "class_name": u.class_name, "is_active": u.is_active,
        "profile": json.loads(u.profile_data) if u.profile_data else {},
    } for u in rows]})


@admin_bp.route("/students/<int:uid>", methods=["PUT"])
@role_required("teacher", "admin")
def update_student(uid):
    u = User.query.get(uid)
    if not u:
        return jsonify({"ok": False, "message": "User not found"}), 404
    if g.user.role == "teacher" and u.role != "student":
        return jsonify({"ok": False, "message": "Teachers can only edit students"}), 403
    d = request.get_json() or {}

    for field in ("display_name", "email", "mobile", "class_name"):
        if field in d: setattr(u, field, d[field])

    if "password" in d and d["password"]:
        if len(d["password"]) < 6:
            return jsonify({"ok": False, "message": "Password must be at least 6 chars"}), 400
        u.password_hash = hash_password(d["password"])

    if "profile" in d and isinstance(d["profile"], dict):
        u.profile_data = json.dumps(d["profile"])

    # ============================================================
    # Sync name & class to StudentRecord so it reflects everywhere
    # ============================================================
    rec = StudentRecord.query.filter_by(owner_username=u.username).first()
    if rec:
        if "display_name" in d: rec.name = u.display_name
        if "class_name" in d: rec.class_name = u.class_name or "—"

    db.session.commit()
    log_event("Student Updated", "Teacher/Admin", "INFO", f"Student {u.username}",
              g.user.username, g.user.role)
    return jsonify({"ok": True, "user": u.to_public_dict()})


# ============================================================
# Sessions
# ============================================================
@admin_bp.route("/sessions", methods=["GET"])
@admin_ip_guard
@role_required("admin")
def list_sessions():
    now = datetime.utcnow()
    rows = Session.query.filter(
        Session.stage == "authenticated", Session.revoked == False,
        Session.expires_at > now,
    ).order_by(Session.last_seen.desc()).limit(100).all()
    data = []
    for s in rows:
        u = User.query.get(s.user_id) if s.user_id else None
        dur = int((s.last_seen - s.created_at).total_seconds())
        data.append({
            "session_id": s.token_hash[:16],
            "user": u.username if u else "-",
            "role": u.role if u else "-",
            "ip": s.ip, "user_agent": s.user_agent, "mode": s.mode,
            "login_time": s.created_at.isoformat() + "Z",
            "last_seen": s.last_seen.isoformat() + "Z",
            "duration": f"{dur//60}m {dur%60}s" if dur > 60 else f"{dur}s",
        })
    return jsonify({"ok": True, "data": data})


@admin_bp.route("/sessions/<session_id>/kill", methods=["POST"])
@admin_ip_guard
@role_required("admin")
def kill_session(session_id):
    sessions = Session.query.filter(Session.stage == "authenticated", Session.revoked == False).all()
    killed = 0
    for s in sessions:
        if s.token_hash.startswith(session_id):
            s.revoked = True; killed += 1
    db.session.commit()
    return jsonify({"ok": True, "killed": killed})


# ============================================================
# Logs
# ============================================================
@admin_bp.route("/logs", methods=["GET"])
@admin_ip_guard
@role_required("admin")
def logs():
    rows = AuditLog.query.order_by(AuditLog.timestamp.desc()).limit(300).all()
    return jsonify({"ok": True, "data": [r.to_dict() for r in rows]})


@admin_bp.route("/logs/clear", methods=["POST"])
@admin_ip_guard
@role_required("admin")
def clear_logs():
    AuditLog.query.delete()
    db.session.commit()
    return jsonify({"ok": True})


# ============================================================
# Test Matrix
# ============================================================
@admin_bp.route("/test-matrix", methods=["GET"])
@role_required("teacher", "admin")
def get_test_matrix():
    rows = TestMatrixResult.query.order_by(TestMatrixResult.test_id).all()
    return jsonify({"ok": True, "data": [{
        "test_id": r.test_id, "user_role": r.user_role, "action": r.action,
        "expected": r.expected, "actual": r.actual, "status": r.status,
    } for r in rows]})


@admin_bp.route("/test-matrix/<test_id>", methods=["POST"])
@role_required("teacher", "admin")
def update_test_matrix(test_id):
    d = request.get_json() or {}
    r = TestMatrixResult.query.filter_by(test_id=test_id).first()
    if not r:
        return jsonify({"ok": False, "message": "Not found"}), 404
    if "actual" in d: r.actual = d["actual"]
    if "status" in d: r.status = d["status"]
    r.tester_username = g.user.username
    r.tested_at = datetime.utcnow()
    db.session.commit()
    return jsonify({"ok": True})


# ============================================================
# ASSIGNMENTS CRUD
# ============================================================
@admin_bp.route("/assignments", methods=["GET"])
@role_required("teacher", "admin")
def list_assignments():
    rows = Assignment.query.order_by(Assignment.created_at.desc()).all()
    data = []
    for a in rows:
        subs = AssignmentSubmission.query.filter_by(assignment_id=a.id).all()
        data.append({
            "id": a.id, "title": a.title, "description": a.description or "",
            "due_date": a.due_date, "deadline": a.deadline.isoformat() + "Z" if a.deadline else None,
            "total_marks": a.total_marks, "status": a.status,
            "target_class": a.target_class,
            "assigned_to": json.loads(a.assigned_to) if a.assigned_to else [],
            "created_at": a.created_at.isoformat() + "Z",
            "submission_count": len(subs),
        })
    return jsonify({"ok": True, "data": data})


@admin_bp.route("/assignments", methods=["POST"])
@role_required("teacher", "admin")
def create_assignment():
    d = request.get_json() or {}
    title = (d.get("title") or "").strip()
    if not title:
        return jsonify({"ok": False, "message": "Title required"}), 400

    deadline_str = d.get("deadline")  # ISO datetime string
    deadline = None
    if deadline_str:
        try:
            deadline = datetime.fromisoformat(deadline_str.replace("Z", ""))
        except Exception:
            pass

    a = Assignment(
        title=title,
        description=d.get("description", ""),
        due_date=d.get("due_date", deadline.strftime("%Y-%m-%d") if deadline else ""),
        deadline=deadline,
        total_marks=int(d.get("total_marks", 10)),
        status=d.get("status", "Open"),
        target_class=d.get("target_class", "All"),
        assigned_to=json.dumps(d.get("assigned_to", [])) if d.get("assigned_to") else None,
        created_by=g.user.username,
    )
    db.session.add(a)
    db.session.commit()
    log_event("Assignment Created", "Teacher/Admin", "INFO",
              f"Assignment '{title}' created", g.user.username, g.user.role)
    return jsonify({"ok": True, "id": a.id})


@admin_bp.route("/assignments/<int:aid>", methods=["PUT"])
@role_required("teacher", "admin")
def update_assignment(aid):
    a = Assignment.query.get(aid)
    if not a:
        return jsonify({"ok": False, "message": "Not found"}), 404
    d = request.get_json() or {}
    for f in ("title", "description", "due_date", "status", "target_class"):
        if f in d: setattr(a, f, d[f])
    if "total_marks" in d: a.total_marks = int(d["total_marks"])
    if "deadline" in d and d["deadline"]:
        try:
            a.deadline = datetime.fromisoformat(d["deadline"].replace("Z", ""))
        except Exception:
            pass
    if "assigned_to" in d:
        a.assigned_to = json.dumps(d["assigned_to"]) if d["assigned_to"] else None
    db.session.commit()
    return jsonify({"ok": True})


@admin_bp.route("/assignments/<int:aid>", methods=["DELETE"])
@role_required("teacher", "admin")
def delete_assignment(aid):
    a = Assignment.query.get(aid)
    if not a:
        return jsonify({"ok": False, "message": "Not found"}), 404
    db.session.delete(a)
    db.session.commit()
    log_event("Assignment Deleted", "Teacher/Admin", "INFO",
              f"Assignment #{aid} deleted", g.user.username, g.user.role)
    return jsonify({"ok": True})


@admin_bp.route("/assignments/<int:aid>/submissions", methods=["GET"])
@role_required("teacher", "admin")
def assignment_submissions(aid):
    a = Assignment.query.get(aid)
    if not a:
        return jsonify({"ok": False, "message": "Not found"}), 404
    subs = AssignmentSubmission.query.filter_by(assignment_id=aid).all()
    data = []
    for s in subs:
        u = User.query.filter_by(username=s.student_username).first()
        data.append({
            "id": s.id, "student": s.student_username,
            "student_name": u.display_name if u else s.student_username,
            "submitted_at": s.submitted_at.isoformat() + "Z",
            "content": s.content or "",
            "marks_awarded": s.marks_awarded,
            "feedback": s.feedback or "",
        })
    return jsonify({"ok": True, "data": data, "total_marks": a.total_marks})


@admin_bp.route("/submissions/<int:sid>/grade", methods=["POST"])
@role_required("teacher", "admin")
def grade_submission(sid):
    s = AssignmentSubmission.query.get(sid)
    if not s:
        return jsonify({"ok": False, "message": "Not found"}), 404
    d = request.get_json() or {}
    s.marks_awarded = int(d.get("marks_awarded", 0))
    s.feedback = d.get("feedback", "")
    db.session.commit()
    return jsonify({"ok": True})


# ============================================================
# QUIZZES CRUD
# ============================================================
@admin_bp.route("/quizzes", methods=["GET"])
@role_required("teacher", "admin")
def list_quizzes():
    rows = Quiz.query.order_by(Quiz.created_at.desc()).all()
    data = []
    for q in rows:
        data.append({
            "id": q.id, "title": q.title, "description": q.description or "",
            "total_marks": q.total_marks, "duration_minutes": q.duration_minutes,
            "is_published": q.is_published,
            "question_count": len(q.questions),
            "assigned_to": json.loads(q.assigned_to) if q.assigned_to else [],
            "created_at": q.created_at.isoformat() + "Z",
        })
    return jsonify({"ok": True, "data": data})


@admin_bp.route("/quizzes/<int:qid>", methods=["GET"])
@role_required("teacher", "admin")
def get_quiz(qid):
    q = Quiz.query.get(qid)
    if not q:
        return jsonify({"ok": False, "message": "Not found"}), 404
    return jsonify({"ok": True, "data": {
        "id": q.id, "title": q.title, "description": q.description or "",
        "total_marks": q.total_marks, "duration_minutes": q.duration_minutes,
        "is_published": q.is_published,
        "assigned_to": json.loads(q.assigned_to) if q.assigned_to else [],
        "questions": [{
            "id": qq.id, "text": qq.question_text,
            "option_a": qq.option_a, "option_b": qq.option_b,
            "option_c": qq.option_c, "option_d": qq.option_d,
            "correct": qq.correct_option, "marks": qq.marks,
        } for qq in q.questions],
    }})


@admin_bp.route("/quizzes", methods=["POST"])
@role_required("teacher", "admin")
def create_quiz():
    d = request.get_json() or {}
    title = (d.get("title") or "").strip()
    if not title:
        return jsonify({"ok": False, "message": "Title required"}), 400
    questions = d.get("questions", [])
    if not questions:
        return jsonify({"ok": False, "message": "At least one question required"}), 400

    q = Quiz(
        title=title, description=d.get("description", ""),
        total_marks=int(d.get("total_marks", sum(int(x.get("marks", 1)) for x in questions))),
        duration_minutes=int(d.get("duration_minutes", 15)),
        created_by=g.user.username,
        is_published=bool(d.get("is_published", True)),
        assigned_to=json.dumps(d.get("assigned_to", [])) if d.get("assigned_to") else None,
    )
    db.session.add(q)
    db.session.flush()

    for i, qq in enumerate(questions):
        db.session.add(QuizQuestion(
            quiz_id=q.id,
            question_text=qq.get("text", ""),
            option_a=qq.get("option_a", ""), option_b=qq.get("option_b", ""),
            option_c=qq.get("option_c") or None, option_d=qq.get("option_d") or None,
            correct_option=(qq.get("correct") or "A").upper(),
            marks=int(qq.get("marks", 1)), order_index=i,
        ))
    db.session.commit()
    log_event("Quiz Created", "Teacher/Admin", "INFO", f"Quiz '{title}' with {len(questions)} questions",
              g.user.username, g.user.role)
    return jsonify({"ok": True, "id": q.id})


@admin_bp.route("/quizzes/<int:qid>", methods=["DELETE"])
@role_required("teacher", "admin")
def delete_quiz(qid):
    q = Quiz.query.get(qid)
    if not q:
        return jsonify({"ok": False, "message": "Not found"}), 404
    QuizSubmission.query.filter_by(quiz_id=qid).delete()
    db.session.delete(q)
    db.session.commit()
    return jsonify({"ok": True})


@admin_bp.route("/quizzes/<int:qid>/submissions", methods=["GET"])
@role_required("teacher", "admin")
def quiz_submissions(qid):
    subs = QuizSubmission.query.filter_by(quiz_id=qid).all()
    data = []
    for s in subs:
        u = User.query.filter_by(username=s.student_username).first()
        data.append({
            "id": s.id, "student": s.student_username,
            "student_name": u.display_name if u else s.student_username,
            "score": s.score, "total": s.total,
            "submitted_at": s.submitted_at.isoformat() + "Z",
            "finalized": s.finalized,
        })
    return jsonify({"ok": True, "data": data})


# ============================================================
# EXAMS CRUD
# ============================================================
@admin_bp.route("/exams", methods=["GET"])
@role_required("teacher", "admin")
def list_exams():
    rows = Exam.query.order_by(Exam.created_at.desc()).all()
    return jsonify({"ok": True, "data": [{
        "id": e.id, "title": e.title, "exam_type": e.exam_type,
        "total_marks": e.total_marks, "exam_date": e.exam_date or "",
        "duration_minutes": e.duration_minutes,
        "assigned_to": json.loads(e.assigned_to) if e.assigned_to else [],
        "created_at": e.created_at.isoformat() + "Z",
    } for e in rows]})


@admin_bp.route("/exams", methods=["POST"])
@role_required("teacher", "admin")
def create_exam():
    d = request.get_json() or {}
    title = (d.get("title") or "").strip()
    if not title:
        return jsonify({"ok": False, "message": "Title required"}), 400
    e = Exam(
        title=title,
        exam_type=d.get("exam_type", "custom"),
        total_marks=int(d.get("total_marks", 100)),
        exam_date=d.get("exam_date", ""),
        duration_minutes=int(d.get("duration_minutes", 60)),
        assigned_to=json.dumps(d.get("assigned_to", [])) if d.get("assigned_to") else None,
        created_by=g.user.username,
    )
    db.session.add(e)
    db.session.commit()
    return jsonify({"ok": True, "id": e.id})


@admin_bp.route("/exams/<int:eid>", methods=["DELETE"])
@role_required("teacher", "admin")
def delete_exam(eid):
    e = Exam.query.get(eid)
    if not e:
        return jsonify({"ok": False, "message": "Not found"}), 404
    ExamResult.query.filter_by(exam_id=eid).delete()
    db.session.delete(e)
    db.session.commit()
    return jsonify({"ok": True})


@admin_bp.route("/exams/<int:eid>/results", methods=["GET"])
@role_required("teacher", "admin")
def exam_results(eid):
    rows = ExamResult.query.filter_by(exam_id=eid).all()
    data = []
    for r in rows:
        u = User.query.filter_by(username=r.student_username).first()
        data.append({
            "student": r.student_username,
            "student_name": u.display_name if u else r.student_username,
            "marks_obtained": r.marks_obtained, "grade": r.grade or "",
        })
    return jsonify({"ok": True, "data": data})


@admin_bp.route("/exams/<int:eid>/record", methods=["POST"])
@role_required("teacher", "admin")
def record_exam_result(eid):
    d = request.get_json() or {}
    username = (d.get("student") or "").strip().lower()
    marks = int(d.get("marks_obtained", 0))
    e = Exam.query.get(eid)
    if not e:
        return jsonify({"ok": False, "message": "Exam not found"}), 404

    pct = marks / max(e.total_marks, 1) * 100
    grade = "A+" if pct >= 90 else "A" if pct >= 80 else "B" if pct >= 70 else "C" if pct >= 60 else "D" if pct >= 50 else "F"

    r = ExamResult.query.filter_by(exam_id=eid, student_username=username).first()
    if r:
        r.marks_obtained = marks; r.grade = grade
    else:
        db.session.add(ExamResult(exam_id=eid, student_username=username,
                                  marks_obtained=marks, grade=grade))
    db.session.commit()
    return jsonify({"ok": True})