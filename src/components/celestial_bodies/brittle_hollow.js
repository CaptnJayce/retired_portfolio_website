import { BasePlanet } from './planet.js';
import {typeAsciiEffect} from "../../systems/globals";

export class BrittleHollow extends BasePlanet {
    constructor(camera) {
        super(camera, "Experience", 5, 1.5, 0x808080, 0);

        this.semiMajorAxis = 40;
        this.semiMinorAxis = 25;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;
    }

    showPlanetInfo() {
        const overlay = document.getElementById('skillsOverlay');
        const main = overlay.querySelector('.skillsTitle');

        main.innerHTML = `
        <pre class="skillsAscii"></pre>
        `

        const experience = main.querySelector('pre');
        const ascii = `
███████╗██╗  ██╗██████╗ ███████╗██████╗ ██╗███████╗███╗   ██╗ ██████╗ ███████╗
██╔════╝╚██╗██╔╝██╔══██╗██╔════╝██╔══██╗██║██╔════╝████╗  ██║██╔════╝ ██╔════╝
█████╗   ╚███╔╝ ██████╔╝█████╗  ██████╔╝██║█████╗  ██╔██╗ ██║██║      █████╗  
██╔══╝   ██╔██╗ ██╔═══╝ ██╔══╝  ██╔══██╗██║██╔══╝  ██║╚██╗██║██║      ██╔══╝  
███████╗██╔╝ ██╗██║     ███████╗██║  ██║██║███████╗██║ ╚████║╚██████╗ ███████╗
       ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝       
        `
        typeAsciiEffect(experience, ascii, 100);

        const card = document.createElement('div');
        main.appendChild(card);

        overlay.classList.add('visible');
    }

    update() {
        this.angle += 0.0008 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;
    }
}
