import * as THREE from 'three';

const scene = new THREE.Scene();
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
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 100;

// width/height
const width = viewSize * aspect;
const height = viewSize;

const stars = [];
const star_count = 500;

function colourSelect() {
    return Math.random() < 0.5 ? 0x25B2BC : 0xFFFFFF;
}

function getLifetime() {
    return (180 + Math.random() * 120) * 1000;
}

function init() {
    // sun
    {
        const geometry = new THREE.SphereGeometry(32, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xFFA500 })
        const sun = new THREE.Mesh(geometry, material);

        sun.position.set(-102, 0, 0);

        scene.add(sun);
    }

    // hourglass twins
    {
        const geometry = new THREE.SphereGeometry(3, 32, 32);
        const material_one = new THREE.MeshBasicMaterial({ color: 0x86110e })
        const material_two = new THREE.MeshBasicMaterial({ color: 0xF6D7B0 })
        const twin_one = new THREE.Mesh(geometry, material_one);
        const twin_two = new THREE.Mesh(geometry, material_two);

        twin_one.position.set(-55, 4, 0);
        twin_two.position.set(-55, -4, 0);

        scene.add(twin_one);
        scene.add(twin_two);
    }

    // timber hearth
    {
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x59981a })
        const hearth = new THREE.Mesh(geometry, material);

        hearth.position.set(-35, 0, 0);

        scene.add(hearth);
    }

    // brittle hollow
    {
        const geometry = new THREE.SphereGeometry(6, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x808080 })
        const hearth = new THREE.Mesh(geometry, material);

        hearth.position.set(-10, 0, 0);

        scene.add(hearth);
    }

    // giants deep
    {
        const geometry = new THREE.SphereGeometry(16, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x30a073 })
        const giant = new THREE.Mesh(geometry, material);

        giant.position.set(25, 0, 0);

        scene.add(giant);
    }

    // dark bramble
    {
        const geometry = new THREE.SphereGeometry(16, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xe2d997 })
        const giant = new THREE.Mesh(geometry, material);

        giant.position.set(75, 0, 0);

        scene.add(giant);
    }

    // background stars
    for (let i = 0; i < star_count; i++) {
        var radius = Math.random() * 0.1 + 0.1;
        const geometry = new THREE.CircleGeometry(radius, 12, 0.0);
        const material = new THREE.MeshBasicMaterial({ color: colourSelect() });
        const star = new THREE.Mesh(geometry, material);

        star.position.x = (Math.random() - 0.5) * width;
        star.position.y = (Math.random() - 0.5) * height;
        star.position.z = 0;

        star.userData = {
            created_at: Date.now(),
            lifetime: getLifetime()
        };

        stars.push(star);
        scene.add(star);
    }
}

function update() {
    const currentTime = Date.now();

    for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];

        const age = currentTime - star.userData.created_at;
        if (age >= star.userData.lifetime) {
            scene.remove(star);
            stars.splice(i, 1);
        }
    }
}

function main() {
    update();

    renderer.render(scene, camera);
    requestAnimationFrame(main);
}

init();
main();
