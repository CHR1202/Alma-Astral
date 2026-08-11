const STORAGE_KEY = 'almaAstralUserV6';
const DATA_KEY = 'almaAstralPersonalDataV8';

const getUser = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; } };
const getData = () => { try { return JSON.parse(localStorage.getItem(DATA_KEY)) || {}; } catch { return {}; } };
const saveData = (data) => localStorage.setItem(DATA_KEY, JSON.stringify(data));

const user = getUser();
if (!user) window.location.replace('index.html');

const data = getData();
const fullName = (user?.name || 'Navegante').trim();
const firstName = fullName.split(' ')[0];
const initial = fullName.charAt(0).toUpperCase();

['userFirstName'].forEach(id => document.getElementById(id).textContent = firstName);
['avatar','passportAvatar','profileAvatar'].forEach(id => document.getElementById(id).textContent = initial);
document.getElementById('passportName').textContent = fullName;
document.getElementById('profileName').textContent = fullName;
document.getElementById('passportEmail').textContent = user?.email || '—';
document.getElementById('profileEmail').textContent = user?.email || '—';

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = 'index.html';
});

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('mobileOverlay');
const menu = document.getElementById('mobileMenu');
const closeMenu = () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); };
menu.addEventListener('click', () => { sidebar.classList.toggle('open'); overlay.classList.toggle('show'); });
overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.side-link').forEach(link => link.addEventListener('click', closeMenu));

const intentions = document.querySelectorAll('.intention-card');
const intentionFeedback = document.getElementById('intentionFeedback');
intentions.forEach(card => card.addEventListener('click', () => {
  intentions.forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  data.intention = card.dataset.intention;
  saveData(data);
  intentionFeedback.textContent = `Intención guardada: ${data.intention}`;
}));
if (data.intention) {
  const savedCard = [...intentions].find(c => c.dataset.intention === data.intention);
  if (savedCard) savedCard.classList.add('selected');
  intentionFeedback.textContent = `Tu intención actual: ${data.intention}`;
}

document.getElementById('showAllIntentions').addEventListener('click', () => {
  intentionFeedback.textContent = 'Por ahora estamos validando estas cuatro intenciones principales.';
});

const openModal = id => {
  const modal = document.getElementById(id);
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeModal = id => {
  const modal = document.getElementById(id);
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};
document.querySelectorAll('[data-modal]').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.modal)));
document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => closeModal(btn.dataset.close)));
document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal.id); }));
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.modal.show').forEach(m => closeModal(m.id)); });

const essenceQuestion = document.getElementById('essenceQuestion');
const birthDate = document.getElementById('birthDate');
essenceQuestion.value = data.essenceQuestion || '';
birthDate.value = data.birthDate || '';
document.getElementById('saveEssence').addEventListener('click', () => {
  data.essenceQuestion = essenceQuestion.value.trim();
  data.birthDate = birthDate.value;
  saveData(data);
  const button = document.getElementById('saveEssence');
  const old = button.textContent;
  button.textContent = 'Preparación guardada ✓';
  setTimeout(() => { button.textContent = old; closeModal('essenceModal'); }, 800);
});

const journal = document.getElementById('journalEntry');
const journalStatus = document.getElementById('journalStatus');
journal.value = data.journalEntry || '';
document.getElementById('saveJournal').addEventListener('click', () => {
  data.journalEntry = journal.value.trim();
  saveData(data);
  journalStatus.textContent = 'Guardado en este navegador ✓';
  setTimeout(() => journalStatus.textContent = '', 1800);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const links = [...document.querySelectorAll('.side-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });
sections.forEach(section => navObserver.observe(section));
