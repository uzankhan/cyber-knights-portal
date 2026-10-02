/* ============================================================
   Cyber Knights – API Client
   ============================================================ */
(function () {
  "use strict";
  const API_BASE = "/api/auth";

  async function getJson(url) {
    try {
      const r = await fetch(url, { credentials: "same-origin" });
      const data = await r.json().catch(() => ({}));
      return { status: r.status, ok: r.ok, data };
    } catch (e) {
      return { status: 0, ok: false, data: { ok: false, message: "Network error" } };
    }
  }

  async function postJson(url, body) {
    try {
      const r = await fetch(url, {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body || {}),
      });
      const data = await r.json().catch(() => ({}));
      return { status: r.status, ok: r.ok, data };
    } catch (e) {
      return { status: 0, ok: false, data: { ok: false, message: "Network error" } };
    }
  }

  async function putJson(url, body) {
    try {
      const r = await fetch(url, {
        method: "PUT", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body || {}),
      });
      const data = await r.json().catch(() => ({}));
      return { status: r.status, ok: r.ok, data };
    } catch (e) {
      return { status: 0, ok: false, data: { ok: false, message: "Network error" } };
    }
  }

  async function del(url) {
    try {
      const r = await fetch(url, { method: "DELETE", credentials: "same-origin" });
      const data = await r.json().catch(() => ({}));
      return { status: r.status, ok: r.ok, data };
    } catch (e) {
      return { status: 0, ok: false, data: { ok: false, message: "Network error" } };
    }
  }

  const A = API_BASE;
  const AD = "/api/admin";
  const PO = "/api/portal";

  window.AuthClient = {
    // ---- Auth ----
    login: (u, p) => postJson(`${A}/login`, { username: u, password: p }),
    logout: () => postJson(`${A}/logout`, {}),
    session: () => getJson(`${A}/session`),
    getProfile: () => getJson(`${A}/profile`),
    updateProfile: (p) => putJson(`${A}/profile`, p),

    // ---- Portal (student) ----
    records: () => getJson(`${PO}/records`),
    assignments: () => getJson(`${PO}/assignments`),
    submitAssignment: (id, body) => postJson(`${PO}/assignments/${id}/submit`, body),
    results: () => getJson(`${PO}/results`),
    studentQuizzes: () => getJson(`${PO}/quizzes`),
    getQuizForAttempt: (id) => getJson(`${PO}/quizzes/${id}`),
    submitQuiz: (id, body) => postJson(`${PO}/quizzes/${id}/submit`, body),
    progress: () => getJson(`${PO}/progress`),

    // ---- Admin: overview ----
    adminOverview: () => getJson(`${AD}/overview`),
    adminLogs: () => getJson(`${AD}/logs`),
    clearLogs: () => postJson(`${AD}/logs/clear`, {}),

    // ---- Admin: users ----
    adminListUsers: () => getJson(`${AD}/users`),
    adminCreateUser: (p) => postJson(`${AD}/users`, p),
    adminUpdateUser: (id, p) => putJson(`${AD}/users/${id}`, p),
    adminDeleteUser: (id) => del(`${AD}/users/${id}`),
    adminForceLogout: (id) => postJson(`${AD}/users/${id}/force-logout`, {}),

    // ---- Admin: students (teacher too) ----
    teacherListStudents: () => getJson(`${AD}/students`),
    teacherUpdateStudent: (id, p) => putJson(`${AD}/students/${id}`, p),

    // ---- Admin: sessions ----
    adminSessions: () => getJson(`${AD}/sessions`),
    adminKillSession: (sid) => postJson(`${AD}/sessions/${sid}/kill`, {}),

    // ---- Assignments ----
    adminListAssignments: () => getJson(`${AD}/assignments`),
    adminCreateAssignment: (p) => postJson(`${AD}/assignments`, p),
    adminUpdateAssignment: (id, p) => putJson(`${AD}/assignments/${id}`, p),
    adminDeleteAssignment: (id) => del(`${AD}/assignments/${id}`),
    adminAssignmentSubmissions: (id) => getJson(`${AD}/assignments/${id}/submissions`),
    adminGradeSubmission: (id, p) => postJson(`${AD}/submissions/${id}/grade`, p),

    // ---- Quizzes ----
    adminListQuizzes: () => getJson(`${AD}/quizzes`),
    adminGetQuiz: (id) => getJson(`${AD}/quizzes/${id}`),
    adminCreateQuiz: (p) => postJson(`${AD}/quizzes`, p),
    adminDeleteQuiz: (id) => del(`${AD}/quizzes/${id}`),
    adminQuizSubmissions: (id) => getJson(`${AD}/quizzes/${id}/submissions`),

    // ---- Exams ----
    adminListExams: () => getJson(`${AD}/exams`),
    adminCreateExam: (p) => postJson(`${AD}/exams`, p),
    adminDeleteExam: (id) => del(`${AD}/exams/${id}`),
    adminExamResults: (id) => getJson(`${AD}/exams/${id}/results`),
    adminRecordExamResult: (id, p) => postJson(`${AD}/exams/${id}/record`, p),

    // ---- Test matrix ----
    adminTestMatrix: () => getJson(`${AD}/test-matrix`),
    updateTestMatrix: (id, p) => postJson(`${AD}/test-matrix/${id}`, p),
  };

  console.log("[Cyber Knights] AuthClient loaded");
})();