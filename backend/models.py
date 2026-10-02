from datetime import datetime
from backend.database import db # type: ignore[import-not-found]


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False, index=True)
    email = db.Column(db.String(255), nullable=False)
    mobile = db.Column(db.String(32), nullable=False)
    display_name = db.Column(db.String(128), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(16), nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    mfa_enabled = db.Column(db.Boolean, default=True, nullable=False)
    failed_count = db.Column(db.Integer, default=0, nullable=False)
    locked_until = db.Column(db.DateTime, nullable=True)
    last_login = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    # NEW: student's own class (for filtering)
    class_name = db.Column(db.String(32), nullable=True)
    profile_data = db.Column(db.Text, nullable=True)  # JSON string for extra fields

    def to_public_dict(self):
        import json
        profile = {}
        if self.profile_data:
            try:
                profile = json.loads(self.profile_data)
            except Exception:
                profile = {}
        return {
            "id": self.id,
            "username": self.username,
            "display_name": self.display_name,
            "role": self.role,
            "email": self.email,
            "mobile": self.mobile,
            "class_name": self.class_name,
            "profile": profile,
        }
    
class Session(db.Model):
    __tablename__ = "sessions"

    id = db.Column(db.Integer, primary_key=True)
    # Store SHA-256 hash of the token (never plaintext)
    token_hash = db.Column(db.String(128), unique=True, nullable=False, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    # stage: pending_method | pending_otp_mobile | pending_otp_email | authenticated
    stage = db.Column(db.String(32), nullable=False, default="pending_method")
    mode = db.Column(db.String(16), nullable=True)   # password | otp | full
    ip = db.Column(db.String(64), nullable=False)
    user_agent = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)
    last_seen = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    revoked = db.Column(db.Boolean, default=False, nullable=False)


class OTPChallenge(db.Model):
    __tablename__ = "otp_challenges"

    id = db.Column(db.Integer, primary_key=True)
    challenge_hash = db.Column(db.String(128), unique=True, nullable=False, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    session_id = db.Column(db.Integer, db.ForeignKey("sessions.id"), nullable=False)
    purpose = db.Column(db.String(16), nullable=False)   # mobile | email
    otp_hash = db.Column(db.String(255), nullable=False)  # Argon2 hash of OTP
    attempts = db.Column(db.Integer, default=0, nullable=False)
    max_attempts = db.Column(db.Integer, default=5, nullable=False)
    resend_count = db.Column(db.Integer, default=0, nullable=False)
    last_sent_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)
    consumed = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    ip = db.Column(db.String(64), nullable=False)


class AuditLog(db.Model):
    __tablename__ = "audit_logs"

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, index=True)
    username = db.Column(db.String(64), nullable=True)
    role = db.Column(db.String(16), nullable=True)
    action = db.Column(db.String(64), nullable=False)
    factor = db.Column(db.String(32), nullable=True)
    result = db.Column(db.String(16), nullable=False)   # SUCCESS | FAIL | LOCKED | INFO
    details = db.Column(db.String(512), nullable=True)
    ip = db.Column(db.String(64), nullable=True)
    user_agent = db.Column(db.String(255), nullable=True)
    session_ref = db.Column(db.String(128), nullable=True)

    def to_dict(self):
        return {
            "time": self.timestamp.isoformat() + "Z",
            "user": self.username or "-",
            "role": self.role or "-",
            "action": self.action,
            "factor": self.factor or "-",
            "result": self.result,
            "details": self.details or "",
            "ip": self.ip or "-",
        }


# ---------- Fictional portal data ----------

class StudentRecord(db.Model):
    __tablename__ = "student_records"
    id = db.Column(db.Integer, primary_key=True)
    student_code = db.Column(db.String(32), unique=True, nullable=False)
    name = db.Column(db.String(128), nullable=False)
    class_name = db.Column(db.String(32), nullable=False)
    attendance = db.Column(db.String(16), nullable=False)
    status = db.Column(db.String(32), nullable=False)
    # NEW: which user owns this record
    owner_username = db.Column(db.String(64), nullable=True, index=True)


class Assignment(db.Model):
    __tablename__ = "assignments"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    due_date = db.Column(db.String(32), nullable=False)
    deadline = db.Column(db.DateTime, nullable=True)   # precise cutoff
    total_marks = db.Column(db.Integer, default=10, nullable=False)
    status = db.Column(db.String(32), nullable=False)
    target_class = db.Column(db.String(64), nullable=False)
    assigned_to = db.Column(db.Text, nullable=True)   # JSON list of usernames
    created_by = db.Column(db.String(64), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    submissions = db.relationship("AssignmentSubmission", backref="assignment", cascade="all, delete-orphan")


class TestMatrixResult(db.Model):
    __tablename__ = "test_matrix"
    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.String(16), unique=True, nullable=False)
    user_role = db.Column(db.String(32), nullable=False)
    action = db.Column(db.String(255), nullable=False)
    expected = db.Column(db.String(255), nullable=False)
    actual = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(16), nullable=True)  # PASS | FAIL | PENDING
    tested_at = db.Column(db.DateTime, nullable=True)
    evidence = db.Column(db.Text, nullable=True)
    tester_username = db.Column(db.String(64), nullable=True)

# ============================================================
# CYBER KNIGHTS — Assignments, Quizzes, Exams, Progress
# ============================================================

class AssignmentSubmission(db.Model):
    __tablename__ = "assignment_submissions"
    id = db.Column(db.Integer, primary_key=True)
    assignment_id = db.Column(db.Integer, db.ForeignKey("assignments.id"), nullable=False, index=True)
    student_username = db.Column(db.String(64), nullable=False, index=True)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=True)
    marks_awarded = db.Column(db.Integer, nullable=True)
    feedback = db.Column(db.String(512), nullable=True)


class Quiz(db.Model):
    __tablename__ = "quizzes"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    total_marks = db.Column(db.Integer, default=10, nullable=False)
    duration_minutes = db.Column(db.Integer, default=15, nullable=False)
    created_by = db.Column(db.String(64), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_published = db.Column(db.Boolean, default=False, nullable=False)
    assigned_to = db.Column(db.Text, nullable=True)  # JSON list of usernames
    questions = db.relationship("QuizQuestion", backref="quiz", cascade="all, delete-orphan")


class QuizQuestion(db.Model):
    __tablename__ = "quiz_questions"
    id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey("quizzes.id"), nullable=False, index=True)
    question_text = db.Column(db.Text, nullable=False)
    option_a = db.Column(db.String(512), nullable=False)
    option_b = db.Column(db.String(512), nullable=False)
    option_c = db.Column(db.String(512), nullable=True)
    option_d = db.Column(db.String(512), nullable=True)
    correct_option = db.Column(db.String(1), nullable=False)  # A/B/C/D
    marks = db.Column(db.Integer, default=1, nullable=False)
    order_index = db.Column(db.Integer, default=0)


class QuizSubmission(db.Model):
    __tablename__ = "quiz_submissions"
    id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey("quizzes.id"), nullable=False, index=True)
    student_username = db.Column(db.String(64), nullable=False, index=True)
    answers = db.Column(db.Text, nullable=False)  # JSON {question_id: "A"}
    score = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Integer, nullable=False)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    finalized = db.Column(db.Boolean, default=False)
    __table_args__ = (db.UniqueConstraint("quiz_id", "student_username", name="uq_quiz_student"),)


class Exam(db.Model):
    __tablename__ = "exams"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    exam_type = db.Column(db.String(32), nullable=False)  # midterm | final | custom
    total_marks = db.Column(db.Integer, default=100, nullable=False)
    exam_date = db.Column(db.String(32), nullable=True)
    duration_minutes = db.Column(db.Integer, default=60, nullable=False)
    assigned_to = db.Column(db.Text, nullable=True)  # JSON list
    created_by = db.Column(db.String(64), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class ExamResult(db.Model):
    __tablename__ = "exam_results"
    id = db.Column(db.Integer, primary_key=True)
    exam_id = db.Column(db.Integer, db.ForeignKey("exams.id"), nullable=False, index=True)
    student_username = db.Column(db.String(64), nullable=False, index=True)
    marks_obtained = db.Column(db.Integer, nullable=False)
    grade = db.Column(db.String(8), nullable=True)
    recorded_at = db.Column(db.DateTime, default=datetime.utcnow)
    __table_args__ = (db.UniqueConstraint("exam_id", "student_username", name="uq_exam_student"),)