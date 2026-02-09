<script>
const toggle = document.getElementById('themeToggle');
const body = document.body;

// загрузка сохранённой темы
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    toggle.textContent = '☀️';
}

// переключение
toggle.addEventListener('click', () => {
    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        toggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        toggle.textContent = '🌙';
    }
});
</script>
