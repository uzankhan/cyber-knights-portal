/* ============================================================
   CYBER KNIGHTS — User Management (Add User + Sync)
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* -------- Create User Modal -------- */
  function openCreateModal() {
    const modal = $('#create-user-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    setTimeout(() => $('#cu-username')?.focus(), 100);
  }

  function closeCreateModal() {
    const modal = $('#create-user-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    $('#create-user-form')?.reset();
    const msg = $('#create-user-msg');
    if (msg) { msg.classList.add('hidden'); msg.textContent = ''; }
  }

  async function handleCreateUser(e) {
    e.preventDefault();
    const msg = $('#create-user-msg');
    msg.classList.add('hidden');
    msg.textContent = '';

    const payload = {
      username: $('#cu-username').value.trim(),
      displayName: $('#cu-display').value.trim(),
      email: $('#cu-email').value.trim(),
      mobile: $('#cu-mobile').value.trim(),
      role: $('#cu-role').value,
      course: $('#cu-course').value.trim(),
      password: $('#cu-password').value,
    };

    if (!payload.username || !payload.displayName || !payload.password) {
      msg.textContent = 'Username, name, and password are required.';
      msg.classList.remove('hidden');
      return;
    }
    if (payload.password.length < 6) {
      msg.textContent = 'Password must be at least 6 characters.';
      msg.classList.remove('hidden');
      return;
    }

    try {
      // Try multiple paths to create user
      let success = false;

      // Path 1: Supabase-backed via global function
      if (typeof window.createUserAccount === 'function') {
        await window.createUserAccount(payload);
        success = true;
      }
      // Path 2: CKAuth API
      else if (window.CKAuth && typeof window.CKAuth.createUser === 'function') {
        await window.CKAuth.createUser(payload);
        success = true;
      }
      // Path 3: Supabase client directly
      else if (window.supabaseClient && window.supabaseClient.auth) {
        const { data, error } = await window.supabaseClient.auth.signUp({
          email: payload.email || `${payload.username}@cyberknights.local`,
          password: payload.password,
          options: {
            data: {
              username: payload.username,
              display_name: payload.displayName,
              role: payload.role,
              course: payload.course,
              mobile: payload.mobile,
            }
          }
        });
        if (error) throw error;
        success = true;
      }
      // Path 4: localStorage fallback
      else {
        const users = JSON.parse(localStorage.getItem('ck_users') || '[]');
        if (users.some(u => u.username === payload.username)) {
          throw new Error('Username already exists');
        }
        users.push({
          ...payload,
          id: 'u_' + Date.now(),
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('ck_users', JSON.stringify(users));
        success = true;
      }

      if (success) {
        closeCreateModal();
        // Trigger refresh across all tables
        window.dispatchEvent(new CustomEvent('ck:users-changed'));

        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.textContent = `User "${payload.username}" created`;
        document.getElementById('toast-container')?.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      }
    } catch (err) {
      msg.textContent = err.message || 'Failed to create user.';
      msg.classList.remove('hidden');
    }
  }

  /* -------- Wire Everything Up -------- */
  function attach() {
    const addBtn = $('#btn-add-user');
    if (addBtn && !addBtn.dataset.bound) {
      addBtn.addEventListener('click', openCreateModal);
      addBtn.dataset.bound = '1';
    }

    const form = $('#create-user-form');
    if (form && !form.dataset.bound) {
      form.addEventListener('submit', handleCreateUser);
      form.dataset.bound = '1';
    }
  }

  // Global click handler for close buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-modal="create-user-modal"]')) {
      closeCreateModal();
    }
    if (e.target.id === 'create-user-modal') {
      closeCreateModal();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }

  // Re-attach when admin tab changes
  document.addEventListener('click', (e) => {
    if (e.target.closest('.admin-tab')) setTimeout(attach, 50);
  });

  console.log('[CK] User management ready');
})();