import { BasePlanet } from './planet.js';

export class BrittleHollow extends BasePlanet {
    constructor(camera) {
        super(camera, "Skills", 2, 1.5, 0x808080, 0);

        this.semiMajorAxis = 40;
        this.semiMinorAxis = 25;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;
    }

    showPlanetInfo() {
        const overlay = document.getElementById('skillsOverlay');
        const title = overlay.querySelector('.skillsTitle');
        const programming = overlay.querySelector('.skillsProgramming');
        const environment = overlay.querySelector('.skillsEnvironment');
        const other = overlay.querySelector('.skillsOther');

        title.innerHTML = `
            <h3>My Skills</h3>
        `;

        programming.innerHTML = `
            <h3>Programming</h3>
        `;

        environment.innerHTML = `
            <h3>Environment</h3>
        `;

        other.innerHTML = `
            <h3>Other</h3>
        `;

        overlay.classList.add('visible');
    }

    update() {
        this.angle += 0.0008 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;
    }
}
