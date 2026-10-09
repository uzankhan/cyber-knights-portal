/* ============================================================
   CYBER KNIGHTS — Features V2
   Progress Tracking · Assignment Types · Report Card
   Modular — hooks into existing app.js without breaking it
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const sb = () => window.CK?.supabase || window.supabaseClient;
  const user = () => window.CK?.currentUser || window.currentUser || null;

  // ============================================================
  // UTILITIES
  // ============================================================
  function escapeHtml(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function fmtDate(iso) {
    if (!iso) return '—';
    try { return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); }
    catch { return iso; }
  }
  function toast(msg, type = 'info') {
    if (window.toast) return window.toast(msg, type);
    const c = document.getElementById('toast-container');
    if (!c) return alert(msg);
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3200);
  }
  function pctToGrade(pct) {
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B+';
    if (pct >= 60) return 'B';
    if (pct >= 50) return 'C';
    if (pct >= 40) return 'D';
    return 'F';
  }

  // ============================================================
  // FEATURE 1: CURRICULUM PROGRESS (ADMIN TICK)
  // ============================================================
  async function loadCurriculumProgress() {
    const wrap = $('#curriculum-progress-list');
    if (!wrap || !sb()) return;

    wrap.innerHTML = '<div class="loading-msg">Loading curriculum…</div>';

    const { data: taught } = await sb().from('taught_topics').select('*');
    const taughtMap = {};
    (taught || []).forEach(t => { taughtMap[t.chapter_id] = t; });

    const bookData = window.CKBooks?.getBook?.() || window.BOOK || null;
    const sections = bookData?.sections || [];

    if (!sections.length) {
      wrap.innerHTML = '<div class="empty-msg">Book data not loaded yet.</div>';
      return;
    }

    wrap.innerHTML = sections.map(section => {
      const isFront = section.type === 'matter';
      const label = isFront ? 'Front Matter' : `Module ${String(section.number).padStart(2, '0')}`;
      const taughtCount = section.chapters.filter(c => taughtMap[c.id]).length;

      return `
        <div class="curriculum-module" data-module="${escapeHtml(section.id)}">
          <div class="curriculum-module-head">
            <span class="curriculum-module-icon">${section.icon || '📖'}</span>
            <div>
              <h4>${escapeHtml(label)} · ${escapeHtml(section.title)}</h4>
              <span class="curriculum-module-meta">
                ${taughtCount}/${section.chapters.length} topics taught
              </span>
            </div>
          </div>
          <ul class="curriculum-chapter-list">
            ${section.chapters.map(ch => {
              const isTaught = !!taughtMap[ch.id];
              return `
                <li class="curriculum-chapter-item ${isTaught ? 'taught' : ''}">
                  <label class="curriculum-checkbox">
                    <input type="checkbox" data-chapter-id="${escapeHtml(ch.id)}"
                      data-module-id="${escapeHtml(section.id)}"
                      data-chapter-title="${escapeHtml(ch.title)}"
                      ${isTaught ? 'checked' : ''} />
                    <span class="curriculum-chapter-id">${escapeHtml(ch.id)}</span>
                    <span class="curriculum-chapter-title">${escapeHtml(ch.title)}</span>
                  </label>
                  ${isTaught ? `<span class="curriculum-taught-date">${fmtDate(taughtMap[ch.id].taught_at)}</span>` : ''}
                </li>
              `;
            }).join('')}
          </ul>
        </div>
      `;
    }).join('');

    wrap.querySelectorAll('input[data-chapter-id]').forEach(cb => {
      cb.addEventListener('change', handleTaughtToggle);
    });
  }

  async function handleTaughtToggle(e) {
    const cb = e.target;
    const chapterId = cb.dataset.chapterId;
    const moduleId = cb.dataset.moduleId;
    const title = cb.dataset.chapterTitle;
    const isNow = cb.checked;
    const u = user();

    try {
      if (isNow) {
        const { error } = await sb().from('taught_topics').insert({
          chapter_id: chapterId, module_id: moduleId,
          chapter_title: title, taught_by: u?.id
        });
        if (error) throw error;
        cb.closest('.curriculum-chapter-item')?.classList.add('taught');
        toast(`Marked "${title}" as taught`, 'success');
      } else {
        const { error } = await sb().from('taught_topics').delete().eq('chapter_id', chapterId);
        if (error) throw error;
        cb.closest('.curriculum-chapter-item')?.classList.remove('taught');
        toast(`Unmarked "${title}"`, 'info');
      }

      const mod = cb.closest('.curriculum-module');
      if (mod) {
        const total = mod.querySelectorAll('input[data-chapter-id]').length;
        const checked = mod.querySelectorAll('input[data-chapter-id]:checked').length;
        const meta = mod.querySelector('.curriculum-module-meta');
        if (meta) meta.textContent = `${checked}/${total} topics taught`;
      }
    } catch (err) {
      cb.checked = !isNow;
      toast('Failed: ' + err.message, 'error');
    }
  }

  // ============================================================
  // FEATURE 1b: STUDENT PROGRESS VIEW ENHANCEMENT
  // ============================================================
  async function enhanceStudentProgress() {
    const container = $('#progress-breakdown');
    if (!container || !sb()) return;

    const u = user();
    if (!u || u.role !== 'student') return;

    const { data: taught } = await sb().from('taught_topics').select('*');
    const taughtMap = {};
    (taught || []).forEach(t => { taughtMap[t.chapter_id] = t; });

    const bookData = window.CKBooks?.getBook?.() || window.BOOK || null;
    const sections = bookData?.sections || [];
    if (!sections.length) return;

    // Add module progress cards before the existing breakdown
    const moduleCards = sections.map(section => {
      const isFront = section.type === 'matter';
      const label = isFront ? 'Front Matter' : `Module ${String(section.number).padStart(2, '0')}`;
      const total = section.chapters.length;
      const taughtCount = section.chapters.filter(c => taughtMap[c.id]).length;
      const pct = total ? Math.round((taughtCount / total) * 100) : 0;

      const chapterList = section.chapters.map(ch => {
        const isTaught = !!taughtMap[ch.id];
        return `
          <li class="chapter-progress-item ${isTaught ? 'taught' : ''}">
            <span class="chapter-tick ${isTaught ? 'tick-done' : 'tick-pending'}">${isTaught ? '✓' : '○'}</span>
            <span class="chapter-id">${escapeHtml(ch.id)}</span>
            <span class="chapter-name">${escapeHtml(ch.title)}</span>
          </li>
        `;
      }).join('');

      return `
        <div class="progress-card ${pct === 100 ? 'completed' : ''}">
          <div class="progress-card-head">
            <span class="progress-card-icon">${section.icon || '📖'}</span>
            <div class="progress-card-info">
              <h4>${escapeHtml(label)} · ${escapeHtml(section.title)}</h4>
              <span class="progress-card-meta">${taughtCount}/${total} topics · ${pct}%</span>
            </div>
            ${pct === 100 ? '<span class="progress-card-badge">Complete</span>' : ''}
          </div>
          <div class="progress-bar-wrap small">
            <div class="progress-bar" style="width:${pct}%"></div>
          </div>
          <ul class="chapter-progress-list">${chapterList}</ul>
        </div>
      `;
    }).join('');

    // Insert module cards at top of breakdown
    container.insertAdjacentHTML('afterbegin', moduleCards);
  }

  // ============================================================
  // FEATURE 2: ASSIGNMENT — Link/File/Text Submission
  // ============================================================
  function enhanceAssignmentCreateForm() {
    // Already handled in HTML — nothing extra needed
  }

  function enhanceAssignmentSubmitModal() {
    // Hook into existing submit button
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-submit-assignment]');
      if (btn) {
        const aid = btn.dataset.submitAssignment;
        setTimeout(() => prepSubmitModal(aid), 50);
      }
    });

    // Also hook on submit button inside assignment submit modal
    const form = $('#assignment-submit-form');
    if (form && !form.dataset.v2bound) {
      form.dataset.v2bound = 'true';
      form.addEventListener('submit', handleV2AssignmentSubmit);
    }

    // File input preview
    const fileInput = $('#asub-file');
    if (fileInput && !fileInput.dataset.v2bound) {
      fileInput.dataset.v2bound = 'true';
      fileInput.addEventListener('change', () => {
        const f = fileInput.files[0];
        const pv = $('#asub-file-preview');
        if (!f) { pv?.classList.add('hidden'); return; }
        pv.textContent = `📎 ${f.name} (${(f.size / 1024).toFixed(1)} KB)`;
        pv.classList.remove('hidden');
      });
    }
  }

  async function prepSubmitModal(aid) {
    const sb_client = sb();
    if (!sb_client) return;

    // Fetch assignment to get submission_type
    const { data: assignment } = await sb_client
      .from('assignments').select('*').eq('id', aid).single();
    if (!assignment) return;

    const type = assignment.submission_type || 'text';
    $('#asub-id').value = aid;
    $('#asub-type').value = type;

    // Reset all groups
    $('#asub-text-group')?.classList.add('hidden');
    $('#asub-link-group')?.classList.add('hidden');
    $('#asub-file-group')?.classList.add('hidden');
    $('#asub-hint')?.classList.add('hidden');

    if (type === 'link') $('#asub-link-group')?.classList.remove('hidden');
    else if (type === 'file') $('#asub-file-group')?.classList.remove('hidden');
    else $('#asub-text-group')?.classList.remove('hidden');

    if (assignment.submission_instructions) {
      const h = $('#asub-hint');
      h.textContent = '📌 ' + assignment.submission_instructions;
      h.classList.remove('hidden');
    }

    // Clear previous values
    if ($('#asub-link')) $('#asub-link').value = '';
    if ($('#asub-content')) $('#asub-content').value = '';
    if ($('#asub-file')) $('#asub-file').value = '';
    $('#asub-file-preview')?.classList.add('hidden');
    $('#asub-msg')?.classList.add('hidden');
  }

  async function handleV2AssignmentSubmit(e) {
    // Only handle if this modal is using v2 fields
    const typeField = $('#asub-type');
    if (!typeField) return; // v1 modal — let original handler run

    const type = typeField.value;
    // If text type, let original handler handle it
    if (type === 'text') return;

    e.preventDefault();
    e.stopPropagation();

    const aid = $('#asub-id').value;
    const msg = $('#asub-msg');
    msg.classList.add('hidden');

    let content = '';
    let fileUrl = null;
    let fileName = null;

    try {
      if (type === 'link') {
        content = $('#asub-link').value.trim();
        if (!content || !/^https?:\/\//i.test(content)) {
          msg.textContent = 'Please enter a valid URL (starting with http:// or https://)';
          msg.classList.remove('hidden');
          return;
        }
      } else if (type === 'file') {
        const file = $('#asub-file').files[0];
        if (!file) {
          msg.textContent = 'Please select a file';
          msg.classList.remove('hidden');
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          msg.textContent = 'File must be under 10 MB';
          msg.classList.remove('hidden');
          return;
        }

        msg.textContent = 'Uploading…';
        msg.classList.remove('hidden');

        const u = user();
        const ext = file.name.split('.').pop();
        const path = `${u.id}/${aid}-${Date.now()}.${ext}`;

        const { data: up, error: upErr } = await sb().storage
          .from('assignment-files')
          .upload(path, file, { cacheControl: '3600', upsert: false });

        if (upErr) throw upErr;
        fileUrl = up.path;
        fileName = file.name;
        content = file.name;
      }

      const u = user();
      const { error } = await sb().from('assignment_submissions').insert({
        assignment_id: aid,
        student_id: u.id,
        content: content,
        file_url: fileUrl,
        file_name: fileName,
        submitted_at: new Date().toISOString(),
        status: 'pending'
      });

      if (error) throw error;

      toast('Assignment submitted!', 'success');
      $('#assignment-submit-modal')?.classList.add('hidden');
      window.dispatchEvent(new CustomEvent('ck:activity-completed'));

      // Reload assignments if possible
      if (window.CK?.loadStudentAssignments) window.CK.loadStudentAssignments();
    } catch (err) {
      console.error(err);
      msg.textContent = err.message || 'Submission failed';
      msg.classList.remove('hidden');
    }
  }

  // ============================================================
  // FEATURE 3: REPORT CARD
  // ============================================================
  function bindResultsTabs() {
    $$('.results-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.results-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const which = tab.dataset.rtab;
        const exams = $('#results-exams-view');
        const report = $('#results-report-view');

        if (which === 'report') {
          exams?.classList.add('hidden');
          report?.classList.remove('hidden');
          loadReportCard();
        } else {
          report?.classList.add('hidden');
          exams?.classList.remove('hidden');
        }
      });
    });
  }

  async function loadReportCard() {
    const summary = $('#report-card-summary');
    const detail = $('#report-card-detail');
    if (!summary || !detail || !sb()) return;

    const u = user();
    if (!u) return;

    summary.innerHTML = '<div class="loading-msg">Loading report card…</div>';
    detail.innerHTML = '';

    // Load all activities
    const [quizRes, assignRes, examRes] = await Promise.all([
      sb().from('quiz_submissions')
        .select('id, quiz_id, score, total, finalized, submitted_at, quizzes(title, total_marks)')
        .eq('student_id', u.id).eq('finalized', true),
      sb().from('assignment_submissions')
        .select('id, assignment_id, marks_awarded, submitted_at, status, assignments(title, total_marks)')
        .eq('student_id', u.id).not('marks_awarded', 'is', null),
      sb().from('exam_results')
        .select('id, exam_id, marks_obtained, grade, recorded_at, exams(title, total_marks)')
        .eq('student_id', u.id)
    ]);

    const items = [];

    (quizRes.data || []).forEach(q => {
      items.push({
        type: 'Quiz', id: q.id,
        title: q.quizzes?.title || 'Quiz',
        score: q.score, total: q.total || q.quizzes?.total_marks || 0,
        date: q.submitted_at
      });
    });

    (assignRes.data || []).forEach(a => {
      items.push({
        type: 'Assignment', id: a.id,
        title: a.assignments?.title || 'Assignment',
        score: a.marks_awarded, total: a.assignments?.total_marks || 0,
        date: a.submitted_at
      });
    });

    (examRes.data || []).forEach(e => {
      items.push({
        type: 'Exam', id: e.id,
        title: e.exams?.title || 'Exam',
        score: e.marks_obtained, total: e.exams?.total_marks || 0,
        date: e.recorded_at
      });
    });

    items.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (!items.length) {
      summary.innerHTML = '<div class="empty-msg">No activity yet. Complete a quiz, assignment, or exam to see results.</div>';
      return;
    }

    const totalScore = items.reduce((s, i) => s + (i.score || 0), 0);
    const totalMax = items.reduce((s, i) => s + (i.total || 0), 0);
    const pct = totalMax ? Math.round((totalScore / totalMax) * 100) : 0;

    summary.innerHTML = `
      <div class="report-summary-card">
        <div class="report-stat">
          <span class="report-stat-num">${pct}%</span>
          <span class="report-stat-label">Overall</span>
        </div>
        <div class="report-stat">
          <span class="report-stat-num">${pctToGrade(pct)}</span>
          <span class="report-stat-label">Grade</span>
        </div>
        <div class="report-stat">
          <span class="report-stat-num">${items.length}</span>
          <span class="report-stat-label">Activities</span>
        </div>
      </div>
    `;

    detail.innerHTML = `
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Type</th><th>Title</th><th>Score</th>
              <th>Total</th><th>%</th><th>Grade</th>
              <th>Date</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(i => {
              const p = i.total ? Math.round((i.score / i.total) * 100) : 0;
              return `
                <tr>
                  <td><span class="badge badge-${i.type.toLowerCase()}">${i.type}</span></td>
                  <td>${escapeHtml(i.title)}</td>
                  <td>${i.score ?? '—'}</td>
                  <td>${i.total}</td>
                  <td>${p}%</td>
                  <td><strong>${pctToGrade(p)}</strong></td>
                  <td>${escapeHtml(fmtDate(i.date))}</td>
                  <td>
                    <button class="mini-btn" data-view-result="${i.type}:${i.id}">View</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    detail.querySelectorAll('[data-view-result]').forEach(btn => {
      btn.addEventListener('click', () => {
        const [type, id] = btn.dataset.viewResult.split(':');
        if (type === 'Quiz') viewQuizResult(id);
        else if (type === 'Assignment') viewAssignmentResult(id);
        else toast('Exam detail view coming soon', 'info');
      });
    });
  }

  async function viewQuizResult(subId) {
    const { data: details } = await sb().from('quiz_attempt_details')
      .select('*').eq('submission_id', subId);

    if (!details || !details.length) {
      toast('No detailed data for this attempt', 'info');
      return;
    }

    const qIds = details.map(d => d.question_id);
    const { data: questions } = await sb().from('quiz_questions')
      .select('id, question_text, options, correct_option').in('id', qIds);

    const qMap = {};
    (questions || []).forEach(q => { qMap[q.id] = q; });

    const html = `
      <div class="modal-overlay" id="quiz-detail-overlay">
        <div class="modal-card modal-card-lg">
          <div class="modal-head">
            <h3>Quiz Result Detail</h3>
            <button class="modal-close" onclick="document.getElementById('quiz-detail-overlay').remove()">×</button>
          </div>
          <div class="modal-body">
            ${details.map((d, i) => {
              const q = qMap[d.question_id];
              return `
                <div class="quiz-detail-item ${d.is_correct ? 'correct' : 'wrong'}">
                  <div class="quiz-detail-q"><strong>Q${i + 1}.</strong> ${escapeHtml(q?.question_text || '—')}</div>
                  <div class="quiz-detail-answers">
                    <span class="detail-label">Your Answer:</span>
                    <span class="your-answer">${escapeHtml(d.selected_option || '—')}</span>
                    ${!d.is_correct ? `<span class="detail-label">Correct:</span><span class="correct-answer">${escapeHtml(d.correct_option)}</span>` : ''}
                  </div>
                  <div class="quiz-detail-marks">${d.marks_awarded} / ${d.marks_possible} marks</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
    document.getElementById('quiz-detail-overlay')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
  }

  async function viewAssignmentResult(subId) {
    const { data: sub } = await sb().from('assignment_submissions')
      .select('*, assignments(title, total_marks, submission_type)')
      .eq('id', subId).single();

    if (!sub) return;

    const type = sub.assignments?.submission_type || 'text';
    let contentHtml = '';
    if (type === 'link' && sub.content) {
      contentHtml = `<a href="${escapeHtml(sub.content)}" target="_blank" rel="noopener">${escapeHtml(sub.content)}</a>`;
    } else if (type === 'file' && sub.file_url) {
      contentHtml = `<a href="${escapeHtml(sub.file_url)}" target="_blank" rel="noopener">📎 ${escapeHtml(sub.file_name || 'Download')}</a>`;
    } else {
      contentHtml = `<div>${escapeHtml(sub.content || '—')}</div>`;
    }

    const html = `
      <div class="modal-overlay" id="assign-detail-overlay">
        <div class="modal-card">
          <div class="modal-head">
            <h3>${escapeHtml(sub.assignments?.title || 'Assignment')}</h3>
            <button class="modal-close" onclick="document.getElementById('assign-detail-overlay').remove()">×</button>
          </div>
          <div class="modal-body">
            <p><strong>Submission:</strong></p>
            <div class="sub-review-content">${contentHtml}</div>
            <p><strong>Marks:</strong> ${sub.marks_awarded} / ${sub.assignments?.total_marks}</p>
            ${sub.admin_feedback ? `<p><strong>Feedback:</strong> ${escapeHtml(sub.admin_feedback)}</p>` : ''}
            <p><strong>Status:</strong> <span class="sub-status status-${sub.status || 'pending'}">${sub.status || 'pending'}</span></p>
          </div>
        </div>
      </div>
    `;
    document.getElementById('assign-detail-overlay')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);
  }

  // ============================================================
  // ADMIN: VIEW SUBMISSIONS WITH REVIEW
  // ============================================================
  async function viewSubmissionsWithReview(aid) {
    const { data: subs } = await sb().from('assignment_submissions')
      .select('*, profiles(display_name, username), assignments(title, total_marks, submission_type)')
      .eq('assignment_id', aid);

    if (!subs || !subs.length) {
      toast('No submissions yet', 'info');
      return;
    }

    const first = subs[0];
    const assignTitle = first.assignments?.title || 'Assignment';
    const totalMarks = first.assignments?.total_marks || 0;
    const type = first.assignments?.submission_type || 'text';

    const html = `
      <div class="modal-overlay" id="subs-review-overlay">
        <div class="modal-card modal-card-lg">
          <div class="modal-head">
            <h3>${escapeHtml(assignTitle)} — Submissions</h3>
            <button class="modal-close" onclick="document.getElementById('subs-review-overlay').remove()">×</button>
          </div>
          <div class="modal-body">
            ${subs.map(s => {
              const name = s.profiles?.display_name || s.profiles?.username || 'Student';
              let contentHtml = '';
              if (type === 'link' && s.content) {
                contentHtml = `<a href="${escapeHtml(s.content)}" target="_blank" rel="noopener" class="sub-link">${escapeHtml(s.content)}</a>`;
              } else if (type === 'file' && s.file_url) {
                contentHtml = `<a href="${escapeHtml(s.file_url)}" target="_blank" rel="noopener" class="sub-file-link">📎 ${escapeHtml(s.file_name || 'Download')}</a>`;
              } else {
                contentHtml = `<div>${escapeHtml(s.content || '—')}</div>`;
              }

              return `
                <div class="submission-review-card" data-sub-id="${s.id}">
                  <div class="sub-review-head">
                    <strong>${escapeHtml(name)}</strong>
                    <span class="sub-status status-${s.status || 'pending'}">${s.status || 'pending'}</span>
                    ${s.marks_awarded != null ? `<span class="sub-marks">${s.marks_awarded}/${totalMarks}</span>` : ''}
                  </div>
                  <div class="sub-review-content">${contentHtml}</div>
                  <div class="sub-review-actions">
                    <input type="number" class="sub-marks-input" min="0" max="${totalMarks}"
                      placeholder="Marks" value="${s.marks_awarded ?? ''}" />
                    <input type="text" class="sub-feedback-input"
                      placeholder="Feedback (optional)" value="${escapeHtml(s.admin_feedback || '')}" />
                    <button class="btn-primary btn-sm" data-accept="${s.id}">Accept</button>
                    <button class="btn-secondary btn-sm" data-reject="${s.id}">Reject</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    document.getElementById('subs-review-overlay')?.remove();
    document.body.insertAdjacentHTML('beforeend', html);

    document.querySelectorAll('[data-accept]').forEach(btn => {
      btn.addEventListener('click', () => reviewSubmission(btn.dataset.accept, 'accepted'));
    });
    document.querySelectorAll('[data-reject]').forEach(btn => {
      btn.addEventListener('click', () => reviewSubmission(btn.dataset.reject, 'rejected'));
    });
  }

  async function reviewSubmission(subId, status) {
    const card = document.querySelector(`[data-sub-id="${subId}"]`);
    if (!card) return;
    const marks = parseInt(card.querySelector('.sub-marks-input').value) || 0;
    const feedback = card.querySelector('.sub-feedback-input').value.trim();
    const u = user();

    const { error } = await sb().from('assignment_submissions').update({
      marks_awarded: marks,
      admin_feedback: feedback,
      status: status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: u.id
    }).eq('id', subId);

    if (error) {
      toast('Review failed: ' + error.message, 'error');
      return;
    }

    toast(`Submission ${status}`, 'success');
    card.querySelector('.sub-status').textContent = status;
    card.querySelector('.sub-status').className = `sub-status status-${status}`;
    window.dispatchEvent(new CustomEvent('ck:activity-completed'));
  }

  // ============================================================
  // HOOK: ADMIN TAB SWITCH
  // ============================================================
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.admin-tab');
    if (!tab) return;
    if (tab.dataset.tab === 'curriculum') {
      setTimeout(loadCurriculumProgress, 100);
    }
  });

  // Refresh curriculum button
  document.addEventListener('click', (e) => {
    if (e.target.id === 'btn-refresh-curriculum') loadCurriculumProgress();
  });

  // ============================================================
  // HOOK: PROGRESS PAGE
  // ============================================================
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-page="progress"], .nav-link');
    if (link && (link.dataset.page === 'progress' || /progress/i.test(link.textContent))) {
      setTimeout(enhanceStudentProgress, 500);
    }
  });

  // Auto-enhance on load if progress page is active
  if (document.readyState !== 'loading') {
    setTimeout(() => {
      if ($('#page-progress.active') || $('#progress-breakdown')) enhanceStudentProgress();
    }, 1500);
  }

  // Activity completed → refresh report card
  window.addEventListener('ck:activity-completed', () => {
    if (!$('#results-report-view')?.classList.contains('hidden')) loadReportCard();
  });

  // ============================================================
  // INIT
  // ============================================================
  function init() {
    enhanceAssignmentSubmitModal();
    enhanceAssignmentCreateForm();
    bindResultsTabs();
    console.log('[CK] Features V2 ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
  } else {
    setTimeout(init, 500);
  }

  // Expose for debug
  window.CKFeaturesV2 = {
    loadCurriculumProgress,
    loadReportCard,
    enhanceStudentProgress,
    viewSubmissionsWithReview
  };
})();
