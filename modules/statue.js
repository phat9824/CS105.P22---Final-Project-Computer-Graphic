// statue.js
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadStatueModel = (scene, renderer, camera, onLoaded) => {
    const loader = new GLTFLoader();

    loader.load(
        "../public/models/warrior_statue/scene.gltf",
        (gltf) => {
            const statue = gltf.scene;

            // Position the statue at the center of the floor
            statue.position.set(0, -3.5, 0);

            // Scale if necessary
            statue.scale.set(0.08, 0.08, 0.08);

            // Iterate through all the meshes in the statue and update their materials
            statue.traverse((child) => {
                if (child.isMesh) {
                    // Modify child.material here to improve appearance
                    child.material.metalness = 0.0;
                    child.material.roughness = 0.2;

                    // Cast shadow
                    child.castShadow = true;

                    // Ensure the map property is properly handled
                    if (child.material.map) {
                        child.material.map.needsUpdate = true;
                    }
                }
            });
            // Add the statue to the scene
            scene.add(statue);
            onLoaded(statue);

            // Start the animation loop
            const animate = () => {
                requestAnimationFrame(animate);

                // Rotate the statue around the Y-axis
                statue.rotation.y += 0.01;

                // Ensure renderer, scene, and camera are defined before rendering
                if (renderer && scene && camera) {
                    renderer.render(scene, camera);
                } else {
                    console.error("Renderer, scene, or camera is not defined.");
                }
            };

            animate(); // Start the animation loop
        },
        undefined,
        (error) => {
            console.error("An error occurred while loading the model.", error);
        }
    );
};