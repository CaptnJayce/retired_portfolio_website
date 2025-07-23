import { BasePlanet } from './planet.js';
import * as THREE from 'three';

export class HourglassTwins extends BasePlanet {
    constructor(camera) {
        super(camera, "Experience & Education", 2.2, 3, 0x000000, 0);

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

        const overlay = document.getElementById('timelineOverlay');
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
        const overlay = document.getElementById('timelineOverlay');
        const topL = overlay.querySelector('.timelineTopL');
        const topLT = overlay.querySelector('.timelineTopLT');
        const topR = overlay.querySelector('.timelineTopR');
        const middle = overlay.querySelector('.timelineMiddle');
        const bottomL = overlay.querySelector('.timelineBottomL');
        const bottomR = overlay.querySelector('.timelineBottomR');
        const bottomRT = overlay.querySelector('.timelineBottomRT');

        middle.innerHTML = `
        `;

        // education
        topL.innerHTML = `
            <h3>2019 to 2021</h3>
            <p>Attended New City College where I studied for, and completed a Level 3 BTEC in IT, achieving a D*DD which allowed me to attend University</p>
        `;
        topLT.innerHTML = `
            <h3>2025 onwards</h3>
            <p>Currently studying for an AWS Cloud Practitioner certificate and exploring various trails in the Salesforce ecosystem</p>
        `;
        bottomL.innerHTML = `
            <h3>2021 to 2024</h3>
            <p>Attended Brunel University where I studied for, and completed my B.Sc. in Computer Science, achieving a 2:2 in Computer Science: Network Computing</p>
        `;

        middle.innerHTML = `
        `;

        // experience
        bottomR.innerHTML = `
            <h3>Cybersecurity in The Web</h3>
            <p>For my University final year project, I developed and tested both secure & insecure websites to demonstrate defensive and offensive tactics used in Cybersecurity</p>
        `;
        bottomRT.innerHTML = `
            <h3>Voluntary SWE</h3>
            <p>I volunteer as a Software Engineer for the Orange Trust, helping where I can with front-end and back-end development</p>
        `;
        topR.innerHTML = `
            <h3>Shopify Webstore</h3>
            <p>Worked closely alongside a client and colleague to overhaul the design of Tino's online clothing store</p>
        `;

        overlay.classList.add('visible');
    }
}
