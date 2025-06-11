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

import "@fontsource/roboto-slab";
import { lerp } from 'three/src/math/MathUtils.js';

var paused = false;
export class SolarSystem {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = createCamera();
        this.camera.solarSystem = this;

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

        this.hoveredObject = null;

        this.init();
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('click', (event) => this.onMouseClick(event), false);
        window.addEventListener('mousemove', (event) => this.onMouseMove(event), false);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            let hoverableObject = object;

            while (hoverableObject && !hoverableObject.isHoverable && hoverableObject.parent) {
                hoverableObject = hoverableObject.parent;
            }

            if (hoverableObject?.isHoverable) {
                if (this.hoveredObject !== hoverableObject) {
                    if (this.hoveredObject?.handleMouseOut) {
                        this.hoveredObject.handleMouseOut();
                    }
                    if (hoverableObject.handleMouseOver) {
                        hoverableObject.handleMouseOver();
                        this.hoveredObject = hoverableObject;
                    }
                }
                return;
            }
        }

        if (this.hoveredObject?.handleMouseOut) {
            this.hoveredObject.handleMouseOut();
            this.hoveredObject = null;
        }
    }

    onMouseClick(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            if (this.hoveredObject?.handleMouseOut) {
                this.hoveredObject.handleMouseOut();
                this.hoveredObject = null;
            }

            for (const intersect of intersects) {
                let object = intersect.object;

                while (object) {
                    if (object.isClickable && object.handleClick) {
                        object.handleClick();
                        paused = !paused;
                        return;
                    }
                    object = object.parent;
                }
            }
        }
    }

    init() {
        this.scene.add(createAmbientLight());

        const sun = new Sun(this.camera);
        this.animatedBodies.push(sun);
        this.scene.add(sun);

        const hourglassTwins = new HourglassTwins(this.camera);
        this.animatedBodies.push(hourglassTwins);
        this.scene.add(hourglassTwins);

        const timberHearth = new TimberHearth(this.camera);
        this.animatedBodies.push(timberHearth);
        this.scene.add(timberHearth);

        const brittleHollow = new BrittleHollow(this.camera);
        this.animatedBodies.push(brittleHollow);
        this.scene.add(brittleHollow);

        const giantsDeep = new GiantsDeep(this.camera);
        this.animatedBodies.push(giantsDeep);
        this.scene.add(giantsDeep);

        const darkBramble = new DarkBramble(this.camera);
        this.animatedBodies.push(darkBramble);
        this.scene.add(darkBramble);

        const viewSize = 100;
        const aspect = window.innerWidth / window.innerHeight;
        this.stars = new Stars(this.scene, viewSize, aspect);
    }

    update(deltaTime) {
        if (!paused) {
            this.animatedBodies.forEach(body => {
                if (body.update) body.update(deltaTime);
            });

            this.scene.traverse((object) => {
                if (object.tooltipVisible && object.updateTooltip) {
                    object.updateTooltip();
                }
            });
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
