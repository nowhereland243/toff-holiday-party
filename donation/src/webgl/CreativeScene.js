import * as THREE from 'three';
import vertexShader from '../shaders/creative_vertex.glsl?raw';
import fragmentShader from '../shaders/creative_fragment.glsl?raw';

export default class CreativeScene extends THREE.Scene {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.geometry = new THREE.PlaneGeometry(4, 4, 128, 128); // Larger plane to cover screen
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            }
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.add(this.mesh);

        this.onMouseMove = this.onMouseMove.bind(this);
        window.addEventListener('mousemove', this.onMouseMove);
    }

    onMouseMove(e) {
        // Normalize mouse coordinates to 0..1
        this.material.uniforms.uMouse.value.x = e.clientX / window.innerWidth;
        this.material.uniforms.uMouse.value.y = 1.0 - e.clientY / window.innerHeight;
    }

    update(time) {
        this.material.uniforms.uTime.value = time;
    }

    resize() {
        this.material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }

    dispose() {
        window.removeEventListener('mousemove', this.onMouseMove);
        this.geometry.dispose();
        this.material.dispose();
    }
}
