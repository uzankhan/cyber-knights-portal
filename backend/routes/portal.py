# backend/routes/portal.py
from flask import Blueprint, jsonify, g, request
from datetime import datetime
import json

from backend.database import db
from backend.models import (
    StudentRecord, Assignment, AssignmentSubmission,
    Quiz, QuizSubmission, QuizQuestion, Exam, ExamResult,
)
from backend.security import role_required
from backend.services.audit import log_event

portal_bp = Blueprint("portal", __name__, url_prefix="/api/portal")


# ============================================================
# Student Records
# ============================================================
@portal_bp.route("/records", methods=["GET"])
@role_required("student", "teacher", "admin")
def records():
    # All roles can see all records (school-wide student list)
    rows = StudentRecord.query.order_by(StudentRecord.student_code).all()
    return jsonify({"ok": True, "data": [{
        "id": r.student_code,
        "name": r.name,
        "class": r.class_name,
        "attendance": r.attendance,
        "status": r.status,
    } for r in rows]})


# ============================================================
# Assignments (student view)
# ============================================================
@portal_bp.route("/assignments", methods=["GET"])
@role_required("student", "teacher", "admin")
def assignments():
    if g.user.role == "student":
        all_a = Assignment.query.all()
        assigned = []
        for a in all_a:
            if a.assigned_to:
                try:
                    if g.user.username in json.loads(a.assigned_to):
                        assigned.append(a)
                except Exception:
                    pass
            else:
                # fallback: class-based
                if a.target_class == "All" or a.target_class == g.user.class_name:
                    assigned.append(a)
        rows = assigned
    else:
        rows = Assignment.query.order_by(Assignment.created_at.desc()).all()

    data = []
    for a in rows:
        sub = None
        if g.user.role == "student":
            sub = AssignmentSubmission.query.filter_by(
                assignment_id=a.id, student_username=g.user.username).first()
        now = datetime.utcnow()
        expired = a.deadline and a.deadline < now
        data.append({
            "id": a.id, "title": a.title, "description": a.description or "",
            "due": a.due_date, "deadline": a.deadline.isoformat() + "Z" if a.deadline else None,
            "total_marks": a.total_marks, "status": a.status, "for": a.target_class,
            "expired": bool(expired),
            "my_submission": {
                "submitted_at": sub.submitted_at.isoformat() + "Z",
                "content": sub.content or "",
                "marks_awarded": sub.marks_awarded,
                "feedback": sub.feedback or "",
            } if sub else None,
        })
    return jsonify({"ok": True, "data": data})


@portal_bp.route("/assignments/<int:aid>/submit", methods=["POST"])
@role_required("student")
def submit_assignment(aid):
    a = Assignment.query.get(aid)
    if not a:
        return jsonify({"ok": False, "message": "Assignment not found"}), 404
    now = datetime.utcnow()
    if a.deadline and a.deadline < now:
        return jsonify({"ok": False, "message": "Deadline passed — submission closed"}), 400
    existing = AssignmentSubmission.query.filter_by(
        assignment_id=aid, student_username=g.user.username).first()
    if existing:
        return jsonify({"ok": False, "message": "Already submitted"}), 400
    d = request.get_json() or {}
    s = AssignmentSubmission(
        assignment_id=aid, student_username=g.user.username,
        content=d.get("content", ""),
    )
    db.session.add(s)
    db.session.commit()
    log_event("Assignment Submitted", "Student", "INFO", f"Assignment #{aid}",
              g.user.username, g.user.role)
    return jsonify({"ok": True})


# ============================================================
# Results (student — combined)
# ============================================================
@portal_bp.route("/results", methods=["GET"])
@role_required("student", "teacher", "admin")
def results():
    if g.user.role == "student":
        rows = ExamResult.query.filter_by(student_username=g.user.username).all()
    else:
        rows = ExamResult.query.all()
    data = []
    for r in rows:
        e = Exam.query.get(r.exam_id) if r.exam_id else None
        u = None
        from backend.models import User
        u = User.query.filter_by(username=r.student_username).first()
        data.append({
            "student": u.display_name if u else r.student_username,
            "subject": e.title if e else "Exam",
            "score": r.marks_obtained,
            "total": e.total_marks if e else 100,
            "grade": r.grade or "",
        })
    return jsonify({"ok": True, "data": data})


# ============================================================
# QUIZZES (student)
# ============================================================
@portal_bp.route("/quizzes", methods=["GET"])
@role_required("student", "teacher", "admin")
def student_quizzes():
    if g.user.role == "student":
        all_q = Quiz.query.filter_by(is_published=True).all()
        my_quizzes = []
        for q in all_q:
            if q.assigned_to:
                try:
                    if g.user.username in json.loads(q.assigned_to):
                        my_quizzes.append(q)
                except Exception:
                    pass
            else:
                my_quizzes.append(q)
        rows = my_quizzes
    else:
        rows = Quiz.query.all()

    data = []
    for q in rows:
        sub = None
        if g.user.role == "student":
            sub = QuizSubmission.query.filter_by(quiz_id=q.id, student_username=g.user.username).first()
        data.append({
            "id": q.id, "title": q.title, "description": q.description or "",
            "total_marks": q.total_marks, "duration_minutes": q.duration_minutes,
            "question_count": len(q.questions),
            "my_submission": {
                "score": sub.score, "total": sub.total,
                "submitted_at": sub.submitted_at.isoformat() + "Z",
                "finalized": sub.finalized,
            } if sub else None,
        })
    return jsonify({"ok": True, "data": data})


@portal_bp.route("/quizzes/<int:qid>", methods=["GET"])
@role_required("student")
def get_quiz_for_attempt(qid):
    """Get quiz questions (WITHOUT correct answers) for taking."""
    q = Quiz.query.get(qid)
    if not q or not q.is_published:
        return jsonify({"ok": False, "message": "Quiz not available"}), 404

    # Already submitted?
    sub = QuizSubmission.query.filter_by(quiz_id=qid, student_username=g.user.username).first()
    if sub and sub.finalized:
        return jsonify({"ok": False, "message": "Already submitted"}), 400

    return jsonify({"ok": True, "data": {
        "id": q.id, "title": q.title, "description": q.description or "",
        "total_marks": q.total_marks, "duration_minutes": q.duration_minutes,
        "questions": [{
            "id": qq.id, "text": qq.question_text,
            "option_a": qq.option_a, "option_b": qq.option_b,
            "option_c": qq.option_c, "option_d": qq.option_d,
            "marks": qq.marks,
        } for qq in q.questions],
    }})


@portal_bp.route("/quizzes/<int:qid>/submit", methods=["POST"])
@role_required("student")
def submit_quiz(qid):
    """Submit quiz answers. Student finalizes after review."""
    q = Quiz.query.get(qid)
    if not q:
        return jsonify({"ok": False, "message": "Quiz not found"}), 404

    existing = QuizSubmission.query.filter_by(quiz_id=qid, student_username=g.user.username).first()
    if existing and existing.finalized:
        return jsonify({"ok": False, "message": "Already submitted"}), 400

    d = request.get_json() or {}
    answers = d.get("answers", {})  # {question_id: "A"}
    finalize = bool(d.get("finalize", False))

    # Grade
    score = 0; total = 0
    for qq in q.questions:
        total += qq.marks
        given = str(answers.get(str(qq.id), "")).upper()
        if given == qq.correct_option:
            score += qq.marks

    if existing:
        existing.answers = json.dumps(answers)
        existing.score = score
        existing.total = total
        existing.finalized = finalize
    else:
        db.session.add(QuizSubmission(
            quiz_id=qid, student_username=g.user.username,
            answers=json.dumps(answers), score=score, total=total, finalized=finalize,
        ))
    db.session.commit()

    if not finalize:
        return jsonify({"ok": True, "score": score, "total": total, "finalized": False})

    log_event("Quiz Submitted", "Student", "SUCCESS",
              f"Quiz #{qid}: {score}/{total}", g.user.username, g.user.role)

    # Return detailed results
    detail = []
    for qq in q.questions:
        given = str(answers.get(str(qq.id), "")).upper()
        detail.append({
            "question": qq.question_text,
            "options": {
                "A": qq.option_a, "B": qq.option_b,
                "C": qq.option_c, "D": qq.option_d,
            },
            "your_answer": given,
            "correct_answer": qq.correct_option,
            "is_correct": given == qq.correct_option,
            "marks": qq.marks,
        })
    return jsonify({
        "ok": True, "score": score, "total": total,
        "finalized": True, "detail": detail,
    })


# ============================================================
# PROGRESS DASHBOARD (student)
# ============================================================
@portal_bp.route("/progress", methods=["GET"])
@role_required("student")
def progress():
    # Assignments
    all_a = Assignment.query.all()
    my_a = []
    for a in all_a:
        if a.assigned_to:
            try:
                if g.user.username in json.loads(a.assigned_to): my_a.append(a)
            except Exception: pass
        elif a.target_class in ("All", g.user.class_name):
            my_a.append(a)

    assign_total_marks = sum(a.total_marks for a in my_a)
    assign_earned = 0
    assign_attended = 0
    for a in my_a:
        s = AssignmentSubmission.query.filter_by(assignment_id=a.id, student_username=g.user.username).first()
        if s:
            assign_attended += 1
            assign_earned += (s.marks_awarded or 0)

    # Quizzes
    all_q = Quiz.query.filter_by(is_published=True).all()
    my_q = []
    for q in all_q:
        if q.assigned_to:
            try:
                if g.user.username in json.loads(q.assigned_to): my_q.append(q)
            except Exception: pass
        else:
            my_q.append(q)

    quiz_total_marks = sum(q.total_marks for q in my_q)
    quiz_earned = 0
    quiz_attended = 0
    quiz_pass = 0
    quiz_fail = 0
    for q in my_q:
        s = QuizSubmission.query.filter_by(quiz_id=q.id, student_username=g.user.username, finalized=True).first()
        if s:
            quiz_attended += 1
            quiz_earned += s.score
            if s.total > 0 and (s.score / s.total) >= 0.4:
                quiz_pass += 1
            else:
                quiz_fail += 1

    # Exams
    all_e = Exam.query.all()
    my_e = []
    for e in all_e:
        if e.assigned_to:
            try:
                if g.user.username in json.loads(e.assigned_to): my_e.append(e)
            except Exception: pass
        else:
            my_e.append(e)

    exam_total_marks = sum(e.total_marks for e in my_e)
    exam_earned = 0
    exam_attended = 0
    exam_pass = 0
    exam_fail = 0
    for e in my_e:
        r = ExamResult.query.filter_by(exam_id=e.id, student_username=g.user.username).first()
        if r:
            exam_attended += 1
            exam_earned += r.marks_obtained
            if e.total_marks > 0 and (r.marks_obtained / e.total_marks) >= 0.4:
                exam_pass += 1
            else:
                exam_fail += 1

    return jsonify({"ok": True, "data": {
        "assignments": {
            "total": len(my_a), "attended": assign_attended,
            "earned": assign_earned, "possible": assign_total_marks,
        },
        "quizzes": {
            "total": len(my_q), "attended": quiz_attended,
            "earned": quiz_earned, "possible": quiz_total_marks,
            "pass": quiz_pass, "fail": quiz_fail,
        },
        "exams": {
            "total": len(my_e), "attended": exam_attended,
            "earned": exam_earned, "possible": exam_total_marks,
            "pass": exam_pass, "fail": exam_fail,
        },
        "total_earned": assign_earned + quiz_earned + exam_earned,
        "total_possible": assign_total_marks + quiz_total_marks + exam_total_marks,
    }})