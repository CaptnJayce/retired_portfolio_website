import * as THREE from 'three';
import { BasePlanet } from './planet.js';

export class Sun extends BasePlanet {
    constructor(camera) {
        super(camera, "About Me", 2, 8, 0xFFA500);

        this.material.emissive = new THREE.Color(0xFFA500);
        this.material.emissiveIntensity = 1;

        this.light = new THREE.PointLight(0xFFA500, 10000, 250, 2);
        this.add(this.light);
    }

    showPlanetInfo() {
        const overlay = document.getElementById('aboutMeOverlay');
        const title = overlay.querySelector('.aboutMeTitle');
        const left = overlay.querySelector('.aboutMeLeft');
        const right = overlay.querySelector('.aboutMeRight');

        title.innerHTML = `
        <h2>Hi! :). My name is Casey, I'm a Computer Science graduate with a passion for web and game development.</h2>
        `;
        left.innerHTML = `
        <h2>left test</h2>
        `;
        right.innerHTML = `
        <h2>right test</h2>
        `;

        const leftCard = this.createAboutMeCard();
        const rightCard = this.createAboutMeCard();

        left.appendChild(leftCard);
        right.appendChild(rightCard);

        overlay.classList.add('visible');
    }

    createAboutMeCard() {
        const card = document.createElement('div');
        card.className = 'aboutMeCard';

        return card;
    }
}
