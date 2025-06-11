import { BasePlanet } from './planet.js';

export class HourglassTwins extends BasePlanet {
    constructor(camera) {
        super(camera, "Experience & Education", 5, 0.1, 0x000000, 0);

        this.material.transparent = true;
        this.material.opacity = 0;
        this.outlineMesh.visible = false;

        this.twin1 = this.createTwin("Experience", 0x86110e);
        this.twin2 = this.createTwin("Education", 0xF6D7B0);

        this.semiMajorAxis = 15;
        this.semiMinorAxis = 15;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;
    }

    createTwin(name, color) {
        const twin = new BasePlanet(this.camera, name, 5, 0.75, color, 0);
        twin.isClickable = false;
        twin.outlineMesh.visible = false;

        twin.tooltip.style.transform = 'translate(-50%, -150%)';

        twin.userData.parentPlanet = this;
        this.add(twin);
        return twin;
    }

    update() {
        this.angle += 0.001 * this.orbitSpeed;
        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;

        const twinAngle = this.angle * 3;
        const twinDistance = 2;

        this.twin1.position.set(
            Math.cos(twinAngle) * twinDistance,
            Math.sin(twinAngle) * twinDistance,
            0
        );

        this.twin2.position.set(
            -Math.cos(twinAngle) * twinDistance,
            -Math.sin(twinAngle) * twinDistance,
            0
        );

        if (this.twin1Outline) this.twin1Outline.position.copy(this.twin1.position);
        if (this.twin2Outline) this.twin2Outline.position.copy(this.twin2.position);
    }

    // TODO
    // mesh outline

    showPlanetInfo() {
        const overlay = document.getElementById('timelineOverlay');
        const top = overlay.querySelector('.timelineTop');
        const bottom = overlay.querySelector('.timelineBottom');

        top.innerHTML = `
            <h2>Education</h2>
            <p>2016 to 2019</p>
            <p>2019 to 2021</p>
            <p>2021 to 2024</p>
            <p>2025</p>
        `;

        bottom.innerHTML = `
            <h2>Experience</h2>
        `;

        overlay.classList.add('visible');
    }
}
