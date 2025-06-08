import { BasePlanet } from './planet.js';

export class GiantsDeep extends BasePlanet {
    constructor(camera) {
        super(camera, "...", 3, 4, 0x30a073, 0);

        this.semiMajorAxis = 55;
        this.semiMinorAxis = 35;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;
    }

    update() {
        this.angle += 0.0007 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;
    }
}
