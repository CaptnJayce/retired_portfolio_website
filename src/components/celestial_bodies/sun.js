import * as THREE from 'three';
import { BasePlanet } from './planet.js';

export class Sun extends BasePlanet {
    constructor(camera) {
        super(camera, "Welcome", 5, 8, 0xFFA500, -15);

        this.material.emissive = new THREE.Color(0xFFA500);
        this.material.emissiveIntensity = 1;

        this.position.z = 0;
        this.outlineMesh.position.z = 5;

        this.light = new THREE.PointLight(0xFFA500, 10000, 250, 2);
        this.add(this.light);
    }

    // TODO: Move typeEffect functions into global file as they will be used elsewhere
    typeEffect(element, text, speed) {
        let i = 0;

        function typing() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i+1) + '';
                i++;
                setTimeout(typing, speed);
            } else {
                element.innerHTML = text;
            }
        }

        typing();
    }
    typeAsciiEffect(element, text, speed) {
        const rows = text.split('\n');
        let currentRow = 0;

        function typing() {
            if (currentRow < rows.length) {
                const visibleText = rows.slice(0, currentRow + 1).join('\n');
                element.innerHTML = visibleText + '';
                currentRow++;
                setTimeout(typing, speed);
            } else {
                element.innerHTML = text;
            }
        }

        typing();
    }

    showPlanetInfo() {
        const overlay = document.getElementById('welcomeOverlay');
        const main = overlay.querySelector('.welcomeContent');

        main.innerHTML = `
        <pre class="welcomeAscii"></pre>
        <h2 class="titles" style="margin-top: 0; padding-top: 0.5vh;"><span  ></span></h2>
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

        // TODO: Make simpler with async
        // TODO: Add toggle for setTimeout
        this.typeAsciiEffect(welcome, ascii, 100);
        setTimeout( ()=> {
            this.typeEffect(heading, 'My name is CaptnJayce or Casey', 30);
        }, 1000);
        setTimeout(() => {
            this.typeEffect(pOne, 'This is my Outer Wilds themed portfolio website, documenting my projects, experience, as well as future blogs and webgames', 30);
        }, 2400);
        setTimeout(() => {
            this.typeEffect(pTwo, 'Each planet will tell you something different, click on the Sun to zoom out and explore the Outer Wilds solar system!', 30);
        }, 6500);
        setTimeout(() => {
            this.typeEffect(pThree, 'If you have any bugs to report, or features to suggest, please open an issue on GitHub: ', 30);
        }, 10500);
        setTimeout(() => {
            this.typeEffect(link, 'captnjayce.github.io/issues', 30);
        }, 13400);
        setTimeout(() => {
            this.typeEffect(pFour, 'Thank you for visiting :)', 30);
        }, 15200);

        const card = document.createElement('div');
        main.appendChild(card);

        this.collapsible();
        overlay.classList.add('visible');
    }

    collapsible() {
        const collapsible = document.getElementsByClassName("collapsible");

        for (let i = 0; i < collapsible.length; i++) {
            collapsible[i].addEventListener("click", function() {
                this.classList.toggle("active");
                const icon = this.querySelector('i');
                const content = this.nextElementSibling;

                if (content.style.display === "block") {
                    content.style.display = "none";
                    icon.classList.remove('nf-cod-triangle_down');
                    icon.classList.add('nf-cod-triangle_right');
                } else {
                    content.style.display = "block";
                    icon.classList.remove('nf-cod-triangle_right');
                    icon.classList.add('nf-cod-triangle_down');
                }
            });
        }
    }
}
