import * as THREE from 'three';

export class GiantsDeep extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.SphereGeometry(4, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0x30a073, roughness: 0.7 })

        super(geometry, material);

        this.orbitRadius = 50;
        this.orbitSpeed = 0.5;
        this.angle = 0;

        this.position.set(50, 0, 0);
    }

    update() {
        this.angle += 0.001 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.position.y = Math.sin(this.angle) * this.orbitRadius;
    }
}
