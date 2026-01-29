import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import gsap from 'gsap';
import { SceneManager } from './SceneManager.js';
import { FilmGrainShader } from './shaders/FilmGrainShader.js';

class DreamlikeExperience {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000000, 50, 200); // Soft depth fog
        
        this.camera = new THREE.PerspectiveCamera(
            60, // Slightly narrower FOV for intimacy
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;

        // Renderer with soft settings
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0; // Softer exposure
        this.renderer.setClearColor(0x000000, 1);

        // Post-processing for dreamy, painterly feel
        this.composer = new EffectComposer(this.renderer);
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(this.renderPass);

        // Soft, dreamy bloom (higher strength, larger radius)
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            2.5,  // Strong bloom for dreamy glow
            1.2,  // Large radius for soft edges
            0.3   // Low threshold - everything glows softly
        );
        this.composer.addPass(this.bloomPass);

        // Film grain and vignette for cinematic feel
        this.filmGrainPass = new ShaderPass(FilmGrainShader);
        this.composer.addPass(this.filmGrainPass);

        // Raycaster for gentle interaction
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Scene manager
        this.sceneManager = new SceneManager(this.scene, this.camera, this.bloomPass, this.filmGrainPass);

        // Event listeners
        this.setupEventListeners();

        // Start animation loop
        this.clock = new THREE.Clock();
        this.animate();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('click', (e) => this.onClick(e));
        window.addEventListener('touchstart', (e) => this.onClick(e), { passive: true });
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Subtle camera drift following mouse
        gsap.to(this.camera.position, {
            x: this.mouse.x * 2,
            y: this.mouse.y * 2,
            duration: 3,
            ease: 'power1.out'
        });
    }

    onClick(event) {
        if (event.touches) {
            const touch = event.touches[0];
            this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        }
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.sceneManager.handleClick(this.raycaster);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const deltaTime = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();

        // Update film grain time for animated grain
        if (this.filmGrainPass.uniforms.time) {
            this.filmGrainPass.uniforms.time.value = elapsedTime;
        }

        // Subtle camera drift
        this.camera.position.x += Math.sin(elapsedTime * 0.1) * 0.001;
        this.camera.position.y += Math.cos(elapsedTime * 0.15) * 0.001;

        this.sceneManager.update(deltaTime, elapsedTime);
        this.composer.render();
    }
}

// Initialize the dreamy experience
new DreamlikeExperience();
