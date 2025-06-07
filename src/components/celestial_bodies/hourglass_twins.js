import * as THREE from 'three';

export class HourglassTwins extends THREE.Group {
    constructor(camera) {
        super();

        const geometry = new THREE.SphereGeometry(0.75, 64, 64);

        this.outlineMeshOne = new THREE.Mesh(
            new THREE.SphereGeometry(0.95, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide
            })
        );
        this.outlineMeshTwo = new THREE.Mesh(
            new THREE.SphereGeometry(0.95, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide
            })
        );

        this.outlineMeshOne.visible = false;
        this.outlineMeshTwo.visible = false;

        this.twin1 = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x86110e }));
        this.twin2 = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xF6D7B0 }));

        this.add(this.outlineMeshOne, this.outlineMeshTwo, this.twin1, this.twin2);

        this.semiMajorAxis = 15;
        this.semiMinorAxis = 15;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;

        this.isClickable = true;
        this.camera = camera;
        this.handleClick = this.onClick.bind(this);

        // this.twin1.name = "Ember Twin";
        this.twin1.name = "Experience";
        this.twin1.isHoverable = true;
        this.twin1.handleMouseOver = () => {
            this.outlineMeshOne.visible = true;
        };
        this.twin1.handleMouseOut = () => {
            this.outlineMeshOne.visible = false;
        };

        // this.twin2.name = "Ash Twin";
        this.twin2.name = "Education"
        this.twin2.isHoverable = true;
        this.twin2.handleMouseOver = () => {
            this.outlineMeshTwo.visible = true;
        };
        this.twin2.handleMouseOut = () => {
            this.outlineMeshTwo.visible = false;
        };
    }

    onClick() {
        if (this.camera && typeof this.camera.focusOnObject === 'function') {
            this.twin1.isHoverable = false;
            this.twin2.isHoverable = false;

            this.outlineMeshOne.visible = false;
            this.outlineMeshTwo.visible = false;

            this.camera.focusOnObject(this, {
                distance: 10,
                zoom: 1
            });
        }
    }

    update() {
        this.angle += 0.001 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;

        const twin1X = 2 * Math.cos(this.angle * 3);
        const twin1Y = 2 * Math.sin(this.angle * 3);
        const twin2X = -2 * Math.cos(this.angle * 3);
        const twin2Y = -2 * Math.sin(this.angle * 3);

        this.twin1.position.set(twin1X, twin1Y, 0);
        this.outlineMeshOne.position.set(twin1X, twin1Y, 0);

        this.twin2.position.set(twin2X, twin2Y, 0);
        this.outlineMeshTwo.position.set(twin2X, twin2Y, 0);
    }
}
