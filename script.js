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

