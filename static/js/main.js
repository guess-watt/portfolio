document.addEventListener('DOMContentLoaded', () => {
    // Loader - Typewriter Effect
    const loader = document.getElementById('loader');
    const textElement = document.querySelector('.typewriter-text');
    const textToType = "Good things take time";
    let index = 0;

    function typeWriter() {
        if (index < textToType.length) {
            textElement.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, 100); // Typing speed
        } else {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1000); // Wait 1s after typing finishes
        }
    }

    typeWriter();

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();
});
