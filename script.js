document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    function pickColour() {
        colours = ['#26BBD9', '#59E3E3', '#29D398', '#EE64AE', '#E95678'];
        return colours[Math.floor(Math.random() * colours.length)];
    }

    class Square {
        constructor() {
            this.size = Math.random() * 20 + 10; // size between 10 and 30
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speed_x = Math.random() * 0.5 - 0.25; // speed between -0.25 and 0.25
            this.speed_y = Math.random() * 0.5 - 0.25;
            this.colour = pickColour(); // colour
            this.rot = Math.random() * Math.PI * 2; // init rot
            this.rotSpeed = Math.random() * 0.02 - 0.01; // rot speed
        }

        update() {
            this.x += this.speed_x;
            this.y += this.speed_y;
            this.rot += this.rotSpeed;

            if (this.x > canvas.width + this.size) this.x = -this.size;
            else if (this.x < -this.size) this.x = canvas.width + this.size;

            if (this.y > canvas.height + this.size) this.y = -this.size;
            else if (this.y < -this.size) this.y = canvas.height + this.size;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot);
            ctx.fillStyle = this.colour;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    class Circle {
        constructor() {
            this.radius = Math.random() * 10 + 10;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speed_x = Math.random() * 0.5 - 0.25;
            this.speed_y = Math.random() * 0.5 - 0.25;
            this.colour = pickColour();
        }

        update() {
            this.x += this.speed_x;
            this.y += this.speed_y;

            if (this.x > canvas.width + this.size) this.x = -this.size;
            else if (this.x < -this.size) this.x = canvas.width + this.size;

            if (this.y > canvas.height + this.size) this.y = -this.size;
            else if (this.y < -this.size) this.y = canvas.height + this.size;
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

    const shapes = [];
    const shape_count = 75;

    for (let i = 0; i < shape_count; i++) {
        if (i % 2 === 0) {
            shapes.push(new Square());
        } else {
            shapes.push(new Circle());
        }
    }

    // animation
    function animate() {
        ctx.fillStyle = '#1C1E26';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        shapes.forEach(shape => {
            shape.update();
            shape.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});
