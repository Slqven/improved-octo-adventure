import * as THREE from 'three';
import gsap from 'gsap';

export class Scene6HeartTransform {
    constructor(scene, camera, bloomPass) {
        this.scene = scene;
        this.camera = camera;
        this.bloomPass = bloomPass;
        this.objects = [];
        this.isActive = false;
    }

    enter(callback) {
        this.isActive = true;
        this.createTransformingEarth();
        this.startTransformation();
        
        if (callback) callback();
    }

    createTransformingEarth() {
        // Create Earth that will transform
        const earthGeometry = new THREE.SphereGeometry(20, 64, 64);
        const earthMaterial = new THREE.MeshStandardMaterial({
            color: 0x2233ff,
            emissive: 0x112244,
            emissiveIntensity: 0.3,
            roughness: 0.7,
            metalness: 0.1
        });

        this.earth = new THREE.Mesh(earthGeometry, earthMaterial);
        this.earth.position.set(0, 0, -100);
        this.scene.add(this.earth);
        this.objects.push(this.earth);

        // Add lights
        this.mainLight = new THREE.DirectionalLight(0xffffff, 1);
        this.mainLight.position.set(50, 50, 50);
        this.scene.add(this.mainLight);
        this.objects.push(this.mainLight);

        this.ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(this.ambientLight);
        this.objects.push(this.ambientLight);
    }

    startTransformation() {
        // Wait a moment, then transform
        setTimeout(() => {
            this.transformToHeart();
        }, 2000);
    }

    transformToHeart() {
        // Morph Earth into heart shape
        const timeline = gsap.timeline();

        // First, change color to red
        timeline.to(this.earth.material.color, {
            r: 1,
            g: 0.1,
            b: 0.27,
            duration: 2,
            ease: 'power2.inOut'
        });

        timeline.to(this.earth.material.emissive, {
            r: 1,
            g: 0.1,
            b: 0.27,
            duration: 2,
            ease: 'power2.inOut'
        }, 0);

        timeline.to(this.earth.material, {
            emissiveIntensity: 0.8,
            duration: 2,
            ease: 'power2.inOut'
        }, 0);

        // Create the actual heart geometry
        timeline.call(() => {
            this.createFinalHeart();
        }, null, 2);
    }

    createFinalHeart() {
        // Remove Earth
        this.scene.remove(this.earth);
        if (this.earth.geometry) this.earth.geometry.dispose();
        if (this.earth.material) this.earth.material.dispose();

        // Create heart shape
        const heartShape = new THREE.Shape();
        const x = 0, y = 0;
        heartShape.moveTo(x + 0, y + 0);
        heartShape.bezierCurveTo(x + 0, y - 0.3, x - 0.6, y - 0.3, x - 0.6, y + 0);
        heartShape.bezierCurveTo(x - 0.6, y + 0.3, x - 0.3, y + 0.6, x + 0, y + 1);
        heartShape.bezierCurveTo(x + 0.3, y + 0.6, x + 0.6, y + 0.3, x + 0.6, y + 0);
        heartShape.bezierCurveTo(x + 0.6, y - 0.3, x + 0, y - 0.3, x + 0, y + 0);

        const extrudeSettings = {
            depth: 0.5,
            bevelEnabled: true,
            bevelThickness: 0.15,
            bevelSize: 0.15,
            bevelSegments: 8
        };

        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        geometry.center();

        const material = new THREE.MeshStandardMaterial({
            color: 0xff1744,
            emissive: 0xff1744,
            emissiveIntensity: 1.2,
            metalness: 0.2,
            roughness: 0.3
        });

        this.heart = new THREE.Mesh(geometry, material);
        this.heart.scale.set(15, 15, 15);
        this.heart.position.set(0, 0, -100);
        this.scene.add(this.heart);
        this.objects.push(this.heart);

        // Create volumetric glow
        this.createVolumetricGlow();

        // Start beating animation
        this.animateHeartBeat();

        // Enhance bloom for final scene
        gsap.to(this.bloomPass, {
            strength: 2.5,
            duration: 2,
            ease: 'power2.out'
        });
    }

    createVolumetricGlow() {
        // Inner glow
        const innerGlowGeometry = new THREE.SphereGeometry(12, 32, 32);
        const innerGlowMaterial = new THREE.MeshBasicMaterial({
            color: 0xff1744,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });
        this.innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
        this.innerGlow.position.copy(this.heart.position);
        this.scene.add(this.innerGlow);
        this.objects.push(this.innerGlow);

        // Outer glow
        const outerGlowGeometry = new THREE.SphereGeometry(18, 32, 32);
        const outerGlowMaterial = new THREE.MeshBasicMaterial({
            color: 0xff6b6b,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        this.outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
        this.outerGlow.position.copy(this.heart.position);
        this.scene.add(this.outerGlow);
        this.objects.push(this.outerGlow);

        // Point light
        this.heartLight = new THREE.PointLight(0xff1744, 5, 100);
        this.heartLight.position.copy(this.heart.position);
        this.scene.add(this.heartLight);
        this.objects.push(this.heartLight);

        // Create particle embers
        this.createEmbers();
    }

    createEmbers() {
        const emberCount = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(emberCount * 3);
        const velocities = [];

        for (let i = 0; i < emberCount; i++) {
            const i3 = i * 3;
            
            // Start near heart
            const radius = 15 + Math.random() * 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi) - 100;

            velocities.push({
                x: (Math.random() - 0.5) * 0.5,
                y: Math.random() * 0.5 + 0.2,
                z: (Math.random() - 0.5) * 0.5
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 2,
            color: 0xff6b00,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.embers = new THREE.Points(geometry, material);
        this.scene.add(this.embers);
        this.objects.push(this.embers);
        this.emberVelocities = velocities;
    }

    animateHeartBeat() {
        const beatTimeline = gsap.timeline({ repeat: -1 });
        
        // Heart scale beat
        beatTimeline
            .to(this.heart.scale, {
                x: 16,
                y: 16,
                z: 16,
                duration: 0.4,
                ease: 'power2.out'
            })
            .to(this.heart.scale, {
                x: 15,
                y: 15,
                z: 15,
                duration: 0.4,
                ease: 'power2.in'
            })
            .to(this.heart.scale, {
                x: 15.5,
                y: 15.5,
                z: 15.5,
                duration: 0.3,
                ease: 'power2.out'
            })
            .to(this.heart.scale, {
                x: 15,
                y: 15,
                z: 15,
                duration: 0.3,
                ease: 'power2.in'
            })
            .to({}, { duration: 0.6 }); // Pause

        // Glow pulse
        gsap.to(this.innerGlow.scale, {
            x: 1.3,
            y: 1.3,
            z: 1.3,
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to(this.outerGlow.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // Light intensity pulse
        gsap.to(this.heartLight, {
            intensity: 8,
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // Emissive intensity pulse
        gsap.to(this.heart.material, {
            emissiveIntensity: 1.5,
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    handleClick(raycaster) {
        // Final scene - no progression
        return false;
    }

    update(deltaTime, elapsedTime) {
        if (!this.isActive) return;

        // Rotate heart slowly
        if (this.heart) {
            this.heart.rotation.y += deltaTime * 0.3;
        }

        // Update embers
        if (this.embers && this.emberVelocities) {
            const positions = this.embers.geometry.attributes.position.array;
            
            for (let i = 0; i < this.emberVelocities.length; i++) {
                const i3 = i * 3;
                const vel = this.emberVelocities[i];
                
                positions[i3] += vel.x;
                positions[i3 + 1] += vel.y;
                positions[i3 + 2] += vel.z;

                // Reset if too far
                if (positions[i3 + 1] > 50) {
                    const radius = 15 + Math.random() * 5;
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos(2 * Math.random() - 1);
                    
                    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
                    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                    positions[i3 + 2] = radius * Math.cos(phi) - 100;
                }
            }
            
            this.embers.geometry.attributes.position.needsUpdate = true;
        }

        // Subtle camera movement
        this.camera.position.x = Math.sin(elapsedTime * 0.2) * 2;
        this.camera.position.y = Math.cos(elapsedTime * 0.3) * 1;
        this.camera.lookAt(0, 0, -100);
    }

    exit(callback) {
        this.isActive = false;
        
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
