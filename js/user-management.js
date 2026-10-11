/* ============================================================
   Cyber Knights — User Management
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

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
      display_name: $('#cu-display').value.trim(),
      email: $('#cu-email').value.trim(),
      mobile: $('#cu-mobile').value.trim(),
      role: $('#cu-role').value,
      class_name: $('#cu-course').value.trim(),
      password: $('#cu-password').value,
    };

    if (!payload.username || !payload.display_name || !payload.password) {
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
      if (window.CK?.createUser) {
        const r = await window.CK.createUser(payload);
        if (!r.ok) throw new Error(r.error || 'Creation failed');
      } else {
        throw new Error('CK.createUser is not available');
      }

      closeCreateModal();
      window.dispatchEvent(new CustomEvent('ck:users-changed'));
      const toast = document.createElement('div');
      toast.className = 'toast success';
      toast.textContent = `User "${payload.username}" created`;
      document.getElementById('toast-container')?.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch (err) {
      msg.textContent = err.message || 'Failed to create user.';
      msg.classList.remove('hidden');
    }
  }

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

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-modal="create-user-modal"]')) closeCreateModal();
    if (e.target.id === 'create-user-modal') closeCreateModal();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('.admin-tab')) setTimeout(attach, 50);
  });

  console.log('[CK] User management ready');
})();
