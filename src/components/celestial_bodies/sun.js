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
        <h2>Welcome to my webpage :)</h2>
        <h3>My name is Casey, I'm a Computer Science graduate with a passion for web and game development. Each planet will tell you something different, and there are some easter eggs hidden throughout. Enjoy :) </h3>
        `;
        left.innerHTML = `
        <h2>Programming history:</h2>
        <hr></hr>
        <h2>Early Days:</h2>
        <p>I started programming late in secondary school (2017/2018), mostly during Computer Science GCSE. However, I only found a passion for coding when I encountered game development for the first time in college, as well as web development later on.</p>
        <hr></hr>
        <h2>University:</h2>
        <p>Whilst attending University I decided to experiment with other fields of CS, such as AI, Cybersecurity, and Networking. I ended up writing a Cybersecurity focused dissertation - which explained and demonstrated how websites are scouted for weaknesses, attacked, and also how they can be defended.</p>
        <hr></hr>
        `;
        right.innerHTML = `
        <h2>Other: </h2>
        <h2></h2>
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
