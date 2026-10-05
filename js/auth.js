/* ============================================================
   Cyber Knights — Auth Helpers
   ============================================================ */
(function () {
  "use strict";

  window.CKAuth = {
    isStaff(role) { return role === "admin" || role === "teacher"; },
    isAdmin(role) { return role === "admin"; },
    isStudent(role) { return role === "student"; },

    canAccess(role, page) {
      const perms = {
        student: ["dashboard", "records", "assignments", "quizzes", "exams", "results", "progress"],
        teacher: ["dashboard", "records", "assignments", "quizzes", "exams", "results", "students", "logs"],
        admin:   ["dashboard", "records", "assignments", "quizzes", "exams", "results", "admin", "students", "logs"],
      };
      return (perms[role] || []).includes(page);
    },

    formatDate(iso) {
      if (!iso) return "—";
      try { return new Date(iso).toLocaleString(); }
      catch { return iso; }
    },
  };

  console.log("[CK] Auth helpers ready");
})();