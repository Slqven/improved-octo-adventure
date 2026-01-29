import { Scene1Universe } from './scenes/Scene1Universe.js';
import { Scene2BlackHole } from './scenes/Scene2BlackHole.js';
import { Scene3BigBang } from './scenes/Scene3BigBang.js';
import { Scene4NewUniverse } from './scenes/Scene4NewUniverse.js';
import { Scene5JourneyToEarth } from './scenes/Scene5JourneyToEarth.js';
import { Scene6HeartTransform } from './scenes/Scene6HeartTransform.js';

export class SceneManager {
    constructor(scene, camera, bloomPass, filmGrainPass) {
        this.scene = scene;
        this.camera = camera;
        this.bloomPass = bloomPass;
        this.filmGrainPass = filmGrainPass;
        this.currentSceneIndex = 0;
        this.isTransitioning = false;

        // Initialize all scenes
        this.scenes = [
            new Scene1Universe(scene, camera, bloomPass, filmGrainPass),
            new Scene2BlackHole(scene, camera, bloomPass, filmGrainPass),
            new Scene3BigBang(scene, camera, bloomPass, filmGrainPass),
            new Scene4NewUniverse(scene, camera, bloomPass, filmGrainPass),
            new Scene5JourneyToEarth(scene, camera, bloomPass, filmGrainPass),
            new Scene6HeartTransform(scene, camera, bloomPass, filmGrainPass)
        ];

        // Start with first scene
        this.currentScene = this.scenes[0];
        this.currentScene.enter();
    }

    handleClick(raycaster) {
        if (this.isTransitioning) return;
        
        const canProgress = this.currentScene.handleClick(raycaster);
        
        if (canProgress) {
            this.transitionToNextScene();
        }
    }

    transitionToNextScene() {
        if (this.currentSceneIndex >= this.scenes.length - 1) return;
        
        this.isTransitioning = true;
        
        // Exit current scene
        this.currentScene.exit(() => {
            // Move to next scene
            this.currentSceneIndex++;
            this.currentScene = this.scenes[this.currentSceneIndex];
            
            // Enter new scene
            this.currentScene.enter(() => {
                this.isTransitioning = false;
            });
        });
    }

    update(deltaTime, elapsedTime) {
        if (this.currentScene) {
            this.currentScene.update(deltaTime, elapsedTime);
        }
    }
}
