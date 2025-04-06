// Floating orbs animation with faster movement
document.addEventListener('DOMContentLoaded', () => {
    const orbs = document.querySelectorAll('.orb');

    // Initialize random positions and movements for each orb with significantly faster speeds
    const orbData = Array.from(orbs).map(() => ({
        xPos: Math.random() * 100,
        yPos: Math.random() * 100,
        xSpeed: (Math.random() - 0.5) * 0.6,
        ySpeed: (Math.random() - 0.5) * 0.6,
        size: 0.9 + Math.random() * 0.3,
        opacityOffset: Math.random() * 1000,
        opacitySpeed: 0.8 + Math.random() * 2.0,
        maxOpacity: 0.5 + Math.random() * 0.3
    }));

    // Animate the orbs with enhanced speed and visibility
    function animateOrbs() {
        orbs.forEach((orb, index) => {
            orbData[index].xPos += orbData[index].xSpeed;
            orbData[index].yPos += orbData[index].ySpeed;

            if (orbData[index].xPos > 110 || orbData[index].xPos < -10) {
                orbData[index].xSpeed *= -1;
                orbData[index].xSpeed += (Math.random() - 0.5) * 0.2;
            }
            if (orbData[index].yPos > 110 || orbData[index].yPos < -10) {
                orbData[index].ySpeed *= -1;
                orbData[index].ySpeed += (Math.random() - 0.5) * 0.2;
            }

            orbData[index].xSpeed = Math.max(-1.0, Math.min(1.0, orbData[index].xSpeed));
            orbData[index].ySpeed = Math.max(-1.0, Math.min(1.0, orbData[index].ySpeed));

            const sizeFactor = orbData[index].size + Math.sin(Date.now() / 1500 + index) * 0.15;

            orb.style.transform = `translate(${orbData[index].xPos - 50}vw, ${orbData[index].yPos - 50}vh) scale(${sizeFactor})`;

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

    // ✅ Formspree Submission
    const form = document.querySelector('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        const formData = new FormData();
        formData.append('email', email);
        formData.append('phone', phone);

        try {
            const response = await fetch('https://formspree.io/f/xovepqab', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            if (response.ok) {
                waitlistForm.innerHTML = `
                  <div class="success-message">
                    ✅ Thanks for joining our waitlist! We'll be in touch soon.
                  </div>`;
            } else {
                alert("Oops! Something went wrong submitting your info. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Error submitting the form. Please try again.");
        }
    });
});
