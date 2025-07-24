import { BasePlanet } from './planet.js';
import * as THREE from 'three';
import { typeEffect, typeAsciiEffect } from '../../systems/globals.js';

export class HourglassTwins extends BasePlanet {
    constructor(camera) {
        super(camera, "About Me", 7, 3, 0x000000, 0);

        this.material.transparent = true;
        this.material.depthWrite = false;
        this.material.opacity = 0;

        this.twin1 = this.createTwin("One", 0x86110e);
        this.twin2 = this.createTwin("Two", 0xF6D7B0);

        this.createTwinOutlines();

        this.semiMajorAxis = 15;
        this.semiMinorAxis = 15;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;

        this.isAnimating = false;

        if (this.camera.solarSystem?.animatedBodies) {
            this.camera.solarSystem.animatedBodies.push(this.twin1, this.twin2);
        }
    }

    onClick() {
        if (this.isAnimating) return;

        if (this.isZoomed) {
            this.hidePlanetInfo();
            return;
        }

        this.isAnimating = true;

        this.twin1Outline.visible = true;
        this.twin2Outline.visible = true;
        this.isZoomed = true;

        if (this.camera.solarSystem?.animatedBodies) {
            this.camera.solarSystem.animatedBodies.forEach(obj => {
                if (obj !== this && obj.isClickable !== undefined) {
                    obj.isClickable = false;
                    obj.isHoverable = false;
                    if (obj.outlineMesh) obj.outlineMesh.visible = false;
                    if (obj.tooltip) obj.tooltip.style.visibility = 'hidden';
                }
            });
        }

        if (this.camera?.focusOnObject) {
            this.camera.focusOnObject(this, {
                distance: 10,
                zoom: this.zoom,
                onComplete: () => {
                    this.isAnimating = false;
                    this.isZoomed = true;
                    this.showPlanetInfo();
                }
            });
        }
    }

    createTwin(name, color) {
        const twin = new BasePlanet(this.camera, name, 5, 0.75, color, 0);
        twin.isClickable = true;

        this.tooltip.style.transform = 'translate(-50%, -25%)';

        twin.userData.parentPlanet = this;
        this.add(twin);
        return twin;
    }

    createTwinOutlines() {
        this.twin1Outline = new THREE.Mesh(
            new THREE.SphereGeometry(this.twin1.geometry.parameters.radius * 1.2, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide,
            })
        );
        this.twin1Outline.visible = false;
        this.add(this.twin1Outline);

        this.twin2Outline = new THREE.Mesh(
            new THREE.SphereGeometry(this.twin2.geometry.parameters.radius * 1.2, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide,
            })
        );
        this.twin2Outline.visible = false;
        this.add(this.twin2Outline);
    }

    update() {
        this.angle += 0.001 * this.orbitSpeed;
        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;

        const twinAngle = this.angle * 3;
        const twinDistance = 2;

        this.twin1.position.set(
            Math.cos(twinAngle) * twinDistance,
            Math.sin(twinAngle) * twinDistance,
            0
        );

        this.twin2.position.set(
            -Math.cos(twinAngle) * twinDistance,
            -Math.sin(twinAngle) * twinDistance,
            0
        );

        if (this.twin1Outline) {
            this.twin1Outline.position.copy(this.twin1.position);
        }
        if (this.twin2Outline) {
            this.twin2Outline.position.copy(this.twin2.position);
        }
    }

    onMouseOver() {
        if (this.isClickable && !this.isZoomed) {
            this.twin1Outline.visible = true;
            this.twin2Outline.visible = true;
            this.tooltip.style.visibility = 'visible';
            this.tooltipVisible = true;
            this.updateTooltip();
        }
    }

    onMouseOut() {
        if (!this.isZoomed) {
            this.twin1Outline.visible = false;
            this.twin2Outline.visible = false;
        }
        this.tooltip.style.visibility = 'hidden';
    }

    hidePlanetInfo() {
        if (this.isAnimating) return;

        this.isAnimating = true;

        const overlay = document.getElementById('aboutMeOverlay');
        overlay.classList.remove('visible');

        this.camera.resetView({
            onComplete: () => {
                this.isAnimating = false;
                this.isZoomed = false;
                this.twin1Outline.visible = false;
                this.twin2Outline.visible = false;

                if (this.camera.solarSystem?.animatedBodies) {
                    this.camera.solarSystem.animatedBodies.forEach(obj => {
                        if (obj.isClickable !== undefined) {
                            obj.isClickable = true;
                            obj.isHoverable = true;
                        }
                    });
                }
            }
        });
    }

    showPlanetInfo() {
        const overlay = document.getElementById('aboutMeOverlay');
        const main = overlay.querySelector('.aboutMeMain');

        main.innerHTML = `
        <pre class="aboutMeAscii"></pre>
        `

        const aboutMe = main.querySelector('pre');
        const ascii = `
  █████╗ ██████╗  ██████╗ ██╗   ██╗████████╗   ███╗   ███╗███████╗
 ██╔══██╗██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝   ████╗ ████║██╔════╝
 ███████║██████╔╝██║   ██║██║   ██║   ██║      ██╔████╔██║█████╗  
 ██╔══██║██╔══██╗██║   ██║██║   ██║   ██║      ██║╚██╔╝██║██╔══╝  
 ██║  ██║██████╔╝╚██████╔╝╚██████╔╝   ██║      ██║ ╚═╝ ██║███████╗
 ╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚═════╝    ╚═╝      ╚═╝     ╚═╝╚══════╝
        `

        typeAsciiEffect(aboutMe, ascii, 100);

        const card = document.createElement('div');
        main.appendChild(card);

        overlay.classList.add('visible');
    }
}
