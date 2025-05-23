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
        1000
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
            duration: 1.5,
            distance: 5,
            zoom: 3,
            ease: "power2.inOut"
        };
        const config = { ...defaults, ...options };

        const targetPosition = object.position.clone();
        targetPosition.z = config.distance;

        gsap.to(this.position, {
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z,
            duration: config.duration,
            ease: config.ease
        });

        gsap.to(this, {
            zoom: config.zoom,
            duration: config.duration,
            ease: config.ease,
            onUpdate: () => this.updateProjectionMatrix()
        });
    };

    camera.resetView = function() {
        gsap.to(this.position, {
            x: this.initPosition.x,
            y: this.initPosition.y,
            z: this.initPosition.z,
            duration: 1.5,
            ease: "power2.inOut"
        });

        gsap.to(this, {
            zoom: this.initZoom,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
                this.left = this.initLeft;
                this.right = this.initRight;
                this.top = this.initTop;
                this.bottom = this.initBottom;
                this.updateProjectionMatrix();
            }
        });
    };

    return camera;
}
