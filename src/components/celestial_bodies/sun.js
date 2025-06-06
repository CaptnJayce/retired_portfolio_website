import * as THREE from 'three';

export class Sun extends THREE.Mesh {
    constructor(camera) {
        const geometry = new THREE.SphereGeometry(8, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0xFFA500,
            emissive: 0xFFA500,
            emissiveIntensity: 1,
            roughness: 0.7
        });
        super(geometry, material);

        this.outlineMesh = new THREE.Mesh(
            new THREE.SphereGeometry(8.2, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide
            })
        );
        this.outlineMesh.visible = false;
        this.add(this.outlineMesh);

        this.light = new THREE.PointLight(0xFFA500, 10000, 250, 2);
        this.add(this.light);

        this.name = "About Me";

        this.isClickable = true;
        this.camera = camera;
        this.handleClick = this.onClick.bind(this);

        this.isHoverable = true;
        this.handleMouseOver = this.onMouseOver.bind(this);
        this.handleMouseOut = this.onMouseOut.bind(this);

        this.originalEmissive = material.emissive.clone();
        this.originalEmissiveIntensity = material.emissiveIntensity;
    }

    // we're still doing this da looooooooooooooooooooong way
    showAboutMeInfo() {
        const overlay = document.getElementById('aboutMeOverlay');
        const title = overlay.querySelector('.aboutMeTitle');
        const left = overlay.querySelector('.aboutMeLeft');
        const right = overlay.querySelector('.aboutMeRight');

        title.innerHTML = `
        <h2>Hi! :). My name is Casey, I'm a Computer Science graduate with a passion for web and game development.</h2>
        `;
        left.innerHTML = `
        <h2>left test</h2>
        `;
        right.innerHTML = `
        <h2>right test</h2>
        `;

        const leftCard = this.createAboutMeCard();
        const rightCard = this.createAboutMeCard();

        left.appendChild(leftCard);
        right.appendChild(rightCard);

        overlay.classList.add('visible');
    }

    createAboutMeCard() {
        const card = document.createElement('div');
        card.className = 'aboutMeCard';

        return card;
    }

    onClick() {
        if (this.camera && typeof this.camera.focusOnObject === 'function') {
            this.camera.focusOnObject(this, {
                distance: 10,
                zoom: 2.5
            });

            setTimeout(() => {
                this.showAboutMeInfo();
            }, 1000);
        }
    }

    onMouseOver() {
        this.outlineMesh.visible = true;
    }

    onMouseOut() {
        this.outlineMesh.visible = false;
    }
}
