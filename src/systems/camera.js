import * as THREE from 'three';
import gsap from 'gsap';

export function createCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    const viewSize = 100;
    const camera = new THREE.OrthographicCamera(
        -viewSize * aspect / 2,
        viewSize * aspect / 2,
        viewSize / 2,
        -viewSize / 2,
        0.1,
        100
    );
    camera.position.set(0, 0, 50);

    camera.initPosition = camera.position.clone();
    camera.initZoom = 1;
    camera.initLeft = camera.left;
    camera.initRight = camera.right;
    camera.initTop = camera.top;
    camera.initBottom = camera.bottom;

    camera.focusOnObject = function(object, options = {}) {
        const defaults = {
            duration: document.getElementById('zoomSpeed').value,
            distance: 5,
            zoom: 3,
            ease: "power2.inOut",
            xOffset: object.xOffset,
            onComplete: () => { }
        };
        const config = { ...defaults, ...options };

        const targetPosition = object.position.clone();
        targetPosition.z = config.distance;

        const timeline = gsap.timeline({
            onComplete: config.onComplete
        });

        timeline.to(this.position, {
            x: targetPosition.x - config.xOffset,
            y: targetPosition.y,
            z: targetPosition.z,
            duration: config.duration,
            ease: config.ease
        }, 0);

        timeline.to(this, {
            zoom: config.zoom,
            duration: config.duration,
            ease: config.ease,
            onUpdate: () => this.updateProjectionMatrix()
        }, 0);

        return timeline;
    };

    camera.resetView = function(options = {}) {
        const defaults = {
            duration: document.getElementById('zoomSpeed').value,
            ease: "power2.inOut",
            onComplete: () => { }
        };
        const config = { ...defaults, ...options };

        const timeline = gsap.timeline({
            onComplete: config.onComplete
        });

        timeline.to(this.position, {
            x: this.initPosition.x,
            y: this.initPosition.y,
            z: this.initPosition.z,
            duration: config.duration,
            ease: config.ease
        }, 0);

        timeline.to(this, {
            zoom: this.initZoom,
            duration: config.duration,
            ease: config.ease,
            onUpdate: () => {
                this.left = this.initLeft;
                this.right = this.initRight;
                this.top = this.initTop;
                this.bottom = this.initBottom;
                this.updateProjectionMatrix();
            }
        }, 0);

        return timeline;
    };

    return camera;
}
