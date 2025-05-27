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

        this.outlineMesh = new THREE.Mesh(
            new THREE.SphereGeometry(8.2, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide
            })
        );
        this.outlineMesh.visible = false;
        this.add(this.outlineMesh);

        this.light = new THREE.PointLight(0xFFA500, 10000, 250, 2);
        this.add(this.light);

        this.name = "Sun";

        this.isClickable = true;
        this.isHoverable = true;
        this.isSelected = false;

        this.handleClick = this.onClick.bind(this);
        this.handleMouseOver = this.onMouseOver.bind(this);
        this.handleMouseOut = this.onMouseOut.bind(this);

        this.originalEmissive = material.emissive.clone();
        this.originalEmissiveIntensity = material.emissiveIntensity;
    }

    onClick() {
    }

    onMouseOver() {
        this.outlineMesh.visible = true;
    }

    onMouseOut() {
        this.outlineMesh.visible = false;
    }
}
