import * as THREE from 'three';

export class TimberHearth extends THREE.Mesh {
    constructor(camera) {
        const geometry = new THREE.SphereGeometry(1.25, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0x59981a,
            roughness: 0.7,
        });

        super(geometry, material);

        this.outlineMesh = new THREE.Mesh(
            new THREE.SphereGeometry(1.45, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                side: THREE.BackSide
            })
        );
        this.outlineMesh.visible = false;
        this.add(this.outlineMesh);

        this.name = "Projects";
        this.projects = [
            {
                title: "Project 1",
                desc: "1 ...",
                tech: ["Three.js"],
                status: "Complete",
                img: "",
                link: ""
            },
            {
                title: "Project 2",
                desc: "2 ...",
                tech: ["Odin"],
                status: "Incomplete",
                img: "",
                link: ""
            },
            {
                title: "Project 3",
                desc: "3 ...",
                tech: ["C++"],
                status: "Incomplete",
                img: "",
                link: ""
            },
            {
                title: "Project 3",
                desc: "3 ...",
                tech: ["C++"],
                status: "Incomplete",
                img: "",
                link: ""
            },
            {
                title: "Project 3",
                desc: "3 ...",
                tech: ["C++"],
                status: "Incomplete",
                img: "",
                link: ""
            },
            {
                title: "Project 3",
                desc: "3 ...",
                tech: ["C++"],
                status: "Incomplete",
                img: "",
                link: ""
            }
        ];

        this.semiMajorAxis = 30;
        this.semiMinorAxis = 20;
        this.orbitSpeed = 0.5;
        this.angle = Math.random() * Math.PI * 2;

        this.isClickable = true;
        this.camera = camera;
        this.handleClick = this.onClick.bind(this);

        this.isHoverable = true;
        this.handleMouseOver = this.onMouseOver.bind(this);
        this.handleMouseOut = this.onMouseOut.bind(this);
    }

    // we're doing this da looooooooooooooooooooong way
    showProjectsInfo() {
        const infoOverlay = document.getElementById('overlay');
        const incompleteList = infoOverlay.querySelector('.incomplete-projects');
        const completeList = infoOverlay.querySelector('.complete-projects');

        incompleteList.innerHTML = '';
        completeList.innerHTML = '';

        this.projects.forEach(project => {
            const projectCard = this.createProjectCard(project);

            if (project.status === 'Complete') {
                completeList.appendChild(projectCard);
            } else {
                incompleteList.appendChild(projectCard);
            }
        });

        infoOverlay.classList.add('visible');
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';

        card.innerHTML = `
        <h3>${project.title || 'Untitled Project'}</h3>

        ${project.desc ? `<p>${project.desc}</p>` : ''}

        <div class="tags"> ${(project.tech || []).map(tech => `<span class="tag">${tech}</span>`).join('')} </div>

        ${project.img ? `<img src="${project.img}" alt="${project.title || 'Project'}" class="project-image">` : ''}
        ${project.link ? `<a href="${project.link}" class="link" target="_blank">View Project</a>` : ''}`;

        return card;
    }

    onClick() {
        if (this.camera && typeof this.camera.focusOnObject === 'function') {
            this.camera.focusOnObject(this, {
                distance: 10,
                zoom: 4
            });

            this.showProjectsInfo();
        }
    }

    onMouseOver() {
        this.outlineMesh.visible = true;
    }

    onMouseOut() {
        this.outlineMesh.visible = false;
    }

    update() {
        this.angle += 0.0009 * this.orbitSpeed;
        this.position.x = Math.cos(this.angle) * this.semiMajorAxis;
        this.position.y = Math.sin(this.angle) * this.semiMinorAxis;
    }
}
