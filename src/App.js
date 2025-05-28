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
        this.hoveredObject = null;

        this.tooltip = null;
        this.createTooltip();

        this.init();
        this.setupEventListeners();

        document.getElementById('close-info')?.addEventListener('click', () => {
            this.hidePlanetInfo();
        });
    }

    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.style.position = 'fixed';
        this.tooltip.style.color = 'white';
        this.tooltip.style.fontFamily = 'Arial, sans-serif';
        this.tooltip.style.fontSize = '20px';
        this.tooltip.style.visibility = 'hidden';
        this.tooltip.style.transform = 'translate(-50%, -100%)';
        document.body.appendChild(this.tooltip);
    }

    updateTooltip(object) {
        if (!object || !this.tooltip) return;

        const worldPos = new THREE.Vector3();
        object.getWorldPosition(worldPos);

        const planetRadius = object.geometry?.parameters?.radius || 1;
        const offsetY = planetRadius * 1.5;
        worldPos.y += offsetY;

        worldPos.project(this.camera);

        const normalizedX = (worldPos.x * 0.5) + 0.5;
        const normalizedY = (-worldPos.y * 0.5) + 0.5;

        const screenX = normalizedX * window.innerWidth;
        const screenY = normalizedY * window.innerHeight;

        this.tooltip.style.left = `${screenX}px`;
        this.tooltip.style.top = `${screenY}px`;
    }

    hidePlanetInfo() {
        const infoOverlay = document.getElementById('overlay');
        infoOverlay.classList.remove('visible');

        this.camera.resetView();
        paused = false;

        this.scene.traverse((object) => {
            if (object.isHoverable == false) {
                object.isHoverable = true;
            }
        });
    }

    setupEventListeners() {
        window.addEventListener('click', (event) => this.onMouseClick(event), false);
        window.addEventListener('mousemove', (event) => this.onMouseMove(event), false);
        window.addEventListener('keydown', (event) => {

            // resume orbits 
            if (event.key == 'Escape') {
                paused = false;
                this.camera.resetView();
                this.hidePlanetInfo()

                // im lazy leave me alone
                this.scene.traverse((object) => {
                    if (object.isHoverable == false) {
                        object.isHoverable = true;
                    }
                });
            }
        });
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            let hoverableObject = object;

            // icl i got DeepSeek to fix this weird ass bug with mouseMove
            while (hoverableObject && !hoverableObject.isHoverable && hoverableObject.parent) {
                hoverableObject = hoverableObject.parent;
            }
            if (hoverableObject?.isHoverable) {
                if (this.hoveredObject !== hoverableObject) {
                    if (this.hoveredObject && this.hoveredObject.handleMouseOut) {
                        this.hoveredObject.handleMouseOut();
                    }
                    if (hoverableObject.handleMouseOver) {
                        hoverableObject.handleMouseOver();
                        this.hoveredObject = hoverableObject;

                        this.tooltip.textContent = hoverableObject.name || 'Planet';
                        this.tooltip.style.visibility = 'visible';
                        this.updateTooltip(hoverableObject);
                    }
                }
                return;
            }
        }

        if (this.hoveredObject && this.hoveredObject.handleMouseOut) {
            this.hoveredObject.handleMouseOut();
            this.hoveredObject = null;
            this.tooltip.style.visibility = 'hidden';
        }
    }

    onMouseClick(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            if (this.hoveredObject) {
                this.hoveredObject.handleMouseOut();
                this.hoveredObject = null;
                this.tooltip.style.visibility = 'hidden';
            }

            for (const intersect of intersects) {
                let object = intersect.object;
                object.isHoverable = false;

                while (object) {
                    if (object.isClickable && object.handleClick) {
                        // if click the same planet, hide info and zoom out
                        // else, just hide info
                        if (this.currentPlanet == object.name) {
                            this.hidePlanetInfo();
                            this.currentPlanet = null;
                            return;
                        } else {
                            this.hidePlanetInfo();
                            object.handleClick();
                            this.currentPlanet = object.name;
                            paused = true;
                            return;
                        }
                    }

                    this.hidePlanetInfo();
                    object = object.parent;
                }
            }
        }
    }

    init() {
        this.scene.add(createAmbientLight());

        this.scene.add(new Sun());

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
        if (this.tooltip.style.visibility == 'visible' && this.hoveredObject) {
            this.updateTooltip(this.hoveredObject);
        }

        this.renderer.render(this.scene, this.camera);
    }
}
