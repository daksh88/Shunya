document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

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

    // Add letter animation for coming soon text
    const comingSoonSpans = document.querySelectorAll('.coming-soon-text span');
    if (comingSoonSpans.length > 0) {
        comingSoonSpans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.2}s`;
        });
    }
});