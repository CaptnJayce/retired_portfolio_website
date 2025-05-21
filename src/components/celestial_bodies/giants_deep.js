import * as THREE from 'three';

export class GiantsDeep extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.SphereGeometry(4, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0x30a073, roughness: 0.7 })

        super(geometry, material);

        this.position.set(50, 0, 0);
    }
}
