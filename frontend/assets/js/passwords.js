document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('userDisplay');
  const email = localStorage.getItem('userEmail');
  if (email) display.value = email;

  const form = document.getElementById('passwordForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pwd = form.password.value;
    if (!pwd) return alert('Digite sua senha.');

    // Validar com sua API aqui...
    // Redireciona para home

    localStorage.removeItem('userEmail');
    window.location.href = '/frontend/pages/home.html';
  });

  const passwordInput = document.getElementById('passwordInput');
  const togglePassword = document.getElementById('togglePassword');

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('change', () => {
      passwordInput.type = togglePassword.checked ? 'text' : 'password';
    });
  }

});