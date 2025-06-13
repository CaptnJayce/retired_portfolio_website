import * as THREE from 'three';
import { BasePlanet } from './planet.js';

export class Sun extends BasePlanet {
    constructor(camera) {
        super(camera, "About Me", 3, 8, 0xFFA500, 20);

        this.material.emissive = new THREE.Color(0xFFA500);
        this.material.emissiveIntensity = 1;

        this.position.z = 0;
        this.outlineMesh.position.z = 5;

        this.light = new THREE.PointLight(0xFFA500, 10000, 250, 2);
        this.add(this.light);
    }

    showPlanetInfo() {
        const overlay = document.getElementById('aboutMeOverlay');
        const title = overlay.querySelector('.aboutMeTitle');
        const main = overlay.querySelector('.aboutMeMain');

        title.innerHTML = `
        <h2>About me:</h2>
        `;

        main.innerHTML = `
        <h2>General</h2>
        <p>Welcome to my website! My name is Casey Jestico, a 22-year-old developer from London</p>
        <p>I have been making games and websites for almost five years now and have had an interest in technology from as early as I can remember</p>
        <br>
        <p>I have a strong academic background with a BSc in Computer Science, a Level 3 BTEC Certification in IT, as well as an AWS Cloud Practitioner Certificate. I'm also going through various courses in the Salesforce ecosystem</p>
        <p>I'm skilled in JS, ThreeJS, Odin, Raylib, C++, Lua, and Linux System Administration<br>Some other skills I have: Blender, Aseprite, Godot, 3D Printing, and playing Terraria (very important)</p>
        <br>
        <p>Some other information:</p>
        <ul style="font-size: 1vw">
          <li> I have two cats called Willow and Winston</li>
          <li> My top five favourite games are: Terraria, Outer Wilds, Hollow Knight, Risk of Rain 2, and V Rising</li>
          <li> My favourite drink is Monster Energy Mango Loco (consumed in moderation)</li>
        </ul>
        <br></br>
        <h2>FAQ</h2>
        <p style="font-weight: bold"><i class="nf nf-fa-question" style="color: red"></i> Why are you called Captn-Jayce- if your name is Casey?</p>
        <p><i class="nf nf-oct-light_bulb" style="color: yellow"></i> I wanted people online to call me by an actual human name instead of a user ID - however, I also didn't want my real name to be used everywhere, so I picked Jayce by reversing my initials (CJ -> JC) and picking the closest name I could think of. The 'Captn' prefix has no reasoning, I just thought it looked cool and it wasn't taken anywhere.</p>
        <p style="font-weight: bold"><i class="nf nf-fa-question" style="color: red"></i> Why did you make an Outer Wilds themed website?</p>
        <p><i class="nf nf-oct-light_bulb" style="color: yellow"></i> Outer Wilds is one of the greatest gaming experiences I've ever had - and I like to think that says a lot given the fact I've been playing games for around 15 years now. Because of this, I wanted to express my awe for the game by creating something in its image, which just so happened to be a portfolio website.</p>
        <p>Originally, I was going to make a Terraria themed website, however, I decided against it as I thought the design of Terraria is a little too niche for people who aren't in the gaming sphere. </p>
        <img src="https://media1.tenor.com/m/89MPCBQDPKYAAAAd/plink-nerd.gif" width="60px">
        `;

        const card = document.createElement('div');
        main.appendChild(card);

        overlay.classList.add('visible');
    }
}
