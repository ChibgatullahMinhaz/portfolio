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


// contact message
document.getElementById('contactForm').addEventListener('submit', (event)=> {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const mailtoLink = `mailto:chibgatullahminhaz@gmail.com?subject=Contact Form Submission&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    
    window.location.href = mailtoLink;
});
