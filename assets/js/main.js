<script>
    // Block animation for text
    const text = document.getElementById('block-animate-text');
    const chars = text.textContent.split('');
    text.textContent = '';
    chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        text.appendChild(span);
        setTimeout(() => {
            span.classList.add('visible');
        }, i * 80); // delay between each letter
    });
</script>