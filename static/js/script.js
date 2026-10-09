document.addEventListener("DOMContentLoaded", function () {
    const bgMusic = document.getElementById("bgMusic");
    const audioToggle = document.getElementById("audioToggle");
    const audioIcon = document.getElementById("audioIcon");
    const openEnvelopeBtn = document.getElementById("openEnvelopeBtn");

    let isPlaying = false;

    function playAudio() {
        if (bgMusic) {
            bgMusic.play().then(() => {
                isPlaying = true;
                if (audioIcon) audioIcon.textContent = "🔊";
            }).catch(error => {
                console.log("Audio play failed:", error);
            });
        }
    }

    // Play music when she taps the envelope to open the letter
    if (openEnvelopeBtn) {
        openEnvelopeBtn.addEventListener("click", function () {
            playAudio();
        });
    }

    // Floating music button to mute/unmute anytime
    if (audioToggle) {
        audioToggle.addEventListener("click", function () {
            if (isPlaying) {
                bgMusic.pause();
                isPlaying = false;
                audioIcon.textContent = "🔇";
            } else {
                playAudio();
            }
        });
    }
});