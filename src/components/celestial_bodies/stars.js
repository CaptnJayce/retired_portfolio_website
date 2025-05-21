import * as THREE from 'three';

export class Stars {
    constructor(scene, viewSize, aspect) {
        this.stars = [];
        this.star_count = 500;
        this.width = viewSize * aspect;
        this.height = viewSize;
        this.scene = scene;

        this.colourSelect = () => {
            return Math.random() < 0.5 ? 0x25B2BC : 0xFFFFFF;
        };

        this.getLifetime = () => {
            return (180 + Math.random() * 120) * 1000;
        };

        this.createStars();
    }

    createStars() {
        for (let i = 0; i < this.star_count; i++) {
            const radius = Math.random() * 0.1 + 0.1;
            const geometry = new THREE.CircleGeometry(radius, 32, 0.0);
            const material = new THREE.MeshStandardMaterial({ color: this.colourSelect() });
            const star = new THREE.Mesh(geometry, material);

            star.position.x = (Math.random() - 0.5) * this.width;
            star.position.y = (Math.random() - 0.5) * this.height;
            star.position.z = 0;

            star.userData = {
                created_at: Date.now(),
                lifetime: this.getLifetime()
            };

            this.stars.push(star);
            this.scene.add(star);
        }
    }

    update() {
        const currentTime = Date.now();

        for (let i = this.stars.length - 1; i >= 0; i--) {
            const star = this.stars[i];

            const age = currentTime - star.userData.created_at;
            if (age >= star.userData.lifetime) {
                this.scene.remove(star);
                this.stars.splice(i, 1);
            }
        }
    }
}
