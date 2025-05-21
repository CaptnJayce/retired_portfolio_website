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

        this.init();
    }

    init() {
        this.scene.add(createAmbientLight());

        this.scene.add(new Sun());
        this.scene.add(new HourglassTwins());
        this.scene.add(new TimberHearth());
        this.scene.add(new BrittleHollow());
        this.scene.add(new GiantsDeep());
        this.scene.add(new DarkBramble());

        const viewSize = 100;
        const aspect = window.innerWidth / window.innerHeight;
        new Stars(this.scene, viewSize, aspect);
    }

    update() {
        // will populate later
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
