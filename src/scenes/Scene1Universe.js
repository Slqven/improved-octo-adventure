import * as THREE from 'three';
import gsap from 'gsap';

export class Scene1Universe {
    constructor(scene, camera, bloomPass, filmGrainPass) {
        this.scene = scene;
        this.camera = camera;
        this.bloomPass = bloomPass;
        this.filmGrainPass = filmGrainPass;
        this.objects = [];
        this.heart = null;
        this.isActive = false;
    }

    enter(callback) {
        this.isActive = true;
        this.createDreamyUniverse();
        this.createSoftHeart();
        
        // Show click hint gently
        const hint = document.getElementById('clickHint');
        gsap.to(hint, { opacity: 0.7, duration: 4, delay: 3, ease: 'power1.inOut' });
        
        if (callback) callback();
    }

    createDreamyUniverse() {
        // Create layered star planes for depth (not procedural particles)
        this.createStarLayer(-100, 0.3, 800);
        this.createStarLayer(-150, 0.5, 600);
        this.createStarLayer(-200, 0.7, 400);
        
        // Add soft, glowing nebula clouds
        this.createDreamyNebulae();
        
        // Add subtle light flares
        this.createLightFlares();
    }

    createStarLayer(zPosition, opacity, count) {
        // Create canvas texture for painterly stars
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 2048;
        const ctx = canvas.getContext('2d');
        
        // Paint soft, glowing stars
        for (let i = 0; i < count; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 3 + 1;
            const brightness = Math.random() * 0.5 + 0.5;
            
            // Soft glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness * opacity})`);
            gradient.addColorStop(0.3, `rgba(255, 250, 240, ${brightness * opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x - size * 3, y - size * 3, size * 6, size * 6);
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        const geometry = new THREE.PlaneGeometry(300, 300);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: opacity,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        
        const plane = new THREE.Mesh(geometry, material);
        plane.position.z = zPosition;
        this.scene.add(plane);
        this.objects.push(plane);
        
        // Gentle drift
        gsap.to(plane.position, {
            x: '+=5',
            y: '+=3',
            duration: 60 + Math.random() * 40,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    createDreamyNebulae() {
        const nebulaCount = 4;
        for (let i = 0; i < nebulaCount; i++) {
            // Create soft, painterly nebula
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            
            // Soft gradient clouds
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 200 + Math.random() * 100;
            
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            
            // Dreamy colors
            const hue = Math.random() * 60 + 200; // Blues and purples
            gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.3)`);
            gradient.addColorStop(0.5, `hsla(${hue + 20}, 60%, 50%, 0.15)`);
            gradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const texture = new THREE.CanvasTexture(canvas);
            const geometry = new THREE.PlaneGeometry(150, 150);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.4,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            
            const nebula = new THREE.Mesh(geometry, material);
            nebula.position.set(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200,
                -150 - Math.random() * 50
            );
            
            this.scene.add(nebula);
            this.objects.push(nebula);
            
            // Slow, dreamy rotation
            gsap.to(nebula.rotation, {
                z: Math.PI * 2,
                duration: 120 + Math.random() * 60,
                repeat: -1,
                ease: 'none'
            });
            
            // Gentle pulsing
            gsap.to(nebula.material, {
                opacity: 0.6,
                duration: 8 + Math.random() * 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }

    createLightFlares() {
        // Subtle light flares drifting through
        for (let i = 0; i < 3; i++) {
            const geometry = new THREE.PlaneGeometry(2, 20);
            const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.1,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            
            const flare = new THREE.Mesh(geometry, material);
            flare.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                -50
            );
            flare.rotation.z = Math.random() * Math.PI;
            
            this.scene.add(flare);
            this.objects.push(flare);
            
            // Slow drift
            gsap.to(flare.position, {
                x: '+=50',
                y: '+=30',
                duration: 40 + Math.random() * 20,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
            
            // Fade in and out
            gsap.to(flare.material, {
                opacity: 0.3,
                duration: 6 + Math.random() * 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }

    createSoftHeart() {
        // Create soft, painterly heart using canvas
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Draw soft heart shape
        ctx.save();
        ctx.translate(256, 256);
        ctx.scale(8, 8);
        
        // Create soft glow
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(255, 100, 150, 0.8)';
        
        // Heart path
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(0, -3, -6, -3, -6, 0);
        ctx.bezierCurveTo(-6, 3, -3, 6, 0, 10);
        ctx.bezierCurveTo(3, 6, 6, 3, 6, 0);
        ctx.bezierCurveTo(6, -3, 0, -3, 0, 0);
        
        // Soft gradient fill
        const gradient = ctx.createRadialGradient(0, 2, 0, 0, 2, 10);
        gradient.addColorStop(0, '#ff6b9d');
        gradient.addColorStop(0.5, '#ff4d7d');
        gradient.addColorStop(1, '#ff1744');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
        
        const texture = new THREE.CanvasTexture(canvas);
        const geometry = new THREE.PlaneGeometry(8, 8);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        
        this.heart = new THREE.Mesh(geometry, material);
        this.heart.position.set(0, 0, 0);
        this.scene.add(this.heart);
        this.objects.push(this.heart);
        
        // Add soft glow sphere
        const glowGeometry = new THREE.SphereGeometry(5, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xff1744,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        this.heartGlow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.heartGlow.position.copy(this.heart.position);
        this.scene.add(this.heartGlow);
        this.objects.push(this.heartGlow);
        
        // Gentle heartbeat
        this.animateHeartBeat();
    }

    animateHeartBeat() {
        // Slow, emotional heartbeat
        const beatTimeline = gsap.timeline({ repeat: -1 });
        
        beatTimeline
            .to([this.heart.scale, this.heartGlow.scale], {
                x: 1.15,
                y: 1.15,
                z: 1.15,
                duration: 0.6,
                ease: 'power2.out'
            })
            .to([this.heart.scale, this.heartGlow.scale], {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.6,
                ease: 'power2.in'
            })
            .to([this.heart.scale, this.heartGlow.scale], {
                x: 1.08,
                y: 1.08,
                z: 1.08,
                duration: 0.4,
                ease: 'power2.out'
            })
            .to([this.heart.scale, this.heartGlow.scale], {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.4,
                ease: 'power2.in'
            })
            .to({}, { duration: 1.5 }); // Long pause for emotion
        
        // Glow pulse
        gsap.to(this.heartGlow.material, {
            opacity: 0.25,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    handleClick(raycaster) {
        if (!this.isActive || !this.heart) return false;

        const intersects = raycaster.intersectObject(this.heart);
        if (intersects.length > 0) {
            // Hide click hint
            const hint = document.getElementById('clickHint');
            gsap.to(hint, { opacity: 0, duration: 1 });
            return true;
        }
        return false;
    }

    update(deltaTime, elapsedTime) {
        if (!this.isActive) return;

        // Subtle rotation of heart
        if (this.heart) {
            this.heart.rotation.z = Math.sin(elapsedTime * 0.5) * 0.05;
        }
    }

    exit(callback) {
        this.isActive = false;
        
        // Gentle fade out
        const fadePromises = this.objects.map(obj => {
            return new Promise(resolve => {
                if (obj.material) {
                    gsap.to(obj.material, {
                        opacity: 0,
                        duration: 2,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            this.scene.remove(obj);
                            if (obj.geometry) obj.geometry.dispose();
                            if (obj.material) {
                                if (obj.material.map) obj.material.map.dispose();
                                obj.material.dispose();
                            }
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
