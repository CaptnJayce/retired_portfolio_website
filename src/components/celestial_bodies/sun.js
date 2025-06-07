import * as THREE from 'three';
import { BasePlanet } from './planet.js';

export class Sun extends BasePlanet {
    constructor(camera) {
        super(camera, "About Me", 1.8, 8, 0xFFA500, 25);

        this.material.emissive = new THREE.Color(0xFFA500);
        this.material.emissiveIntensity = 1;

        this.light = new THREE.PointLight(0xFFA500, 10000, 250, 2);
        this.add(this.light);
    }

    showPlanetInfo() {
        const overlay = document.getElementById('aboutMeOverlay');
        const title = overlay.querySelector('.aboutMeTitle');
        const main = overlay.querySelector('.aboutMeMain');

        title.innerHTML = `
        <h2>A small introduction about myself, as well as this website</h2>
        `;

        // TODO
        // align planet to the left or right side of the screen when zooming in so that you can fit information better
        // fill out information
        // find a nice font
        // finalise design of the box
        main.innerHTML = `
        <p>My name is Casey Jestico</p>
        <p>I'm a game developer and front-end web developer based in London</p>
        <br></br>
        <p>I'm skilled in JS, ThreeJS, Odin, Raylib, C++, Lua, and Linux System Administration</p>
        <br></br>
        <p>I have a strong academic background with a BSc in Computer Science, a Level 3 BTEC Certification in IT, as well as an AWS Cloud Practitioner Certificate. I'm also going through various courses in the Salesforce ecosystem</p>
        <br></br>
        <p>Some other skills I have: Blender, Aseprite, Godot, 3D Printing, and playing Terraria (very important)</p>
        `;

        const card = this.createAboutMeCard();
        main.appendChild(card);

        overlay.classList.add('visible');
    }

    createAboutMeCard() {
        const card = document.createElement('div');
        card.className = 'aboutMeCard';

        return card;
    }
}
