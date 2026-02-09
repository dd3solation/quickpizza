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
const modal = document.getElementById('pizzaModal');
const closeBtn = document.getElementById('modalClose');

const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalKcal = document.getElementById('modalKcal');
const modalProtein = document.getElementById('modalProtein');
const modalFat = document.getElementById('modalFat');
const modalCarb = document.getElementById('modalCarb');

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        modalTitle.textContent = card.dataset.title;
        modalDesc.textContent = card.dataset.desc;
        modalImg.src = card.dataset.img;

        modalKcal.textContent = card.dataset.kcal;
        modalProtein.textContent = card.dataset.protein;
        modalFat.textContent = card.dataset.fat;
        modalCarb.textContent = card.dataset.carb;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}




