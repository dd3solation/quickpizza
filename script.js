const toggle = document.getElementById('themeToggle');
const body = document.body;
const fade = document.getElementById('themeFade');

// загрузка темы
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    toggle.textContent = '☀️';
}

// переключение темы с fade
toggle.addEventListener('click', () => {
    fade.classList.add('active');

    setTimeout(() => {
        body.classList.toggle('dark');

        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            toggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            toggle.textContent = '🌙';
        }
    }, 180);

    setTimeout(() => {
        fade.classList.remove('active');
    }, 360);
});
// SCROLL REVEAL
// SCROLL REVEAL + STAGGER
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    reveals.forEach((el, index) => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');

            // stagger-задержка
            if (el.classList.contains('stagger')) {
                el.style.setProperty('--delay', `${index * 0.12}s`);
            }
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
const cards = document.querySelectorAll('.product-card');
const modal = document.getElementById('pizzaModal');

const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalImg = document.getElementById('modalImg');
const modalKcal = document.getElementById('modalKcal');
const modalProtein = document.getElementById('modalProtein');
const modalFat = document.getElementById('modalFat');
const modalCarb = document.getElementById('modalCarb');

let currentIndex = 0;
let portion = 1;

const pizzas = Array.from(cards);

function openModal(index) {
  const p = pizzas[index];
  currentIndex = index;

  modalTitle.textContent = p.dataset.title;
  modalDesc.textContent = p.dataset.desc;
  modalImg.src = p.dataset.img;

  updateNutrition(p);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function updateNutrition(p) {
  modalKcal.textContent = Math.round(p.dataset.kcal * portion);
  modalProtein.textContent = Math.round(p.dataset.protein * portion);
  modalFat.textContent = Math.round(p.dataset.fat * portion);
  modalCarb.textContent = Math.round(p.dataset.carb * portion);
}

cards.forEach((card, i) => {
  card.addEventListener('click', () => openModal(i));
});

document.getElementById('modalClose').onclick = () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
};

document.getElementById('prevPizza').onclick = () =>
  openModal((currentIndex - 1 + pizzas.length) % pizzas.length);

document.getElementById('nextPizza').onclick = () =>
  openModal((currentIndex + 1) % pizzas.length);

document.querySelectorAll('.portion-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.portion-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    portion = btn.dataset.mode === 'full' ? 4 : 1;
    updateNutrition(pizzas[currentIndex]);
  };
});

document.getElementById('themeToggle').onclick = () => {
  document.body.classList.toggle('light');
};
