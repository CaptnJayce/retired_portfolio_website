import * as THREE from 'three';

export class HourglassTwins extends THREE.Group {
    constructor() {
        super();

        const geometry = new THREE.SphereGeometry(0.75, 64, 64);
        this.twin1 = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x86110e }));
        this.twin2 = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xF6D7B0 }));

        this.twin1.position.set(2, 0, 0);
        this.twin2.position.set(-2, 0, 0);

        this.add(this.twin1, this.twin2);

        this.semiMajorAxis = 15;
        this.semiMinorAxis = 15;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;

        this.isClickable = true;
        this.handleClick = this.onClick.bind(this);
    }

    onClick() {
        console.log("twins clicked")
    }

    update() {
        this.angle += 0.001 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;

        this.twin1.position.x = 2 * Math.cos(this.angle * 3);
        this.twin1.position.y = 2 * Math.sin(this.angle * 3);
        this.twin2.position.x = -2 * Math.cos(this.angle * 3);
        this.twin2.position.y = -2 * Math.sin(this.angle * 3);
    }
}
