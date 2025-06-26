import { BasePlanet } from './planet.js';

export class BrittleHollow extends BasePlanet {
    constructor(camera) {
        super(camera, "Skills", 2, 1.5, 0x808080, 0);

        this.semiMajorAxis = 40;
        this.semiMinorAxis = 25;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;
    }

    showPlanetInfo() {
        const overlay = document.getElementById('skillsOverlay');
        const title = overlay.querySelector('.skillsTitle');
        const programming = overlay.querySelector('.skillsProgramming');
        const environment = overlay.querySelector('.skillsEnvironment');
        const other = overlay.querySelector('.skillsOther');

        title.innerHTML = `
            <h3>My Skills</h3>
        `;

        programming.innerHTML = `
            <h3 style="margin-bottom: 0;">Programming</h3>

            <h4 style="margin-bottom: 0.4vw;">Gamedev</h4>
            <div style="display: flex; flex-wrap: wrap;">
                <div class="skillsItem">
                    <img class="tooling" alt="odinlang" src="/assets/odin.png">
                    <p class="skillsDesc">Odin</p>
                </div>

                <div class="skillsItem">
                    <img class="tooling" alt="raylib" src="/assets/raylib.png">
                    <p class="skillsDesc">Raylib</p>
                </div>

                <div class="skillsItem">
                    <img class="tooling" alt="cpp" src="/assets/cpp.png"">
                    <p class="skillsDesc">C++</p>
                </div>

                <div class="skillsItem">
                    <img class="tooling" alt="threejs" src="/assets/threejs.png"">
                    <p class="skillsDesc">ThreeJS</p>
                </div>
            </div>

            <h4 style="margin-bottom: 0.4vw;">Webdev</h4>
            <div style="display: flex; flex-wrap: wrap;">
                <div class="skillsItem">
                    <img class="tooling" alt="javascript" src="/assets/javascript.png"">
                    <p>JavaScript</p>
                </div>

                <div class="skillsItem">
                    <img class="tooling" alt="html" src="/assets/html.png"">
                    <p>HTML</p>
                </div>

                <div class="skillsItem">
                    <img class="tooling" alt="css" src="/assets/css.png"">
                    <p>CSS</p>
                </div>
            </div>
        `;

        environment.innerHTML = `
            <h3 style="margin-bottom: 0;">Environment</h3>

            <h4 style="margin-bottom: 0.4vw;">System</h4>
            <div style="display: flex; flex-wrap: wrap;">
                <div class="skillsItemR">
                    <p>Arch Linux</p>
                    <img class="tooling" alt="archlinux" src="/assets/archlinux.png">
                </div>

                <div class="skillsItemR">
                    <p>Hyprland</p>
                    <img class="tooling" alt="hyprland" src="/assets/hyprland.png">
                </div>

                <div class="skillsItemR">
                    <p>Windows 10</p>
                    <img class="tooling" alt="win10" src="/assets/win10.png">
                </div>
            </div>

            <h4 style="margin-bottom: 0.4vw;">IDE/Text Editor</h4>
            <div style="display: flex; flex-wrap: wrap;">
                <div class="skillsItemR">
                    <p>Neovim</p>
                    <img class="tooling" alt="neovim" src="/assets/neovim.png"">
                </div>

                <div class="skillsItemR">
                    <p>VSCode</p>
                    <img class="tooling" alt="vscode" src="/assets/vscode.png"">
                </div>

                <div class="skillsItemR">
                    <p>Intellij</p>
                    <img class="tooling" alt="intellij" src="/assets/intellij.png"">
                </div>
            </div>
        `;

        other.innerHTML = `
            <h3>Other</h3>
        `;

        overlay.classList.add('visible');
    }

    update() {
        this.angle += 0.0008 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;
    }
}
