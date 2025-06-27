import { BasePlanet } from './planet.js';

export class DarkBramble extends BasePlanet {
    constructor(camera) {
        super(camera, "Web Games (soon...)", 3, 4, 0xe2d997, 0);

        this.semiMajorAxis = 75;
        this.semiMinorAxis = 45;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;
    }

    update() {
        this.angle += 0.0006 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;
    }
}
