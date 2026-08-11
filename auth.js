const STORAGE_KEY = 'almaAstralUserV6';
const loginForm = document.getElementById('loginForm');
const demoBtn = document.getElementById('demoBtn');

function saveAndEnter(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .35s ease';
  window.setTimeout(() => window.location.href = 'app.html', 320);
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  saveAndEnter({
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    createdAt: new Date().toISOString()
  });
});

demoBtn.addEventListener('click', () => {
  saveAndEnter({name: 'Sofía', email: 'sofia@demo.com', createdAt: new Date().toISOString()});
});

const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  try {
    const user = JSON.parse(saved);
    if (user?.name && user?.email) {
      demoBtn.textContent = `Continuar como ${user.name.split(' ')[0]}`;
      demoBtn.addEventListener('dblclick', () => localStorage.removeItem(STORAGE_KEY));
    }
  } catch (_) {}
}
