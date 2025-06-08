// unique case so doesnt extend from base class
import * as THREE from 'three';

export class HourglassTwins extends THREE.Group {
    constructor(camera) {
        super();

        const geometry = new THREE.SphereGeometry(0.75, 64, 64);

        this.outlineMeshOne = new THREE.Mesh(
            new THREE.SphereGeometry(0.95, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide
            })
        );
        this.outlineMeshTwo = new THREE.Mesh(
            new THREE.SphereGeometry(0.95, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide
            })
        );

        this.outlineMeshOne.visible = false;
        this.outlineMeshTwo.visible = false;

        this.twin1 = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x86110e }));
        this.twin2 = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xF6D7B0 }));

        this.add(this.outlineMeshOne, this.outlineMeshTwo, this.twin1, this.twin2);

        this.semiMajorAxis = 15;
        this.semiMinorAxis = 15;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;

        this.isClickable = true;
        this.isZoomed = false;
        this.camera = camera;
        this.handleClick = this.onClick.bind(this);

        // this.twin1.name = "Ember Twin";
        this.twin1.name = "Experience";
        this.twin1.isHoverable = true;
        this.twin1.tooltip = this.createTooltip(this.twin1.name);
        this.twin1.updateTooltip = this.createUpdateTooltipFunction(this.twin1);
        this.twin1.handleMouseOver = () => {
            this.outlineMeshOne.visible = true;
            this.twin1.tooltip.style.visibility = 'visible';
            this.twin1.updateTooltip();
        };
        this.twin1.handleMouseOut = () => {
            this.outlineMeshOne.visible = false;
            this.twin1.tooltip.style.visibility = 'hidden';
        };

        // this.twin2.name = "Ash Twin";
        this.twin2.name = "Education";
        this.twin2.isHoverable = true;
        this.twin2.tooltip = this.createTooltip(this.twin2.name);
        this.twin2.updateTooltip = this.createUpdateTooltipFunction(this.twin2);
        this.twin2.handleMouseOver = () => {
            this.outlineMeshTwo.visible = true;
            this.twin2.tooltip.style.visibility = 'visible';
            this.twin2.updateTooltip();
        };
        this.twin2.handleMouseOut = () => {
            this.outlineMeshTwo.visible = false;
            this.twin2.tooltip.style.visibility = 'hidden';
        };
    }

    createTooltip(text) {
        const tooltip = document.createElement('div');
        tooltip.style.position = 'fixed';
        tooltip.style.color = 'white';
        tooltip.style.fontFamily = 'Arial, sans-serif';
        tooltip.style.fontSize = '20px';
        tooltip.style.visibility = 'hidden';
        tooltip.style.transform = 'translate(-50%, -100%)';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.zIndex = '100';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        return tooltip;
    }

    createUpdateTooltipFunction(twin) {
        return () => {
            const worldPos = new THREE.Vector3();
            twin.getWorldPosition(worldPos);
            worldPos.y += twin.geometry.parameters.radius * 1.5;
            worldPos.project(this.camera);

            const x = (worldPos.x * 0.5 + 0.5) * window.innerWidth;
            const y = (1 - (worldPos.y * 0.5 + 0.5)) * window.innerHeight;

            twin.tooltip.style.left = `${x}px`;
            twin.tooltip.style.top = `${y}px`;
        };
    }

    showPlanetInfo() {
        const overlay = document.getElementById('timelineOverlay');
        const top = overlay.querySelector('.timelineTop');
        const bottom = overlay.querySelector('.timelineBottom');

        top.innerHTML = `
            <h2>top</h2>
        `;

        bottom.innerHTML = `
            <h2>bottom</h2>
        `;

        const card = document.createElement('div');
        top.appendChild(card);

        overlay.classList.add('visible');
    }

    hidePlanetInfo() {
        const timelineOverlay = document.getElementById('timelineOverlay')

        if (timelineOverlay) timelineOverlay.classList.remove('visible');

        this.camera.resetView();

        this.isZoomed = false;

        if (this.camera.solarSystem && this.camera.solarSystem.scene) {
            this.camera.solarSystem.scene.traverse((object) => {
                if (object.isHoverable === false) {
                    object.isHoverable = true;
                }
            });
        }
    }

    onClick() {
        if (this.isZoomed) {
            this.camera.resetView();
            this.hidePlanetInfo();
            this.isZoomed = false;
        } else {
            if (this.camera && typeof this.camera.focusOnObject === 'function') {
                this.twin1.isHoverable = false;
                this.twin2.isHoverable = false;

                this.outlineMeshOne.visible = false;
                this.outlineMeshTwo.visible = false;

                this.twin1.tooltip.style.visibility = 'hidden';
                this.twin2.tooltip.style.visibility = 'hidden';

                this.camera.focusOnObject(this, {
                    distance: 10,
                    zoom: 5,
                    xOffset: 0
                });

                setTimeout(() => {
                    this.showPlanetInfo();
                }, 1000);
            }
            this.isZoomed = true;
        }
    }

    update() {
        this.angle += 0.001 * this.orbitSpeed;

        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;

        const twin1X = 2 * Math.cos(this.angle * 3);
        const twin1Y = 2 * Math.sin(this.angle * 3);
        const twin2X = -2 * Math.cos(this.angle * 3);
        const twin2Y = -2 * Math.sin(this.angle * 3);

        this.twin1.position.set(twin1X, twin1Y, 0);
        this.outlineMeshOne.position.set(twin1X, twin1Y, 0);

        this.twin2.position.set(twin2X, twin2Y, 0);
        this.outlineMeshTwo.position.set(twin2X, twin2Y, 0);

        if (this.twin1.tooltip.style.visibility == 'visible') this.twin1.updateTooltip();
        if (this.twin2.tooltip.style.visibility == 'visible') this.twin2.updateTooltip();
    }
}
