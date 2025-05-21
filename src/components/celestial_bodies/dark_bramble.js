import * as THREE from 'three';

export class DarkBramble extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.SphereGeometry(4, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0xe2d997, roughness: 0.7 })
        super(geometry, material);

        this.position.set(70, 0, 0);
    }
}
