document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    function pickColour(min, max) {
        // first half for StarClose, second half for StarFar
        colours = ['#FFFFFFFF', '#FFFFFFBF', '#26BBD9FF', '#FFFFFF66', '#FFFFFF33', '#26BBD966'];
        return colours[Math.floor(Math.random() * max + min)];
    }

    class Planet {
        constructor() {
            this.radius = 300;
            this.colour = '#1EB980';
            this.x = canvas.width / 2;
            this.y = canvas.height + 100;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = this.colour;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    class StarClose {
        constructor() {
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.isGrowing = true;

            this.size = Math.random() * 1 + 3;
            this.maxSize = this.size + 4;
            this.minSize = this.size;

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.colour = pickColour(0, 3); // pick first three colours
        }

        update() {
            if (this.colour === '#26BBD9FF') {
                if (this.isGrowing) {
                    this.size += this.pulseSpeed;
                    if (this.size >= this.maxSize) this.isGrowing = false;
                } else {
                    this.size -= this.pulseSpeed;
                    if (this.size <= this.minSize) this.isGrowing = true;
                }
            }
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

    class StarFar {
        constructor() {
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.isGrowing = true;

            this.size = Math.random() * 1 + 3;
            this.maxSize = this.size + 2;
            this.minSize = this.size;

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.colour = pickColour(3, 3); // pick last three colours
        }

        update() {
            if (this.colour === '#26BBD966') {
                if (this.isGrowing) {
                    this.size += this.pulseSpeed;
                    if (this.size >= this.maxSize) this.isGrowing = false;
                } else {
                    this.size -= this.pulseSpeed;
                    if (this.size <= this.minSize) this.isGrowing = true;
                }
            }
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

    const stars = [];
    const star_count = 40;

    for (let i = 0; i < star_count; i++) {
        if (i % 2 === 0) {
            stars.push(new StarClose());
        } else {
            stars.push(new StarFar());
        }
    }

    const planet = new Planet();  // Create a planet instance

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
