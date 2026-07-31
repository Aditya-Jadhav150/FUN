document.addEventListener('DOMContentLoaded', () => {
    const landing   = document.getElementById('landing');
    const startBtn  = document.getElementById('startBtn');
    const heartsPhase   = document.getElementById('heartsPhase');
    const heartsContainer = document.getElementById('heartsContainer');
    const nextBtn   = document.getElementById('nextBtn');
    const photoPhase = document.getElementById('photoPhase');

    const heartEmojis = ['💖', '💕', '💗', '💓', '❤️', '💘', '💝'];
    let started = false;

    // ── PHASE 1 → PHASE 2 ──────────────────────────
    startBtn.addEventListener('click', () => {
        if (started) return;
        started = true;

        // Fade out landing
        landing.classList.add('hide');

        // After landing fades, show hearts
        setTimeout(() => {
            heartsPhase.classList.remove('hide');
            startHeartRain();
        }, 600);

        // Show the next button after 3.5 seconds
        setTimeout(() => {
            nextBtn.classList.remove('hide');
        }, 4000);
    });

    // ── PHASE 2 → PHASE 3 ──────────────────────────
    nextBtn.addEventListener('click', () => {
        nextBtn.classList.add('hide');

        // Fade out hearts phase
        heartsPhase.style.opacity = '0';
        heartsPhase.style.transition = 'opacity 0.8s ease';

        setTimeout(() => {
            heartsPhase.classList.add('hide');
            heartsPhase.style.opacity = '';
            heartsPhase.style.transition = '';

            // Stop creating hearts
            clearInterval(rainInterval);

            // Show photo phase
            photoPhase.classList.remove('hide');
        }, 800);
    });

    // ── HEART RAIN ENGINE (pure CSS animated elements) ──
    let rainInterval;

    function startHeartRain() {
        // Create a burst of hearts immediately
        for (let i = 0; i < 15; i++) {
            setTimeout(() => createHeart(), i * 100);
        }

        // Then keep a steady rain
        rainInterval = setInterval(() => {
            createHeart();
        }, 300);
    }

    function createHeart() {
        const heart = document.createElement('span');
        heart.classList.add('falling-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';

        // Random size
        const size = 16 + Math.random() * 22;
        heart.style.fontSize = size + 'px';

        // Random fall duration (2.5s – 5s)
        const duration = 2.5 + Math.random() * 2.5;
        heart.style.animationDuration = duration + 's';

        // Slight random delay so they don't all start at once
        heart.style.animationDelay = (Math.random() * 0.3) + 's';

        heartsContainer.appendChild(heart);

        // Clean up after animation completes
        setTimeout(() => {
            heart.remove();
        }, (duration + 0.5) * 1000);
    }
});
