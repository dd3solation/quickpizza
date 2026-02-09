<script>
const toggle = document.getElementById('themeToggle');
const body = document.body;
const fade = document.getElementById('themeFade');

// загрузка сохранённой темы
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    toggle.textContent = '☀️';
}

toggle.addEventListener('click', () => {
    // включаем затемнение
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

    // убираем затемнение
    setTimeout(() => {
        fade.classList.remove('active');
    }, 360);
});
</script>
