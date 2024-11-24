import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(1, 1, 5);
scene.add(light);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#three-container").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Track mouse position
let mouse = new THREE.Vector2();
let NOKI = null; // Placeholder for the GLTF model

// Load the GLTF model
const loader = new GLTFLoader();
loader.load('assets/NOKI.gltf', function (gltf) {
    NOKI = gltf.scene;
    scene.add(NOKI);

    // Optional: Set controls target
    controls.target.copy(NOKI.position);
});
 
// Mouse move listener
window.addEventListener('mousemove', (event) => {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update model rotation if loaded
    if (NOKI) {
        NOKI.rotation.y = mouse.x * Math.PI; // Horizontal rotation
        NOKI.rotation.x = mouse.y * Math.PI * 0.5; // Vertical rotation
    }
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
