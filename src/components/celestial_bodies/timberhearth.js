import * as THREE from 'three';

export class TimberHearth extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.SphereGeometry(1.25, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0x59981a,
            roughness: 0.7,
        });

        super(geometry, material);

        this.semiMajorAxis = 35;
        this.semiMinorAxis = 25;
        this.orbitSpeed = 0.5;
        this.angle = 0;

        this.position.set(25, 0, 0);
    }

    update() {
        this.angle += 0.01 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;
    }
}
