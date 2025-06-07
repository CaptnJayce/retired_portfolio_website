// base planet class
import * as THREE from 'three';

export class BasePlanet extends THREE.Mesh {
    constructor(camera, planetName, radius, color) {
        const geometry = new THREE.SphereGeometry(radius, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.7,
        });

        super(geometry, material);

        this.outlineMesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius * 1.1, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide
            })
        );
        this.outlineMesh.visible = false;
        this.add(this.outlineMesh);

        this.name = planetName;
        this.camera = camera;

        this.isClickable = true;
        this.isHoverable = true;
        this.handleClick = this.onClick.bind(this);
        this.handleMouseOver = this.onMouseOver.bind(this);
        this.handleMouseOut = this.onMouseOut.bind(this);
    }

    onClick() {
        if (this.camera && typeof this.camera.focusOnObject === 'function') {
            this.camera.focusOnObject(this, {
                distance: 10,
                zoom: 1
            });

            setTimeout(() => {
                this.showPlanetInfo();
            }, 1000);
        }
    }

    onMouseOver() {
        this.outlineMesh.visible = true;
    }

    onMouseOut() {
        this.outlineMesh.visible = false;
    }

    showPlanetInfo() {
        this.camera.solarSystem.showPlanetInfo(this.name);
    }
}
