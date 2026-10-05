/* ============================================================
   CYBER KNIGHTS — Central Data Sync
   Ek jagah update → sab jagah reflect
   ============================================================ */
(function () {
  "use strict";

  const EVENTS = {
    USER_CREATED: 'ck:user-created',
    USER_UPDATED: 'ck:user-updated',
    USER_DELETED: 'ck:user-deleted',
    USERS_CHANGED: 'ck:users-changed',
    RECORDS_CHANGED: 'ck:records-changed',
    ASSIGNMENT_CHANGED: 'ck:assignment-changed',
    QUIZ_CHANGED: 'ck:quiz-changed',
    EXAM_CHANGED: 'ck:exam-changed',
    LOG_ADDED: 'ck:log-added',
  };

  // Central data store
  const Store = {
    users: [],
    records: [],
    assignments: [],
    quizzes: [],
    exams: [],
    logs: [],

    setUsers(list) {
      this.users = list || [];
      window.dispatchEvent(new CustomEvent(EVENTS.USERS_CHANGED, { detail: list }));
    },
    setRecords(list) {
      this.records = list || [];
      window.dispatchEvent(new CustomEvent(EVENTS.RECORDS_CHANGED, { detail: list }));
    },
    setAssignments(list) {
      this.assignments = list || [];
      window.dispatchEvent(new CustomEvent(EVENTS.ASSIGNMENT_CHANGED, { detail: list }));
    },
    setQuizzes(list) {
      this.quizzes = list || [];
      window.dispatchEvent(new CustomEvent(EVENTS.QUIZ_CHANGED, { detail: list }));
    },
    setExams(list) {
      this.exams = list || [];
      window.dispatchEvent(new CustomEvent(EVENTS.EXAM_CHANGED, { detail: list }));
    },

    notifyUserChanged(action, user) {
      const eventName = action === 'create' ? EVENTS.USER_CREATED
        : action === 'update' ? EVENTS.USER_UPDATED
        : EVENTS.USER_DELETED;
      window.dispatchEvent(new CustomEvent(eventName, { detail: user }));
      window.dispatchEvent(new CustomEvent(EVENTS.USERS_CHANGED, { detail: this.users }));

      // Invalidate all caches
      Object.keys(localStorage)
        .filter(k => k.startsWith('ck_') && k.includes('cache'))
        .forEach(k => localStorage.removeItem(k));
    },

    notifyRecordChanged(record) {
      window.dispatchEvent(new CustomEvent(EVENTS.RECORDS_CHANGED, { detail: record }));
    },

    notifyLog(entry) {
      window.dispatchEvent(new CustomEvent(EVENTS.LOG_ADDED, { detail: entry }));
    }
  };

  window.CKSync = { Store, EVENTS };
  console.log('[CK] Data sync ready');
})();