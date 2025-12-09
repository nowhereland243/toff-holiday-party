import * as THREE from 'three';
import CreativeScene from './CreativeScene';

export default class Experience {
    constructor(canvas) {
        this.canvas = canvas;
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.scene = new CreativeScene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.z = 2;

        this.clock = new THREE.Clock();
        
        this.onResize = this.onResize.bind(this);
        window.addEventListener('resize', this.onResize);

        this.tick = this.tick.bind(this);
        this.tick();
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        if (this.scene.resize) {
            this.scene.resize();
        }
    }

    tick() {
        const elapsedTime = this.clock.getElapsedTime();
        if (this.scene.update) {
            this.scene.update(elapsedTime);
        }
        this.renderer.render(this.scene, this.camera);
        this.rafId = window.requestAnimationFrame(this.tick);
    }

    destroy() {
        window.removeEventListener('resize', this.onResize);
        window.cancelAnimationFrame(this.rafId);
        this.renderer.dispose();
        if (this.scene.dispose) {
            this.scene.dispose();
        }
    }
}
