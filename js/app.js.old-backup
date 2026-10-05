/* ============================================================
   Cyber Knights – UI Controller (Complete with Modal Fixes)
   ============================================================ */
(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  let sessionTicker = null;
  let currentUser = null;
  let editingUser = null;
  let editingTeacherStudent = null;
  let allStudentsCache = [];
  let quizAttempt = { quiz: null, answers: {}, timer: null, secondsLeft: 0 };

  const PROFILE_FIELDS = [
    { key: "course",       label: "Course" },
    { key: "school_id",    label: "School ID" },
    { key: "enrollment",   label: "Enrollment Year" },
    { key: "section",      label: "Section" },
    { key: "department",   label: "Department" },
    { key: "designation",  label: "Designation" },
    { key: "employee_id",  label: "Employee ID" },
    { key: "joined",       label: "Joined Year" },
    { key: "address",      label: "Address" },
    { key: "guardian",     label: "Guardian Name" },
    { key: "dob",          label: "Date of Birth" },
    { key: "blood_group",  label: "Blood Group" },
  ];

  // ============ Toast ============
  function toast(msg, type = "info") {
    const c = $("#toast-container");
    if (!c) return;
    const t = document.createElement("div");
    t.className = `toast ${type}`;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  }

  // ============ Overlay ============
  function showAccessGranted() { showOverlay("Access Granted", "Signing you in…", 1200); }
  function showOverlay(title, subtitle, durationMs) {
    const existing = document.getElementById("status-overlay");
    if (existing) existing.remove();
    const msg = document.createElement("div");
    msg.id = "status-overlay";
    msg.className = "success-msg";
    msg.innerHTML = `
      <span class="success-icon">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 13l4 4L19 7"/>
        </svg>
      </span>
      <span><strong>${title}</strong> — ${subtitle}</span>
    `;
    document.body.appendChild(msg);
    setTimeout(() => {
      if (msg && msg.parentNode) {
        msg.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        msg.style.opacity = "0";
        msg.style.transform = "translate(-50%, -50%) scale(0.95)";
        setTimeout(() => msg.remove(), 300);
      }
    }, durationMs);
  }

  // ============ Views ============
  function showView(id) {
    $$(".view").forEach((v) => v.classList.remove("active"));
    const el = $(`#${id}`); if (el) el.classList.add("active");
  }
  function showPage(id) {
    $$(".page").forEach((p) => p.classList.remove("active"));
    const el = $(`#page-${id}`); if (el) el.classList.add("active");
    $$(".nav-link").forEach((l) => l.classList.toggle("active", l.dataset.page === id));
    if (id !== "admin") stopSessionTicker();
  }

  // ============ Modal Helpers ============
  function closeAllModals() {
    $$(".modal-overlay").forEach((m) => m.classList.add("hidden"));
  }
  function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove("hidden");
  }

  // ============ Login ============
  async function handleLogin(e) {
    e.preventDefault();
    const errEl = $("#error-msg");
    const lockEl = $("#lockout-msg");
    errEl.classList.add("hidden"); lockEl.classList.add("hidden");
    const u = $("#username").value.trim();
    const p = $("#password").value;
    if (!u || !p) { errEl.textContent = "Enter username and password"; errEl.classList.remove("hidden"); return; }

    const btn = $("#btn-login");
    btn.disabled = true; btn.textContent = "Signing in…";
    const r = await AuthClient.login(u, p);
    btn.disabled = false; btn.textContent = "Continue";

    if (r.data && r.data.locked) { lockEl.textContent = r.data.message || "Locked"; lockEl.classList.remove("hidden"); return; }
    if (!r.ok || !r.data.ok) { errEl.textContent = (r.data && r.data.message) || "Access denied"; errEl.classList.remove("hidden"); return; }
    if (r.data.status === "authenticated") {
      showAccessGranted();
      setTimeout(() => enterApp(r.data.user, r.data.mode), 1200);
    }
  }

  // ============ Enter App ============
  function enterApp(user, mode) {
    currentUser = user;
    showView("app-view");
    $("#user-display").textContent = user.display_name;
    $("#dash-name").textContent = user.display_name;
    buildNav(user.role);
    buildDashboard(user);
    loadPortalData();
    showPage("dashboard");
  }

  // ============ Nav ============
  function buildNav(role) {
    const perms = {
      student: ["dashboard", "records", "assignments", "quizzes", "exams", "results", "progress"],
      teacher: ["dashboard", "records", "assignments", "quizzes", "exams", "results", "students", "logs"],
      admin:   ["dashboard", "records", "assignments", "quizzes", "exams", "results", "admin", "students", "logs"],
    }[role] || [];
    const labels = {
      dashboard: "Dashboard", records: "Records", assignments: "Assignments",
      quizzes: "Quizzes", exams: "Exams", results: "Results", progress: "My Progress",
      admin: "Admin", students: "Students", logs: "Monitoring",
    };
    const nav = $("#main-nav"); nav.innerHTML = "";
    perms.forEach((id) => {
      const b = document.createElement("button");
      b.className = "nav-link" + (id === "dashboard" ? " active" : "");
      b.dataset.page = id;
      b.textContent = labels[id];
      b.addEventListener("click", () => {
        if (id === "logs") loadLogs();
        if (id === "admin") loadAdminPanel();
        if (id === "students") loadTeacherStudents();
        if (id === "assignments") loadAssignmentsPage();
        if (id === "quizzes") loadQuizzesPage();
        if (id === "exams") loadExamsPage();
        if (id === "progress") loadProgress();
        showPage(id);
      });
      nav.appendChild(b);
    });
    const isStaff = role === "admin" || role === "teacher";
    const t1 = $("#assignments-admin-toolbar"); if (t1) t1.classList.toggle("hidden", !isStaff);
    const t2 = $("#quizzes-admin-toolbar"); if (t2) t2.classList.toggle("hidden", !isStaff);
    const t3 = $("#exams-admin-toolbar"); if (t3) t3.classList.toggle("hidden", !isStaff);
    const s1 = $("#assignments-subtitle"); if (s1) s1.textContent = role === "student" ? "Your assigned tasks." : "Create and manage assignments.";
    const s2 = $("#quizzes-subtitle"); if (s2) s2.textContent = role === "student" ? "Attempt assigned quizzes." : "Create and manage quizzes.";
    const s3 = $("#exams-subtitle"); if (s3) s3.textContent = role === "student" ? "Your upcoming and past exams." : "Create and manage exams.";
  }

  // ============ Dashboard ============
  function buildDashboard(user) {
    $("#dash-cards").innerHTML = `
      <div class="card"><h3>Role</h3><p class="stat">${escapeHtml(user.role)}</p></div>
      <div class="card"><h3>Email</h3><p>${escapeHtml(user.email || "—")}</p></div>
      <div class="card"><h3>Mobile</h3><p>${escapeHtml(user.mobile || "—")}</p></div>
    `;
    const rows = [];
    rows.push(["Username", user.username]);
    rows.push(["Full Name", user.display_name]);
    rows.push(["Role", capitalize(user.role)]);
    if (user.class_name) rows.push(["Class", user.class_name]);
    if (user.email) rows.push(["Email", user.email]);
    if (user.mobile) rows.push(["Mobile", user.mobile]);
    const profile = user.profile || {};
    PROFILE_FIELDS.forEach(({ key, label }) => {
      const val = profile[key];
      if (val !== undefined && val !== null && String(val).trim() !== "") rows.push([label, val]);
    });
    $("#session-info").innerHTML = rows.map(([k, v]) =>
      `<li><strong>${escapeHtml(k)}</strong> ${escapeHtml(String(v))}</li>`).join("");
  }
  function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""; }

  // ============ Portal Data ============
  async function loadPortalData() {
    const [rec, res] = await Promise.all([AuthClient.records(), AuthClient.results()]);
    if (rec.ok && rec.data.ok) {
      $("#records-table tbody").innerHTML = rec.data.data.map((r) =>
        `<tr><td>${escapeHtml(r.id)}</td><td>${escapeHtml(r.name)}</td><td>${escapeHtml(r.class)}</td><td>${escapeHtml(r.attendance)}</td><td>${escapeHtml(r.status)}</td></tr>`).join("");
    }
    if (res.ok && res.data.ok) {
      $("#results-table tbody").innerHTML = res.data.data.map((r) =>
        `<tr><td>${escapeHtml(r.student)}</td><td>${escapeHtml(r.subject)}</td><td>${escapeHtml(String(r.score))}</td><td>${escapeHtml(String(r.total))}</td><td>${escapeHtml(r.grade)}</td></tr>`).join("");
    }
  }

  // ============ Assignments ============
  async function loadAssignmentsPage() {
    if (currentUser.role === "student") return loadStudentAssignments();
    return loadAdminAssignments();
  }

  async function loadStudentAssignments() {
    const r = await AuthClient.assignments();
    const wrap = $("#assignments-list");
    if (!r.ok || !r.data.ok) { wrap.innerHTML = `<p class="empty-msg">Access denied.</p>`; return; }
    if (!r.data.data.length) { wrap.innerHTML = `<p class="empty-msg">No assignments assigned to you.</p>`; return; }

    wrap.innerHTML = r.data.data.map((a) => {
      const submitted = a.my_submission != null;
      const expired = a.expired;
      let btn;
      if (submitted) {
        const marks = a.my_submission.marks_awarded;
        const marksHtml = marks !== null && marks !== undefined
          ? `<span class="assignment-marks-earned">${marks}/${a.total_marks}</span>` : `<span class="assignment-marks-pending">Pending grade</span>`;
        btn = `<div class="assignment-status submitted">✓ Submitted</div>${marksHtml}`;
      } else if (expired) {
        btn = `<div class="assignment-status expired">Deadline passed</div>`;
      } else {
        btn = `<button class="btn-primary assignment-btn" data-submit="${a.id}">Submit Assignment</button>`;
      }
      const deadlineTxt = a.deadline ? new Date(a.deadline).toLocaleString() : "No deadline";
      return `
        <div class="card assignment-card ${expired && !submitted ? 'expired' : ''}">
          <h3>${escapeHtml(a.title)}</h3>
          <p>${escapeHtml(a.description || "")}</p>
          <p class="assignment-meta">📅 Due: ${escapeHtml(deadlineTxt)} · 📝 ${a.total_marks} marks</p>
          ${btn}
        </div>`;
    }).join("");

    $$("#assignments-list [data-submit]").forEach((b) => {
      b.addEventListener("click", () => openAssignmentSubmit(b.dataset.submit));
    });
  }

  function openAssignmentSubmit(id) {
    $("#asub-id").value = id;
    $("#asub-content").value = "";
    $("#asub-msg").classList.add("hidden");
    openModal("assignment-submit-modal");
  }

  async function handleAssignmentSubmit(e) {
    e.preventDefault();
    const id = $("#asub-id").value;
    const content = $("#asub-content").value;
    const msgEl = $("#asub-msg");
    msgEl.classList.add("hidden");
    const r = await AuthClient.submitAssignment(id, { content });
    if (!r.ok || !r.data.ok) {
      msgEl.textContent = (r.data && r.data.message) || "Submission failed";
      msgEl.classList.remove("hidden");
      return;
    }
    toast("Assignment submitted!", "success");
    $("#assignment-submit-modal").classList.add("hidden");
    loadStudentAssignments();
  }

  async function loadAdminAssignments() {
    const r = await AuthClient.adminListAssignments();
    const wrap = $("#assignments-list");
    if (!r.ok || !r.data.ok) { wrap.innerHTML = `<p class="empty-msg">Access denied.</p>`; return; }
    if (!r.data.data.length) { wrap.innerHTML = `<p class="empty-msg">No assignments yet. Create one!</p>`; return; }

    wrap.innerHTML = r.data.data.map((a) => {
      const deadlineTxt = a.deadline ? new Date(a.deadline).toLocaleString() : "—";
      const assignedCount = a.assigned_to.length;
      return `
        <div class="card assignment-card">
          <h3>${escapeHtml(a.title)}</h3>
          <p>${escapeHtml(a.description || "")}</p>
          <p class="assignment-meta">📅 ${escapeHtml(deadlineTxt)} · 📝 ${a.total_marks} marks</p>
          <p class="assignment-meta">👥 Assigned: ${assignedCount} student(s) · ✅ Submissions: ${a.submission_count}</p>
          <div class="card-actions">
            <button class="mini-btn" data-view-subs="${a.id}">View Submissions</button>
            <button class="mini-btn danger" data-del-assign="${a.id}">Delete</button>
          </div>
        </div>`;
    }).join("");

    $$("#assignments-list [data-view-subs]").forEach((b) =>
      b.addEventListener("click", () => viewAssignmentSubmissions(b.dataset.viewSubs)));
    $$("#assignments-list [data-del-assign]").forEach((b) =>
      b.addEventListener("click", async () => {
        if (!confirm("Delete this assignment?")) return;
        const r = await AuthClient.adminDeleteAssignment(b.dataset.delAssign);
        if (r.ok && r.data.ok) { toast("Deleted", "success"); loadAdminAssignments(); }
      }));
  }

  async function viewAssignmentSubmissions(aid) {
    const r = await AuthClient.adminAssignmentSubmissions(aid);
    if (!r.ok || !r.data.ok) { toast("Failed to load", "error"); return; }
    if (!r.data.data.length) { toast("No submissions yet", "info"); return; }
    const lines = r.data.data.map((s) => {
      const marks = s.marks_awarded != null ? s.marks_awarded : "-";
      return `${s.student_name} (${s.student}) · ${marks}/${r.data.total_marks}${s.content ? " · " + s.content.substring(0, 40) : ""}`;
    });
    const input = prompt(
      "Submissions:\n\n" + lines.join("\n") + "\n\nTo grade, enter: studentUsername,marks",
      ""
    );
    if (!input) return;
    const [uname, marksStr] = input.split(",");
    if (!uname || !marksStr) return;
    const sub = r.data.data.find((s) => s.student === uname.trim());
    if (!sub) { toast("Student not found", "error"); return; }
    const gr = await AuthClient.adminGradeSubmission(sub.id, { marks_awarded: parseInt(marksStr) });
    if (gr.ok && gr.data.ok) { toast("Graded", "success"); }
  }

  // ============ Create Assignment Modal ============
  function openCreateAssignmentModal() {
    $("#as-id").value = "";
    $("#as-title").value = "";
    $("#as-desc").value = "";
    $("#as-marks").value = 10;
    $("#as-deadline").value = "";
    $("#assignment-modal-title").textContent = "New Assignment";
    $("#assignment-msg").classList.add("hidden");
    populateStudentCheckboxes("#as-students-list");
    openModal("assignment-modal");
  }

  function populateStudentCheckboxes(selector, checked = []) {
    const wrap = $(selector);
    if (!wrap) return;
    if (!allStudentsCache.length) {
      wrap.innerHTML = `<p class="hint">Loading students…</p>`;
      AuthClient.teacherListStudents().then((r) => {
        if (r.ok && r.data.ok) {
          allStudentsCache = r.data.data;
          populateStudentCheckboxes(selector, checked);
        } else {
          wrap.innerHTML = `<p class="hint">Unable to load students. Please refresh and try again.</p>`;
        }
      });
      return;
    }
    wrap.innerHTML = allStudentsCache.map((s) => `
      <label class="student-checkbox-item">
        <input type="checkbox" value="${escapeHtml(s.username)}" ${checked.includes(s.username) ? "checked" : ""} />
        <span>${escapeHtml(s.display_name)} <em>(${escapeHtml(s.username)} · ${escapeHtml(s.class_name || "—")})</em></span>
      </label>`).join("");
  }

  function getCheckedStudents(selector) {
    return Array.from($$(selector + " input:checked")).map((i) => i.value);
  }

  async function handleCreateAssignment(e) {
    e.preventDefault();
    const msgEl = $("#assignment-msg"); msgEl.classList.add("hidden");
    const title = $("#as-title").value.trim();
    const desc = $("#as-desc").value.trim();
    const marks = parseInt($("#as-marks").value) || 10;
    const deadline = $("#as-deadline").value;
    const students = getCheckedStudents("#as-students-list");
    if (!title) { msgEl.textContent = "Title required"; msgEl.classList.remove("hidden"); return; }
    if (!deadline) { msgEl.textContent = "Deadline required"; msgEl.classList.remove("hidden"); return; }
    if (!students.length) { msgEl.textContent = "Select at least one student"; msgEl.classList.remove("hidden"); return; }

    const deadlineISO = new Date(deadline).toISOString();
    const r = await AuthClient.adminCreateAssignment({
      title, description: desc, total_marks: marks,
      deadline: deadlineISO, due_date: deadline.split("T")[0],
      assigned_to: students, status: "Open", target_class: "Custom",
    });
    if (!r.ok || !r.data.ok) {
      msgEl.textContent = (r.data && r.data.message) || "Failed";
      msgEl.classList.remove("hidden"); return;
    }
    toast("Assignment created", "success");
    $("#assignment-modal").classList.add("hidden");
    loadAdminAssignments();
  }

  // ============ Quizzes ============
  async function loadQuizzesPage() {
    if (currentUser.role === "student") return loadStudentQuizzes();
    return loadAdminQuizzes();
  }

  async function loadStudentQuizzes() {
    const r = await AuthClient.studentQuizzes();
    const wrap = $("#quizzes-list");
    if (!r.ok || !r.data.ok) { wrap.innerHTML = `<p class="empty-msg">Access denied.</p>`; return; }
    if (!r.data.data.length) { wrap.innerHTML = `<p class="empty-msg">No quizzes assigned.</p>`; return; }

    wrap.innerHTML = r.data.data.map((q) => {
      const sub = q.my_submission;
      let action;
      if (sub && sub.finalized) {
        action = `<div class="quiz-done">✓ Completed · Score: ${sub.score}/${sub.total}</div>`;
      } else {
        action = `<button class="btn-primary" data-quiz-attempt="${q.id}">Attempt Quiz</button>`;
      }
      return `
        <div class="card quiz-card">
          <h3>${escapeHtml(q.title)}</h3>
          <p>${escapeHtml(q.description || "")}</p>
          <p class="quiz-meta">📝 ${q.question_count} questions · ⏱ ${q.duration_minutes} min · ${q.total_marks} marks</p>
          ${action}
        </div>`;
    }).join("");

    $$("#quizzes-list [data-quiz-attempt]").forEach((b) =>
      b.addEventListener("click", () => startQuizAttempt(b.dataset.quizAttempt)));
  }

  async function startQuizAttempt(qid) {
    const r = await AuthClient.getQuizForAttempt(qid);
    if (!r.ok || !r.data.ok) { toast((r.data && r.data.message) || "Cannot start quiz", "error"); return; }
    const quiz = r.data.data;
    quizAttempt = { quiz, answers: {}, timer: null, secondsLeft: quiz.duration_minutes * 60 };

    $("#quiz-attempt-title").textContent = quiz.title;
    $("#quiz-attempt-questions").innerHTML = quiz.questions.map((q, i) => `
      <div class="quiz-q-block" data-qid="${q.id}">
        <div class="quiz-q-head"><strong>Q${i + 1}.</strong> ${escapeHtml(q.text)} <em>(${q.marks} marks)</em></div>
        <div class="quiz-options">
          ${["A","B","C","D"].map((letter) => {
            const optKey = "option_" + letter.toLowerCase();
            if (!q[optKey]) return "";
            return `<label class="quiz-option">
              <input type="radio" name="q-${q.id}" value="${letter}" />
              <span><strong>${letter}.</strong> ${escapeHtml(q[optKey])}</span>
            </label>`;
          }).join("")}
        </div>
      </div>`).join("");

    $$("#quiz-attempt-questions input[type=radio]").forEach((inp) => {
      inp.addEventListener("change", (e) => {
        const qid = e.target.name.replace("q-", "");
        quizAttempt.answers[qid] = e.target.value;
      });
    });

    $("#quiz-review-body").classList.add("hidden");
    $("#quiz-result-body").classList.add("hidden");
    $("#quiz-attempt-body").classList.remove("hidden");

    startQuizTimer();
    openModal("quiz-attempt-modal");
  }

  function startQuizTimer() {
    if (quizAttempt.timer) clearInterval(quizAttempt.timer);
    const tick = () => {
      const m = Math.floor(quizAttempt.secondsLeft / 60);
      const s = quizAttempt.secondsLeft % 60;
      const el = $("#quiz-attempt-timer");
      if (el) el.textContent = `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
      if (quizAttempt.secondsLeft <= 0) {
        clearInterval(quizAttempt.timer);
        toast("Time's up! Auto-submitting…", "error");
        handleQuizSubmit();
        return;
      }
      quizAttempt.secondsLeft--;
    };
    tick();
    quizAttempt.timer = setInterval(tick, 1000);
  }

  function handleQuizSubmit() {
    if (quizAttempt.timer) clearInterval(quizAttempt.timer);
    const review = quizAttempt.quiz.questions.map((q, i) => {
      const ans = quizAttempt.answers[String(q.id)] || "—";
      return `<div class="quiz-review-item">
        <div class="quiz-review-q"><strong>Q${i+1}.</strong> ${escapeHtml(q.text)}</div>
        <div class="quiz-review-a">Your answer: <strong>${ans}</strong></div>
      </div>`;
    }).join("");

    $("#quiz-review-list").innerHTML = review;
    $("#quiz-attempt-body").classList.add("hidden");
    $("#quiz-result-body").classList.add("hidden");
    $("#quiz-review-body").classList.remove("hidden");
  }

  async function finalizeQuiz() {
    const r = await AuthClient.submitQuiz(quizAttempt.quiz.id, {
      answers: quizAttempt.answers, finalize: true,
    });
    if (!r.ok || !r.data.ok) { toast((r.data && r.data.message) || "Submit failed", "error"); return; }

    const { score, total, detail } = r.data;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;

    $("#quiz-result-hero").innerHTML = `
      <div class="quiz-score-circle ${pct >= 40 ? 'pass' : 'fail'}">
        <div class="quiz-score-num">${score}/${total}</div>
        <div class="quiz-score-pct">${pct}%</div>
        <div class="quiz-score-label">${pct >= 40 ? 'PASS' : 'FAIL'}</div>
      </div>
      <p>You cannot attempt this quiz again.</p>
    `;
    $("#quiz-result-detail").innerHTML = detail.map((d, i) => `
      <div class="quiz-result-row ${d.is_correct ? 'correct' : 'wrong'}">
        <div><strong>Q${i+1}.</strong> ${escapeHtml(d.question)}</div>
        <div class="quiz-result-ans">
          Your answer: <strong>${escapeHtml(d.your_answer || "—")}</strong> ${d.is_correct ? "✓" : "✗"}
          ${!d.is_correct ? `· Correct: <strong>${escapeHtml(d.correct_answer)}</strong>` : ""}
        </div>
      </div>`).join("");

    $("#quiz-review-body").classList.add("hidden");
    $("#quiz-attempt-body").classList.add("hidden");
    $("#quiz-result-body").classList.remove("hidden");
  }

  async function loadAdminQuizzes() {
    const r = await AuthClient.adminListQuizzes();
    const wrap = $("#quizzes-list");
    if (!r.ok || !r.data.ok) { wrap.innerHTML = `<p class="empty-msg">Access denied.</p>`; return; }
    if (!r.data.data.length) { wrap.innerHTML = `<p class="empty-msg">No quizzes yet. Create one!</p>`; return; }

    wrap.innerHTML = r.data.data.map((q) => `
      <div class="card quiz-card">
        <h3>${escapeHtml(q.title)}</h3>
        <p>${escapeHtml(q.description || "")}</p>
        <p class="quiz-meta">📝 ${q.question_count} questions · ⏱ ${q.duration_minutes} min · ${q.total_marks} marks</p>
        <p class="quiz-meta">👥 Assigned: ${q.assigned_to.length}</p>
        <div class="card-actions">
          <button class="mini-btn" data-view-quiz-subs="${q.id}">View Results</button>
          <button class="mini-btn danger" data-del-quiz="${q.id}">Delete</button>
        </div>
      </div>`).join("");

    $$("#quizzes-list [data-del-quiz]").forEach((b) =>
      b.addEventListener("click", async () => {
        if (!confirm("Delete this quiz?")) return;
        const r = await AuthClient.adminDeleteQuiz(b.dataset.delQuiz);
        if (r.ok && r.data.ok) { toast("Deleted", "success"); loadAdminQuizzes(); }
      }));
    $$("#quizzes-list [data-view-quiz-subs]").forEach((b) =>
      b.addEventListener("click", () => viewQuizSubs(b.dataset.viewQuizSubs)));
  }

  async function viewQuizSubs(qid) {
    const r = await AuthClient.adminQuizSubmissions(qid);
    if (!r.ok || !r.data.ok) { toast("Failed", "error"); return; }
    if (!r.data.data.length) { toast("No submissions yet", "info"); return; }
    const lines = r.data.data.map((s) => `${s.student_name} (${s.student}) — ${s.score}/${s.total}`);
    alert("Submissions:\n\n" + lines.join("\n"));
  }

  // ---- Create Quiz Modal ----
  let quizQuestionCount = 0;

  function openCreateQuizModal() {
    $("#q-id").value = "";
    $("#q-title").value = "";
    $("#q-desc").value = "";
    $("#q-duration").value = 15;
    $("#quiz-questions-wrap").innerHTML = "";
    quizQuestionCount = 0;
    addQuizQuestion();
    $("#quiz-msg").classList.add("hidden");
    populateStudentCheckboxes("#q-students-list");
    openModal("quiz-modal");
  }

  function addQuizQuestion() {
    const idx = quizQuestionCount++;
    const html = `
      <div class="quiz-question-block" data-idx="${idx}">
        <div class="quiz-question-head">
          <strong>Question ${idx + 1}</strong>
          <button type="button" class="mini-btn danger" data-remove-q="${idx}">Remove</button>
        </div>
        <div class="form-group">
          <input type="text" class="qq-text" placeholder="Enter question text" />
        </div>
        <div class="form-row">
          <div class="form-group"><input type="text" class="qq-a" placeholder="Option A" /></div>
          <div class="form-group"><input type="text" class="qq-b" placeholder="Option B" /></div>
        </div>
        <div class="form-row">
          <div class="form-group"><input type="text" class="qq-c" placeholder="Option C (optional)" /></div>
          <div class="form-group"><input type="text" class="qq-d" placeholder="Option D (optional)" /></div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Correct Option</label>
            <select class="qq-correct">
              <option value="A">A</option><option value="B">B</option>
              <option value="C">C</option><option value="D">D</option>
            </select>
          </div>
          <div class="form-group">
            <label>Marks</label>
            <input type="number" class="qq-marks" value="1" min="1" />
          </div>
        </div>
      </div>`;
    const wrap = $("#quiz-questions-wrap");
    wrap.insertAdjacentHTML("beforeend", html);
    const rmBtn = wrap.querySelector(`[data-idx="${idx}"] [data-remove-q]`);
    if (rmBtn) rmBtn.addEventListener("click", () => {
      const blk = wrap.querySelector(`[data-idx="${idx}"]`);
      if (blk) blk.remove();
    });
  }

  async function handleCreateQuiz(e) {
    e.preventDefault();
    const msgEl = $("#quiz-msg"); msgEl.classList.add("hidden");
    const title = $("#q-title").value.trim();
    const desc = $("#q-desc").value.trim();
    const duration = parseInt($("#q-duration").value) || 15;
    if (!title) { msgEl.textContent = "Title required"; msgEl.classList.remove("hidden"); return; }

    const blocks = $$("#quiz-questions-wrap .quiz-question-block");
    const questions = [];
    for (const b of blocks) {
      const text = b.querySelector(".qq-text").value.trim();
      const a = b.querySelector(".qq-a").value.trim();
      const bb = b.querySelector(".qq-b").value.trim();
      const c = b.querySelector(".qq-c").value.trim();
      const d = b.querySelector(".qq-d").value.trim();
      const correct = b.querySelector(".qq-correct").value;
      const marks = parseInt(b.querySelector(".qq-marks").value) || 1;
      if (!text || !a || !bb) continue;
      questions.push({
        text, option_a: a, option_b: bb, option_c: c || null, option_d: d || null,
        correct, marks,
      });
    }
    if (!questions.length) { msgEl.textContent = "At least one complete question required"; msgEl.classList.remove("hidden"); return; }

    const students = getCheckedStudents("#q-students-list");
    if (!students.length) { msgEl.textContent = "Select students"; msgEl.classList.remove("hidden"); return; }

    const total = questions.reduce((s, q) => s + q.marks, 0);
    const r = await AuthClient.adminCreateQuiz({
      title, description: desc, duration_minutes: duration,
      total_marks: total, questions, assigned_to: students, is_published: true,
    });
    if (!r.ok || !r.data.ok) { msgEl.textContent = (r.data && r.data.message) || "Failed"; msgEl.classList.remove("hidden"); return; }
    toast("Quiz created", "success");
    $("#quiz-modal").classList.add("hidden");
    loadAdminQuizzes();
  }

  // ============ Exams ============
  async function loadExamsPage() {
    const r = await AuthClient.adminListExams();
    const wrap = $("#exams-list");
    const isStudent = currentUser.role === "student";
    if (!r.ok || !r.data.ok) { wrap.innerHTML = `<p class="empty-msg">Access denied.</p>`; return; }
    if (!r.data.data.length) { wrap.innerHTML = `<p class="empty-msg">No exams scheduled.</p>`; return; }

    wrap.innerHTML = r.data.data.map((e) => `
      <div class="card exam-card">
        <h3>${escapeHtml(e.title)}</h3>
        <p class="exam-meta">📚 ${escapeHtml(e.exam_type)} · 📝 ${e.total_marks} marks · ⏱ ${e.duration_minutes} min</p>
        ${e.exam_date ? `<p class="exam-meta">📅 ${escapeHtml(e.exam_date)}</p>` : ""}
        ${!isStudent ? `<p class="exam-meta">👥 Assigned: ${e.assigned_to.length}</p>` : ""}
        ${!isStudent ? `
          <div class="card-actions">
            <button class="mini-btn" data-view-exam-res="${e.id}">View Results</button>
            <button class="mini-btn danger" data-del-exam="${e.id}">Delete</button>
          </div>` : ""}
      </div>`).join("");

    if (!isStudent) {
      $$("#exams-list [data-del-exam]").forEach((b) =>
        b.addEventListener("click", async () => {
          if (!confirm("Delete this exam?")) return;
          const r = await AuthClient.adminDeleteExam(b.dataset.delExam);
          if (r.ok && r.data.ok) { toast("Deleted", "success"); loadExamsPage(); }
        }));
      $$("#exams-list [data-view-exam-res]").forEach((b) =>
        b.addEventListener("click", () => viewExamResults(b.dataset.viewExamRes)));
    }
  }

  async function viewExamResults(eid) {
    const r = await AuthClient.adminExamResults(eid);
    if (!r.ok || !r.data.ok) { toast("Failed", "error"); return; }
    if (!r.data.data.length) { toast("No results recorded yet", "info"); return; }
    const lines = r.data.data.map((x) => `${x.student_name} (${x.student}) — ${x.marks_obtained} · ${x.grade}`);
    alert("Exam Results:\n\n" + lines.join("\n"));
  }

  function openCreateExamModal() {
    $("#ex-title").value = "";
    $("#ex-type").value = "midterm";
    $("#ex-marks").value = 100;
    $("#ex-date").value = "";
    $("#ex-duration").value = 60;
    $("#exam-msg").classList.add("hidden");
    populateStudentCheckboxes("#ex-students-list");
    openModal("exam-modal");
  }

  async function handleCreateExam(e) {
    e.preventDefault();
    const msgEl = $("#exam-msg"); msgEl.classList.add("hidden");
    const title = $("#ex-title").value.trim();
    if (!title) { msgEl.textContent = "Title required"; msgEl.classList.remove("hidden"); return; }
    const students = getCheckedStudents("#ex-students-list");
    if (!students.length) { msgEl.textContent = "Select students"; msgEl.classList.remove("hidden"); return; }
    const r = await AuthClient.adminCreateExam({
      title,
      exam_type: $("#ex-type").value,
      total_marks: parseInt($("#ex-marks").value) || 100,
      exam_date: $("#ex-date").value,
      duration_minutes: parseInt($("#ex-duration").value) || 60,
      assigned_to: students,
    });
    if (!r.ok || !r.data.ok) { msgEl.textContent = (r.data && r.data.message) || "Failed"; msgEl.classList.remove("hidden"); return; }
    toast("Exam created", "success");
    $("#exam-modal").classList.add("hidden");
    loadExamsPage();
  }

  // ============ Progress ============
  async function loadProgress() {
    const r = await AuthClient.progress();
    if (!r.ok || !r.data.ok) { toast("Failed to load progress", "error"); return; }
    const d = r.data.data;
    const pct = d.total_possible > 0 ? Math.round((d.total_earned / d.total_possible) * 100) : 0;
    const color = pct >= 70 ? "good" : pct >= 40 ? "ok" : "bad";

    $("#progress-summary").innerHTML = `
      <div class="progress-hero ${color}">
        <div class="progress-score-big">${d.total_earned}<span>/${d.total_possible}</span></div>
        <div class="progress-pct">${pct}% Overall</div>
        <div class="progress-bar-wrap">
          <div class="progress-bar" style="width:${pct}%"></div>
        </div>
        <p class="progress-note">Total marks across assignments, quizzes and exams</p>
      </div>`;

    const card = (title, icon, x, extra="") => `
      <div class="progress-card">
        <h4>${icon} ${title}</h4>
        <div class="progress-num">${x.earned}<span>/${x.possible}</span></div>
        <div class="progress-lines">
          <div><span>Total:</span> ${x.total}</div>
          <div><span>Attended:</span> ${x.attended}</div>
          <div><span>Pending:</span> ${x.total - x.attended}</div>
          ${extra}
        </div>
      </div>`;

    $("#progress-breakdown").innerHTML =
      card("Assignments", "📝", d.assignments) +
      card("Quizzes", "❓", d.quizzes, `<div><span>Pass:</span> ${d.quizzes.pass} · <span>Fail:</span> ${d.quizzes.fail}</div>`) +
      card("Exams", "📚", d.exams, `<div><span>Pass:</span> ${d.exams.pass} · <span>Fail:</span> ${d.exams.fail}</div>`);
  }

  // ============ Profile ============
  async function loadProfile() {
    const r = await AuthClient.getProfile();
    if (!r.ok || !r.data.ok) { toast("Unable to load profile", "error"); return; }
    const u = r.data.user;
    $("#pf-username").value = u.username || "";
    $("#pf-display-name").value = u.display_name || "";
    $("#pf-email").value = u.email || "";
    $("#pf-mobile").value = u.mobile || "";
    $("#pf-password").value = "";
    $("#profile-msg").classList.add("hidden");
  }

  async function handleProfileSubmit(e) {
    e.preventDefault();
    const msgEl = $("#profile-msg"); msgEl.classList.add("hidden");
    const payload = {
      username: $("#pf-username").value.trim(),
      display_name: $("#pf-display-name").value.trim(),
      email: $("#pf-email").value.trim(),
      mobile: $("#pf-mobile").value.trim(),
    };
    const pw = $("#pf-password").value;
    if (pw) payload.password = pw;
    const r = await AuthClient.updateProfile(payload);
    if (!r.ok || !r.data.ok) { msgEl.textContent = (r.data && r.data.message) || "Update failed"; msgEl.classList.remove("hidden"); return; }
    currentUser = r.data.user;
    $("#user-display").textContent = currentUser.display_name;
    $("#dash-name").textContent = currentUser.display_name;
    buildDashboard(currentUser);
    toast("Profile updated", "success");
    $("#pf-password").value = "";
  }

  // ============ Logs ============
  async function loadLogs() {
    const r = await AuthClient.adminLogs();
    const tb = $("#logs-table tbody");
    if (!r.ok || !r.data.ok) { tb.innerHTML = `<tr><td colspan="8" style="text-align:center">Access denied</td></tr>`; return; }
    if (!r.data.data.length) { tb.innerHTML = `<tr><td colspan="8" style="text-align:center">No events</td></tr>`; return; }
    tb.innerHTML = r.data.data.map((l) => {
      const cls = l.result === "SUCCESS" ? "log-success" : (l.result === "FAIL" || l.result === "LOCKED") ? "log-fail" : "log-info";
      return `<tr>
        <td>${new Date(l.time).toLocaleString()}</td>
        <td>${escapeHtml(l.user)}</td><td>${escapeHtml(l.role)}</td><td>${escapeHtml(l.action)}</td>
        <td>${escapeHtml(l.factor)}</td>
        <td><span class="ip-cell">${escapeHtml(l.ip || "—")}</span></td>
        <td><span class="log-result ${cls}">${escapeHtml(l.result)}</span></td>
        <td>${escapeHtml(l.details)}</td>
      </tr>`;
    }).join("");
  }

  // ============ Admin Panel ============
  function setupAdminTabs() {
    $$(".admin-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        $$(".admin-tab").forEach((t) => t.classList.remove("active"));
        $$(".admin-tab-content").forEach((c) => c.classList.remove("active"));
        tab.classList.add("active");
        const target = $(`#admin-tab-${tab.dataset.tab}`);
        if (target) target.classList.add("active");
        if (tab.dataset.tab === "assignments") loadAdminAssignmentsTable();
        if (tab.dataset.tab === "quizzes") loadAdminQuizzesTable();
        if (tab.dataset.tab === "exams") loadAdminExamsTable();
      });
    });
  }

  async function loadAdminPanel() {
    await Promise.all([loadAdminStats(), loadUsers(), loadSessions()]);
  }

  async function loadAdminStats() {
    const r = await AuthClient.adminOverview();
    if (!r.ok || !r.data.ok) return;
    const d = r.data.data;
    $("#admin-stats").innerHTML = `
      <div class="card"><h3>Total Users</h3><p class="stat">${d.total_users}</p></div>
      <div class="card"><h3>Students</h3><p class="stat">${d.students}</p></div>
      <div class="card"><h3>Teachers</h3><p class="stat">${d.teachers}</p></div>
      <div class="card"><h3>Assignments</h3><p class="stat">${d.total_assignments}</p></div>
      <div class="card"><h3>Quizzes</h3><p class="stat">${d.total_quizzes}</p></div>
      <div class="card"><h3>Exams</h3><p class="stat">${d.total_exams}</p></div>
      <div class="card"><h3>Active Sessions</h3><p class="stat">${d.active_sessions}</p></div>
      <div class="card"><h3>System</h3><p>🟢 Operational</p></div>`;
  }

  async function loadUsers() {
    const r = await AuthClient.adminListUsers();
    const tb = $("#users-table tbody");
    if (!r.ok || !r.data.ok) { tb.innerHTML = `<tr><td colspan="7">Access denied</td></tr>`; return; }
    tb.innerHTML = r.data.data.map((u) => `
      <tr>
        <td>${escapeHtml(u.username)}</td><td>${escapeHtml(u.display_name)}</td>
        <td>${escapeHtml(u.role)}</td><td>${escapeHtml(u.class_name || "—")}</td>
        <td>${escapeHtml(u.email)}</td>
        <td>${u.last_login ? new Date(u.last_login).toLocaleString() : "—"}</td>
        <td class="action-cell">
          <button class="mini-btn" data-act="edit" data-id="${u.id}">Edit</button>
          <button class="mini-btn danger" data-act="logout" data-id="${u.id}">Force Logout</button>
          <button class="mini-btn danger" data-act="delete" data-id="${u.id}">Delete</button>
        </td>
      </tr>`).join("");
    window.__usersCache = {}; r.data.data.forEach((u) => { window.__usersCache[u.id] = u; });
    tb.querySelectorAll(".mini-btn").forEach((b) => {
      b.addEventListener("click", async () => {
        const id = b.dataset.id, act = b.dataset.act;
        if (act === "delete") {
          if (!confirm("Delete this user?")) return;
          const res = await AuthClient.adminDeleteUser(id);
          if (res.ok && res.data.ok) { toast("Deleted", "success"); loadUsers(); loadAdminStats(); }
        } else if (act === "logout") {
          const res = await AuthClient.adminForceLogout(id);
          if (res.ok && res.data.ok) { toast("Force logged out", "success"); loadSessions(); }
        } else if (act === "edit") {
          openUserEditModal(window.__usersCache[id], "admin");
        }
      });
    });
  }

  async function loadSessions() {
    const r = await AuthClient.adminSessions();
    const tb = $("#sessions-table tbody");
    if (!r.ok || !r.data.ok) { tb.innerHTML = `<tr><td colspan="8">Access denied</td></tr>`; stopSessionTicker(); return; }
    if (!r.data.data.length) { tb.innerHTML = `<tr><td colspan="8" style="text-align:center">No active sessions</td></tr>`; stopSessionTicker(); return; }
    tb.innerHTML = r.data.data.map((s) => `
      <tr>
        <td>${escapeHtml(s.user)}</td><td>${escapeHtml(s.role)}</td>
        <td><span class="ip-cell">${escapeHtml(s.ip)}</span></td>
        <td>${escapeHtml(s.mode || "—")}</td>
        <td>${new Date(s.login_time).toLocaleString()}</td>
        <td>${new Date(s.last_seen).toLocaleString()}</td>
        <td><span class="duration-live" data-login="${escapeHtml(s.login_time)}">${escapeHtml(s.duration)}</span></td>
        <td><button class="mini-btn danger" data-session="${escapeHtml(s.session_id)}">Kill</button></td>
      </tr>`).join("");
    tb.querySelectorAll(".mini-btn").forEach((b) => {
      b.addEventListener("click", async () => {
        const res = await AuthClient.adminKillSession(b.dataset.session);
        if (res.ok && res.data.ok) { toast("Killed", "success"); loadSessions(); }
      });
    });
    startSessionTicker();
  }

  async function loadAdminAssignmentsTable() {
    const r = await AuthClient.adminListAssignments();
    const tb = $("#admin-assignments-table tbody");
    if (!r.ok || !r.data.ok) { tb.innerHTML = `<tr><td colspan="6">Access denied</td></tr>`; return; }
    if (!r.data.data.length) { tb.innerHTML = `<tr><td colspan="6" style="text-align:center">No assignments</td></tr>`; return; }
    tb.innerHTML = r.data.data.map((a) => `
      <tr>
        <td>${escapeHtml(a.title)}</td>
        <td>${a.total_marks}</td>
        <td>${a.deadline ? new Date(a.deadline).toLocaleString() : "—"}</td>
        <td>${a.assigned_to.length}</td>
        <td>${a.submission_count}</td>
        <td class="action-cell">
          <button class="mini-btn danger" data-del="${a.id}">Delete</button>
        </td>
      </tr>`).join("");
    tb.querySelectorAll("[data-del]").forEach((b) => {
      b.addEventListener("click", async () => {
        if (!confirm("Delete?")) return;
        const res = await AuthClient.adminDeleteAssignment(b.dataset.del);
        if (res.ok && res.data.ok) { toast("Deleted", "success"); loadAdminAssignmentsTable(); }
      });
    });
  }

  async function loadAdminQuizzesTable() {
    const r = await AuthClient.adminListQuizzes();
    const tb = $("#admin-quizzes-table tbody");
    if (!r.ok || !r.data.ok) { tb.innerHTML = `<tr><td colspan="5">Access denied</td></tr>`; return; }
    if (!r.data.data.length) { tb.innerHTML = `<tr><td colspan="5" style="text-align:center">No quizzes</td></tr>`; return; }
    tb.innerHTML = r.data.data.map((q) => `
      <tr>
        <td>${escapeHtml(q.title)}</td>
        <td>${q.question_count}</td>
        <td>${q.total_marks}</td>
        <td>${q.assigned_to.length}</td>
        <td class="action-cell">
          <button class="mini-btn danger" data-del="${q.id}">Delete</button>
        </td>
      </tr>`).join("");
    tb.querySelectorAll("[data-del]").forEach((b) => {
      b.addEventListener("click", async () => {
        if (!confirm("Delete?")) return;
        const res = await AuthClient.adminDeleteQuiz(b.dataset.del);
        if (res.ok && res.data.ok) { toast("Deleted", "success"); loadAdminQuizzesTable(); }
      });
    });
  }

  async function loadAdminExamsTable() {
    const r = await AuthClient.adminListExams();
    const tb = $("#admin-exams-table tbody");
    if (!r.ok || !r.data.ok) { tb.innerHTML = `<tr><td colspan="6">Access denied</td></tr>`; return; }
    if (!r.data.data.length) { tb.innerHTML = `<tr><td colspan="6" style="text-align:center">No exams</td></tr>`; return; }
    tb.innerHTML = r.data.data.map((e) => `
      <tr>
        <td>${escapeHtml(e.title)}</td>
        <td>${escapeHtml(e.exam_type)}</td>
        <td>${e.total_marks}</td>
        <td>${escapeHtml(e.exam_date || "—")}</td>
        <td>${e.assigned_to.length}</td>
        <td class="action-cell">
          <button class="mini-btn danger" data-del="${e.id}">Delete</button>
        </td>
      </tr>`).join("");
    tb.querySelectorAll("[data-del]").forEach((b) => {
      b.addEventListener("click", async () => {
        if (!confirm("Delete?")) return;
        const res = await AuthClient.adminDeleteExam(b.dataset.del);
        if (res.ok && res.data.ok) { toast("Deleted", "success"); loadAdminExamsTable(); }
      });
    });
  }

  // ============ Edit User Modal ============
  function buildProfileFieldInputs(profile) {
    $("#eu-profile-fields").innerHTML = PROFILE_FIELDS.map(({ key, label }) => {
      const val = (profile && profile[key] != null) ? profile[key] : "";
      return `<div class="form-group">
        <label>${label}</label>
        <input type="text" data-pk="${key}" value="${escapeHtml(String(val))}" />
      </div>`;
    }).join("");
  }
  function collectProfileFields() {
    const data = {};
    $$("#eu-profile-fields input[data-pk]").forEach((inp) => {
      const v = inp.value.trim(); if (v !== "") data[inp.dataset.pk] = v;
    });
    return data;
  }

  function openUserEditModal(user, source) {
    if (!user) return;
    editingUser = user;
    editingTeacherStudent = source === "teacher" ? user : null;
    $("#eu-id").value = user.id;
    $("#eu-username").value = user.username || "";
    $("#eu-display").value = user.display_name || "";
    $("#eu-email").value = user.email || "";
    $("#eu-mobile").value = user.mobile || "";
    $("#eu-role").value = user.role || "student";
    $("#eu-class").value = user.class_name || "";
    $("#eu-password").value = "";
    buildProfileFieldInputs(user.profile || {});
    $("#eu-username").disabled = source === "teacher";
    $("#eu-role").disabled = source === "teacher";
    $("#edit-user-msg").classList.add("hidden");
    openModal("edit-user-modal");
  }
  function closeEditUserModal() {
    $("#edit-user-modal").classList.add("hidden");
    editingUser = null; editingTeacherStudent = null;
  }

  async function handleEditUserSubmit(e) {
    e.preventDefault();
    if (!editingUser) return;
    const msgEl = $("#edit-user-msg"); msgEl.classList.add("hidden");
    const profile = collectProfileFields();
    const payload = {
      display_name: $("#eu-display").value.trim(),
      email: $("#eu-email").value.trim(),
      mobile: $("#eu-mobile").value.trim(),
      class_name: $("#eu-class").value.trim() || null,
      profile,
    };
    const pw = $("#eu-password").value;
    if (pw) payload.password = pw;
    let r;
    if (editingTeacherStudent) {
      r = await AuthClient.teacherUpdateStudent(editingUser.id, payload);
    } else {
      payload.username = $("#eu-username").value.trim();
      payload.role = $("#eu-role").value;
      r = await AuthClient.adminUpdateUser(editingUser.id, payload);
    }
    if (!r.ok || !r.data.ok) { msgEl.textContent = (r.data && r.data.message) || "Failed"; msgEl.classList.remove("hidden"); return; }
    toast("Updated", "success");
    const wasTeacher = !!editingTeacherStudent;
    closeEditUserModal();
    if (wasTeacher) loadTeacherStudents(); else { loadUsers(); loadAdminStats(); }
  }

  // ============ Teacher: Students ============
  async function loadTeacherStudents() {
    const r = await AuthClient.teacherListStudents();
    const tb = $("#teacher-students-table tbody");
    if (!r.ok || !r.data.ok) { tb.innerHTML = `<tr><td colspan="5">Access denied</td></tr>`; return; }
    if (!r.data.data.length) { tb.innerHTML = `<tr><td colspan="5" style="text-align:center">No students</td></tr>`; return; }
    tb.innerHTML = r.data.data.map((u) => `
      <tr>
        <td>${escapeHtml(u.username)}</td><td>${escapeHtml(u.display_name)}</td>
        <td>${escapeHtml(u.class_name || "—")}</td><td>${escapeHtml(u.email)}</td>
        <td class="action-cell"><button class="mini-btn" data-id="${u.id}">Edit</button></td>
      </tr>`).join("");
    window.__studentsCache = {}; r.data.data.forEach((u) => { window.__studentsCache[u.id] = u; });
    tb.querySelectorAll(".mini-btn").forEach((b) =>
      b.addEventListener("click", () => openUserEditModal(window.__studentsCache[b.dataset.id], "teacher")));
  }

  async function handleAddUser() {
    const username = prompt("Username:"); if (!username) return;
    const display_name = prompt("Full Name:", username) || username;
    const password = prompt("Password:", "Student@123") || "Student@123";
    const role = prompt("Role (student/teacher/admin):", "student") || "student";
    const class_name = role === "student" ? (prompt("Class:", "10-A") || "10-A") : null;
    const r = await AuthClient.adminCreateUser({ username, display_name, password, role, class_name });
    if (r.ok && r.data.ok) { toast("User created", "success"); loadUsers(); loadAdminStats(); }
  }

  // ============ Session Ticker ============
  function stopSessionTicker() { if (sessionTicker) { clearInterval(sessionTicker); sessionTicker = null; } }
  function formatDuration(s) {
    s = Math.max(0, s);
    const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), x = s%60;
    if (h > 0) return `${h}h ${m}m ${x}s`;
    if (m > 0) return `${m}m ${x}s`;
    return `${x}s`;
  }
  function startSessionTicker() {
    stopSessionTicker();
    sessionTicker = setInterval(() => {
      $$(".duration-live").forEach((el) => {
        const t = new Date(el.dataset.login).getTime();
        if (isNaN(t)) return;
        el.textContent = formatDuration(Math.floor((Date.now() - t) / 1000));
      });
    }, 1000);
  }

  // ============ Test Matrix ============
  async function loadTestMatrix() {
    const r = await AuthClient.adminTestMatrix();
    const tb = $("#matrix-table tbody");
    if (!r.ok || !r.data.ok) return;
    tb.innerHTML = r.data.data.map((t) => `
      <tr>
        <td>${escapeHtml(t.test_id)}</td><td>${escapeHtml(t.user_role)}</td><td>${escapeHtml(t.action)}</td>
        <td>${escapeHtml(t.expected)}</td>
        <td contenteditable data-test="${escapeHtml(t.test_id)}" data-field="actual">${escapeHtml(t.actual || "-")}</td>
        <td contenteditable data-test="${escapeHtml(t.test_id)}" data-field="status">${escapeHtml(t.status || "PENDING")}</td>
      </tr>`).join("");
    $$("#matrix-table [contenteditable]").forEach((cell) => {
      cell.addEventListener("blur", async () => {
        await AuthClient.updateTestMatrix(cell.dataset.test, { [cell.dataset.field]: cell.textContent.trim() });
      });
    });
  }

  // ============ Utilities ============
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function runSplash() {
    const splash = $("#splash-screen");
    if (!splash) { showView("login-view"); return; }
    splash.classList.add("active");
    setTimeout(() => {
      splash.classList.add("fade-out");
      setTimeout(() => { splash.classList.remove("active","fade-out"); showView("login-view"); }, 700);
    }, 2600);
  }

  // ============ Init ============
  function init() {
        // ============ GSAP ANIMATIONS (Optional - enhances experience) ============
    function initGsapAnimations() {
      // Wait for GSAP to load
      if (typeof gsap === "undefined") return;

      // Global: stagger all visible elements on view change
      gsap.registerPlugin(ScrollTrigger);

      // Smooth page transitions
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.classList && node.classList.contains("active")) {
              gsap.fromTo(node,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
              );
              // Stagger cards inside
              const cards = node.querySelectorAll(".card");
              if (cards.length) {
                gsap.fromTo(cards,
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.1 }
                );
              }
            }
          });
        });
      });

      const appView = document.getElementById("app-view");
      if (appView) observer.observe(appView, { subtree: true, attributes: true, attributeFilter: ["class"] });

      // Card hover tilt effect
      document.addEventListener("mouseover", (e) => {
        const card = e.target.closest(".card");
        if (!card) return;
        gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
      });
      document.addEventListener("mouseout", (e) => {
        const card = e.target.closest(".card");
        if (!card) return;
        gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
      });
    }

    // Call it (only if GSAP loaded)
    if (typeof gsap !== "undefined") initGsapAnimations();
    setupAdminTabs();

    // ---- GLOBAL MODAL CLOSE (works for every modal) ----
    document.addEventListener("click", (e) => {
      // Close buttons with data-close-modal
      const closeBtn = e.target.closest("[data-close-modal]");
      if (closeBtn) {
        const id = closeBtn.dataset.closeModal;
        const m = document.getElementById(id);
        if (m) m.classList.add("hidden");
        if (id === "edit-user-modal") {
          editingUser = null;
          editingTeacherStudent = null;
        }
        return;
      }
      // Any .modal-close button
      if (e.target.classList.contains("modal-close")) {
        const overlay = e.target.closest(".modal-overlay");
        if (overlay) overlay.classList.add("hidden");
        if (overlay && overlay.id === "edit-user-modal") {
          editingUser = null;
          editingTeacherStudent = null;
        }
        return;
      }
      // Click outside modal card closes it
      if (e.target.classList.contains("modal-overlay")) {
        e.target.classList.add("hidden");
        if (e.target.id === "edit-user-modal") {
          editingUser = null;
          editingTeacherStudent = null;
        }
      }
    });

    // ESC key closes top-most modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const visible = Array.from($$(".modal-overlay")).filter((m) => !m.classList.contains("hidden"));
        if (visible.length) {
          const top = visible[visible.length - 1];
          top.classList.add("hidden");
          if (top.id === "edit-user-modal") {
            editingUser = null;
            editingTeacherStudent = null;
          }
        }
      }
    });

    // Login
    const lf = $("#login-form"); if (lf) lf.addEventListener("submit", handleLogin);
    const tp = $("#toggle-pw"); if (tp) tp.addEventListener("click", () => {
      const i = $("#password"); i.type = i.type === "password" ? "text" : "password";
    });
    const bl = $("#btn-logout"); if (bl) bl.addEventListener("click", async () => {
      stopSessionTicker(); await AuthClient.logout(); location.reload();
    });
    const bpi = $("#btn-profile-icon"); if (bpi) bpi.addEventListener("click", () => {
      if (currentUser) { loadProfile(); showPage("profile"); }
    });

    // Forms
    const pf = $("#profile-form"); if (pf) pf.addEventListener("submit", handleProfileSubmit);
    const eu = $("#edit-user-form"); if (eu) eu.addEventListener("submit", handleEditUserSubmit);
    const af = $("#assignment-form"); if (af) af.addEventListener("submit", handleCreateAssignment);
    const qf = $("#quiz-form"); if (qf) qf.addEventListener("submit", handleCreateQuiz);
    const ef = $("#exam-form"); if (ef) ef.addEventListener("submit", handleCreateExam);
    const asub = $("#assignment-submit-form"); if (asub) asub.addEventListener("submit", handleAssignmentSubmit);

    // Add question button
    const btnAddQ = $("#btn-add-question"); if (btnAddQ) btnAddQ.addEventListener("click", addQuizQuestion);

    // Quiz attempt buttons
    const qs = $("#btn-quiz-submit"); if (qs) qs.addEventListener("click", handleQuizSubmit);
    const qb = $("#btn-quiz-back"); if (qb) qb.addEventListener("click", () => {
      $("#quiz-review-body").classList.add("hidden");
      $("#quiz-attempt-body").classList.remove("hidden");
    });
    const qfin = $("#btn-quiz-finalize"); if (qfin) qfin.addEventListener("click", finalizeQuiz);

    // Toolbar buttons
    const b1 = $("#btn-create-assignment"); if (b1) b1.addEventListener("click", openCreateAssignmentModal);
    const b2 = $("#btn-admin-create-assignment"); if (b2) b2.addEventListener("click", openCreateAssignmentModal);
    const b3 = $("#btn-create-quiz"); if (b3) b3.addEventListener("click", openCreateQuizModal);
    const b4 = $("#btn-admin-create-quiz"); if (b4) b4.addEventListener("click", openCreateQuizModal);
    const b5 = $("#btn-create-exam"); if (b5) b5.addEventListener("click", openCreateExamModal);
    const b6 = $("#btn-admin-create-exam"); if (b6) b6.addEventListener("click", openCreateExamModal);
    const r1 = $("#btn-refresh-assignments"); if (r1) r1.addEventListener("click", loadAdminAssignments);
    const r2 = $("#btn-admin-refresh-assignments"); if (r2) r2.addEventListener("click", loadAdminAssignmentsTable);
    const r3 = $("#btn-refresh-quizzes"); if (r3) r3.addEventListener("click", loadAdminQuizzes);
    const r4 = $("#btn-admin-refresh-quizzes"); if (r4) r4.addEventListener("click", loadAdminQuizzesTable);
    const r5 = $("#btn-refresh-exams"); if (r5) r5.addEventListener("click", loadExamsPage);
    const r6 = $("#btn-admin-refresh-exams"); if (r6) r6.addEventListener("click", loadAdminExamsTable);

    const btnAdd = $("#btn-add-user"); if (btnAdd) btnAdd.addEventListener("click", handleAddUser);
    const btnRefU = $("#btn-refresh-users"); if (btnRefU) btnRefU.addEventListener("click", loadUsers);
    const btnRefS = $("#btn-refresh-sessions"); if (btnRefS) btnRefS.addEventListener("click", loadSessions);

    // Logs
    const cb = $("#btn-clear-logs");
    if (cb) cb.addEventListener("click", async () => {
      if (!confirm("Clear all logs?")) return;
      const r = await AuthClient.clearLogs();
      if (r.ok) { toast("Cleared", "info"); loadLogs(); }
    });
    const eb = $("#btn-export-logs");
    if (eb) eb.addEventListener("click", async () => {
      const r = await AuthClient.adminLogs();
      if (!r.ok || !r.data.ok) return;
      const blob = new Blob([JSON.stringify(r.data.data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "cyberknights-logs.json"; a.click();
      URL.revokeObjectURL(url);
    });

    // Session restore
    AuthClient.session().then((r) => {
      if (r.ok && r.data && r.data.ok) {
        showView("app-view");
        enterApp(r.data.user, r.data.mode);
      } else {
        runSplash();
      }
    }).catch(() => runSplash());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();