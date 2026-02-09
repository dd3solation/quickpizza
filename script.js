/* =========================
   THEME TOGGLE
========================= */
const themeBtn = document.querySelector('.theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light');
}

themeBtn.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem(
    'theme',
    body.classList.contains('light') ? 'light' : 'dark'
  );
});

/* =========================
   REVEAL + STAGGER ON SCROLL
========================= */
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach((el, i) => {
    const top = el.getBoundingClientRect().top;
    el.style.setProperty('--i', i);

    if (top < trigger) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* =========================
   MODAL LOGIC
========================= */
const modal = document.getElementById('pizzaModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalKcal = document.getElementById('modalKcal');
const modalProtein = document.getElementById('modalProtein');
const modalFat = document.getElementById('modalFat');
const modalCarb = document.getElementById('modalCarb');

const closeBtn = document.getElementById('modalClose');
const prevBtn = document.getElementById('prevPizza');
const nextBtn = document.getElementById('nextPizza');

const portionBtns = document.querySelectorAll('.portion-btn');

const cards = Array.from(document.querySelectorAll('.product-card'));
let currentIndex = 0;
let currentMode = '100';

/* =========================
   OPEN MODAL
========================= */
function openModal(index) {
  const card = cards[index];
  currentIndex = index;

  modalImg.src = card.dataset.img;
  modalTitle.textContent = card.dataset.title;
  modalDesc.textContent = card.dataset.desc;

  updateNutrition(card);

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* =========================
   CLOSE MODAL
========================= */
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* =========================
   CARD CLICK
========================= */
cards.forEach((card, index) => {
  card.addEventListener('click', () => openModal(index));
});

/* =========================
   NUTRITION UPDATE
========================= */
function updateNutrition(card) {
  const multiplier = currentMode === 'full' ? 4 : 1;

  modalKcal.textContent = card.dataset.kcal * multiplier;
  modalProtein.textContent = card.dataset.protein * multiplier;
  modalFat.textContent = card.dataset.fat * multiplier;
  modalCarb.textContent = card.dataset.carb * multiplier;
}

/* =========================
   PORTION TOGGLE
========================= */
portionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    portionBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentMode = btn.dataset.mode;
    updateNutrition(cards[currentIndex]);
  });
});

/* =========================
   MODAL NAVIGATION
========================= */
function switchPizza(direction) {
  currentIndex =
    (currentIndex + direction + cards.length) % cards.length;

  modalContentFade();
  openModal(currentIndex);
}

function modalContentFade() {
  modal.querySelector('.modal-content').style.opacity = '0';
  setTimeout(() => {
    modal.querySelector('.modal-content').style.opacity = '1';
  }, 150);
}

prevBtn.addEventListener('click', e => {
  e.stopPropagation();
  switchPizza(-1);
});

nextBtn.addEventListener('click', e => {
  e.stopPropagation();
  switchPizza(1);
});
