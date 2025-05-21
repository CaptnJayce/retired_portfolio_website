import * as THREE from 'three';

export class BrittleHollow extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.SphereGeometry(1.5, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.7 });

        super(geometry, material);

        this.position.set(35, 0, 0);
    }
}
