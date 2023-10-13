document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('h1');
    header.addEventListener('click', function () {
        header.style.color = 'blue';
    });
});
