# backend/seed.py
import json
from backend.database import db
from backend.models import (
    User, StudentRecord, Assignment, Exam, TestMatrixResult,
)
from backend.security import hash_password


STUDENTS = [
    {"username": "hamza1",    "name": "Hamza Khan",         "class": "10-A"},
    {"username": "aqid1",     "name": "Rao Muhammad Aqid",  "class": "10-A"},
    {"username": "saniya1",   "name": "Saniya Kayani",      "class": "9-B"},
    {"username": "huzaifa1",  "name": "Huzaifa Imran",      "class": "11-C"},
    {"username": "arham1",    "name": "Arham",              "class": "12-A"},
    {"username": "aman1",     "name": "Aman-ul-Haq",        "class": "12-A"},
    {"username": "zara1",     "name": "Zara Sheikh",        "class": "10-B"},
    {"username": "ali1",      "name": "Ali Hassan",         "class": "9-A"},
]


def seed_data():
    if User.query.first():
        return

    users = [
        User(
            username="admin1", display_name="Sir Shabir Ahmed",
            email="shabbirahmed@aptech.edu", mobile="+92-300-0000003",
            password_hash=hash_password("Admin@123"), role="admin",
            profile_data=json.dumps({
                "designation": "Principal / Administrator",
                "department": "Administration",
                "employee_id": "A-0001",
                "access_level": "Full System Control",
            }),
        ),
        User(
            username="teacher1", display_name="Sir Mustafa Raza",
            email="syedmustafa.raza@gmail.com", mobile="+92-300-0000002",
            password_hash=hash_password("Teacher@123"), role="teacher",
            profile_data=json.dumps({
                "department": "Computer Science",
                "designation": "Senior Instructor",
                "employee_id": "T-0001",
                "joined": "2022",
            }),
        ),
    ]

    records = []
    for i, s in enumerate(STUDENTS, start=1):
        users.append(User(
            username=s["username"],
            display_name=s["name"],
            email=f"{s['username']}@cyberknights.edu",
            mobile=f"+92-300-00000{i:02d}",
            password_hash=hash_password("Student@123"),
            role="student",
            class_name=s["class"],
            profile_data=json.dumps({
                "course": "Science (Pre-Engineering)",
                "school_id": f"AS-{1000+i}",
                "enrollment": "2024",
                "section": "A",
            }),
        ))
        records.append(StudentRecord(
            student_code=f"S-{1000+i}",
            name=s["name"],
            class_name=s["class"],
            attendance="92%",
            status="Active",
            owner_username=s["username"],
        ))

    db.session.add_all(users)
    db.session.add_all(records)

    # Assignments
    db.session.add_all([
        Assignment(title="Mathematics – Quadratic Equations",   due_date="2026-09-28", status="Pending",   target_class="Class 10"),
        Assignment(title="Physics – Laws of Motion Lab Report",  due_date="2026-09-25", status="Submitted", target_class="Class 11"),
        Assignment(title="English – Essay on Cyber Safety",      due_date="2026-10-02", status="Pending",   target_class="All"),
        Assignment(title="Computer Science – Cyber Knights Case Study", due_date="2026-10-05", status="Open", target_class="Class 12"),
        Assignment(title="Chemistry – Periodic Table Quiz",      due_date="2026-09-30", status="Pending",   target_class="Class 9"),
    ])

    # Sample exam so students see results
    db.session.add(Exam(
        title="Mid-Term Mathematics 2026",
        exam_type="midterm",
        total_marks=100,
        exam_date="2026-09-15",
        duration_minutes=90,
        created_by="admin1",
    ))

    # Test matrix
    tests = [
        ("T01", "Any",     "Valid password login",             "Access granted"),
        ("T02", "Any",     "Invalid password",                 "Access denied"),
        ("T03", "Any",     "Repeated failed attempts (>=5)",   "Temporary lockout"),
        ("T04", "Student", "Attempt Teacher/Admin resource",   "Access denied"),
        ("T05", "Teacher", "Attempt Admin-only resource",      "Access denied"),
        ("T06", "Any",     "Logout then reuse session",        "Session invalidated"),
        ("T07", "Admin",   "Edit user profile",                "Profile updated"),
        ("T08", "Admin",   "Delete user",                      "User removed"),
        ("T09", "Admin",   "Force logout user",                "Session revoked"),
        ("T10", "Any",     "SQL injection attempt",            "Blocked"),
        ("T11", "Any",     "XSS attempt",                      "Escaped"),
        ("T12", "Any",     "CSRF attempt",                     "Blocked"),
    ]
    for tid, role, action, expected in tests:
        db.session.add(TestMatrixResult(
            test_id=tid, user_role=role, action=action,
            expected=expected, status="PENDING",
        ))

    db.session.commit()

        # ============================================================
    # Backfill: Ensure every student user has a StudentRecord
    # (handles students created before auto-sync was implemented)
    # ============================================================
    all_students = User.query.filter_by(role="student").all()
    existing_owners = {r.owner_username for r in StudentRecord.query.all()}
    backfilled = 0
    for stu in all_students:
        if stu.username not in existing_owners:
            db.session.add(StudentRecord(
                student_code=f"S-{1000 + stu.id}",
                name=stu.display_name,
                class_name=stu.class_name or "—",
                attendance="—",
                status="Active",
                owner_username=stu.username,
            ))
            backfilled += 1
    if backfilled:
        db.session.commit()
        print(f"✅ Backfilled {backfilled} missing student record(s)")
        
    print("✅ Cyber Knights seed complete")