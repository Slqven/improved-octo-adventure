import * as THREE from 'three';
import gsap from 'gsap';

export class Scene3BigBang {
    constructor(scene, camera, bloomPass) {
        this.scene = scene;
        this.camera = camera;
        this.bloomPass = bloomPass;
        this.objects = [];
        this.isActive = false;
    }

    enter(callback) {
        this.isActive = true;
        this.createBigBang(callback);
    }

    createBigBang(callback) {
        // Create explosion center
        const centerGeometry = new THREE.SphereGeometry(1, 32, 32);
        const centerMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 1
        });
        this.explosionCenter = new THREE.Mesh(centerGeometry, centerMaterial);
        this.scene.add(this.explosionCenter);
        this.objects.push(this.explosionCenter);

        // Create expanding light
        this.explosionLight = new THREE.PointLight(0xffffff, 10, 1000);
        this.scene.add(this.explosionLight);
        this.objects.push(this.explosionLight);

        // Create shockwave particles
        this.createShockwave();

        // Animate explosion
        this.animateExplosion(callback);
    }

    createShockwave() {
        const particleCount = 15000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Start all particles at center
            positions[i3] = 0;
            positions[i3 + 1] = 0;
            positions[i3 + 2] = 0;

            // Random direction for explosion
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const speed = 100 + Math.random() * 200;
            
            velocities.push({
                x: speed * Math.sin(phi) * Math.cos(theta),
                y: speed * Math.sin(phi) * Math.sin(theta),
                z: speed * Math.cos(phi)
            });

            // Hot colors - white, yellow, orange, red
            const temp = Math.random();
            if (temp < 0.3) {
                // White hot
                colors[i3] = 1;
                colors[i3 + 1] = 1;
                colors[i3 + 2] = 1;
            } else if (temp < 0.6) {
                // Yellow
                colors[i3] = 1;
                colors[i3 + 1] = 1;
                colors[i3 + 2] = 0.3;
            } else if (temp < 0.85) {
                // Orange
                colors[i3] = 1;
                colors[i3 + 1] = 0.6;
                colors[i3 + 2] = 0.2;
            } else {
                // Red
                colors[i3] = 1;
                colors[i3 + 1] = 0.3;
                colors[i3 + 2] = 0.1;
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        this.shockwave = new THREE.Points(geometry, material);
        this.scene.add(this.shockwave);
        this.objects.push(this.shockwave);
        this.velocities = velocities;
    }

    animateExplosion(callback) {
        // Flash the screen white
        gsap.to(this.bloomPass, {
            strength: 5,
            duration: 0.3,
            ease: 'power4.out'
        });

        // Expand center sphere rapidly
        gsap.to(this.explosionCenter.scale, {
            x: 50,
            y: 50,
            z: 50,
            duration: 1,
            ease: 'power4.out'
        });

        gsap.to(this.explosionCenter.material, {
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });

        // Expand light
        gsap.to(this.explosionLight, {
            intensity: 50,
            distance: 2000,
            duration: 0.5,
            ease: 'power4.out'
        });

        gsap.to(this.explosionLight, {
            intensity: 0,
            duration: 2,
            delay: 0.5,
            ease: 'power2.in'
        });

        // Animate shockwave expansion
        const positions = this.shockwave.geometry.attributes.position.array;
        const duration = 3;

        gsap.to({}, {
            duration: duration,
            onUpdate: () => {
                const progress = gsap.getProperty({}, 'progress') || 0;
                
                for (let i = 0; i < this.velocities.length; i++) {
                    const i3 = i * 3;
                    const vel = this.velocities[i];
                    
                    // Exponential expansion
                    const expansionProgress = Math.pow(progress, 0.7);
                    positions[i3] = vel.x * expansionProgress;
                    positions[i3 + 1] = vel.y * expansionProgress;
                    positions[i3 + 2] = vel.z * expansionProgress;
                }
                
                this.shockwave.geometry.attributes.position.needsUpdate = true;
            }
        });

        // Fade out shockwave
        gsap.to(this.shockwave.material, {
            opacity: 0,
            duration: 2,
            delay: 1,
            ease: 'power2.in'
        });

        // Reset bloom
        gsap.to(this.bloomPass, {
            strength: 1.5,
            duration: 2,
            delay: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                if (callback) callback();
            }
        });

        // Camera shake
        const originalPosition = this.camera.position.clone();
        const shakeTimeline = gsap.timeline();
        
        for (let i = 0; i < 10; i++) {
            shakeTimeline.to(this.camera.position, {
                x: originalPosition.x + (Math.random() - 0.5) * 5,
                y: originalPosition.y + (Math.random() - 0.5) * 5,
                z: originalPosition.z + (Math.random() - 0.5) * 5,
                duration: 0.05,
                ease: 'none'
            });
        }
        
        shakeTimeline.to(this.camera.position, {
            x: originalPosition.x,
            y: originalPosition.y,
            z: originalPosition.z,
            duration: 0.5,
            ease: 'power2.out'
        });
    }

    handleClick(raycaster) {
        // This scene auto-progresses
        return false;
    }

    update(deltaTime, elapsedTime) {
        if (!this.isActive) return;
    }

    exit(callback) {
        this.isActive = false;
        
        const fadePromises = this.objects.map(obj => {
            return new Promise(resolve => {
                if (obj.material) {
                    gsap.to(obj.material, {
                        opacity: 0,
                        duration: 1,
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
