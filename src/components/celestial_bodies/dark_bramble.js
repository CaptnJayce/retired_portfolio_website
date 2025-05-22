import * as THREE from 'three';

export class DarkBramble extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.SphereGeometry(4, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0xe2d997, roughness: 0.7 })
        super(geometry, material);

        this.semiMajorAxis = 75;
        this.semiMinorAxis = 45;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;
    }

    update() {
        this.angle += 0.0006 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;
    }
}
