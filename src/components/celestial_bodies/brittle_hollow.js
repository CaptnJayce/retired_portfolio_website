import * as THREE from 'three';

export class BrittleHollow extends THREE.Mesh {
    constructor() {
        const geometry = new THREE.SphereGeometry(1.5, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.7 });

        super(geometry, material);

        this.semiMajorAxis = 40;
        this.semiMinorAxis = 25;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;

        this.isClickable = true;
        this.handleClick = this.onClick.bind(this);
    }

    onClick() {
        console.log("brittle hollow clicked")
    }

    update() {
        this.angle += 0.0008 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;
    }
}
