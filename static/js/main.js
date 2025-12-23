document.addEventListener('DOMContentLoaded', () => {
    // Loader - Typewriter Effect
    const loader = document.getElementById('loader');
    const textElement = document.querySelector('.typewriter-text');

    // Custom loader text based on page
    let textToType = "Good things take time";
    if (document.body.classList.contains('project-mode')) {
        textToType = "Galactic Rotation Curve";
    }

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

    // ==========================================
    // Randomized Shooting Stars Logic
    // ==========================================
    function initShootingStars() {
        const container = document.querySelector('.shooting-stars');
        if (!container) return;

        // Configuration
        const spawnIntervalMean = 2000; // Average ms between stars
        const spawnIntervalVariance = 1500; // +/- variation

        function createStar() {
            const star = document.createElement('div');
            star.classList.add('shooting-star');

            // 1. Randomize Starting Position
            // We want stars to come primarily from Top-Left, but with variation.
            // Start either from Top edge or Left edge to cover the diagonal field.
            const startX = Math.random() < 0.5 ? Math.random() * window.innerWidth : -50;
            const startY = startX === -50 ? Math.random() * window.innerHeight * 0.7 : -50;

            // 2. Randomize Trajectory (Angle)
            // Standard is 45deg. vary by +/- 15deg
            const angle = 45 + (Math.random() * 30 - 15);

            // 3. Randomize Distance/Travel
            // Calculate a long distance to ensure it goes off screen
            const travelDist = Math.max(window.innerWidth, window.innerHeight) * 1.5;

            // Calculate end coordinates based on angle
            const rad = angle * (Math.PI / 180);
            const moveX = Math.cos(rad) * travelDist;
            const moveY = Math.sin(rad) * travelDist;

            // 4. Randomize Speed & Size
            const duration = 2000 + Math.random() * 3000; // 2s - 5s
            // vary scale slightly
            const scale = 0.5 + Math.random() * 0.7; // 0.5 to 1.2 scale

            // Apply transformations
            // We rotate the star to align with its trajectory
            star.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg) scale(${scale})`;

            container.appendChild(star);

            // 5. Animate using Web Animations API
            const animation = star.animate([
                {
                    opacity: 1,
                    transform: `translate(${startX}px, ${startY}px) rotate(${angle}deg) scale(${scale})`
                },
                {
                    opacity: 1,
                    offset: 0.1 // Fade in quickly
                },
                {
                    opacity: 0,
                    transform: `translate(${startX + moveX}px, ${startY + moveY}px) rotate(${angle}deg) scale(${scale})`
                }
            ], {
                duration: duration,
                easing: 'linear'
            });

            // Cleanup after animation
            animation.onfinish = () => {
                star.remove();
            };
        }

        function scheduleNextStar() {
            const delay = spawnIntervalMean + (Math.random() * spawnIntervalVariance * 2 - spawnIntervalVariance);
            setTimeout(() => {
                createStar();
                scheduleNextStar();
            }, Math.max(500, delay)); // Minimum delay 500ms
        }

        // Start loop
        createStar(); // First one immediately
        scheduleNextStar();

        // ==========================================
        // Special Red Star Logic
        // ==========================================
        function createRedStar() {
            const star = document.createElement('div');
            star.classList.add('shooting-star');

            // Custom Styling for Red Star
            star.style.background = '#ff4500'; // Orange-Red
            star.style.boxShadow = `
                0 0 0 4px rgba(255, 69, 0, 0.1),
                0 0 0 8px rgba(255, 69, 0, 0.1),
                0 0 30px rgba(255, 69, 0, 1)
            `; // Orange-Red Glow

            // Tail styling needs to be injected into stylesheet or handled via ::before
            // Since ::before is pseudo-element, we can't style it inline easily.
            // A workaround is to add a specific class modifier.
            star.classList.add('special-red-star');

            // 1. Position: North-East (Top-Right)
            // Start slightly off-screen top-right
            const startX = window.innerWidth + 50;
            const startY = -50;

            // 2. Destination: Middle of screen
            const endX = window.innerWidth / 2;
            const endY = window.innerHeight / 2;

            // 3. Calculate distance and angle
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            // We want it to go *past* the middle to look like a shooting star, not stop dead.
            // Let's extend the vector by a factor, e.g., 2x, so it shoots through the middle.
            const extendFactor = 2.5;
            const travelDist = dist * extendFactor;

            const angleRad = Math.atan2(deltaY, deltaX);
            const angleDeg = angleRad * (180 / Math.PI); // Convert to degrees

            const moveX = Math.cos(angleRad) * travelDist;
            const moveY = Math.sin(angleRad) * travelDist;

            // 4. Speed & Size
            const duration = 4000; // Slower, more majestic
            const scale = 1.2; // Slightly larger

            container.appendChild(star);

            // 5. Animate
            const animation = star.animate([
                {
                    opacity: 1,
                    transform: `translate(${startX}px, ${startY}px) rotate(${angleDeg}deg) scale(${scale})`
                },
                {
                    opacity: 1,
                    offset: 0.1
                },
                {
                    opacity: 0,
                    transform: `translate(${startX + moveX}px, ${startY + moveY}px) rotate(${angleDeg}deg) scale(${scale})`
                }
            ], {
                duration: duration,
                easing: 'ease-out' // Starts fast, slows down? Or linear? User asked for "natural". Linear is usually best for shooting stars.
            });

            animation.onfinish = () => star.remove();
        }

        // Schedule Red Star every 20 seconds
        setInterval(createRedStar, 20000);
        // Optional: Trigger one shortly after load to demonstrate
        setTimeout(createRedStar, 5000);
    }

    initShootingStars();
});

// Certificate Modal Logic
function openCertificate(imgSrc, captionText) {
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-image');
    const caption = document.getElementById('cert-caption');

    modal.style.display = "block";
    modalImg.style.display = "block";
    modalImg.src = imgSrc;
    caption.innerHTML = captionText;

    // Close on click anywhere outside or on close button
    const span = document.getElementsByClassName("close-modal")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
