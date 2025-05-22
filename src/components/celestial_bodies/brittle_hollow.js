import * as THREE from 'three';

export class BrittleHollow extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.SphereGeometry(1.5, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.7 });

        super(geometry, material);

        this.orbitRadius = 35;
        this.orbitSpeed = 0.5;
        this.angle = 0;

        this.position.set(35, 0, 0);
    }

    update() {
        this.angle += 0.001 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.position.y = Math.sin(this.angle) * this.orbitRadius;
    }
}
