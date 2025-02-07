const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('sidebarClose');
const sidebar = document.getElementById('sidebar');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
});

sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('active');
});