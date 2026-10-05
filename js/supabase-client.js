/* ============================================================
   Cyber Knights — Supabase Client
   ============================================================ */
(function () {
  "use strict";

  // ============================================================
  // Supabase Config
  // ============================================================
  const SUPABASE_URL = "https://wswhhxiqwinybuxqitzc.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzd2hoeGlxd2lueWJ1eHFpdHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5NDI5NDUsImV4cCI6MjEwNjUxODk0NX0.J1yoE4SCMHQ9HoiJ5LTxIruaqvpqGs2lcjvJJH3qaoo";

  if (typeof window.supabase === "undefined") {
    console.error("[CK] Supabase SDK not loaded. Add the CDN script first.");
    return;
  }

  const { createClient } = window.supabase;
  const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: "ck_auth",
    },
  });

  // ============================================================
  // Public API
  // ============================================================
  window.CK = {
    supabase: client,

    // ---- Auth ----
    async login(username, password) {
      const uname = (username || "").trim().toLowerCase();
      if (!uname || !password) {
        return { ok: false, message: "Enter username and password" };
      }

      // 1. Get email by username via RPC
      const { data: email, error: lookupErr } = await client
        .rpc("get_email_by_username", { p_username: uname });

      if (lookupErr || !email) {
        return { ok: false, message: "Access denied" };
      }

      // 2. Sign in with email + password
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        return { ok: false, message: "Access denied" };
      }

      // 3. Fetch profile
      const { data: profile, error: pErr } = await client
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (pErr || !profile) {
        await client.auth.signOut();
        return { ok: false, message: "Profile not found" };
      }

      return { ok: true, user: profile };
    },

    async logout() {
      await client.auth.signOut();
    },

    async getCurrentUser() {
      const { data: { session } } = await client.auth.getSession();
      if (!session) return null;

      const { data: profile } = await client
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      return profile || null;
    },

    async getSession() {
      const { data: { session } } = await client.auth.getSession();
      return session;
    },

    async updateOwnProfile(payload) {
      const { data: { session } } = await client.auth.getSession();
      if (!session) return { ok: false, message: "Not authenticated" };

      const update = {};
      if (payload.display_name) update.display_name = payload.display_name;
      if (payload.email) update.email = payload.email;
      if (payload.mobile) update.mobile = payload.mobile;
      if (payload.class_name !== undefined) update.class_name = payload.class_name;

      const { error } = await client
        .from("profiles")
        .update(update)
        .eq("id", session.user.id);

      if (error) return { ok: false, message: error.message };

      // Sync name to student record if student
      if (payload.display_name) {
        await client.rpc("sync_student_record", {
          p_owner_id: session.user.id,
          p_display_name: payload.display_name,
          p_class_name: payload.class_name || null,
        });
      }

      // Update password if provided
      if (payload.password && payload.password.length >= 6) {
        const { error: pwErr } = await client.auth.updateUser({
          password: payload.password,
        });
        if (pwErr) return { ok: false, message: pwErr.message };
      }

      return { ok: true };
    },

    // ---- Profiles / Users ----
    async listProfiles() {
      const { data, error } = await client
        .from("profiles")
        .select("*")
        .order("role", { ascending: true })
        .order("username", { ascending: true });
      return { ok: !error, data: data || [], error: error?.message };
    },

    async getProfile(id) {
      const { data, error } = await client
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      return { ok: !error, data, error: error?.message };
    },

    async updateProfile(id, payload) {
      const { error } = await client
        .from("profiles")
        .update(payload)
        .eq("id", id);

      if (error) return { ok: false, message: error.message };

      // Sync student record
      if (payload.display_name || payload.class_name) {
        await client.rpc("sync_student_record", {
          p_owner_id: id,
          p_display_name: payload.display_name || "",
          p_class_name: payload.class_name || null,
        });
      }

      return { ok: true };
    },

    // ---- Student Records ----
    async listRecords() {
      const { data, error } = await client
        .from("student_records")
        .select("*")
        .order("student_code", { ascending: true });
      return { ok: !error, data: data || [], error: error?.message };
    },

    // ---- Assignments ----
    async listAssignments() {
      const { data, error } = await client
        .from("assignments")
        .select("*")
        .order("created_at", { ascending: false });
      return { ok: !error, data: data || [], error: error?.message };
    },

    async createAssignment(payload) {
      const { data: { session } } = await client.auth.getSession();
      const { error } = await client.from("assignments").insert({
        ...payload,
        created_by: session?.user?.id,
      });
      return { ok: !error, error: error?.message };
    },

    async deleteAssignment(id) {
      const { error } = await client.from("assignments").delete().eq("id", id);
      return { ok: !error, error: error?.message };
    },

    async submitAssignment(assignmentId, content) {
      const { data: { session } } = await client.auth.getSession();
      const { error } = await client.from("assignment_submissions").insert({
        assignment_id: assignmentId,
        student_id: session.user.id,
        content,
      });
      return { ok: !error, error: error?.message };
    },

    async listMySubmissions() {
      const { data: { session } } = await client.auth.getSession();
      const { data, error } = await client
        .from("assignment_submissions")
        .select("*")
        .eq("student_id", session.user.id);
      return { ok: !error, data: data || [], error: error?.message };
    },

    async listAllSubmissions(assignmentId) {
      const { data, error } = await client
        .from("assignment_submissions")
        .select("*, profiles:student_id(display_name, username)")
        .eq("assignment_id", assignmentId);
      return { ok: !error, data: data || [], error: error?.message };
    },

    async gradeSubmission(id, marks, feedback) {
      const { error } = await client
        .from("assignment_submissions")
        .update({ marks_awarded: marks, feedback })
        .eq("id", id);
      return { ok: !error, error: error?.message };
    },

    // ---- Quizzes ----
    async listQuizzes() {
      const { data, error } = await client
        .from("quizzes")
        .select("*")
        .order("created_at", { ascending: false });
      return { ok: !error, data: data || [], error: error?.message };
    },

    async getQuizWithQuestions(id) {
      const { data: quiz, error: qErr } = await client
        .from("quizzes")
        .select("*")
        .eq("id", id)
        .single();
      if (qErr) return { ok: false, error: qErr.message };

      const { data: questions, error: qqErr } = await client
        .from("quiz_questions")
        .select("*")
        .eq("quiz_id", id)
        .order("order_index");
      if (qqErr) return { ok: false, error: qqErr.message };

      return { ok: true, quiz, questions };
    },

    async createQuiz(quizPayload, questions) {
      const { data: { session } } = await client.auth.getSession();
      const { data: inserted, error } = await client
        .from("quizzes")
        .insert({ ...quizPayload, created_by: session?.user?.id })
        .select()
        .single();
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
        order_index: i,
      }));

      const { error: qErr } = await client.from("quiz_questions").insert(rows);
      if (qErr) {
        await client.from("quizzes").delete().eq("id", inserted.id);
        return { ok: false, error: qErr.message };
      }
      return { ok: true, id: inserted.id };
    },

    async deleteQuiz(id) {
      const { error } = await client.from("quizzes").delete().eq("id", id);
      return { ok: !error, error: error?.message };
    },

    async submitQuiz(quizId, answers, score, total, finalize = false) {
      const { data: { session } } = await client.auth.getSession();
      const { error } = await client.from("quiz_submissions").upsert({
        quiz_id: quizId,
        student_id: session.user.id,
        answers,
        score,
        total,
        finalized: finalize,
      }, { onConflict: "quiz_id,student_id" });
      return { ok: !error, error: error?.message };
    },

    async listMyQuizSubmissions() {
      const { data: { session } } = await client.auth.getSession();
      const { data, error } = await client
        .from("quiz_submissions")
        .select("*")
        .eq("student_id", session.user.id);
      return { ok: !error, data: data || [], error: error?.message };
    },

    async listAllQuizSubmissions(quizId) {
      const { data, error } = await client
        .from("quiz_submissions")
        .select("*, profiles:student_id(display_name, username)")
        .eq("quiz_id", quizId);
      return { ok: !error, data: data || [], error: error?.message };
    },

    // ---- Exams ----
    async listExams() {
      const { data, error } = await client
        .from("exams")
        .select("*")
        .order("created_at", { ascending: false });
      return { ok: !error, data: data || [], error: error?.message };
    },

    async createExam(payload) {
      const { data: { session } } = await client.auth.getSession();
      const { error } = await client.from("exams").insert({
        ...payload,
        created_by: session?.user?.id,
      });
      return { ok: !error, error: error?.message };
    },

    async deleteExam(id) {
      const { error } = await client.from("exams").delete().eq("id", id);
      return { ok: !error, error: error?.message };
    },

    async listExamResults(examId) {
      const { data, error } = await client
        .from("exam_results")
        .select("*, profiles:student_id(display_name, username)")
        .eq("exam_id", examId);
      return { ok: !error, data: data || [], error: error?.message };
    },

    async recordExamResult(examId, studentId, marks, grade) {
      const { error } = await client.from("exam_results").upsert({
        exam_id: examId,
        student_id: studentId,
        marks_obtained: marks,
        grade,
      }, { onConflict: "exam_id,student_id" });
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

    // ---- Audit Logs ----
    async logEvent(action, factor, result, details) {
      try {
        const { data: { session } } = await client.auth.getSession();
        if (!session) return;
        const { data: profile } = await client
          .from("profiles")
          .select("username, role")
          .eq("id", session.user.id)
          .single();
        await client.from("audit_logs").insert({
          user_id: session.user.id,
          username: profile?.username,
          role: profile?.role,
          action, factor, result, details,
        });
      } catch (e) {
        console.warn("[CK] Log failed:", e);
      }
    },

    async listLogs() {
      const { data, error } = await client
        .from("audit_logs")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(300);
      return { ok: !error, data: data || [], error: error?.message };
    },

    async clearLogs() {
      const { error } = await client
        .from("audit_logs")
        .delete()
        .neq("id", 0);
      return { ok: !error, error: error?.message };
    },

    // ---- Test Matrix ----
    async listTestMatrix() {
      const { data, error } = await client
        .from("test_matrix")
        .select("*")
        .order("test_id");
      return { ok: !error, data: data || [], error: error?.message };
    },

    async updateTestMatrix(testId, payload) {
      const { data: { session } } = await client.auth.getSession();
      const { data: profile } = await client
        .from("profiles")
        .select("username")
        .eq("id", session.user.id)
        .single();
      const { error } = await client
        .from("test_matrix")
        .update({
          ...payload,
          tester_username: profile?.username,
          tested_at: new Date().toISOString(),
        })
        .eq("test_id", testId);
      return { ok: !error, error: error?.message };
    },
  };

  console.log("[CK] Supabase client ready");
})();