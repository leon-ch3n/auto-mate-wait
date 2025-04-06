// Floating orbs animation with faster movement
document.addEventListener('DOMContentLoaded', () => {
    const orbs = document.querySelectorAll('.orb');

    // Initialize random positions and movements for each orb with significantly faster speeds
    const orbData = Array.from(orbs).map(() => ({
        xPos: Math.random() * 100,
        yPos: Math.random() * 100,
        xSpeed: (Math.random() - 0.5) * 0.6, // Even faster horizontal movement
        ySpeed: (Math.random() - 0.5) * 0.6, // Even faster vertical movement
        size: 0.9 + Math.random() * 0.3, // Size fluctuation factor
        opacityOffset: Math.random() * 1000, // Random offset for opacity cycling
        opacitySpeed: 0.8 + Math.random() * 2.0, // Even faster opacity cycling
        maxOpacity: 0.5 + Math.random() * 0.3 // Each orb has different max opacity
    }));

    // Animate the orbs with enhanced speed and visibility
    function animateOrbs() {
        orbs.forEach((orb, index) => {
            // Update position with faster movement
            orbData[index].xPos += orbData[index].xSpeed;
            orbData[index].yPos += orbData[index].ySpeed;

            // Bounce off walls with some padding
            if (orbData[index].xPos > 110 || orbData[index].xPos < -10) {
                orbData[index].xSpeed *= -1;
                // Randomize speed slightly after each bounce
                orbData[index].xSpeed += (Math.random() - 0.5) * 0.2;
            }
            if (orbData[index].yPos > 110 || orbData[index].yPos < -10) {
                orbData[index].ySpeed *= -1;
                // Randomize speed slightly after each bounce
                orbData[index].ySpeed += (Math.random() - 0.5) * 0.2;
            }

            // Keep speeds within reasonable bounds but allow them to be quite fast
            orbData[index].xSpeed = Math.max(-1.0, Math.min(1.0, orbData[index].xSpeed));
            orbData[index].ySpeed = Math.max(-1.0, Math.min(1.0, orbData[index].ySpeed));

            // Add some gentle size pulsing
            const sizeFactor = orbData[index].size + Math.sin(Date.now() / 1500 + index) * 0.15;

            // Apply transforms
            orb.style.transform = `translate(${orbData[index].xPos - 50}vw, ${orbData[index].yPos - 50}vh) scale(${sizeFactor})`;

            // More dramatic and faster opacity cycling for fade in/out effect
            // Using the maxOpacity value to ensure each orb can reach a different peak opacity
            const opacityValue = 0.1 + Math.abs(Math.sin(Date.now() / (1500 / orbData[index].opacitySpeed) + orbData[index].opacityOffset)) * orbData[index].maxOpacity;
            orb.style.opacity = opacityValue.toFixed(2);
        });

        requestAnimationFrame(animateOrbs);
    }

    // Start the animation immediately
    animateOrbs();

    // Waitlist Button Functionality
    const waitlistBtn = document.getElementById('join-waitlist-btn');
    const waitlistForm = document.getElementById('waitlist-form');

    waitlistBtn.addEventListener('click', () => {
        waitlistBtn.classList.add('hidden');
        waitlistForm.classList.remove('hidden');
        document.getElementById('email').focus();
    });

    // Form Submission
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Here you would normally send this data to your backend
        console.log('Waitlist signup:', { email, phone });

        // Show success message
        waitlistForm.innerHTML = '<div class="success-message">Thanks for joining our waitlist! We\'ll be in touch soon.</div>';
    });
});