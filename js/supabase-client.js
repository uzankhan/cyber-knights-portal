/* ============================================================
   Cyber Knights — Supabase Client (FULL)
   ============================================================ */
(function () {
  "use strict";

  const SUPABASE_URL = "https://wswhhxiqwinybuxqitzc.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzd2hoeGlxd2lueWJ1eHFpdHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5NDI5NDUsImV4cCI6MjEwNjUxODk0NX0.J1yoE4SCMHQ9HoiJ5LTxIruaqvpqGs2lcjvJJH3qaoo";

  if (typeof window.supabase === "undefined") {
    console.error("[CK] Supabase SDK not loaded.");
    return;
  }

  const { createClient } = window.supabase;
  const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: "ck_auth" },
  });

  window.CK = {
    supabase: client,

    // ---- AUTH ----
    async login(username, password) {
      const uname = (username || "").trim().toLowerCase();
      if (!uname || !password) return { ok: false, message: "Enter username and password" };

      const { data: email, error: lookupErr } = await client
        .rpc("get_email_by_username", { p_username: uname });
      if (lookupErr || !email) return { ok: false, message: "Access denied" };

      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error || !data.user) return { ok: false, message: "Access denied" };

      const { data: profile, error: pErr } = await client
        .from("profiles").select("*").eq("id", data.user.id).single();
      if (pErr || !profile) { await client.auth.signOut(); return { ok: false, message: "Profile not found" }; }

      return { ok: true, user: profile };
    },

    async logout() { await client.auth.signOut(); },

    async getCurrentUser() {
      const { data: { session } } = await client.auth.getSession();
      if (!session) return null;
      const { data: profile } = await client.from("profiles").select("*").eq("id", session.user.id).single();
      return profile || null;
    },

    async getSession() {
      const { data: { session } } = await client.auth.getSession();
      return session;
    },

    // ---- PROFILES ----
    async listProfiles() {
      const { data, error } = await client.from("profiles").select("*").order("created_at", { ascending: false });
      return { ok: !error, data: data || [], error: error?.message };
    },

    async updateOwnProfile(payload) {
      const { data: { session } } = await client.auth.getSession();
      if (!session) return { ok: false, message: "Not authenticated" };
      const update = {};
      if (payload.display_name) update.display_name = payload.display_name;
      if (payload.email) update.email = payload.email;
      if (payload.mobile) update.mobile = payload.mobile;
      if (payload.class_name !== undefined) update.class_name = payload.class_name;

      const { error } = await client.from("profiles").update(update).eq("id", session.user.id);
      if (error) return { ok: false, message: error.message };

      if (payload.display_name) {
        await client.from("student_records").update({
          name: payload.display_name,
          class_name: payload.class_name || null,
        }).eq("id", session.user.id);
      }
      return { ok: true };
    },

    async updateProfile(userId, payload) {
      const { error } = await client.from("profiles").update(payload).eq("id", userId);
      return { ok: !error, error: error?.message };
    },

    async createUser(payload) {
      const {
        username, display_name, email, mobile, role, class_name, password
      } = payload;
      const userEmail = (email && email.trim()) || `${username}@cyberknights.local`;

      const { data, error } = await client.rpc("create_user_admin", {
        p_username: username,
        p_display_name: display_name,
        p_email: userEmail,
        p_mobile: mobile || null,
        p_role: role || "student",
        p_class_name: class_name || null,
        p_password: password,
      });

      if (error) return { ok: false, error: error.message };
      if (data && data.ok === false) return { ok: false, error: data.error || "Creation failed" };
      return { ok: true, user: data };
    },

    // ---- RECORDS ----
    async listRecords() {
      const { data, error } = await client.from("student_records").select("*").order("student_code", { ascending: true });
      return { ok: !error, data: data || [], error: error?.message };
    },

    // ---- ASSIGNMENTS ----
    async listAssignments() {
      const { data, error } = await client.from("assignments").select("*").order("created_at", { ascending: false });
      return { ok: !error, data: data || [], error: error?.message };
    },

    async createAssignment(payload) {
      const { data: { session } } = await client.auth.getSession();
      const { error } = await client.from("assignments").insert({ ...payload, created_by: session?.user?.id });
      return { ok: !error, error: error?.message };
    },

    async deleteAssignment(id) {
      const { error } = await client.from("assignments").delete().eq("id", id);
      return { ok: !error, error: error?.message };
    },

    async submitAssignment(assignmentId, content, extras = {}) {
      const { data: { session } } = await client.auth.getSession();
      const payload = {
        assignment_id: assignmentId,
        student_id: session.user.id,
        content: content || "",
        submitted_at: new Date().toISOString(),
        status: "pending",
      };
      if (extras.file_url) payload.file_url = extras.file_url;
      if (extras.file_name) payload.file_name = extras.file_name;

      const { error } = await client.from("assignment_submissions").insert(payload);
      return { ok: !error, error: error?.message };
    },

    async listMySubmissions() {
      const { data: { session } } = await client.auth.getSession();
      const { data, error } = await client.from("assignment_submissions").select("*").eq("student_id", session.user.id);
      return { ok: !error, data: data || [], error: error?.message };
    },

    async listAllSubmissions(assignmentId) {
      const { data, error } = await client
        .from("assignment_submissions")
        .select("*")
        .eq("assignment_id", assignmentId);
      return { ok: !error, data: data || [], error: error?.message };
    },

    async gradeSubmission(id, marks, feedback) {
      const { error } = await client
        .from("assignment_submissions")
        .update({
          marks_awarded: marks,
          admin_feedback: feedback,
          status: "accepted",
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", id);
      return { ok: !error, error: error?.message };
    },

    // ---- QUIZZES ----
    async listQuizzes() {
      const { data, error } = await client.from("quizzes").select("*").order("created_at", { ascending: false });
      return { ok: !error, data: data || [], error: error?.message };
    },

    async getQuizWithQuestions(id) {
      const { data: quiz, error: qErr } = await client.from("quizzes").select("*").eq("id", id).single();
      if (qErr) return { ok: false, error: qErr.message };
      const { data: questions, error: qqErr } = await client.from("quiz_questions").select("*").eq("quiz_id", id);
      if (qqErr) return { ok: false, error: qqErr.message };
      return { ok: true, quiz, questions: questions || [] };
    },

    async createQuiz(quizPayload, questions) {
      const { data: { session } } = await client.auth.getSession();
      const { data: inserted, error } = await client.from("quizzes").insert({ ...quizPayload, created_by: session?.user?.id }).select().single();
      if (error) return { ok: false, error: error.message };

      const rows = questions.map((q, i) => ({
        quiz_id: inserted.id,
        question_text: q.question_text,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c || null,
        option_d: q.option_d || null,
        correct_option: q.correct_option,
        marks: q.marks || 1,
      }));
      const { error: qErr } = await client.from("quiz_questions").insert(rows);
      if (qErr) {
        await client.from("quizzes").delete().eq("id", inserted.id);
        return { ok: false, error: qErr.message };
      }
      return { ok: true, id: inserted.id };
    },

    async deleteQuiz(id) {
      await client.from("quiz_questions").delete().eq("quiz_id", id);
      const { error } = await client.from("quizzes").delete().eq("id", id);
      return { ok: !error, error: error?.message };
    },

    async submitQuiz(quizId, answers, score, total, finalize = false) {
      const { data: { session } } = await client.auth.getSession();
      const { data, error } = await client
        .from("quiz_submissions")
        .upsert({
          quiz_id: quizId,
          student_id: session.user.id,
          answers,
          score,
          total,
          finalized: finalize,
          submitted_at: new Date().toISOString(),
        }, { onConflict: "quiz_id,student_id" })
        .select()
        .single();
      return { ok: !error, error: error?.message, data: data || null };
    },

    async listMyQuizSubmissions() {
      const { data: { session } } = await client.auth.getSession();
      const { data, error } = await client.from("quiz_submissions").select("*").eq("student_id", session.user.id);
      return { ok: !error, data: data || [], error: error?.message };
    },

    // ---- EXAMS ----
    async listExams() {
      const { data, error } = await client.from("exams").select("*").order("created_at", { ascending: false });
      return { ok: !error, data: data || [], error: error?.message };
    },

    async createExam(payload) {
      const { data: { session } } = await client.auth.getSession();
      const { error } = await client.from("exams").insert({ ...payload, created_by: session?.user?.id });
      return { ok: !error, error: error?.message };
    },

    async deleteExam(id) {
      const { error } = await client.from("exams").delete().eq("id", id);
      return { ok: !error, error: error?.message };
    },

    async listMyExamResults() {
      const { data: { session } } = await client.auth.getSession();
      const { data, error } = await client
        .from("exam_results")
        .select("*, exams:exam_id(title, total_marks)")
        .eq("student_id", session.user.id);
      return { ok: !error, data: data || [], error: error?.message };
    },

    // ---- AUDIT LOGS ----
    async logEvent(action, factor, result, details) {
      try {
        const { data: { session } } = await client.auth.getSession();
        await client.from("audit_logs").insert({
          user_id: session?.user?.id || null,
          username: session?.user?.email || "system",
          action, factor, result, details,
          timestamp: new Date().toISOString(),
        });
      } catch (e) { console.warn("Log failed", e); }
    },

    async listLogs() {
      const { data, error } = await client.from("audit_logs").select("*").order("timestamp", { ascending: false }).limit(200);
      return { ok: !error, data: data || [], error: error?.message };
    },

    async clearLogs() {
      const { error } = await client.from("audit_logs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      return { ok: !error, error: error?.message };
    },

    // ---- TEST MATRIX (optional) ----
    async listTestMatrix() {
      const { data, error } = await client.from("test_matrix").select("*");
      return { ok: !error, data: data || [], error: error?.message };
    },

    async updateTestMatrix(testId, payload) {
      const { error } = await client.from("test_matrix").update(payload).eq("test_id", testId);
      return { ok: !error, error: error?.message };
    },
  };

  console.log("[CK] Supabase client ready");
})();
