import * as THREE from 'three';
import gsap from 'gsap';

export class Scene5JourneyToEarth {
    constructor(scene, camera, bloomPass) {
        this.scene = scene;
        this.camera = camera;
        this.bloomPass = bloomPass;
        this.objects = [];
        this.isActive = false;
    }

    enter(callback) {
        this.isActive = true;
        this.createSpace();
        this.createEarth();
        this.startJourney(callback);
    }

    createSpace() {
        // Create background stars
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 10000;
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            
            positions[i3] = (Math.random() - 0.5) * 2000;
            positions[i3 + 1] = (Math.random() - 0.5) * 2000;
            positions[i3 + 2] = (Math.random() - 0.5) * 2000;

            colors[i3] = 0.8 + Math.random() * 0.2;
            colors[i3 + 1] = 0.8 + Math.random() * 0.2;
            colors[i3 + 2] = 0.8 + Math.random() * 0.2;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const starMaterial = new THREE.PointsMaterial({
            size: 1.5,
            vertexColors: true,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending
        });

        this.stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.stars);
        this.objects.push(this.stars);

        // Fade in stars
        gsap.to(starMaterial, {
            opacity: 0.8,
            duration: 2,
            ease: 'power2.out'
        });
    }

    createEarth() {
        // Create Earth
        const earthGeometry = new THREE.SphereGeometry(15, 64, 64);
        
        // Earth material with basic colors
        const earthMaterial = new THREE.MeshStandardMaterial({
            color: 0x2233ff,
            emissive: 0x112244,
            emissiveIntensity: 0.2,
            roughness: 0.7,
            metalness: 0.1
        });

        this.earth = new THREE.Mesh(earthGeometry, earthMaterial);
        this.earth.position.set(0, 0, -500);
        this.scene.add(this.earth);
        this.objects.push(this.earth);

        // Create clouds layer
        const cloudsGeometry = new THREE.SphereGeometry(15.2, 64, 64);
        const cloudsMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        this.clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
        this.clouds.position.copy(this.earth.position);
        this.scene.add(this.clouds);
        this.objects.push(this.clouds);

        // Create atmosphere glow
        const atmosphereGeometry = new THREE.SphereGeometry(16, 64, 64);
        const atmosphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x4488ff,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });

        this.atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        this.atmosphere.position.copy(this.earth.position);
        this.scene.add(this.atmosphere);
        this.objects.push(this.atmosphere);

        // Add sun light
        this.sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
        this.sunLight.position.set(100, 50, 100);
        this.scene.add(this.sunLight);
        this.objects.push(this.sunLight);

        // Add ambient light
        this.ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(this.ambientLight);
        this.objects.push(this.ambientLight);
    }

    startJourney(callback) {
        // Show text overlay
        const textEl = document.getElementById('textOverlay');
        textEl.innerHTML = 'For you,<br>my dear';
        
        gsap.to(textEl, {
            opacity: 1,
            duration: 2,
            delay: 1,
            ease: 'power2.out'
        });

        // Camera journey toward Earth
        const timeline = gsap.timeline({
            onComplete: () => {
                // Fade out text
                gsap.to(textEl, {
                    opacity: 0,
                    duration: 1
                });
                
                if (callback) callback();
            }
        });

        // Move camera toward Earth
        timeline.to(this.camera.position, {
            z: -450,
            duration: 8,
            ease: 'power1.inOut'
        });

        // Slight camera drift for cinematic feel
        timeline.to(this.camera.position, {
            x: '+=5',
            y: '+=3',
            duration: 8,
            ease: 'sine.inOut'
        }, 0);

        // Rotate camera slightly
        timeline.to(this.camera.rotation, {
            z: 0.05,
            duration: 8,
            ease: 'sine.inOut'
        }, 0);

        // Zoom Earth as we approach
        timeline.to(this.earth.scale, {
            x: 2,
            y: 2,
            z: 2,
            duration: 8,
            ease: 'power1.in'
        }, 0);

        timeline.to(this.clouds.scale, {
            x: 2,
            y: 2,
            z: 2,
            duration: 8,
            ease: 'power1.in'
        }, 0);

        timeline.to(this.atmosphere.scale, {
            x: 2,
            y: 2,
            z: 2,
            duration: 8,
            ease: 'power1.in'
        }, 0);
    }

    handleClick(raycaster) {
        // This scene auto-progresses
        return false;
    }

    update(deltaTime, elapsedTime) {
        if (!this.isActive) return;

        // Rotate Earth
        if (this.earth) {
            this.earth.rotation.y += deltaTime * 0.1;
        }

        // Rotate clouds slightly faster
        if (this.clouds) {
            this.clouds.rotation.y += deltaTime * 0.12;
        }

        // Pulse atmosphere
        if (this.atmosphere) {
            this.atmosphere.scale.setScalar(
                2 + Math.sin(elapsedTime * 2) * 0.05
            );
        }
    }

    exit(callback) {
        this.isActive = false;
        
        const fadePromises = this.objects.map(obj => {
            return new Promise(resolve => {
                if (obj.material) {
                    gsap.to(obj.material, {
                        opacity: 0,
                        duration: 1.5,
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
