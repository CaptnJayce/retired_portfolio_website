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
        const main = overlay.querySelector('.aboutMeContent');
        const footer = overlay.querySelector('.aboutMeContentF');
        const tools = overlay.querySelector('.aboutMeContentT');
        const history = overlay.querySelector('.aboutMeContentH');

        main.innerHTML = `
        <h2 class="titles" style="margin-top: 0; padding-top: 0.5vh; ">Hello! My name is Casey Jestico</h2>
        <p style="margin-top: 0;">I'm a web/game developer from London</p>
        <p>I have been making games and websites for almost five years and have had an interest in technology from as early as I can remember</p>
        <p>I love to see my projects evolve as I write more code and I get this experience the most with game/web development. I find them to be the best mediums to express myself and my ideas in</p>

        <h2 class="titles">Some fun facts</h2>
        
        <button type="button" class="collapsible">
            <i class="nf nf-cod-triangle_right"></i> Hobbies
        </button>
        <div class="content">
            <ul style="padding: 0 0 1vw 0; font-size: 1vw; margin: 0;">
                <ul><i class="nf nf-md-gamepad" style="color: #F43E5C;"></i> Gaming</ul>
                <ul><i class="nf nf-md-printer_3d_nozzle" style="color: #29D398;"></i> 3D Printing</ul>
                <ul><i class="nf nf-md-pen" style="color: #EE64AE;"></i> Creative writing</ul>
                <ul><i class="nf nf-fa-paint_brush" style="color: #59E3E3;"></i> Pixel art</ul>
            </ul>
        </div>

        <button type="button" class="collapsible">
            <i class="nf nf-cod-triangle_right"></i> General
        </button>
        <div class="content">
            <ul style="padding: 0 0 1vw 0; font-size: 1vw; margin: 0;">
                <ul><i class="nf nf-md-cat" style="color: #FDF0ED"></i> I have two cats called Willow and Winston</ul>
                <button type="button" class="collapsible" style="padding-left: 1.9vw;">
                    <i class="nf nf-cod-triangle_right"></i> Cattos 
                </button>
                <div class="content" style="padding-left: 3.2vw;">
                    <img style="width: 10vw" alt="willow" src="/assets/willow.jpg">
                    <img style="width: 10vw" alt="winston" src="/assets/winston.jpg">
                </div>
                <ul><i class="nf nf-md-cup" style="color: #F77D26"></i> My favourite drink is Monster Energy Mango Loco (consumed in moderation)</ul>
                <ul><i class="nf nf-fa-glasses" style="color:  #CF9FFF"></i> I know a guy named Ibrahim</ul>
                <ul><i class="nf nf-md-turtle" style="color: #29D398"></i> I know a guy named Fares</ul>
                <ul><i class="nf nf-fa-snowflake" style="color: #59E3E3"></i> My favourite season is winter</ul>
            </ul>
        </div>

        <h2 class="titles">FAQ</h2>
        <p style="font-weight: bold; margin-top: 0;"><i class="nf nf-fa-question" style="color: red"></i> Why are you called Captn-Jayce- if your name is Casey?</p>
        <p><i class="nf nf-oct-light_bulb" style="color: yellow"></i> I wanted my online username to have an actual human name but was hesistant to use my real one, so I picked Jayce by reversing my initials (CJ -> JC) and picking the closest name I could think of.</p>
        <p style="font-weight: bold"><i class="nf nf-fa-question" style="color: red"></i> Why did you make an Outer Wilds themed website?</p>
        <p><i class="nf nf-oct-light_bulb" style="color: yellow"></i> I really like Outer Wilds and thought it'd be a neat idea</p>
        <p><i class="nf nf-oct-light_bulb" style="color: yellow"></i><i class="nf nf-oct-light_bulb" style="color: yellow"></i> Originally, I was going to make a Terraria themed website, however, I decided against it as I thought the design of Terraria is a little too niche for people who aren't in the gaming sphere. </p>
        `;

        tools.innerHTML = `
        <h2 class="titles">What I use</h2>

        <div style="display: flex; justify-content: space-between;">
            <div style="display: flex; flex-direction: row; align-items: flex-start;">
                <img class="tooling" alt="neovim" src="/assets/neovim.png" style="width: 3.6vw;">
                <img class="tooling" alt="arch" src="/assets/archlinux.png">
                <img class="tooling" alt="hyprland" src="/assets/hyprland.png" style="width: 3.6vw;">
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5vw;">
                <img class="tooling" alt="odinlang" src="/assets/odin.png">
                <img class="tooling" alt="javascript" src="/assets/javascript.png">
                <img class="tooling" alt="C++" src="/assets/cpp.png" style="width: 3.6vw;">
                <img class="tooling" alt="raylib" src="/assets/raylib.png">
                <img class="tooling" alt="aseprite" src="/assets/aseprite.png">


        <img src="https://media1.tenor.com/m/89MPCBQDPKYAAAAd/plink-nerd.gif" style="width: 3.2vw;">
            </div>
        </div>
        `;

        history.innerHTML = `
        <h2 class="titles">Education / Experience</h2>

        <img alt="brunel" src="/assets/brunel.png" style="width: 10.8622vw; height: 7.7325vh;">
        <img alt="ncc" src="/assets/ncc.png" style="padding: 0 0.5vw 0 0.5vw; width: 10.8622vw; height: 7.7325vh;">
        <img alt="aws" src="/assets/aws.png" style="width: 4.8622vw; height: 7.7325vh;">

        <p>I have a strong academic background with a BSc in Computer Science, a Level 3 BTEC Certification in IT, as well as an AWS Cloud Practitioner Certificate.</p>
        <p>I've worked professionally as a web developer, working with Shopify and front-end frameworks such as ReactJS</p>
        <p>Over the years, I've developed a thorough understanding of Linux and System Administration through maintaining my own desktop and homeservers (aka: old laptops burdened with glorious purpose)</p>
        `;

        footer.innerHTML = `
        <div style="height: 100%; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; gap: 1em; position: absolute; left: 50vw; transform: translateX(-50%);">
                <a href="https://github.com/CaptnJayce" class="links"><i class="nf nf-fa-github"></i></a>
                <a href="https://captnjayce.itch.io/" class="links"><i class="nf nf-fa-itch_io"></i></a>
                <a href="https://www.linkedin.com/in/jc444/" class="links"><i class="nf nf-md-linkedin"></i></a>
                <a href="mailto:captn.enquiries@protonmail.com" class="links"><i class="nf nf-md-email"></i></a>
                <a href="https://discord.com/users/775894736623239260" class="links"><i class="nf nf-fa-discord"></i></a>
            </div>
            <div style="padding-left: 1vw;">
                <p>© 2025 Casey Jestico</p>
            </div> 
        </div>
        `;
        const card = document.createElement('div');
        main.appendChild(card);

        this.collapsible();

        overlay.classList.add('visible');
    }

    collapsible() {
        const collapsibles = document.getElementsByClassName("collapsible");

        for (let i = 0; i < collapsibles.length; i++) {
            collapsibles[i].addEventListener("click", function() {
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
