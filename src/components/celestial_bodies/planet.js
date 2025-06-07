// base planet class
import * as THREE from 'three';

export class BasePlanet extends THREE.Mesh {
    constructor(camera, planetName, zoomAmount, radius, color) {
        const geometry = new THREE.SphereGeometry(radius, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.7,
        });

        super(geometry, material);

        this.outlineMesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius * 1.1, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide
            })
        );
        this.outlineMesh.visible = false;
        this.add(this.outlineMesh);

        this.name = planetName;
        this.zoom = zoomAmount;
        this.isZoomed = false;
        this.camera = camera;

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
        this.tooltip.style.fontSize = '20px';
        this.tooltip.style.visibility = 'hidden';
        this.tooltip.style.transform = 'translate(-50%, -100%)';
        this.tooltip.textContent = planetName;
        document.body.appendChild(this.tooltip);
    }

    onClick() {
        if (this.isZoomed) {
            this.camera.resetView();
            this.hidePlanetInfo();

            this.isZoomed = false;
        } else {
            if (this.camera && typeof this.camera.focusOnObject === 'function') {
                this.camera.focusOnObject(this, {
                    distance: 10,
                    zoom: this.zoom
                });

                setTimeout(() => {
                    this.showPlanetInfo();
                }, 1000);
            }

            this.isZoomed = true;
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
        if (this.isZoomed == false) {
            this.tooltipVisible = true;
            this.outlineMesh.visible = true;
            this.tooltip.style.visibility = 'visible';
            this.updateTooltip();
        }
    }

    onMouseOut() {
        this.outlineMesh.visible = false;
        this.tooltip.style.visibility = 'hidden';
    }

    hidePlanetInfo() {
        const projectsOverlay = document.getElementById('projectsOverlay');
        const aboutMeOverlay = document.getElementById('aboutMeOverlay');

        if (projectsOverlay) projectsOverlay.classList.remove('visible');
        if (aboutMeOverlay) aboutMeOverlay.classList.remove('visible');

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

    showPlanetInfo() {
        this.camera.solarSystem.showPlanetInfo(this.name);
    }
}
