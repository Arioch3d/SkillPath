//trying to add dark mode toggle functionality with local storage to remember user preference.
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('skillpath-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
};

const storedTheme = localStorage.getItem('skillpath-theme');
const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        applyTheme(storedTheme || defaultTheme);

themeToggle.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });