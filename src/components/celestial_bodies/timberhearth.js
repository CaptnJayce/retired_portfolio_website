import * as THREE from 'three';

export class TimberHearth extends THREE.Mesh {
    constructor(camera) {
        const geometry = new THREE.SphereGeometry(1.25, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0x59981a,
            roughness: 0.7,
        });

        super(geometry, material);

        this.outlineMesh = new THREE.Mesh(
            new THREE.SphereGeometry(1.45, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide
            })
        );
        this.outlineMesh.visible = false;
        this.add(this.outlineMesh);

        this.semiMajorAxis = 30;
        this.semiMinorAxis = 20;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;

        this.isClickable = true;
        this.camera = camera;
        this.handleClick = this.onClick.bind(this);

        this.isHoverable = true;
        this.handleMouseOver = this.onMouseOver.bind(this);
        this.handleMouseOut = this.onMouseOut.bind(this);
    }

    onClick() {
        if (this.camera && typeof this.camera.focusOnObject === 'function') {
            this.camera.focusOnObject(this, {
                distance: 10,
                zoom: 4
            });
        }
    }

    onMouseOver() {
        this.outlineMesh.visible = true;
    }

    onMouseOut() {
        this.outlineMesh.visible = false;
    }

    update() {
        this.angle += 0.0009 * this.orbitSpeed;
        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;
    }
}
