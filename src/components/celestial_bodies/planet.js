// base planet class
import * as THREE from 'three';

export class BasePlanet extends THREE.Mesh {
    constructor(camera, planetName, zoomAmount, radius, color, xOffset) {
        const geometry = new THREE.SphereGeometry(radius, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.7,
        });

        super(geometry, material);

        this.outlineMesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide
            })
        );
        this.outlineMesh.visible = false;
        this.outlineMesh.position.z = 1;

        this.add(this.outlineMesh);

        this.name = planetName;
        this.zoom = zoomAmount;
        this.isZoomed = false;
        this.camera = camera;
        this.xOffset = xOffset;
        this.position.z = 1;

        this.isClickable = true;
        this.isHoverable = true;
        this.handleClick = this.onClick.bind(this);
        this.handleMouseOver = this.onMouseOver.bind(this);
        this.handleMouseOut = this.onMouseOut.bind(this);

        this.tooltipVisible = false;
        this.tooltip = document.createElement('div');
        this.tooltip.style.position = 'fixed';
        this.tooltip.style.color = 'white';
        this.tooltip.style.fontFamily = 'Arial, sans-serif';
        this.tooltip.style.fontSize = '1vw';
        this.tooltip.style.visibility = 'hidden';
        this.tooltip.style.transform = 'translate(-50%, -100%)';
        this.tooltip.textContent = planetName;

        document.body.appendChild(this.tooltip);

        this.isAnimating = false;
    }

    onClick() {
        if (this.isAnimating) return;

        if (this.isZoomed) {
            this.hidePlanetInfo();
            return;
        }

        this.isAnimating = true;

        this.outlineMesh.visible = true;
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

    updateTooltip() {
        if (!this.tooltip) return;

        const worldPos = new THREE.Vector3();
        this.getWorldPosition(worldPos);

        const planetRadius = this.geometry?.parameters?.radius || 1;
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

    onMouseOver() {
        if (this.isClickable && !this.isZoomed) {
            this.tooltipVisible = true;
            this.tooltip.style.visibility = 'visible';
            this.outlineMesh.visible = true;
            this.updateTooltip();
        }
    }

    onMouseOut() {
        if (!this.isZoomed) {
            this.outlineMesh.visible = false;
        }
        this.tooltip.style.visibility = 'hidden';
    }

    hidePlanetInfo() {
        if (this.isAnimating) return;

        this.isAnimating = true;

        const projectsOverlay = document.getElementById('projectsOverlay');
        const welcomeOverlay = document.getElementById('welcomeOverlay');
        const timelineOverlay = document.getElementById('timelineOverlay');
        const skillsOverlay = document.getElementById('skillsOverlay');

        if (projectsOverlay) projectsOverlay.classList.remove('visible');
        if (welcomeOverlay) welcomeOverlay.classList.remove('visible');
        if (timelineOverlay) timelineOverlay.classList.remove('visible');
        if (skillsOverlay) skillsOverlay.classList.remove('visible');

        this.camera.resetView({
            onComplete: () => {
                this.isAnimating = false;
                this.isZoomed = false;
                this.outlineMesh.visible = false;

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
}
