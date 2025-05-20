document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    function pickColour(min, max) {
        colours = ['#FFFFFFFF', '#FFFFFFBF', '#26BBD9FF'];
        return colours[Math.floor(Math.random() * max + min)];
    }

    class Planet {
        constructor() {
            this.size = 300;
            this.colour = '#1EB980';
            this.x = canvas.width / 2;
            this.y = canvas.height + 100;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = this.colour;
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    class Star {
        constructor() {
            // this.pulseSpeed = Math.random() * 0.01 + 0.01;
            // this.isGrowing = true;

            this.size = Math.random() * 0.5 + 1;
            this.maxSize = this.size + 1;
            this.minSize = this.size;

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.colour = pickColour(0, 3);
        }

        update() {
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);

            const glowRadius = this.size + 6;
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);

            if (this.colour === '#26BBD9FF') {
                gradient.addColorStop(0, 'rgba(36, 188, 220, 0.4)');
                gradient.addColorStop(0.3, 'rgba(36, 188, 220, 0.2)');
                gradient.addColorStop(0.4, 'rgba(36, 188, 220, 0.1)');
                gradient.addColorStop(1, 'rgba(36, 188, 220, 0)');
            } else {
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
                gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.2)');
                gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.1)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            }

            // gradient
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
            ctx.fill();

            // star
            ctx.fillStyle = this.colour;
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    const stars = [];
    const star_count = 120;

    for (let i = 0; i < star_count; i++) {
        stars.push(new Star());
    }

    const planet = new Planet();

    // animation
    function animate() {
        ctx.fillStyle = '#0000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.update();
            star.draw();
        });
        planet.draw()

        requestAnimationFrame(animate);
    }

    animate();
});
