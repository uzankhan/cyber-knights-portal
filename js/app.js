/* ============================================================
   Cyber Knights — Full Application Controller (Supabase)
   Fixed: nested loadRecords bug, user-management IIFE
   ============================================================ */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  // Global state
  let currentUser = null;
  let allProfilesCache = [];
  let quizAttempt = { quiz: null, questions: [], answers: {}, timer: null, secondsLeft: 0 };
  let sessionTicker = null;
  let editingUser = null;

  // ============================================================
  // TOAST
  // ============================================================
  function toast(msg, type = "info") {
    const c = $("#toast-container");
    if (!c) return;
    const t = document.createElement("div");
    t.className = `toast ${type}`;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  }

  // ============================================================
  // OVERLAY
  // ============================================================
  function showOverlay(title, subtitle, durationMs = 1200) {
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
      <span><strong>${escapeHtml(title)}</strong> — ${escapeHtml(subtitle)}</span>
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

  // ============================================================
  // UTILITIES
  // ============================================================
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  }

  function fmtDate(iso) {
    if (!iso) return "—";
    try { return new Date(iso).toLocaleString(); } catch { return iso; }
  }

  function fmtDuration(seconds) {
    seconds = Math.max(0, Math.floor(seconds));
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }

  // ============================================================
  // VIEWS & PAGES
  // ============================================================
  function showView(id) {
    $$(".view").forEach((v) => v.classList.remove("active"));
    const el = document.getElementById(id);
    if (el) el.classList.add("active");
  }

  function showPage(id) {
    $$(".page").forEach((p) => p.classList.remove("active"));
    const el = document.getElementById(`page-${id}`);
    if (el) el.classList.add("active");
    $$(".nav-link").forEach((l) => l.classList.toggle("active", l.dataset.page === id));
    if (id !== "admin") stopSessionTicker();
    const sb = document.getElementById("sidebar");
    if (sb) sb.classList.remove("open");
  }

  // ============================================================
  // MODALS
  // ============================================================
  function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove("hidden");
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add("hidden");
  }

  // ============================================================
  // SPLASH
  // ============================================================
  function runSplash() {
    const splash = document.getElementById("splash-screen");
    if (!splash) { showView("login-view"); return; }
    splash.classList.add("active");
    setTimeout(() => {
      splash.classList.add("fade-out");
      setTimeout(() => {
        splash.classList.remove("active", "fade-out");
        showView("login-view");
      }, 700);
    }, 2200);
  }

  // ============================================================
  // LOGIN
  // ============================================================
  async function handleLogin(e) {
    e.preventDefault();
    const errEl = document.getElementById("error-msg");
    const lockEl = document.getElementById("lockout-msg");
    if (errEl) errEl.classList.add("hidden");
    if (lockEl) lockEl.classList.add("hidden");

    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value;

    if (!u || !p) {
      if (errEl) {
        errEl.textContent = "Please enter username and password";
        errEl.classList.remove("hidden");
      }
      return;
    }

    const btn = document.getElementById("btn-login");
    btn.disabled = true;
    btn.textContent = "Signing in…";

    try {
      const r = await window.CK.login(u, p);
      if (!r.ok) {
        if (errEl) {
          errEl.textContent = r.message || "Access denied";
          errEl.classList.remove("hidden");
        }
        await window.CK.logEvent("Login Attempt", "Password", "FAIL", r.message);
        return;
      }

      await window.CK.logEvent("Access Granted", "Password", "SUCCESS", `Welcome ${r.user.display_name}`);
      showOverlay("Access Granted", "Signing you in…", 1200);

      setTimeout(() => enterApp(r.user), 1300);
    } catch (err) {
      console.error(err);
      if (errEl) {
        errEl.textContent = err.message || "Login failed";
        errEl.classList.remove("hidden");
      }
    } finally {
      btn.disabled = false;
      btn.textContent = "Continue";
    }
  }

  // ============================================================
  // ENTER APP
  // ============================================================
  function enterApp(user) {
    currentUser = user;
    showView("app-view");

    const userDisp = document.getElementById("user-display");
    if (userDisp) userDisp.textContent = user.display_name;
    const dashName = document.getElementById("dash-name");
    if (dashName) dashName.textContent = user.display_name;

    buildNav(user.role);
    buildDashboard(user);
    showPage("dashboard");
  }

  // ============================================================
  // NAV
  // ============================================================
  function buildNav(role) {
    const perms = {
      student: ["dashboard", "books", "records", "assignments", "quizzes", "exams", "results", "progress"],
      teacher: ["dashboard", "books", "records", "assignments", "quizzes", "exams", "results", "students", "logs"],
      admin:   ["dashboard", "books", "records", "assignments", "quizzes", "exams", "results", "admin", "students", "logs"],
    }[role] || [];

    const labels = {
      dashboard: "Dashboard", books: "Books", records: "Records", assignments: "Assignments",
      quizzes: "Quizzes", exams: "Exams", results: "Results", progress: "My Progress",
      admin: "Admin", students: "Students", logs: "Monitoring",
    };

    const nav = document.getElementById("main-nav");
    if (!nav) return;
    nav.innerHTML = "";

    perms.forEach((id) => {
      const b = document.createElement("button");
      b.className = "nav-link" + (id === "dashboard" ? " active" : "");
      b.dataset.page = id;
      b.textContent = labels[id];
      b.addEventListener("click", () => {
        switch (id) {
          case "logs":        loadLogs(); break;
          case "admin":       loadAdminPanel(); break;
          case "students":    loadStudentsPage(); break;
          case "assignments": loadAssignmentsPage(); break;
          case "quizzes":     loadQuizzesPage(); break;
          case "exams":       loadExamsPage(); break;
          case "progress":    loadProgress(); break;
          case "records":     loadRecords(); break;
          case "results":     loadResults(); break;
          case "books":       if (window.CKBooks) window.CKBooks.init(); break;
        }
        showPage(id);
      });
      nav.appendChild(b);
    });

    const isStaff = role === "admin" || role === "teacher";
    toggleHidden("assignments-admin-toolbar", !isStaff);
    toggleHidden("quizzes-admin-toolbar", !isStaff);
    toggleHidden("exams-admin-toolbar", !isStaff);

    const s1 = document.getElementById("assignments-subtitle");
    if (s1) s1.textContent = role === "student" ? "Your assigned tasks." : "Create and manage assignments.";
    const s2 = document.getElementById("quizzes-subtitle");
    if (s2) s2.textContent = role === "student" ? "Attempt assigned quizzes." : "Create and manage quizzes.";
    const s3 = document.getElementById("exams-subtitle");
    if (s3) s3.textContent = role === "student" ? "Your upcoming and past exams." : "Create and manage exams.";
  }

  function toggleHidden(id, hide) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("hidden", hide);
  }

  // ============================================================
  // DASHBOARD
  // ============================================================
  function buildDashboard(user) {
    const cards = document.getElementById("dash-cards");
    if (cards) {
      cards.innerHTML = `
        <div class="card"><h3>Role</h3><p class="stat">${escapeHtml(capitalize(user.role))}</p></div>
        <div class="card"><h3>Email</h3><p>${escapeHtml(user.email || "—")}</p></div>
        <div class="card"><h3>Mobile</h3><p>${escapeHtml(user.mobile || "—")}</p></div>
      `;
    }

    const rows = [];
    rows.push(["Username", user.username]);
    rows.push(["Full Name", user.display_name]);
    rows.push(["Role", capitalize(user.role)]);
    if (user.class_name) rows.push(["Class", user.class_name]);
    if (user.email) rows.push(["Email", user.email]);
    if (user.mobile) rows.push(["Mobile", user.mobile]);

    const profile = user.profile_data || {};
    const PROFILE_FIELDS = [
      { key: "course", label: "Course" },
      { key: "school_id", label: "School ID" },
      { key: "enrollment", label: "Enrollment Year" },
      { key: "section", label: "Section" },
      { key: "department", label: "Department" },
      { key: "designation", label: "Designation" },
      { key: "employee_id", label: "Employee ID" },
      { key: "joined", label: "Joined Year" },
      { key: "address", label: "Address" },
      { key: "guardian", label: "Guardian Name" },
      { key: "dob", label: "Date of Birth" },
      { key: "blood_group", label: "Blood Group" },
    ];
    PROFILE_FIELDS.forEach(({ key, label }) => {
      const val = profile[key];
      if (val !== undefined && val !== null && String(val).trim() !== "") rows.push([label, val]);
    });

    const info = document.getElementById("session-info");
    if (info) {
      info.innerHTML = rows.map(([k, v]) =>
        `<li><strong>${escapeHtml(k)}</strong> ${escapeHtml(String(v))}</li>`
      ).join("");
    }
  }

  // ============================================================
  // RECORDS  (FIXED — nested function bug removed)
  // ============================================================
  async function loadRecords(forceRefresh = false) {
    const tb = document.querySelector("#records-table tbody");
    if (!tb) return;
    tb.innerHTML = `<tr><td colspan="5" style="text-align:center">Loading…</td></tr>`;

    const cacheKey = "ck_records_cache";
    const cacheTTL = 5 * 60 * 1000; // 5 minutes

    if (!forceRefresh) {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < cacheTTL) {
            renderRecords(data);
            return;
          }
        }
      } catch (_) { /* ignore corrupt cache */ }
    }

    const r = await window.CK.listRecords();
    if (!r.ok) {
      tb.innerHTML = `<tr><td colspan="5" style="text-align:center">Error loading records</td></tr>`;
      return;
    }

    try {
      localStorage.setItem(cacheKey, JSON.stringify({ data: r.data, timestamp: Date.now() }));
    } catch (_) { /* ignore quota errors */ }

    renderRecords(r.data);
  }

  function renderRecords(data) {
    const tb = document.querySelector("#records-table tbody");
    if (!tb) return;

    if (!data || !data.length) {
      tb.innerHTML = `<tr><td colspan="5" style="text-align:center">No records</td></tr>`;
      return;
    }
    tb.innerHTML = data.map((rec) => `
      <tr>
        <td>${escapeHtml(rec.student_code || "—")}</td>
        <td>${escapeHtml(rec.name || "—")}</td>
        <td>${escapeHtml(rec.class_name || "—")}</td>
        <td>${escapeHtml(rec.attendance || "—")}</td>
        <td>${escapeHtml(rec.status || "Active")}</td>
      </tr>
    `).join("");
  }

  // ============================================================
  // ASSIGNMENTS
  // ============================================================
  async function loadAssignmentsPage() {
    if (currentUser.role === "student") return loadStudentAssignments();
    return loadAdminAssignments();
  }

  async function loadStudentAssignments() {
    const wrap = document.getElementById("assignments-list");
    if (!wrap) return;
    wrap.innerHTML = `<p class="empty-msg">Loading…</p>`;

    const [aRes, sRes] = await Promise.all([
      window.CK.listAssignments(),
      window.CK.listMySubmissions(),
    ]);
    if (!aRes.ok) {
      wrap.innerHTML = `<p class="empty-msg">Error loading assignments</p>`;
      return;
    }

    const myAssignments = aRes.data.filter((a) => {
      if (!a.assigned_to || !a.assigned_to.length) return false;
      return a.assigned_to.includes(currentUser.id);
    });

    if (!myAssignments.length) {
      wrap.innerHTML = `<p class="empty-msg">No assignments assigned to you.</p>`;
      return;
    }

    const submissions = {};
    if (sRes.ok) sRes.data.forEach((s) => { submissions[s.assignment_id] = s; });

    // Expose for the modal to look up submission_type
    window.__currentAssignments = myAssignments;

    wrap.innerHTML = myAssignments.map((a) => {
      const sub = submissions[a.id];
      const now = Date.now();
      const expired = a.deadline && new Date(a.deadline).getTime() < now;

      let action;
      if (sub) {
        const marks = sub.marks_awarded !== null && sub.marks_awarded !== undefined
          ? `<span class="assignment-marks-earned">${sub.marks_awarded}/${a.total_marks}</span>`
          : `<span class="assignment-marks-pending">Pending grade</span>`;
        action = `<div class="assignment-status submitted">✓ Submitted</div>${marks}`;
      } else if (expired) {
        action = `<div class="assignment-status expired">Deadline passed</div>`;
      } else {
        action = `<button class="btn-primary assignment-btn" data-submit="${a.id}">Submit Assignment</button>`;
      }

      return `
        <div class="card assignment-card ${expired && !sub ? "expired" : ""}">
          <h3>${escapeHtml(a.title)}</h3>
          <p>${escapeHtml(a.description || "")}</p>
          <p class="assignment-meta">📅 Due: ${escapeHtml(fmtDate(a.deadline))} · 📝 ${a.total_marks} marks</p>
          ${action}
        </div>`;
    }).join("");

    wrap.querySelectorAll("[data-submit]").forEach((b) => {
      b.addEventListener("click", () => openAssignmentSubmit(b.dataset.submit));
    });
  }

  async function openAssignmentSubmit(aid) {
    // Fetch assignment to get submission_type
    const assignment = (window.__currentAssignments || []).find((a) => a.id == aid);

    // If features-v2 loaded, use its enhanced version
    if (window.CKFeaturesV2 && typeof window.CKFeaturesV2.prepSubmitModal === "function") {
      return window.CKFeaturesV2.prepSubmitModal(aid);
    }

    // Fallback — v1 behaviour
    document.getElementById("asub-id").value = aid;
    document.getElementById("asub-content").value = "";
    document.getElementById("asub-msg").classList.add("hidden");
    openModal("assignment-submit-modal");
  }

  async function handleAssignmentSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("asub-id").value;
    const content = document.getElementById("asub-content").value;
    const msgEl = document.getElementById("asub-msg");
    msgEl.classList.add("hidden");

    const r = await window.CK.submitAssignment(id, content);
    if (!r.ok) {
      msgEl.textContent = r.error || "Submission failed";
      msgEl.classList.remove("hidden");
      return;
    }
    await window.CK.logEvent("Assignment Submitted", "Assignment", "SUCCESS", `ID: ${id}`);
    toast("Assignment submitted!", "success");
    closeModal("assignment-submit-modal");
    loadStudentAssignments();
    window.dispatchEvent(new CustomEvent("ck:activity-completed"));
  }

  async function loadAdminAssignments() {
    const wrap = document.getElementById("assignments-list");
    if (!wrap) return;
    wrap.innerHTML = `<p class="empty-msg">Loading…</p>`;

    const [aRes, pRes] = await Promise.all([
      window.CK.listAssignments(),
      window.CK.listProfiles(),
    ]);

    if (!aRes.ok) {
      wrap.innerHTML = `<p class="empty-msg">Error loading assignments</p>`;
      return;
    }
    if (!aRes.data.length) {
      wrap.innerHTML = `<p class="empty-msg">No assignments yet. Create one!</p>`;
      return;
    }

    allProfilesCache = pRes.ok ? pRes.data : [];
    window.__currentAssignments = aRes.data;

    wrap.innerHTML = aRes.data.map((a) => {
      const assignedCount = (a.assigned_to || []).length;
      return `
        <div class="card assignment-card">
          <h3>${escapeHtml(a.title)}</h3>
          <p>${escapeHtml(a.description || "")}</p>
          <p class="assignment-meta">📅 ${escapeHtml(fmtDate(a.deadline))} · 📝 ${a.total_marks} marks</p>
          <p class="assignment-meta">👥 Assigned: ${assignedCount} student(s)</p>
          <div class="card-actions">
            <button class="mini-btn" data-view-subs="${a.id}">View Submissions</button>
            <button class="mini-btn danger" data-del-assign="${a.id}">Delete</button>
          </div>
        </div>`;
    }).join("");

    wrap.querySelectorAll("[data-view-subs]").forEach((b) =>
      b.addEventListener("click", () => viewAssignmentSubmissions(b.dataset.viewSubs))
    );
    wrap.querySelectorAll("[data-del-assign]").forEach((b) =>
      b.addEventListener("click", async () => {
        if (!confirm("Delete this assignment?")) return;
        const r = await window.CK.deleteAssignment(b.dataset.delAssign);
        if (r.ok) { toast("Deleted", "success"); loadAdminAssignments(); }
      })
    );
  }

  async function viewAssignmentSubmissions(aid) {
    // Prefer v2 enhanced review
    if (window.CKFeaturesV2 && typeof window.CKFeaturesV2.viewSubmissionsWithReview === "function") {
      return window.CKFeaturesV2.viewSubmissionsWithReview(aid);
    }

    // Fallback — prompt-based
    const r = await window.CK.listAllSubmissions(aid);
    if (!r.ok || !r.data.length) { toast("No submissions yet", "info"); return; }

    const lines = r.data.map((s) => {
      const name = s.profiles?.display_name || s.student_id.slice(0, 8);
      const marks = s.marks_awarded !== null && s.marks_awarded !== undefined ? s.marks_awarded : "-";
      return `${name} · ${marks} marks · ${s.content ? s.content.substring(0, 40) : ""}`;
    });

    const input = prompt(
      "Submissions:\n\n" + lines.join("\n") + "\n\nTo grade, enter: studentId(prefix),marks",
      ""
    );
    if (!input) return;
    const [prefix, marksStr] = input.split(",");
    if (!prefix || !marksStr) return;
    const sub = r.data.find((s) => s.student_id.startsWith(prefix.trim()));
    if (!sub) { toast("Student not found", "error"); return; }
    const gr = await window.CK.gradeSubmission(sub.id, parseInt(marksStr), "");
    if (gr.ok) toast("Graded", "success");
  }

  // ============================================================
  // CREATE ASSIGNMENT MODAL
  // ============================================================
  function openCreateAssignmentModal() {
    document.getElementById("as-id").value = "";
    document.getElementById("as-title").value = "";
    document.getElementById("as-desc").value = "";
    document.getElementById("as-marks").value = 10;
    document.getElementById("as-deadline").value = "";
    const st = document.getElementById("as-submission-type");
    if (st) st.value = "text";
    const si = document.getElementById("as-sub-instructions");
    if (si) si.value = "";
    document.getElementById("assignment-msg").classList.add("hidden");
    populateStudentCheckboxes("#as-students-list");
    openModal("assignment-modal");
  }

  async function populateStudentCheckboxes(selector) {
    const wrap = document.querySelector(selector);
    if (!wrap) return;
    wrap.innerHTML = `<p class="hint">Loading students…</p>`;

    const r = await window.CK.listProfiles();
    if (!r.ok) {
      wrap.innerHTML = `<p class="hint">Unable to load students</p>`;
      return;
    }
    const students = r.data.filter((u) => u.role === "student");
    if (!students.length) {
      wrap.innerHTML = `<p class="hint">No students available</p>`;
      return;
    }
    wrap.innerHTML = students.map((s) => `
      <label class="student-checkbox-item">
        <input type="checkbox" value="${escapeHtml(s.id)}" />
        <span>${escapeHtml(s.display_name)} <em>(${escapeHtml(s.username)} · ${escapeHtml(s.class_name || "—")})</em></span>
      </label>
    `).join("");
  }

  function getChecked(selector) {
    return Array.from(document.querySelectorAll(`${selector} input:checked`)).map((i) => i.value);
  }

  async function handleCreateAssignment(e) {
    e.preventDefault();
    const msgEl = document.getElementById("assignment-msg");
    msgEl.classList.add("hidden");

    const title = document.getElementById("as-title").value.trim();
    const description = document.getElementById("as-desc").value.trim();
    const total_marks = parseInt(document.getElementById("as-marks").value) || 10;
    const deadline = document.getElementById("as-deadline").value;
    const assigned_to = getChecked("#as-students-list");
    const submission_type = document.getElementById("as-submission-type")?.value || "text";
    const submission_instructions = document.getElementById("as-sub-instructions")?.value.trim() || null;

    if (!title) { msgEl.textContent = "Title required"; msgEl.classList.remove("hidden"); return; }
    if (!deadline) { msgEl.textContent = "Deadline required"; msgEl.classList.remove("hidden"); return; }
    if (!assigned_to.length) { msgEl.textContent = "Select at least one student"; msgEl.classList.remove("hidden"); return; }

    const r = await window.CK.createAssignment({
      title, description, total_marks,
      deadline: new Date(deadline).toISOString(),
      assigned_to, status: "Open",
      submission_type, submission_instructions,
    });

    if (!r.ok) {
      msgEl.textContent = r.error || "Failed";
      msgEl.classList.remove("hidden");
      return;
    }
    toast("Assignment created", "success");
    closeModal("assignment-modal");
    loadAdminAssignments();
  }

  // ============================================================
  // QUIZZES
  // ============================================================
  async function loadQuizzesPage() {
    if (currentUser.role === "student") return loadStudentQuizzes();
    return loadAdminQuizzes();
  }

  async function loadStudentQuizzes() {
    const wrap = document.getElementById("quizzes-list");
    if (!wrap) return;
    wrap.innerHTML = `<p class="empty-msg">Loading…</p>`;

    const [qRes, sRes] = await Promise.all([
      window.CK.listQuizzes(),
      window.CK.listMyQuizSubmissions(),
    ]);
    if (!qRes.ok) { wrap.innerHTML = `<p class="empty-msg">Error loading quizzes</p>`; return; }

    const myQuizzes = qRes.data.filter((q) => {
      if (!q.assigned_to || !q.assigned_to.length) return false;
      return q.assigned_to.includes(currentUser.id);
    });

    if (!myQuizzes.length) { wrap.innerHTML = `<p class="empty-msg">No quizzes assigned.</p>`; return; }

    const subs = {};
    if (sRes.ok) sRes.data.forEach((s) => { subs[s.quiz_id] = s; });

    wrap.innerHTML = myQuizzes.map((q) => {
      const sub = subs[q.id];
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
          <p class="quiz-meta">📝 ${q.total_marks} marks · ⏱ ${q.duration_minutes} min</p>
          ${action}
        </div>`;
    }).join("");

    wrap.querySelectorAll("[data-quiz-attempt]").forEach((b) =>
      b.addEventListener("click", () => startQuizAttempt(b.dataset.quizAttempt))
    );
  }

  async function startQuizAttempt(qid) {
    const r = await window.CK.getQuizWithQuestions(qid);
    if (!r.ok) { toast("Cannot start quiz", "error"); return; }

    quizAttempt = {
      quiz: r.quiz,
      questions: r.questions,
      answers: {},
      timer: null,
      secondsLeft: r.quiz.duration_minutes * 60,
    };

    document.getElementById("quiz-attempt-title").textContent = r.quiz.title;
    const qWrap = document.getElementById("quiz-attempt-questions");
    qWrap.innerHTML = r.questions.map((q, i) => `
      <div class="quiz-q-block" data-qid="${q.id}">
        <div class="quiz-q-head"><strong>Q${i + 1}.</strong> ${escapeHtml(q.question_text)} <em>(${q.marks} marks)</em></div>
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
      </div>
    `).join("");

    qWrap.querySelectorAll("input[type=radio]").forEach((inp) => {
      inp.addEventListener("change", (e) => {
        const qid = e.target.name.replace("q-", "");
        quizAttempt.answers[qid] = e.target.value;
      });
    });

    document.getElementById("quiz-review-body")?.classList.add("hidden");
    document.getElementById("quiz-result-body")?.classList.add("hidden");
    document.getElementById("quiz-attempt-body")?.classList.remove("hidden");

    startQuizTimer();
    openModal("quiz-attempt-modal");
  }

  function startQuizTimer() {
    if (quizAttempt.timer) clearInterval(quizAttempt.timer);
    const tick = () => {
      const m = Math.floor(quizAttempt.secondsLeft / 60);
      const s = quizAttempt.secondsLeft % 60;
      const el = document.getElementById("quiz-attempt-timer");
      if (el) el.textContent = `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

      if (quizAttempt.secondsLeft <= 0) {
        clearInterval(quizAttempt.timer);
        toast("Time's up! Auto-submitting…", "error");
        finalizeQuiz();
        return;
      }
      quizAttempt.secondsLeft--;
    };
    tick();
    quizAttempt.timer = setInterval(tick, 1000);
  }

  async function finalizeQuiz() {
    if (quizAttempt.timer) clearInterval(quizAttempt.timer);

    let score = 0, total = 0;
    quizAttempt.questions.forEach((q) => {
      total += q.marks;
      const given = (quizAttempt.answers[String(q.id)] || "").toUpperCase();
      if (given === q.correct_option) score += q.marks;
    });

    const r = await window.CK.submitQuiz(
      quizAttempt.quiz.id,
      quizAttempt.answers,
      score, total, true
    );

    if (!r.ok) { toast("Submit failed", "error"); return; }

    // Save detailed attempt for report card
    try {
      const submissionId = r.data?.id;
      if (submissionId) {
        const details = quizAttempt.questions.map((q) => {
          const given = (quizAttempt.answers[String(q.id)] || "").toUpperCase();
          const isCorrect = given === (q.correct_option || "").toUpperCase();
          return {
            submission_id: submissionId,
            question_id: q.id,
            selected_option: given || null,
            correct_option: q.correct_option,
            is_correct: isCorrect,
            marks_awarded: isCorrect ? (q.marks || 1) : 0,
            marks_possible: q.marks || 1,
          };
        });
        await window.CK.supabase.from("quiz_attempt_details").insert(details);
      }
    } catch (e) { console.warn("Detail save failed:", e); }

    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const pass = pct >= 40;

    document.getElementById("quiz-result-hero").innerHTML = `
      <div class="quiz-score-circle ${pass ? "pass" : "fail"}">
        <div class="quiz-score-num">${score}/${total}</div>
        <div class="quiz-score-pct">${pct}%</div>
        <div class="quiz-score-label">${pass ? "PASS" : "FAIL"}</div>
      </div>
      <p>You cannot attempt this quiz again.</p>
    `;

    document.getElementById("quiz-result-detail").innerHTML = quizAttempt.questions.map((q, i) => {
      const given = (quizAttempt.answers[String(q.id)] || "").toUpperCase();
      const correct = given === q.correct_option;
      return `
        <div class="quiz-result-row ${correct ? "correct" : "wrong"}">
          <div><strong>Q${i + 1}.</strong> ${escapeHtml(q.question_text)}</div>
          <div class="quiz-result-ans">
            Your answer: <strong>${escapeHtml(given || "—")}</strong> ${correct ? "✓" : "✗"}
            ${!correct ? ` · Correct: <strong>${q.correct_option}</strong>` : ""}
          </div>
        </div>`;
    }).join("");

    await window.CK.logEvent("Quiz Submitted", "Quiz", "SUCCESS", `Score: ${score}/${total}`);

    document.getElementById("quiz-review-body")?.classList.add("hidden");
    document.getElementById("quiz-attempt-body")?.classList.add("hidden");
    document.getElementById("quiz-result-body")?.classList.remove("hidden");

    window.dispatchEvent(new CustomEvent("ck:activity-completed"));
  }

  async function loadAdminQuizzes() {
    const wrap = document.getElementById("quizzes-list");
    if (!wrap) return;
    wrap.innerHTML = `<p class="empty-msg">Loading…</p>`;

    const r = await window.CK.listQuizzes();
    if (!r.ok) { wrap.innerHTML = `<p class="empty-msg">Error loading quizzes</p>`; return; }
    if (!r.data.length) { wrap.innerHTML = `<p class="empty-msg">No quizzes yet. Create one!</p>`; return; }

    wrap.innerHTML = r.data.map((q) => `
      <div class="card quiz-card">
        <h3>${escapeHtml(q.title)}</h3>
        <p>${escapeHtml(q.description || "")}</p>
        <p class="quiz-meta">📝 ${q.total_marks} marks · ⏱ ${q.duration_minutes} min</p>
        <p class="quiz-meta">👥 Assigned: ${(q.assigned_to || []).length}</p>
        <div class="card-actions">
          <button class="mini-btn danger" data-del-quiz="${q.id}">Delete</button>
        </div>
      </div>
    `).join("");

    wrap.querySelectorAll("[data-del-quiz]").forEach((b) =>
      b.addEventListener("click", async () => {
        if (!confirm("Delete this quiz?")) return;
        const res = await window.CK.deleteQuiz(b.dataset.delQuiz);
        if (res.ok) { toast("Deleted", "success"); loadAdminQuizzes(); }
      })
    );
  }

  // ============================================================
  // CREATE QUIZ MODAL
  // ============================================================
  let quizQCounter = 0;

  function openCreateQuizModal() {
    document.getElementById("q-id").value = "";
    document.getElementById("q-title").value = "";
    document.getElementById("q-desc").value = "";
    document.getElementById("q-duration").value = 15;
    document.getElementById("quiz-questions-wrap").innerHTML = "";
    quizQCounter = 0;
    addQuizQuestion();
    document.getElementById("quiz-msg").classList.add("hidden");
    populateStudentCheckboxes("#q-students-list");
    openModal("quiz-modal");
  }

  function addQuizQuestion() {
    const idx = quizQCounter++;
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
    const wrap = document.getElementById("quiz-questions-wrap");
    wrap.insertAdjacentHTML("beforeend", html);
    const btn = wrap.querySelector(`[data-idx="${idx}"] [data-remove-q]`);
    if (btn) btn.addEventListener("click", () => {
      const blk = wrap.querySelector(`[data-idx="${idx}"]`);
      if (blk) blk.remove();
    });
  }

  async function handleCreateQuiz(e) {
    e.preventDefault();
    const msgEl = document.getElementById("quiz-msg");
    msgEl.classList.add("hidden");

    const title = document.getElementById("q-title").value.trim();
    const description = document.getElementById("q-desc").value.trim();
    const duration_minutes = parseInt(document.getElementById("q-duration").value) || 15;

    if (!title) { msgEl.textContent = "Title required"; msgEl.classList.remove("hidden"); return; }

    const blocks = document.querySelectorAll("#quiz-questions-wrap .quiz-question-block");
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
        question_text: text,
        option_a: a, option_b: bb,
        option_c: c || null, option_d: d || null,
        correct_option: correct, marks,
      });
    }
    if (!questions.length) {
      msgEl.textContent = "At least one complete question required";
      msgEl.classList.remove("hidden"); return;
    }

    const assigned_to = getChecked("#q-students-list");
    if (!assigned_to.length) { msgEl.textContent = "Select students"; msgEl.classList.remove("hidden"); return; }

    const total_marks = questions.reduce((s, q) => s + q.marks, 0);
    const r = await window.CK.createQuiz({
      title, description, duration_minutes,
      total_marks, assigned_to, is_published: true,
    }, questions);

    if (!r.ok) {
      msgEl.textContent = r.error || "Failed";
      msgEl.classList.remove("hidden");
      return;
    }
    toast("Quiz created", "success");
    closeModal("quiz-modal");
    loadAdminQuizzes();
  }

  // ============================================================
  // EXAMS
  // ============================================================
  async function loadExamsPage() {
    const wrap = document.getElementById("exams-list");
    if (!wrap) return;
    wrap.innerHTML = `<p class="empty-msg">Loading…</p>`;

    const r = await window.CK.listExams();
    if (!r.ok) { wrap.innerHTML = `<p class="empty-msg">Error loading exams</p>`; return; }

    const isStudent = currentUser.role === "student";
    let list = r.data;
    if (isStudent) {
      list = r.data.filter((e) => (e.assigned_to || []).includes(currentUser.id));
    }

    if (!list.length) { wrap.innerHTML = `<p class="empty-msg">No exams scheduled.</p>`; return; }

    wrap.innerHTML = list.map((e) => `
      <div class="card exam-card">
        <h3>${escapeHtml(e.title)}</h3>
        <p class="exam-meta">📚 ${escapeHtml(e.exam_type)} · 📝 ${e.total_marks} marks · ⏱ ${e.duration_minutes} min</p>
        ${e.exam_date ? `<p class="exam-meta">📅 ${escapeHtml(e.exam_date)}</p>` : ""}
        ${!isStudent ? `<p class="exam-meta">👥 Assigned: ${(e.assigned_to || []).length}</p>` : ""}
        ${!isStudent ? `
          <div class="card-actions">
            <button class="mini-btn danger" data-del-exam="${e.id}">Delete</button>
          </div>
        ` : ""}
      </div>
    `).join("");

    if (!isStudent) {
      wrap.querySelectorAll("[data-del-exam]").forEach((b) =>
        b.addEventListener("click", async () => {
          if (!confirm("Delete?")) return;
          const res = await window.CK.deleteExam(b.dataset.delExam);
          if (res.ok) { toast("Deleted", "success"); loadExamsPage(); }
        })
      );
    }
  }

  function openCreateExamModal() {
    document.getElementById("ex-title").value = "";
    document.getElementById("ex-type").value = "midterm";
    document.getElementById("ex-marks").value = 100;
    document.getElementById("ex-date").value = "";
    document.getElementById("ex-duration").value = 60;
    document.getElementById("exam-msg").classList.add("hidden");
    populateStudentCheckboxes("#ex-students-list");
    openModal("exam-modal");
  }

  async function handleCreateExam(e) {
    e.preventDefault();
    const msgEl = document.getElementById("exam-msg");
    msgEl.classList.add("hidden");

    const title = document.getElementById("ex-title").value.trim();
    if (!title) { msgEl.textContent = "Title required"; msgEl.classList.remove("hidden"); return; }

    const assigned_to = getChecked("#ex-students-list");
    if (!assigned_to.length) { msgEl.textContent = "Select students"; msgEl.classList.remove("hidden"); return; }

    const r = await window.CK.createExam({
      title,
      exam_type: document.getElementById("ex-type").value,
      total_marks: parseInt(document.getElementById("ex-marks").value) || 100,
      exam_date: document.getElementById("ex-date").value || null,
      duration_minutes: parseInt(document.getElementById("ex-duration").value) || 60,
      assigned_to,
    });

    if (!r.ok) {
      msgEl.textContent = r.error || "Failed";
      msgEl.classList.remove("hidden");
      return;
    }
    toast("Exam created", "success");
    closeModal("exam-modal");
    loadExamsPage();
  }

  // ============================================================
  // RESULTS
  // ============================================================
  async function loadResults() {
    const tb = document.querySelector("#results-table tbody");
    if (!tb) return;
    tb.innerHTML = `<tr><td colspan="5" style="text-align:center">Loading…</td></tr>`;

    const r = await window.CK.listMyExamResults();
    if (!r.ok) {
      tb.innerHTML = `<tr><td colspan="5" style="text-align:center">Error loading results</td></tr>`;
      return;
    }
    if (!r.data.length) {
      tb.innerHTML = `<tr><td colspan="5" style="text-align:center">No results yet</td></tr>`;
      return;
    }
    tb.innerHTML = r.data.map((res) => {
      const exam = res.exams || {};
      return `
        <tr>
          <td>${escapeHtml(currentUser.display_name)}</td>
          <td>${escapeHtml(exam.title || "Exam")}</td>
          <td>${res.marks_obtained}</td>
          <td>${exam.total_marks || "—"}</td>
          <td>${escapeHtml(res.grade || "—")}</td>
        </tr>`;
    }).join("");
  }

  // ============================================================
  // PROGRESS (Student)
  // ============================================================
  async function loadProgress() {
    const summaryEl = document.getElementById("progress-summary");
    const breakdownEl = document.getElementById("progress-breakdown");
    if (!summaryEl || !breakdownEl) return;

    summaryEl.innerHTML = `<p class="empty-msg">Calculating…</p>`;
    breakdownEl.innerHTML = "";

    const [aRes, asgSubRes, qRes, qSubRes, eRes, eResRes] = await Promise.all([
      window.CK.listAssignments(),
      window.CK.listMySubmissions(),
      window.CK.listQuizzes(),
      window.CK.listMyQuizSubmissions(),
      window.CK.listExams(),
      window.CK.listMyExamResults(),
    ]);

    // Assignments
    const myAssign = (aRes.data || []).filter((a) => (a.assigned_to || []).includes(currentUser.id));
    let aEarned = 0, aPossible = 0, aAttended = 0;
    myAssign.forEach((a) => {
      aPossible += a.total_marks;
      const sub = (asgSubRes.data || []).find((s) => s.assignment_id === a.id);
      if (sub) {
        aAttended++;
        aEarned += sub.marks_awarded || 0;
      }
    });

    // Quizzes
    const myQuizzes = (qRes.data || []).filter((q) => (q.assigned_to || []).includes(currentUser.id));
    let qEarned = 0, qPossible = 0, qAttended = 0, qPass = 0, qFail = 0;
    myQuizzes.forEach((q) => {
      qPossible += q.total_marks;
      const sub = (qSubRes.data || []).find((s) => s.quiz_id === q.id && s.finalized);
      if (sub) {
        qAttended++;
        qEarned += sub.score;
        const pct = sub.total > 0 ? (sub.score / sub.total) : 0;
        if (pct >= 0.4) qPass++; else qFail++;
      }
    });

    // Exams
    const myExams = (eRes.data || []).filter((e) => (e.assigned_to || []).includes(currentUser.id));
    let eEarned = 0, ePossible = 0, eAttended = 0, ePass = 0, eFail = 0;
    myExams.forEach((e) => {
      ePossible += e.total_marks;
      const res = (eResRes.data || []).find((r) => r.exam_id === e.id);
      if (res) {
        eAttended++;
        eEarned += res.marks_obtained;
        const pct = e.total_marks > 0 ? (res.marks_obtained / e.total_marks) : 0;
        if (pct >= 0.4) ePass++; else eFail++;
      }
    });

    const totalEarned = aEarned + qEarned + eEarned;
    const totalPossible = aPossible + qPossible + ePossible;
    const pct = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;

    summaryEl.innerHTML = `
      <div class="progress-hero">
        <div class="progress-score-big">${totalEarned}<span>/${totalPossible}</span></div>
        <div class="progress-pct">${pct}% Overall</div>
        <div class="progress-bar-wrap">
          <div class="progress-bar" style="width:${pct}%"></div>
        </div>
        <p class="progress-note">Total marks across assignments, quizzes and exams</p>
      </div>`;

    const card = (title, icon, x, extra = "") => `
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

    breakdownEl.innerHTML =
      card("Assignments", "📝", { earned: aEarned, possible: aPossible, total: myAssign.length, attended: aAttended }) +
      card("Quizzes", "❓", { earned: qEarned, possible: qPossible, total: myQuizzes.length, attended: qAttended },
        `<div><span>Pass:</span> ${qPass} · <span>Fail:</span> ${qFail}</div>`) +
      card("Exams", "📚", { earned: eEarned, possible: ePossible, total: myExams.length, attended: eAttended },
        `<div><span>Pass:</span> ${ePass} · <span>Fail:</span> ${eFail}</div>`);

    // Trigger v2 enhancement (curriculum tracking)
    if (window.CKFeaturesV2 && typeof window.CKFeaturesV2.enhanceStudentProgress === "function") {
      setTimeout(() => window.CKFeaturesV2.enhanceStudentProgress(), 100);
    }
  }

  // ============================================================
  // PROFILE (self)
  // ============================================================
  async function loadProfile() {
    if (!currentUser) return;
    const u = currentUser;
    document.getElementById("pf-username").value = u.username || "";
    document.getElementById("pf-username").disabled = true;
    document.getElementById("pf-display-name").value = u.display_name || "";
    document.getElementById("pf-email").value = u.email || "";
    document.getElementById("pf-mobile").value = u.mobile || "";
    document.getElementById("pf-password").value = "";
    document.getElementById("profile-msg").classList.add("hidden");
  }

  async function handleProfileSubmit(e) {
    e.preventDefault();
    const msgEl = document.getElementById("profile-msg");
    msgEl.classList.add("hidden");

    const payload = {
      display_name: document.getElementById("pf-display-name").value.trim(),
      email: document.getElementById("pf-email").value.trim(),
      mobile: document.getElementById("pf-mobile").value.trim(),
    };
    const pw = document.getElementById("pf-password").value;
    if (pw) payload.password = pw;

    const r = await window.CK.updateOwnProfile(payload);
    if (!r.ok) {
      msgEl.textContent = r.message || "Update failed";
      msgEl.classList.remove("hidden");
      return;
    }

    const fresh = await window.CK.getCurrentUser();
    if (fresh) {
      currentUser = fresh;
      buildDashboard(fresh);
      const uEl = document.getElementById("user-display");
      if (uEl) uEl.textContent = fresh.display_name;
    }

    await window.CK.logEvent("Profile Updated", "Self", "SUCCESS", "");
    toast("Profile updated", "success");
    document.getElementById("pf-password").value = "";
  }

  // ============================================================
  // ADMIN PANEL
  // ============================================================
  function setupAdminTabs() {
    document.querySelectorAll(".admin-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".admin-tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".admin-tab-content").forEach((c) => c.classList.remove("active"));
        tab.classList.add("active");
        const target = document.getElementById("admin-tab-" + tab.dataset.tab);
        if (target) target.classList.add("active");

        if (tab.dataset.tab === "users") loadUsers();
        if (tab.dataset.tab === "sessions") loadSessions();
        if (tab.dataset.tab === "curriculum" && window.CKFeaturesV2) {
          window.CKFeaturesV2.loadCurriculumProgress();
        }
      });
    });
  }

  async function loadAdminPanel() {
    await Promise.all([loadAdminStats(), loadUsers(), loadSessions()]);
  }

  async function loadAdminStats() {
    const el = document.getElementById("admin-stats");
    if (!el) return;

    const [pRes, aRes, qRes, eRes] = await Promise.all([
      window.CK.listProfiles(),
      window.CK.listAssignments(),
      window.CK.listQuizzes(),
      window.CK.listExams(),
    ]);

    const profiles = pRes.data || [];
    const students = profiles.filter((p) => p.role === "student").length;
    const teachers = profiles.filter((p) => p.role === "teacher").length;
    const admins = profiles.filter((p) => p.role === "admin").length;

    el.innerHTML = `
      <div class="card"><h3>Total Users</h3><p class="stat">${profiles.length}</p></div>
      <div class="card"><h3>Students</h3><p class="stat">${students}</p></div>
      <div class="card"><h3>Teachers</h3><p class="stat">${teachers}</p></div>
      <div class="card"><h3>Admins</h3><p class="stat">${admins}</p></div>
      <div class="card"><h3>Assignments</h3><p class="stat">${(aRes.data || []).length}</p></div>
      <div class="card"><h3>Quizzes</h3><p class="stat">${(qRes.data || []).length}</p></div>
      <div class="card"><h3>Exams</h3><p class="stat">${(eRes.data || []).length}</p></div>
      <div class="card"><h3>System</h3><p>🟢 Operational</p></div>
    `;
  }

  async function loadUsers() {
    const tb = document.querySelector("#users-table tbody");
    if (!tb) return;
    tb.innerHTML = `<tr><td colspan="7" style="text-align:center">Loading…</td></tr>`;

    const r = await window.CK.listProfiles();
    if (!r.ok) { tb.innerHTML = `<tr><td colspan="7">Error</td></tr>`; return; }

    tb.innerHTML = r.data.map((u) => `
      <tr>
        <td>${escapeHtml(u.username)}</td>
        <td>${escapeHtml(u.display_name)}</td>
        <td>${escapeHtml(u.role)}</td>
        <td>${escapeHtml(u.class_name || "—")}</td>
        <td>${escapeHtml(u.email || "—")}</td>
        <td>—</td>
        <td class="action-cell">
          <button class="mini-btn" data-act="edit" data-id="${u.id}">Edit</button>
        </td>
      </tr>
    `).join("");

    window.__profilesCache = {};
    r.data.forEach((p) => { window.__profilesCache[p.id] = p; });

    tb.querySelectorAll(".mini-btn").forEach((b) => {
      b.addEventListener("click", () => openUserEditModal(window.__profilesCache[b.dataset.id]));
    });
  }

  function openUserEditModal(user) {
    if (!user) return;
    editingUser = user;
    document.getElementById("eu-id").value = user.id;
    document.getElementById("eu-username").value = user.username || "";
    document.getElementById("eu-display").value = user.display_name || "";
    document.getElementById("eu-email").value = user.email || "";
    document.getElementById("eu-mobile").value = user.mobile || "";
    document.getElementById("eu-role").value = user.role || "student";
    document.getElementById("eu-class").value = user.class_name || "";
    document.getElementById("eu-password").value = "";
    document.getElementById("edit-user-msg").classList.add("hidden");
    openModal("edit-user-modal");
  }

  async function handleEditUserSubmit(e) {
    e.preventDefault();
    if (!editingUser) return;
    const msgEl = document.getElementById("edit-user-msg");
    msgEl.classList.add("hidden");

    const payload = {
      display_name: document.getElementById("eu-display").value.trim(),
      email: document.getElementById("eu-email").value.trim(),
      mobile: document.getElementById("eu-mobile").value.trim(),
      role: document.getElementById("eu-role").value,
      class_name: document.getElementById("eu-class").value.trim() || null,
    };

    const r = await window.CK.updateProfile(editingUser.id, payload);
    if (!r.ok) {
      msgEl.textContent = r.message || "Failed";
      msgEl.classList.remove("hidden");
      return;
    }
    await window.CK.logEvent("User Updated", "Admin", "SUCCESS", editingUser.username);
    toast("Updated", "success");
    closeModal("edit-user-modal");
    editingUser = null;
    loadUsers();
    loadAdminStats();
  }

  // ============================================================
  // SESSIONS
  // ============================================================
  function stopSessionTicker() {
    if (sessionTicker) { clearInterval(sessionTicker); sessionTicker = null; }
  }

  function startSessionTicker() {
    stopSessionTicker();
    sessionTicker = setInterval(() => {
      document.querySelectorAll(".duration-live").forEach((el) => {
        const t = new Date(el.dataset.login).getTime();
        if (isNaN(t)) return;
        el.textContent = fmtDuration((Date.now() - t) / 1000);
      });
    }, 1000);
  }

  async function loadSessions() {
    const tb = document.querySelector("#sessions-table tbody");
    if (!tb) return;
    tb.innerHTML = `
      <tr><td colspan="8" style="text-align:center;color:var(--text-lo)">
        Current session: ${escapeHtml(currentUser.username)} (${escapeHtml(currentUser.role)})
      </td></tr>`;
  }

  // ============================================================
  // STUDENTS PAGE
  // ============================================================
  async function loadStudentsPage() {
    const tb = document.querySelector("#teacher-students-table tbody");
    if (!tb) return;
    tb.innerHTML = `<tr><td colspan="5" style="text-align:center">Loading…</td></tr>`;

    const r = await window.CK.listProfiles();
    if (!r.ok) { tb.innerHTML = `<tr><td colspan="5">Error</td></tr>`; return; }

    const students = r.data.filter((u) => u.role === "student");
    if (!students.length) {
      tb.innerHTML = `<tr><td colspan="5" style="text-align:center">No students</td></tr>`;
      return;
    }

    window.__studentsCache = {};
    students.forEach((s) => { window.__studentsCache[s.id] = s; });

    tb.innerHTML = students.map((u) => `
      <tr>
        <td>${escapeHtml(u.username)}</td>
        <td>${escapeHtml(u.display_name)}</td>
        <td>${escapeHtml(u.class_name || "—")}</td>
        <td>${escapeHtml(u.email || "—")}</td>
        <td class="action-cell">
          <button class="mini-btn" data-id="${u.id}">Edit</button>
        </td>
      </tr>
    `).join("");

    tb.querySelectorAll(".mini-btn").forEach((b) => {
      b.addEventListener("click", () => openUserEditModal(window.__studentsCache[b.dataset.id]));
    });
  }

  // ============================================================
  // LOGS
  // ============================================================
  async function loadLogs() {
    const tb = document.querySelector("#logs-table tbody");
    if (!tb) return;
    tb.innerHTML = `<tr><td colspan="8" style="text-align:center">Loading…</td></tr>`;

    const r = await window.CK.listLogs();
    if (!r.ok) { tb.innerHTML = `<tr><td colspan="8">Error</td></tr>`; return; }
    if (!r.data.length) {
      tb.innerHTML = `<tr><td colspan="8" style="text-align:center">No events</td></tr>`;
      return;
    }

    tb.innerHTML = r.data.map((l) => {
      const cls = l.result === "SUCCESS" ? "log-success"
        : (l.result === "FAIL" || l.result === "LOCKED") ? "log-fail"
        : "log-info";
      return `<tr>
        <td>${escapeHtml(fmtDate(l.timestamp))}</td>
        <td>${escapeHtml(l.username || "—")}</td>
        <td>${escapeHtml(l.role || "—")}</td>
        <td>${escapeHtml(l.action || "")}</td>
        <td>${escapeHtml(l.factor || "—")}</td>
        <td><span class="ip-cell">${escapeHtml(l.ip || "—")}</span></td>
        <td><span class="log-result ${cls}">${escapeHtml(l.result || "")}</span></td>
        <td>${escapeHtml(l.details || "")}</td>
      </tr>`;
    }).join("");
  }

  // ============================================================
  // TEST MATRIX
  // ============================================================
  async function loadTestMatrix() {
    const tb = document.querySelector("#matrix-table tbody");
    if (!tb) return;

    const r = await window.CK.listTestMatrix();
    if (!r.ok) return;

    tb.innerHTML = r.data.map((t) => `
      <tr>
        <td>${escapeHtml(t.test_id)}</td>
        <td>${escapeHtml(t.user_role)}</td>
        <td>${escapeHtml(t.action)}</td>
        <td>${escapeHtml(t.expected)}</td>
        <td contenteditable data-test="${escapeHtml(t.test_id)}" data-field="actual">${escapeHtml(t.actual || "-")}</td>
        <td contenteditable data-test="${escapeHtml(t.test_id)}" data-field="status">${escapeHtml(t.status || "PENDING")}</td>
      </tr>
    `).join("");

    tb.querySelectorAll("[contenteditable]").forEach((cell) => {
      cell.addEventListener("blur", async () => {
        await window.CK.updateTestMatrix(cell.dataset.test, { [cell.dataset.field]: cell.textContent.trim() });
      });
    });
  }

  // ============================================================
  // LOGOUT
  // ============================================================
  async function handleLogout() {
    stopSessionTicker();
    await window.CK.logEvent("Logout", "Session", "SUCCESS", "");
    await window.CK.logout();
    location.reload();
  }

  // ============================================================
  // INIT
  // ============================================================
  function init() {
    console.log("[CK] Initializing app…");

    const loginForm = document.getElementById("login-form");
    if (loginForm) loginForm.addEventListener("submit", handleLogin);

    const togglePw = document.getElementById("toggle-pw");
    const pwInput = document.getElementById("password");
    if (togglePw && pwInput) {
      togglePw.addEventListener("click", () => {
        pwInput.type = pwInput.type === "password" ? "text" : "password";
      });
    }

    const logoutBtn = document.getElementById("btn-logout");
    if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);

    const profIcon = document.getElementById("btn-profile-icon");
    if (profIcon) profIcon.addEventListener("click", () => {
      if (currentUser) { loadProfile(); showPage("profile"); }
    });

    setupAdminTabs();

    document.addEventListener("click", (e) => {
      const closeBtn = e.target.closest("[data-close-modal]");
      if (closeBtn) {
        closeModal(closeBtn.dataset.closeModal);
        if (closeBtn.dataset.closeModal === "edit-user-modal") editingUser = null;
        return;
      }
      if (e.target.classList.contains("modal-close")) {
        const overlay = e.target.closest(".modal-overlay");
        if (overlay) overlay.classList.add("hidden");
        if (overlay && overlay.id === "edit-user-modal") editingUser = null;
        return;
      }
      if (e.target.classList.contains("modal-overlay")) {
        e.target.classList.add("hidden");
        if (e.target.id === "edit-user-modal") editingUser = null;
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const visible = Array.from(document.querySelectorAll(".modal-overlay")).filter((m) => !m.classList.contains("hidden"));
        if (visible.length) {
          const top = visible[visible.length - 1];
          top.classList.add("hidden");
          if (top.id === "edit-user-modal") editingUser = null;
        }
      }
    });

    const pf = document.getElementById("profile-form");
    if (pf) pf.addEventListener("submit", handleProfileSubmit);

    const eu = document.getElementById("edit-user-form");
    if (eu) eu.addEventListener("submit", handleEditUserSubmit);

    const af = document.getElementById("assignment-form");
    if (af) af.addEventListener("submit", handleCreateAssignment);

    const qf = document.getElementById("quiz-form");
    if (qf) qf.addEventListener("submit", handleCreateQuiz);

    const ef = document.getElementById("exam-form");
    if (ef) ef.addEventListener("submit", handleCreateExam);

    // Assignment submit form — v2 will attach its own handler if needed
    const asub = document.getElementById("assignment-submit-form");
    if (asub && !asub.dataset.v2handled) {
      asub.addEventListener("submit", handleAssignmentSubmit);
    }

    const qBack = document.getElementById("btn-quiz-back");
    if (qBack) qBack.addEventListener("click", () => {
      document.getElementById("quiz-review-body")?.classList.add("hidden");
      document.getElementById("quiz-attempt-body")?.classList.remove("hidden");
    });

    const qFin = document.getElementById("btn-quiz-finalize");
    if (qFin) qFin.addEventListener("click", finalizeQuiz);

    const addQ = document.getElementById("btn-add-question");
    if (addQ) addQ.addEventListener("click", addQuizQuestion);

    bindClick("btn-create-assignment", openCreateAssignmentModal);
    bindClick("btn-admin-create-assignment", openCreateAssignmentModal);
    bindClick("btn-create-quiz", openCreateQuizModal);
    bindClick("btn-admin-create-quiz", openCreateQuizModal);
    bindClick("btn-create-exam", openCreateExamModal);
    bindClick("btn-admin-create-exam", openCreateExamModal);
    bindClick("btn-refresh-assignments", loadAdminAssignments);
    bindClick("btn-admin-refresh-assignments", loadAdminAssignments);
    bindClick("btn-refresh-quizzes", loadAdminQuizzes);
    bindClick("btn-admin-refresh-quizzes", loadAdminQuizzes);
    bindClick("btn-refresh-exams", loadExamsPage);
    bindClick("btn-admin-refresh-exams", loadExamsPage);

    bindClick("btn-clear-logs", async () => {
      if (!confirm("Clear all logs?")) return;
      const r = await window.CK.clearLogs();
      if (r.ok) { toast("Cleared", "info"); loadLogs(); }
    });

    bindClick("btn-export-logs", async () => {
      const r = await window.CK.listLogs();
      if (!r.ok) return;
      const blob = new Blob([JSON.stringify(r.data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cyberknights-logs.json";
      a.click();
      URL.revokeObjectURL(url);
    });

    if (window.CK) {
      window.CK.getCurrentUser().then((user) => {
        if (user) {
          console.log("[CK] Restoring session:", user.username);
          enterApp(user);
        } else {
          runSplash();
        }
      }).catch((e) => {
        console.error(e);
        runSplash();
      });
    } else {
      runSplash();
    }
  }

  function bindClick(id, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", fn);
  }

  window.CKApp = { showPage, loadAdminPanel, loadLogs, loadTestMatrix };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* ============================================================
     ADD NEW USER — Admin
     ============================================================ */
  function openCreateUserModal() {
    let modal = document.getElementById('create-user-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'create-user-modal';
      modal.className = 'modal-overlay hidden';
      modal.innerHTML = `
        <div class="modal-card">
          <div class="modal-head">
            <h3>Create New User</h3>
            <button class="modal-close" data-close-modal="create-user-modal">×</button>
          </div>
          <form id="create-user-form" class="modal-body">
            <div class="form-row">
              <div class="form-group">
                <label for="cu-username">Username *</label>
                <input type="text" id="cu-username" required autocomplete="off" />
              </div>
              <div class="form-group">
                <label for="cu-display">Full Name *</label>
                <input type="text" id="cu-display" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="cu-email">Email</label>
                <input type="email" id="cu-email" />
              </div>
              <div class="form-group">
                <label for="cu-mobile">Mobile</label>
                <input type="text" id="cu-mobile" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="cu-role">Role *</label>
                <select id="cu-role" required>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div class="form-group">
                <label for="cu-class">Class <span class="hint">(students only)</span></label>
                <input type="text" id="cu-class" placeholder="e.g., 10-A" />
              </div>
            </div>
            <div class="form-group" style="margin-top:16px;">
              <label for="cu-password">Password * <span class="hint">(min 6 chars)</span></label>
              <input type="password" id="cu-password" required minlength="6" />
            </div>
            <div id="create-user-msg" class="error-msg hidden"></div>
            <div class="modal-actions">
              <button type="button" class="btn-secondary" data-close-modal="create-user-modal">Cancel</button>
              <button type="submit" class="btn-primary">Create User</button>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');
    setTimeout(() => document.getElementById('cu-username')?.focus(), 50);
  }

  function closeCreateUserModal() {
    const modal = document.getElementById('create-user-modal');
    if (modal) modal.classList.add('hidden');
    const form = document.getElementById('create-user-form');
    if (form) form.reset();
    const msg = document.getElementById('create-user-msg');
    if (msg) { msg.classList.add('hidden'); msg.textContent = ''; }
  }

  async function handleCreateUser(e) {
    e.preventDefault();
    const username = document.getElementById('cu-username').value.trim();
    const displayName = document.getElementById('cu-display').value.trim();
    const email = document.getElementById('cu-email').value.trim();
    const mobile = document.getElementById('cu-mobile').value.trim();
    const role = document.getElementById('cu-role').value;
    const klass = document.getElementById('cu-class').value.trim();
    const password = document.getElementById('cu-password').value;
    const msg = document.getElementById('create-user-msg');

    msg.classList.add('hidden');
    msg.textContent = '';

    if (!username || !displayName || !password) {
      msg.textContent = 'Username, display name, and password are required.';
      msg.classList.remove('hidden');
      return;
    }

    try {
      // Use CK API — this handles Supabase auth + profile creation
      if (window.CK && typeof window.CK.createUser === 'function') {
        const r = await window.CK.createUser({
          username, display_name: displayName, email, mobile, role,
          class_name: klass, password,
        });
        if (!r.ok) throw new Error(r.error || 'Creation failed');
      } else {
        throw new Error('CK.createUser is not available. Please reload.');
      }

      closeCreateUserModal();
      toast(`User "${username}" created`, 'success');
      if (typeof loadUsers === 'function') loadUsers();
      if (typeof loadAdminStats === 'function') loadAdminStats();

    } catch (err) {
      msg.textContent = err.message || 'Failed to create user.';
      msg.classList.remove('hidden');
    }
  }

  function attachCreateUserListeners() {
    const addBtn = document.getElementById('btn-add-user');
    if (addBtn && !addBtn.dataset.bound) {
      addBtn.addEventListener('click', openCreateUserModal);
      addBtn.dataset.bound = 'true';
    }
    const form = document.getElementById('create-user-form');
    if (form && !form.dataset.bound) {
      form.addEventListener('submit', handleCreateUser);
      form.dataset.bound = 'true';
    }
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-modal="create-user-modal"]')) closeCreateUserModal();
    if (e.target.id === 'create-user-modal') closeCreateUserModal();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachCreateUserListeners);
  } else {
    attachCreateUserListeners();
  }
  setInterval(attachCreateUserListeners, 2000);
})();
