import { SolarSystem } from './App.js';

const solarSystem = new SolarSystem();

function animate() {
    solarSystem.update();
    solarSystem.render();
    requestAnimationFrame(animate);
}

animate();
