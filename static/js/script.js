document.addEventListener('DOMContentLoaded', () => {

    // 1. Floating Hearts Background
    const heartsContainer = document.getElementById('hearts-container');
    const heartSymbols = ['❤️', '💖', '🌸', '💕', '✨'];

    function createFloatingHeart() {
        if (!heartsContainer) return;

        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    if (heartsContainer) {
        setInterval(createFloatingHeart, 450);
    }

    // 2. Audio Controls
    const audioToggle = document.getElementById('audioToggle');
    const bgMusic = document.getElementById('bgMusic');
    const audioIcon = document.getElementById('audioIcon');
    const mainPlayBtn = document.getElementById('mainPlayBtn');
    let isPlaying = false;

    function playAudio() {
        if (bgMusic) {
            bgMusic.play().then(() => {
                isPlaying = true;
                if (audioIcon) audioIcon.innerText = '🔊';
                if (mainPlayBtn) mainPlayBtn.style.display = 'none';
            }).catch(error => {
                console.log("Autoplay blocked or audio format invalid:", error);
            });
        }
    }

    function pauseAudio() {
        if (bgMusic) {
            bgMusic.pause();
            isPlaying = false;
            if (audioIcon) audioIcon.innerText = '🔇';
        }
    }

    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        });
    }

    if (mainPlayBtn) {
        mainPlayBtn.addEventListener('click', () => {
            playAudio();
        });
    }

    // 3. Screen Transitions & UI Elements
    const screenEnvelope = document.getElementById('screen-envelope');
    const screenProposal = document.getElementById('screen-proposal');
    const screenCelebration = document.getElementById('screen-celebration');

    const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
    const yesBtn = document.getElementById('yesBtn');
    const thinkBtn = document.getElementById('thinkBtn');
    const noteToggleBtn = document.getElementById('noteToggleBtn');
    const personalNote = document.getElementById('personalNote');
    const whatsappLink = document.getElementById('whatsappLink');

    // Open Envelope Action
    if (openEnvelopeBtn) {
        openEnvelopeBtn.addEventListener('click', () => {
            if (screenEnvelope && screenProposal) {
                screenEnvelope.classList.remove('active');
                screenEnvelope.classList.add('hidden');
                
                screenProposal.classList.remove('hidden');
                screenProposal.classList.add('active');
            }

            if (!isPlaying) {
                playAudio();
            }
        });
    }

    // Reveal Personal Note
    if (noteToggleBtn && personalNote) {
        noteToggleBtn.addEventListener('click', () => {
            personalNote.classList.toggle('hidden');
        });
    }

    // Dodging "Let Me Think" Button Logic
    function moveButton() {
        if (!thinkBtn) return;
        const x = Math.floor(Math.random() * 220) - 110;
        const y = Math.floor(Math.random() * 100) - 50;
        thinkBtn.style.transform = `translate(${x}px, ${y}px)`;
    }

    if (thinkBtn) {
        thinkBtn.addEventListener('mouseenter', moveButton);
        thinkBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveButton();
        });
        thinkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveButton();
        });
    }

    // Yes Button Action
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            if (screenProposal && screenCelebration) {
                screenProposal.classList.remove('active');
                screenProposal.classList.add('hidden');

                screenCelebration.classList.remove('hidden');
                screenCelebration.classList.add('active');
            }

            if (whatsappLink) {
                const message = encodeURIComponent("YES! I'd love to spend the rest of my life with you! ❤️✨");
                whatsappLink.href = `https://wa.me/?text=${message}`;
            }

            triggerConfetti();
        });
    }

    // Canvas Confetti Animation
    function triggerConfetti() {
        if (typeof confetti !== 'function') return;

        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
            }));
        }, 250);
    }
});