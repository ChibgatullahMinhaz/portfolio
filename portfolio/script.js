var typed = new Typed(".typing", {
    strings: ["web designer", "web developer", "MERN Stack developer"],
    typeSpeed:70,
    backSpeed:70,
})
var typed = new Typed(".typring_about", {
    strings: ["web designer", "web developer", "MERN Stack developer"],
    typeSpeed:70,
    backSpeed:70,
})

const openBtn = document.getElementById('open_menu');
const closeBtn = document.getElementById('close_menu');
const navMenu = document.getElementById('navMenu');

openBtn.addEventListener('click', () => {
    openBtn.style.display = 'none';
    closeBtn.style.display = 'inline-block';
    navMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    closeBtn.style.display = 'none';
    openBtn.style.display = 'inline-block';
    openBtn.style.boxShadow = 'var(--boxShadow)'
    navMenu.style.display = 'none';
});