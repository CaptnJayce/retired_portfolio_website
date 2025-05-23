import { SolarSystem } from './App.js';

const solarSystem = new SolarSystem();

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    const viewSize = 100;

    solarSystem.camera.left = -viewSize * aspect / 2;
    solarSystem.camera.right = viewSize * aspect / 2;
    solarSystem.camera.top = viewSize / 2;
    solarSystem.camera.bottom = -viewSize / 2;
    solarSystem.camera.updateProjectionMatrix();

    solarSystem.renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

function animate() {
    solarSystem.update();
    solarSystem.render();
    requestAnimationFrame(animate);
}

animate();
