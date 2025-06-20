// this whole thing is so fucking jank but idc anymore im sick of working on this class 
// and want to do something else
// ill revisit it maybe 

import { BasePlanet } from './planet.js';
import * as THREE from 'three';

export class HourglassTwins extends BasePlanet {
    constructor(camera) {
        super(camera, "Experience & Education", 5, 3, 0x000000, 0);

        this.material.transparent = true;
        this.material.depthWrite = false;
        this.material.opacity = 0;

        this.twin1 = this.createTwin("Experience", 0x86110e);
        this.twin2 = this.createTwin("Education", 0xF6D7B0);

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

        this.twin1.isClickable = true;
        this.twin1.isHoverable = true;
        this.twin2.isClickable = true;
        this.twin2.isHoverable = true;

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
        if (this.isClickable) {
            this.twin1Outline.visible = true;
            this.twin2Outline.visible = true;

            if (!this.isZoomed) {
                this.tooltipVisible = true;
                this.tooltip.style.visibility = 'visible';
            }

            this.updateTooltip();
        }
    }

    onMouseOut() {
        this.twin1Outline.visible = false;
        this.twin2Outline.visible = false;
        this.tooltip.style.visibility = 'hidden';
    }

    showPlanetInfo() {
        const overlay = document.getElementById('timelineOverlay');
        const top = overlay.querySelector('.timelineTop');
        const bottom = overlay.querySelector('.timelineBottom');

        top.innerHTML = `
            <div>
                <p style="text-decoration: underline">2019 to 2021</p>
                <p>Studied for, and completed a Level 3 BTEC in IT, achieving a D*DD which allowed me to attend University</p>
            </div>

            <div>
                <p style="text-decoration: underline">2021 to 2024</p>
                <p>Studied for, and completed my BSc in Computer Science, achieving a 2:2 in Network Computing</p>
            </div>

            <div>
                <p style="text-decoration: underline">2025 onwards</p>
                <p>Currently studying for an AWS Cloud Practitioner certificate, and various Salesforce trails</p>
            </div>
        `;

        bottom.innerHTML = `
            <div>
                <p style="text-decoration: underline">Final Year Project</p>
                <p>Developed and tested insecure websites to demonstrate defensive and offensive tactics used in Cybersecurity</p>
            </div>

            <div>
                <p style="text-decoration: underline">Tino Sport Clothing Brand</p>
                <p>Worked closely alongside a client and colleague to overhaul the design of Tino's online clothing store</p>
            </div>

            <div>
                <p style="text-decoration: underline">Orange Trust Charity</p>
                <p>Volunteered as a Software Engineer for the Orange Trust, helping where I can with back-end and front-end development</p>
            </div>
        `;

        overlay.classList.add('visible');
    }
}
