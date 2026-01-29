import * as THREE from 'three';
import gsap from 'gsap';

export class Scene2BlackHole {
    constructor(scene, camera, bloomPass) {
        this.scene = scene;
        this.camera = camera;
        this.bloomPass = bloomPass;
        this.objects = [];
        this.particles = [];
        this.isActive = false;
        this.blackHole = null;
    }

    enter(callback) {
        this.isActive = true;
        this.createCollapsingUniverse();
        this.startCollapse(callback);
    }

    createCollapsingUniverse() {
        // Create particles that will collapse
        const particleCount = 10000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Start particles in a sphere around the center
            const radius = 300 + Math.random() * 700;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            // Store initial position for velocity calculation
            velocities.push(new THREE.Vector3(x, y, z));

            // Varied colors
            const colorChoice = Math.random();
            if (colorChoice < 0.5) {
                colors[i3] = 1;
                colors[i3 + 1] = 1;
                colors[i3 + 2] = 1;
            } else if (colorChoice < 0.75) {
                colors[i3] = 0.5;
                colors[i3 + 1] = 0.8;
                colors[i3 + 2] = 1;
            } else {
                colors[i3] = 1;
                colors[i3 + 1] = 0.7;
                colors[i3 + 2] = 0.3;
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
        this.objects.push(this.particleSystem);
        this.velocities = velocities;
    }

    startCollapse(callback) {
        // Animate particles collapsing to center
        const positions = this.particleSystem.geometry.attributes.position.array;
        const duration = 3;

        // Create gravitational collapse effect
        gsap.to({}, {
            duration: duration,
            onUpdate: () => {
                const progress = gsap.getProperty({}, 'progress') || 0;
                
                for (let i = 0; i < this.velocities.length; i++) {
                    const i3 = i * 3;
                    const vel = this.velocities[i];
                    
                    // Spiral inward with gravitational acceleration
                    const collapseProgress = Math.pow(progress, 1.5);
                    positions[i3] = vel.x * (1 - collapseProgress);
                    positions[i3 + 1] = vel.y * (1 - collapseProgress);
                    positions[i3 + 2] = vel.z * (1 - collapseProgress);
                    
                    // Add spiral motion
                    const angle = progress * Math.PI * 4;
                    const radius = vel.length() * (1 - collapseProgress);
                    positions[i3] += Math.cos(angle) * radius * 0.1;
                    positions[i3 + 1] += Math.sin(angle) * radius * 0.1;
                }
                
                this.particleSystem.geometry.attributes.position.needsUpdate = true;
            },
            onComplete: () => {
                this.createBlackHole();
                this.startCountdown(callback);
            }
        });
    }

    createBlackHole() {
        // Create black hole center (dark sphere)
        const centerGeometry = new THREE.SphereGeometry(2, 32, 32);
        const centerMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 1
        });
        this.blackHoleCenter = new THREE.Mesh(centerGeometry, centerMaterial);
        this.scene.add(this.blackHoleCenter);
        this.objects.push(this.blackHoleCenter);

        // Create accretion disk
        const diskGeometry = new THREE.RingGeometry(3, 15, 64);
        const diskMaterial = new THREE.MeshBasicMaterial({
            color: 0xff6600,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        this.accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial);
        this.accretionDisk.rotation.x = Math.PI / 2;
        this.scene.add(this.accretionDisk);
        this.objects.push(this.accretionDisk);

        // Create event horizon glow
        const glowGeometry = new THREE.SphereGeometry(5, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xff3300,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        this.eventHorizon = new THREE.Mesh(glowGeometry, glowMaterial);
        this.scene.add(this.eventHorizon);
        this.objects.push(this.eventHorizon);

        // Add light
        this.blackHoleLight = new THREE.PointLight(0xff3300, 2, 100);
        this.scene.add(this.blackHoleLight);
        this.objects.push(this.blackHoleLight);

        // Animate black hole formation
        gsap.from(this.blackHoleCenter.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            ease: 'power4.out'
        });

        gsap.from(this.accretionDisk.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: 'power2.out'
        });
    }

    startCountdown(callback) {
        const countdownEl = document.getElementById('countdown');
        let count = 5;

        const countdownInterval = setInterval(() => {
            countdownEl.textContent = count;
            gsap.fromTo(countdownEl, 
                { opacity: 0, scale: 0.5 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.3,
                    ease: 'back.out'
                }
            );

            // Increase black hole intensity with countdown
            const intensity = (6 - count) * 0.5;
            gsap.to(this.blackHoleLight, {
                intensity: 2 + intensity,
                duration: 1
            });

            gsap.to(this.eventHorizon.scale, {
                x: 1 + intensity * 0.2,
                y: 1 + intensity * 0.2,
                z: 1 + intensity * 0.2,
                duration: 1
            });

            // Increase bloom
            gsap.to(this.bloomPass, {
                strength: 1.5 + intensity * 0.3,
                duration: 1
            });

            setTimeout(() => {
                gsap.to(countdownEl, {
                    opacity: 0,
                    scale: 1.5,
                    duration: 0.5
                });
            }, 500);

            count--;

            if (count < 0) {
                clearInterval(countdownInterval);
                countdownEl.textContent = '';
                if (callback) callback();
            }
        }, 1000);
    }

    handleClick(raycaster) {
        // This scene auto-progresses
        return false;
    }

    update(deltaTime, elapsedTime) {
        if (!this.isActive) return;

        // Rotate accretion disk
        if (this.accretionDisk) {
            this.accretionDisk.rotation.z += deltaTime * 2;
        }

        // Pulse event horizon
        if (this.eventHorizon) {
            this.eventHorizon.scale.setScalar(1 + Math.sin(elapsedTime * 3) * 0.1);
        }
    }

    exit(callback) {
        this.isActive = false;
        
        // Quick fade for transition to big bang
        const fadePromises = this.objects.map(obj => {
            return new Promise(resolve => {
                if (obj.material) {
                    gsap.to(obj.material, {
                        opacity: 0,
                        duration: 0.5,
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
