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
            this.size = 500;
            this.colour = '#1EB980';
            this.x = canvas.width - 100;
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
            this.lifetime = Math.random() * 360 + 120;
            this.size = Math.random() * 0.5 + 1;
            this.maxSize = this.size + 1;
            this.minSize = this.size;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speed_x = -0.2;
            this.speed_y = 0.1;
            this.colour = pickColour(0, 3);
        }

        update(deltaTime) {
            this.x += this.speed_x;
            this.y += this.speed_y;

            this.lifetime -= deltaTime;

            if (this.x > canvas.width + this.size) this.x = -this.size;
            else if (this.x < -this.size) this.x = canvas.width + this.size;

            if (this.y > canvas.height + this.size) this.y = -this.size;
            else if (this.y < -this.size) this.y = canvas.height + this.size;
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

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
            ctx.fill();

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

    let lastTime = 0;
    function animate(currentTime) {
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        ctx.fillStyle = '#0000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.update(deltaTime);
            star.draw();

            if (star.lifetime <= 0) {
                stars.pop();
            }
        });
        planet.draw();

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});
