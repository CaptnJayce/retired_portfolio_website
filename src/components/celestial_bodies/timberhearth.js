import * as THREE from 'three';

export class TimberHearth extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.SphereGeometry(1.25, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0x59981a,
            roughness: 0.7,
        });

        super(geometry, material);
        this.position.set(25, 0, 0);
    }
}
