import * as THREE from 'three';

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
    camera.position.z = 20;
    return camera;
}
