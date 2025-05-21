import * as THREE from 'three';

export class HourglassTwins extends THREE.Group {
    constructor() {
        super();

        const geometry = new THREE.SphereGeometry(0.75, 64, 64);

        const twin1 = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
                color: 0x86110e,
                roughness: 0.7
            })
        );
        twin1.position.set(15, 2, 0);

        const twin2 = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
                color: 0xF6D7B0,
                roughness: 0.7
            })
        );
        twin2.position.set(15, -2, 0);

        this.add(twin1, twin2);
    }
}
