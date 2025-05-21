import * as THREE from 'three';

export class Sun extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.SphereGeometry(8, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0xFFA500,
            emissive: 0xFFA500,
            emissiveIntensity: 1,
            roughness: 0.7
        });
        super(geometry, material);

        this.light = new THREE.PointLight(0xFFA500, 10000, 250, 2);
        this.add(this.light);
    }
}
