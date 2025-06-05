import { SolarSystem } from './App.js';

const solarSystem = new SolarSystem();

let lastTime = 0;
function animate(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    solarSystem.update(deltaTime);
    solarSystem.render();
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
