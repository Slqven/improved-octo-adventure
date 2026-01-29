import * as THREE from 'three';
import gsap from 'gsap';

export class Scene4NewUniverse {
    constructor(scene, camera, bloomPass) {
        this.scene = scene;
        this.camera = camera;
        this.bloomPass = bloomPass;
        this.objects = [];
        this.isActive = false;
    }

    enter(callback) {
        this.isActive = true;
        this.createNewUniverse();
        this.createDateInStars();
        this.animateCameraRotation();
        
        // Auto-progress after showing the date
        setTimeout(() => {
            if (callback) callback();
        }, 8000);
    }

    createNewUniverse() {
        // Create a fresh, beautiful starfield
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 20000;
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            
            // Spherical distribution
            const radius = 400 + Math.random() * 1600;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Colorful new universe
            const colorChoice = Math.random();
            if (colorChoice < 0.4) {
                // White
                colors[i3] = 1;
                colors[i3 + 1] = 1;
                colors[i3 + 2] = 1;
            } else if (colorChoice < 0.6) {
                // Blue
                colors[i3] = 0.6;
                colors[i3 + 1] = 0.8;
                colors[i3 + 2] = 1;
            } else if (colorChoice < 0.8) {
                // Gold
                colors[i3] = 1;
                colors[i3 + 1] = 0.9;
                colors[i3 + 2] = 0.6;
            } else {
                // Pink
                colors[i3] = 1;
                colors[i3 + 1] = 0.7;
                colors[i3 + 2] = 0.9;
            }

            sizes[i] = Math.random() * 2.5 + 0.5;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const starMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        this.stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.stars);
        this.objects.push(this.stars);

        // Fade in stars
        gsap.to(starMaterial, {
            opacity: 1,
            duration: 3,
            ease: 'power2.out'
        });

        // Create galaxies
        this.createGalaxies();

        // Create nebulae
        this.createNebulae();
    }

    createGalaxies() {
        const galaxyCount = 15;
        for (let i = 0; i < galaxyCount; i++) {
            const particleCount = 1500;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);

            for (let j = 0; j < particleCount; j++) {
                const j3 = j * 3;
                const radius = Math.random() * 40;
                const angle = Math.random() * Math.PI * 2;
                const height = (Math.random() - 0.5) * 8;

                positions[j3] = Math.cos(angle) * radius;
                positions[j3 + 1] = height;
                positions[j3 + 2] = Math.sin(angle) * radius;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.PointsMaterial({
                size: 0.8,
                color: new THREE.Color().setHSL(Math.random(), 0.6, 0.7),
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending
            });

            const galaxy = new THREE.Points(geometry, material);
            galaxy.position.set(
                (Math.random() - 0.5) * 1500,
                (Math.random() - 0.5) * 1500,
                (Math.random() - 0.5) * 1500
            );
            galaxy.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            this.scene.add(galaxy);
            this.objects.push(galaxy);

            // Fade in
            gsap.to(material, {
                opacity: 0.7,
                duration: 3,
                delay: Math.random() * 2,
                ease: 'power2.out'
            });
        }
    }

    createNebulae() {
        const nebulaCount = 10;
        for (let i = 0; i < nebulaCount; i++) {
            const geometry = new THREE.SphereGeometry(100, 32, 32);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide
            });

            const nebula = new THREE.Mesh(geometry, material);
            nebula.position.set(
                (Math.random() - 0.5) * 1200,
                (Math.random() - 0.5) * 1200,
                (Math.random() - 0.5) * 1200
            );
            nebula.scale.set(
                1 + Math.random() * 2,
                1 + Math.random() * 2,
                1 + Math.random() * 2
            );

            this.scene.add(nebula);
            this.objects.push(nebula);

            // Fade in
            gsap.to(material, {
                opacity: 0.2,
                duration: 4,
                delay: Math.random() * 2,
                ease: 'power2.out'
            });
        }
    }

    createDateInStars() {
        // Create "24th December 2023" using star particles
        const dateText = "24th December 2023";
        const dateEl = document.getElementById('dateText');
        
        // Show date as HTML overlay (simpler and more readable)
        dateEl.textContent = dateText;
        
        gsap.to(dateEl, {
            opacity: 1,
            duration: 2,
            delay: 3,
            ease: 'power2.out'
        });

        // Create constellation-style stars forming the date
        this.createDateConstellation();
    }

    createDateConstellation() {
        // Create special bright stars that form a constellation pattern
        const constellationGeometry = new THREE.BufferGeometry();
        const starCount = 200;
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        // Arrange stars in a meaningful pattern around the date area
        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            
            // Create a circular pattern in the upper area
            const angle = (i / starCount) * Math.PI * 2;
            const radius = 150 + Math.random() * 100;
            const height = 200 + (Math.random() - 0.5) * 50;
            
            positions[i3] = Math.cos(angle) * radius;
            positions[i3 + 1] = height;
            positions[i3 + 2] = Math.sin(angle) * radius - 300;

            sizes[i] = 3 + Math.random() * 4;
        }

        constellationGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        constellationGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const constellationMaterial = new THREE.PointsMaterial({
            size: 4,
            color: 0xffd700,
            transparent: true,
            opacity: 0,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        this.constellation = new THREE.Points(constellationGeometry, constellationMaterial);
        this.scene.add(this.constellation);
        this.objects.push(this.constellation);

        // Fade in constellation
        gsap.to(constellationMaterial, {
            opacity: 1,
            duration: 2,
            delay: 3,
            ease: 'power2.out'
        });

        // Twinkle effect
        gsap.to(constellationMaterial, {
            opacity: 0.7,
            duration: 1.5,
            delay: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    animateCameraRotation() {
        // Subtle camera rotation to the left
        const currentRotation = this.camera.rotation.y;
        gsap.to(this.camera.rotation, {
            y: currentRotation - 0.3,
            duration: 6,
            ease: 'power1.inOut'
        });
    }

    handleClick(raycaster) {
        // This scene auto-progresses
        return false;
    }

    update(deltaTime, elapsedTime) {
        if (!this.isActive) return;

        // Slow rotation of stars
        if (this.stars) {
            this.stars.rotation.y += deltaTime * 0.005;
        }

        // Rotate constellation
        if (this.constellation) {
            this.constellation.rotation.z += deltaTime * 0.1;
        }
    }

    exit(callback) {
        this.isActive = false;
        
        // Fade out date text
        const dateEl = document.getElementById('dateText');
        gsap.to(dateEl, {
            opacity: 0,
            duration: 1
        });

        const fadePromises = this.objects.map(obj => {
            return new Promise(resolve => {
                if (obj.material) {
                    gsap.to(obj.material, {
                        opacity: 0,
                        duration: 2,
                        onComplete: () => {
                            this.scene.remove(obj);
                            if (obj.geometry) obj.geometry.dispose();
                            if (obj.material) obj.material.dispose();
                            resolve();
                        }
                    });
                } else {
                    this.scene.remove(obj);
                    resolve();
                }
            });
        });

        Promise.all(fadePromises).then(() => {
            this.objects = [];
            if (callback) callback();
        });
    }
}
