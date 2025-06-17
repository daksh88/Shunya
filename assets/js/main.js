document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Handle newsletter form submission
    const form = document.querySelector('.subscribe-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input.value) {
                this.innerHTML = '<p class="success">Thank you for subscribing!</p>';
            }
        });
    }

    // Add parallax effect to slideshow
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

  
    // Glitch effect on hover
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        glitchText.addEventListener('mouseover', () => {
            glitchText.style.animation = 'none';
            void glitchText.offsetWidth;
            glitchText.style.animation = 'glitch 725ms infinite';
        });
    }

    // Add letter animation for coming soon text
    const comingSoonSpans = document.querySelectorAll('.coming-soon-text span');
    if (comingSoonSpans.length > 0) {
        comingSoonSpans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.2}s`;
        });
    }
});