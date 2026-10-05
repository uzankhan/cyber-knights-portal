/* ============================================================
   CYBER KNIGHTS — Book Manager (Admin Editor) v2.0
   Full CRUD for parts, chapters, and content
   ============================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'ck_books_data';

  let booksData = null;   // normalized internal format
  let activeChapterId = null;
  let editorMode = 'code';
  let lastEditedPath = null; // { pIdx, cIdx }

  /* ------------------------------------------------------------
     DATA LOADING — Adapts to real books.js structure
     ------------------------------------------------------------ */
  function getRawBook() {
    return window.BOOK || window.books || window.CYBER_BOOKS || null;
  }

  // Normalize "parts" or "modules" into unified `modules` array
  function normalize(raw) {
    if (!raw) return null;
    const parts = raw.parts || raw.modules || raw.sections || [];
    return {
      meta: raw.meta || {},
      modules: parts.map((p, i) => ({
        id: p.id || ('mod' + i),
        title: p.title || p.name || 'Untitled Module',
        kicker: p.kicker || p.subtitle || ('Module ' + String(i).padStart(2, '0')),
        icon: p.icon || '📖',
        desc: p.desc || p.description || '',
        chapters: (p.chapters || []).map((c) => ({
          id: c.id || '',
          title: c.title || 'Untitled',
          pages: c.pages || '',
          read: c.read || 10,
          build: c.build || '',
          content: c.content || ''
        })),
        expanded: true
      }))
    };
  }

  function loadData() {
    // 1. If user has saved edits, prefer those
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.modules && parsed.modules.length) {
          console.log('[BookMgr] Loaded from localStorage');
          return parsed;
        }
      } catch (e) {
        console.warn('[BookMgr] Corrupt localStorage, using default');
      }
    }
    // 2. Otherwise adapt from original BOOK
    const raw = getRawBook();
    if (!raw) {
      console.warn('[BookMgr] BOOK not found yet');
      return null;
    }
    console.log('[BookMgr] Adapting from raw BOOK');
    return normalize(raw);
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booksData));
    // Notify portal to refresh (if it exposes a hook)
    if (typeof window.refreshBooksData === 'function') {
      try { window.refreshBooksData(); } catch (e) {}
    }
  }

  /* ------------------------------------------------------------
     HELPERS
     ------------------------------------------------------------ */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => root.querySelectorAll(sel);

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  function escapeAttr(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function toast(msg, type) {
    const c = document.getElementById('toast-container');
    if (!c) { alert(msg); return; }
    const t = document.createElement('div');
    t.className = 'toast ' + (type || 'info');
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3200);
  }

  /* ------------------------------------------------------------
     TREE RENDERING
     ------------------------------------------------------------ */
  function renderTree() {
    const tree = $('#bm-tree');
    const counter = $('#bm-count');
    if (!tree) return;

    if (!booksData || !booksData.modules || !booksData.modules.length) {
      tree.innerHTML = '<div style="padding:20px;color:#8B7B5F;font-size:12px;text-align:center;">No modules yet. Click <strong style="color:#D4AF37">+ New Module</strong> to begin.</div>';
      if (counter) counter.textContent = '0 chapters';
      return;
    }

    const totalChapters = booksData.modules.reduce(
      (sum, m) => sum + (m.chapters?.length || 0), 0
    );
    if (counter) counter.textContent = totalChapters + ' chapters';

    tree.innerHTML = booksData.modules.map((mod, mIdx) => {
      const isExpanded = mod.expanded !== false;
      return `
        <div class="bm-module ${isExpanded ? 'expanded' : ''}" data-midx="${mIdx}">
          <div class="bm-module-head" data-toggle="${mIdx}">
            <span class="bm-module-title">${escapeHtml(mod.title)}</span>
            <span class="bm-module-count">${mod.chapters.length}</span>
            <span class="bm-module-actions">
              <button class="bm-icon-btn" data-add-chapter="${mIdx}" title="Add chapter">+</button>
              <button class="bm-icon-btn" data-edit-module="${mIdx}" title="Rename module">✎</button>
              <button class="bm-icon-btn danger" data-del-module="${mIdx}" title="Delete module">×</button>
            </span>
          </div>
          <div class="bm-chapters">
            ${mod.chapters.map((ch, cIdx) => `
              <div class="bm-chapter ${activeChapterId === ch.id ? 'active' : ''}"
                   data-midx="${mIdx}" data-cidx="${cIdx}">
                <span class="bm-chapter-id">${escapeHtml(ch.id || '—')}</span>
                <span class="bm-chapter-title">${escapeHtml(ch.title)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    bindTreeEvents();
  }

  function bindTreeEvents() {
    $$('[data-toggle]').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        const mIdx = +el.dataset.toggle;
        booksData.modules[mIdx].expanded = !booksData.modules[mIdx].expanded;
        renderTree();
      });
    });
    $$('[data-add-chapter]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        addChapter(+el.dataset.addChapter);
      });
    });
    $$('[data-edit-module]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        editModuleName(+el.dataset.editModule);
      });
    });
    $$('[data-del-module]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteModule(+el.dataset.delModule);
      });
    });
    $$('.bm-chapter').forEach(el => {
      el.addEventListener('click', () => {
        openChapter(+el.dataset.midx, +el.dataset.cidx);
      });
    });
  }

  /* ------------------------------------------------------------
     MODULE OPERATIONS
     ------------------------------------------------------------ */
  function addModule() {
    const title = prompt('Module name (e.g., "Networking Deep Foundations"):');
    if (!title) return;
    const kicker = prompt('Kicker (e.g., "Module 01"):', 'Module') || 'Module';
    booksData.modules.push({
      id: 'mod' + Date.now(),
      title: title.trim(),
      kicker: kicker.trim(),
      icon: '📖',
      desc: '',
      chapters: [],
      expanded: true
    });
    saveData();
    renderTree();
    toast('Module added ✓', 'success');
  }

  function editModuleName(mIdx) {
    const mod = booksData.modules[mIdx];
    const newTitle = prompt('Module title:', mod.title);
    if (newTitle === null) return;
    const newKicker = prompt('Module kicker:', mod.kicker || '');
    if (newKicker === null) return;
    mod.title = newTitle.trim() || mod.title;
    mod.kicker = newKicker.trim();
    saveData();
    renderTree();
    toast('Module updated ✓', 'success');
  }

  function deleteModule(mIdx) {
    const mod = booksData.modules[mIdx];
    if (!confirm(`Delete "${mod.title}" and its ${mod.chapters.length} chapters?`)) return;
    booksData.modules.splice(mIdx, 1);
    saveData();
    renderTree();
    resetEditor();
    toast('Module deleted', 'info');
  }

  /* ------------------------------------------------------------
     CHAPTER OPERATIONS
     ------------------------------------------------------------ */
  function addChapter(mIdx) {
    const id = prompt('Chapter ID (e.g., "2.6"):');
    if (!id) return;
    const title = prompt('Chapter title:');
    if (!title) return;

    const mod = booksData.modules[mIdx];
    mod.chapters.push({
      id: id.trim(),
      title: title.trim(),
      pages: '—',
      read: 10,
      build: '',
      content: '<section class="content-block"><h3 class="content-h">1. Introduction</h3><p>Write your content here...</p></section>'
    });
    saveData();
    renderTree();
    openChapter(mIdx, mod.chapters.length - 1);
    toast('Chapter added ✓', 'success');
  }

  function deleteChapter(mIdx, cIdx) {
    const ch = booksData.modules[mIdx].chapters[cIdx];
    if (!confirm(`Delete chapter "${ch.title}"?`)) return;
    booksData.modules[mIdx].chapters.splice(cIdx, 1);
    saveData();
    renderTree();
    resetEditor();
    toast('Chapter deleted', 'info');
  }

  /* ------------------------------------------------------------
     EDITOR
     ------------------------------------------------------------ */
  function openChapter(mIdx, cIdx) {
    const mod = booksData.modules[mIdx];
    const ch = mod.chapters[cIdx];
    if (!ch) return;
    activeChapterId = ch.id;
    lastEditedPath = { pIdx: mIdx, cIdx };
    renderTree();
    renderEditor(mod, ch, mIdx, cIdx);
  }

  function renderEditor(mod, ch, mIdx, cIdx) {
    const editor = $('#bm-editor');
    if (!editor) return;
    editor.innerHTML = `
      <div class="bm-form-head">
        <h3>Editing: <span style="color:#D4AF37">${escapeHtml(ch.id)} · ${escapeHtml(ch.title)}</span></h3>
        <div class="bm-form-head-actions">
          <button class="mini-btn danger" id="bm-del-ch">Delete Chapter</button>
          <button class="mini-btn" id="bm-save-ch" style="background:rgba(212,175,55,.15);border-color:#D4AF37;color:#D4AF37">Save Changes</button>
        </div>
      </div>

      <div class="bm-row">
        <div class="bm-field">
          <label>Chapter ID</label>
          <input type="text" id="bm-ch-id" value="${escapeAttr(ch.id)}" />
        </div>
        <div class="bm-field">
          <label>Read Time (min)</label>
          <input type="number" id="bm-ch-read" value="${ch.read || 10}" min="1" />
        </div>
        <div class="bm-field">
          <label>Page Range</label>
          <input type="text" id="bm-ch-pages" value="${escapeAttr(ch.pages || '')}" placeholder="e.g., 100-115" />
        </div>
      </div>

      <div class="bm-field">
        <label>Chapter Title</label>
        <input type="text" id="bm-ch-title" value="${escapeAttr(ch.title)}" />
      </div>

      <div class="bm-field">
        <label>Build Task (short summary)</label>
        <input type="text" id="bm-ch-build" value="${escapeAttr(ch.build || '')}" placeholder="e.g., Configure TOTP for SSH" />
      </div>

      <div class="bm-field">
        <label>Content (HTML)</label>
        <div class="bm-preview-toggle">
          <button data-mode="code" class="${editorMode === 'code' ? 'active' : ''}">Code</button>
          <button data-mode="preview" class="${editorMode === 'preview' ? 'active' : ''}">Preview</button>
        </div>
        <textarea id="bm-ch-content" class="code" spellcheck="false" style="${editorMode === 'preview' ? 'display:none' : ''}">${escapeHtml(ch.content)}</textarea>
        <div id="bm-ch-preview" class="bm-preview" style="${editorMode === 'preview' ? '' : 'display:none'}">
          <div class="chapter-content">${ch.content}</div>
        </div>
        <div class="bm-hint">
          Allowed classes: <code>content-block</code>, <code>content-h</code>, <code>content-list</code>, <code>content-figure</code>, <code>cia-card</code>, <code>step-flow</code>, <code>tool-table</code>, <code>sub-h</code>, <code>type-grid</code>, <code>reading-list</code>.
        </div>
      </div>
    `;

    $('#bm-save-ch').addEventListener('click', () => saveChapter(mIdx, cIdx));
    $('#bm-del-ch').addEventListener('click', () => deleteChapter(mIdx, cIdx));

    $$('.bm-preview-toggle button').forEach(btn => {
      btn.addEventListener('click', () => {
        editorMode = btn.dataset.mode;
        $$('.bm-preview-toggle button').forEach(b =>
          b.classList.toggle('active', b === btn)
        );
        const ta = $('#bm-ch-content');
        const pv = $('#bm-ch-preview');
        if (editorMode === 'preview') {
          pv.querySelector('.chapter-content').innerHTML = ta.value;
          pv.style.display = 'block';
          ta.style.display = 'none';
        } else {
          pv.style.display = 'none';
          ta.style.display = 'block';
        }
      });
    });

    $('#bm-ch-content').addEventListener('input', () => {
      if (editorMode === 'preview') {
        $('#bm-ch-preview .chapter-content').innerHTML = $('#bm-ch-content').value;
      }
    });
  }

  function saveChapter(mIdx, cIdx) {
    const ch = booksData.modules[mIdx].chapters[cIdx];
    ch.id = $('#bm-ch-id').value.trim() || ch.id;
    ch.title = $('#bm-ch-title').value.trim() || ch.title;
    ch.read = parseInt($('#bm-ch-read').value, 10) || 10;
    ch.pages = $('#bm-ch-pages').value.trim();
    ch.build = $('#bm-ch-build').value.trim();
    ch.content = $('#bm-ch-content').value;
    activeChapterId = ch.id;
    saveData();
    renderTree();
    toast('Chapter saved ✓', 'success');
  }

  function resetEditor() {
    activeChapterId = null;
    lastEditedPath = null;
    const editor = $('#bm-editor');
    if (!editor) return;
    editor.innerHTML = `
      <div class="bm-empty">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M4 4h16v16H4z M4 9h16 M8 4v16"/>
        </svg>
        <p>Select a chapter from the tree to edit it</p>
        <span>Or create a new module to begin</span>
      </div>
    `;
  }

  /* ------------------------------------------------------------
     IMPORT / EXPORT / RESET
     ------------------------------------------------------------ */
  function exportJSON() {
    const data = JSON.stringify(booksData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cyber-knights-books-' + Date.now() + '.json';
    a.click();
    URL.revokeObjectURL(url);
    toast('Exported ✓', 'success');
  }

  function importJSON() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          if (!parsed.modules || !Array.isArray(parsed.modules)) {
            throw new Error('Invalid file — missing "modules" array');
          }
          booksData = parsed;
          saveData();
          renderTree();
          resetEditor();
          toast('Imported ✓', 'success');
        } catch (err) {
          alert('Import failed: ' + err.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function resetToDefault() {
    if (!confirm('Discard all edits and restore original book content?')) return;
    localStorage.removeItem(STORAGE_KEY);
    booksData = normalize(getRawBook());
    if (!booksData) {
      alert('Original BOOK data not available. Reload the page.');
      return;
    }
    renderTree();
    resetEditor();
    toast('Reset to default ✓', 'info');
  }

  /* ------------------------------------------------------------
     INIT
     ------------------------------------------------------------ */
  function tryInit() {
    // Only init if Book Manager DOM is present
    if (!$('#bm-tree')) return false;
    // Wait until BOOK is available
    const raw = getRawBook();
    if (!raw) return false;

    booksData = loadData();
    if (!booksData) return false;

    // Bind toolbar buttons (only once)
    if (!window.__bmToolbarBound) {
      const $addMod = $('#bm-add-module');
      const $exp = $('#bm-export');
      const $imp = $('#bm-import');
      const $rst = $('#bm-reset');

      if ($addMod) $addMod.addEventListener('click', addModule);
      if ($exp) $exp.addEventListener('click', exportJSON);
      if ($imp) $imp.addEventListener('click', importJSON);
      if ($rst) $rst.addEventListener('click', resetToDefault);

      window.__bmToolbarBound = true;
      console.log('[BookMgr] Toolbar bound');
    }

    renderTree();
    resetEditor();
    console.log('[BookMgr] Initialized —', booksData.modules.length, 'modules');
    return true;
  }

  // Retry until BOOK is loaded
  let attempts = 0;
  const initTimer = setInterval(() => {
    attempts++;
    if (tryInit() || attempts > 40) {
      clearInterval(initTimer);
      if (attempts > 40) console.warn('[BookMgr] Gave up waiting for BOOK');
    }
  }, 250);

  // Re-init when admin tab opens
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.admin-tab');
    if (tab && tab.dataset.tab === 'books') {
      setTimeout(tryInit, 50);
    }
  });

  // Expose for debugging
  window.BookManager = {
    getData: () => booksData,
    reload: () => { booksData = loadData(); renderTree(); },
    save: saveData
  };
})();