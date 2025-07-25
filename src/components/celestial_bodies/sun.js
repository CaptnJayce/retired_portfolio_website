import * as THREE from 'three';
import { BasePlanet } from './planet.js';
import { typeEffect, typeAsciiEffect } from '../../systems/globals.js';

export class Sun extends BasePlanet {
    constructor(camera) {
        super(camera, "Welcome", 6, 8, 0xFFA500, 0, -11);

        this.material.emissive = new THREE.Color(0xFFA500);
        this.material.emissiveIntensity = 1;

        this.position.z = 0;
        this.outlineMesh.position.z = 5;

        this.light = new THREE.PointLight(0xFFA500, 10000, 250, 2);
        this.add(this.light);
    }

    showPlanetInfo() {
        const overlay = document.getElementById('welcomeOverlay');
        const main = overlay.querySelector('.welcomeContent');

        main.innerHTML = `
        <pre class="welcomeAscii"></pre>
        <h2 class="titles" style="margin-top: 0; padding-top: 0.5vh;"><span></span></h2>
        <p style="margin-top: 0;"><span></span></p>
        <p style="margin-top: 0;"><span></span></p>
        <p style="margin-top: 0;"><span></span></p>
        <a href="https://github.com/CaptnJayce/captnjayce.github.io/issues" class="welcomeLink""><span></span></a>
        <p style="padding-top: 4vh;"><span></span></p>
        `;

        const welcome = main.querySelector('pre');
        const heading = main.querySelector('h2 span');
        const pOne = main.querySelectorAll('p span')[0];
        const pTwo = main.querySelectorAll('p span')[1];
        const pThree = main.querySelectorAll('p span')[2];
        const pFour = main.querySelectorAll('p span')[3];
        const link = main.querySelector('a span');
        const ascii= `
 ██╗  ██╗███████╗██╗     ██╗      ██████╗    ████████╗██╗  ██╗███████╗██████╗ ███████╗
 ██║  ██║██╔════╝██║     ██║     ██╔═══██╗   ╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔════╝
 ███████║█████╗  ██║     ██║     ██║   ██║      ██║   ███████║█████╗  ██████╔╝█████╗  
 ██╔══██║██╔══╝  ██║     ██║     ██║   ██║      ██║   ██╔══██║██╔══╝  ██╔══██╗██╔══╝  
 ██║  ██║███████╗███████╗███████╗╚██████╔╝      ██║   ██║  ██║███████╗██║  ██║███████╗
 ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝       ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝
        `;

        // TODO: Add toggle for setTimeout
        typeAsciiEffect(welcome, ascii, this.hasVisited ? 0 : 100);

        const messages = [
            { element: heading, text: 'My name is CaptnJayce or Casey', delay: 1000 },
            { element: pOne, text: 'This is my Outer Wilds themed portfolio website, documenting my projects, experience, as well as future blogs and webgames', delay: 2400 },
            { element: pTwo, text: 'Each planet will tell you something different, click on the Sun to zoom out and explore the Outer Wilds solar system!', delay: 6500 },
            { element: pThree, text: 'If you have any bugs to report, or features to suggest, please open an issue on GitHub: ', delay: 10500 },
            { element: link, text: 'captnjayce.github.io/issues', delay: 13400 },
            { element: pFour, text: 'Thank you for visiting :)', delay: 15200 }
        ];

        messages.forEach(({ element, text, delay }) => {
            setTimeout(() => typeEffect(element, text, this.hasVisited ? 0 : 30), this.hasVisited ? 0 : delay);
        });

        const card = document.createElement('div');
        main.appendChild(card);

        overlay.classList.add('visible');
    }
}
