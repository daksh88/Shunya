document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Lottie Fire Animation as background
    if (window.lottie) {
        lottie.loadAnimation({
            container: document.getElementById('fire-background'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './assets/animations/Fire Animation.json' // Adjust filename if needed
        });

        lottie.loadAnimation({
            container: document.getElementById('fire-lottie'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './assets/animations/fire.json' // adjust if needed
        });
    }

    // Particles.js for fire ashes (higher density, no lines)
    if (window.particlesJS) {
        particlesJS('fire-ashes', {
            particles: {
                number: { value: 90, density: { enable: true, value_area: 300 } },
                color: { value: "#ffae42" },
                shape: { type: "circle" },
                opacity: { value: 0.7, random: true },
                size: { value: 3, random: true },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "top-right",
                    random: true,
                    straight: false,
                    out_mode: "out"
                },
                line_linked: { enable: false }
            },
            interactivity: { detect_on: "canvas", events: { onhover: { enable: false } } },
            retina_detect: true
        });
    }

    // Parallax effect for slideshow (if any)
    const slideshowItems = document.querySelectorAll('.slideshow-item');
    if (slideshowItems.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            slideshowItems.forEach(item => {
                item.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    // Animate coming soon text letters (if any)
    const comingSoonSpans = document.querySelectorAll('.coming-soon-text span');
    if (comingSoonSpans.length > 0) {
        comingSoonSpans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.2}s`;
        });
    }

    // Remove Lottie coming soon animation if present
    // (No need to load it anymore)

    // Typewriter effect for "Coming" and "soon" on two lines, then "SHUNYA"
    const line1 = document.getElementById('typewriter-line1');
    const line2 = document.getElementById('typewriter-line2');
    if (line1 && line2) {
        const sequences = [
            { line1: "Coming", line2: "soon" },
            { line1: "SHUNYA", line2: "" }
        ];
        let seqIndex = 0;
        let charIndex1 = 0;
        let charIndex2 = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let pauseAfterTyping = 1200;
        let pauseAfterDeleting = 500;

        function type() {
            const current = sequences[seqIndex];
            if (!isDeleting) {
                if (charIndex1 < current.line1.length) {
                    line1.textContent = current.line1.substring(0, charIndex1 + 1);
                    charIndex1++;
                    setTimeout(type, typingSpeed);
                } else if (charIndex2 < current.line2.length) {
                    line2.textContent = current.line2.substring(0, charIndex2 + 1);
                    charIndex2++;
                    setTimeout(type, typingSpeed);
                } else {
                    isDeleting = true;
                    setTimeout(type, pauseAfterTyping);
                }
            } else {
                if (charIndex2 > 0) {
                    line2.textContent = current.line2.substring(0, charIndex2 - 1);
                    charIndex2--;
                    setTimeout(type, typingSpeed / 2);
                } else if (charIndex1 > 0) {
                    line1.textContent = current.line1.substring(0, charIndex1 - 1);
                    charIndex1--;
                    setTimeout(type, typingSpeed / 2);
                } else {
                    isDeleting = false;
                    seqIndex = (seqIndex + 1) % sequences.length;
                    setTimeout(type, pauseAfterDeleting);
                }
            }
        }
        type();
    }
});