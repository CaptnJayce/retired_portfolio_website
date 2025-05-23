import * as THREE from 'three';

import { Sun } from './components/celestial_bodies/sun.js';
import { HourglassTwins } from './components/celestial_bodies/hourglass_twins.js';
import { TimberHearth } from './components/celestial_bodies/timberhearth.js';
import { BrittleHollow } from './components/celestial_bodies/brittle_hollow.js';
import { GiantsDeep } from './components/celestial_bodies/giants_deep.js';
import { DarkBramble } from './components/celestial_bodies/dark_bramble.js';
import { Stars } from './components/celestial_bodies/stars.js'

import { createCamera } from './systems/camera.js'
import { createAmbientLight } from './systems/light.js'

var paused = false;
export class SolarSystem {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = createCamera();

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.animatedBodies = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.init();
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('click', (event) => this.onMouseClick(event), false);
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                paused = false;
            }
        });
    }

    onMouseClick(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            paused = true;

            for (const intersect of intersects) {
                let object = intersect.object;

                while (object) {
                    if (object.isClickable && object.handleClick) {
                        object.handleClick();
                        return;
                    }
                    object = object.parent;
                }
            }
        }
    }

    init() {
        this.scene.add(createAmbientLight());

        this.scene.add(new Sun());

        const hourglassTwins = new HourglassTwins();
        this.animatedBodies.push(hourglassTwins);
        this.scene.add(hourglassTwins);

        const timberHearth = new TimberHearth();
        this.animatedBodies.push(timberHearth);
        this.scene.add(timberHearth);

        const brittleHollow = new BrittleHollow();
        this.animatedBodies.push(brittleHollow);
        this.scene.add(brittleHollow);

        const giantsDeep = new GiantsDeep();
        this.animatedBodies.push(giantsDeep);
        this.scene.add(giantsDeep);

        const darkBramble = new DarkBramble();
        this.animatedBodies.push(darkBramble);
        this.scene.add(darkBramble);

        const viewSize = 100;
        const aspect = window.innerWidth / window.innerHeight;
        new Stars(this.scene, viewSize, aspect);
    }

    update() {
        if (!paused) {
            this.animatedBodies.forEach(body => {
                if (body.update) body.update();
            });
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
