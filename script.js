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
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // при загрузке


