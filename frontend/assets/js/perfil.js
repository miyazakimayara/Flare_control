// Carrega dados do usuário e trata upload/preview de avatar
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('authToken');
  const avatarPreview = document.getElementById('avatarPreview');
  const avatarInput   = document.getElementById('avatarInput');
  const btnUpload     = document.getElementById('btnUpload');

  const userName  = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const perm      = document.getElementById('perm');
  const locale    = document.getElementById('locale');
  const phone     = document.getElementById('phone');
  const btnChangePwd = document.getElementById('btnChangePwd');

  // --- carregar perfil (tenta API; senão usa demonstração) ---
  async function loadProfile() {
    try {
      const resp = await fetch('http://localhost:8000/auth/me', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!resp.ok) throw new Error('no api');
      const data = await resp.json();
      fill(data);
    } catch {
      // fallback demo
      fill({
        name: 'Nome do usuário',
        email: 'emailcadastrado@exemplo.com',
        permission: 'Operador',
        locale: 'RJ / Plataforma Jubarte',
        phone: '(21) 99999-0000',
        avatarUrl: ''
      });
    }
  }

  function fill(u){
    userName.textContent = u.name || 'Nome do usuário';
    userEmail.textContent = u.email || '';
    perm.value = u.permission || '';
    locale.value = u.locale || '';
    phone.value = u.phone || '';
    if (u.avatarUrl) avatarPreview.src = u.avatarUrl;
    else avatarPreview.removeAttribute('src');
  }

  // --- upload/preview de imagem ---
  btnUpload.addEventListener('click', () => avatarInput.click());
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => { avatarPreview.src = e.target.result; };
    reader.readAsDataURL(file);

    // TODO: enviar ao backend
    // const form = new FormData(); form.append('avatar', file);
    // fetch('http://localhost:8000/users/avatar', { method:'POST', headers:{ Authorization:`Bearer ${token}` }, body: form })
  });

  // --- alterar senha (exemplo simples) ---
  btnChangePwd.addEventListener('click', () => {
    const email = userEmail.textContent || '';
    const nova = prompt(`Alterar senha para ${email}\nDigite a nova senha:`);
    if (!nova) return;
    alert('Senha alterada! (exemplo)');
    // fetch('http://localhost:8000/auth/change-password', { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify({ password: nova }) })
  });

  loadProfile();
});