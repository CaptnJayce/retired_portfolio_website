import * as THREE from 'three';
import { BasePlanet } from './planet.js';

export class Sun extends BasePlanet {
    constructor(camera) {
        super(camera, "General Info", 1.3, 8, 0xFFA500, 0);

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
        const footer = overlay.querySelector('.aboutMeFooter');
        const tools = overlay.querySelector('.aboutMeTools');
        const history = overlay.querySelector('.aboutMeHistory');

        title.innerHTML = `
        <h2>~ General Information ~</h2>
        `;

        main.innerHTML = `
        <h2>General</h2>
        <p>Welcome to my website! My name is Casey Jestico, a 22-year-old developer from London</p>
        <p>I have been making games and websites for almost five years now and have had an interest in technology from as early as I can remember</p>
        <ul style="font-size: 0.8vw">
          <li> I have two cats called Willow and Winston</li>
          <li> My top five favourite games are: Terraria, Outer Wilds, Hollow Knight, Risk of Rain 2, and V Rising</li>
          <li> My favourite drink is Monster Energy Mango Loco (consumed in moderation)</li>
        </ul>
        <br></br>
        <h2>FAQ</h2>
        <p style="font-weight: bold"><i class="nf nf-fa-question" style="color: red"></i> Why are you called Captn-Jayce- if your name is Casey?</p>
        <p><i class="nf nf-oct-light_bulb" style="color: yellow"></i> Online, I wanted to be called an actual human name instead of a user ID - but I didn't want my real name to be used everywhere, so I picked Jayce by reversing my initials (CJ -> JC) and picking the closest name I could think of.</p>
        <p>The 'Captn' prefix has no reasoning, I just thought it looked cool and it wasn't taken anywhere.</p>
        <p style="font-weight: bold"><i class="nf nf-fa-question" style="color: red"></i> Why did you make an Outer Wilds themed website?</p>
        <p><i class="nf nf-oct-light_bulb" style="color: yellow"></i> Outer Wilds is one of the greatest gaming experiences I've ever had - and I like to think that says a lot given the fact I've been playing games for around 15 years now. Because of this, I wanted to express my awe for the game by creating something in its image, which just so happened to be a portfolio website.</p>
        <p>Originally, I was going to make a Terraria themed website, however, I decided against it as I thought the design of Terraria is a little too niche for people who aren't in the gaming sphere. </p>
        `;

        tools.innerHTML = `
        <h2>What I use</h2>

        <!-- thank you deepseek for the pixel to vw/vh conversions -->
        <div style="display: flex; justify-content: space-between; padding-left: 1vw;">
            <div style="display: flex; flex-direction: row; align-items: flex-start;">
                <img id="tooling" alt="neovim" src="/assets/neovim.png" style="width: 3.1315vw; height: 7.7325vh;">
                <img id="tooling" alt="arch" src="/assets/archlinux.png" style="width: 3.8622vw; height: 7.7325vh;">
                <img id="tooling" alt="hyprland" src="/assets/hyprland.png" style="width: 2.7401vw; height: 7.7325vh;">
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5vw;">
                <img id="tooling" alt="odinlang" src="/assets/odin.png" style="width: 3.8622vw; height: 7.7325vh;">
                <img id="tooling" alt="javascript" src="/assets/javascript.png" style="width: 3.8622vw; height: 7.7325vh;">
                <img id="tooling" alt="C++" src="/assets/cpp.png" style="width: 3.4447vw; height: 7.7325vh;">
                <img id="tooling" alt="raylib" src="/assets/raylib.png" style="width: 3.8622vw; height: 7.7325vh;">
                <img id="tooling" alt="aseprite" src="/assets/aseprite.png" style="width: 3.8622vw; height: 7.7325vh;">
            </div>
        </div>
        `;

        history.innerHTML = `
        <h2>Education / Experience</h2>

        <img id="tooling" alt="brunel" src="/assets/brunel.png" style="width: 10.8622vw; height: 7.7325vh;">
        <img id="tooling" alt="ncc" src="/assets/ncc.png" style="padding: 0 0.5vw 0 0.5vw; width: 10.8622vw; height: 7.7325vh;">
        <img id="tooling" alt="aws" src="/assets/aws.png" style="width: 4.8622vw; height: 7.7325vh;">

        <p>I have a strong academic background with a BSc in Computer Science, a Level 3 BTEC Certification in IT, as well as an AWS Cloud Practitioner Certificate.</p>
        <p>I've worked professionally as a web developer, working with Shopify and front-end frameworks such as ReactJS</p>
        <p>Over the years, I've developed a thorough understanding of Linux and System Administration through maintaining my own desktop and homeservers (aka: old laptops burdened with glorious purpose)</p>
        `;

        footer.innerHTML = `
        <div style="height: 100%; display: flex; align-items: center; justify-content: space-between;">
            <div>
                <img src="https://media1.tenor.com/m/89MPCBQDPKYAAAAd/plink-nerd.gif" style="width: 2vw; padding-left: 1vw;">
            </div>
        <div style="display: flex; gap: 1em; position: absolute; left: 50%; transform: translateX(-50%);">
                <a href="https://github.com/CaptnJayce" id="links"><i class="nf nf-fa-github"></i></a>
                <a href="https://captnjayce.itch.io/" id="links"><i class="nf nf-fa-itch_io"></i></a>
                <a href="https://www.linkedin.com/in/jc444/" id="links"><i class="nf nf-md-linkedin"></i></a>
                <a href="mailto:captn.enquiries@protonmail.com" id="links"><i class="nf nf-md-email"></i></a>
                <a href="https://discord.com/users/775894736623239260" id="links"><i class="nf nf-fa-discord"></i></a>
            </div>
            <div style="padding-right: 1vw;">
                <p>© 2025 Casey Jestico</p>
            </div> 
        </div>
        `;
        const card = document.createElement('div');
        main.appendChild(card);

        overlay.classList.add('visible');
    }
}
