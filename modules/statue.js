// statue.js
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadStatueModel = (scene, renderer, camera, onLoaded) => {
  // Add statue information
  const statueInfo = {
    title: "Warrior Statue",
    description:
      "An ancient warrior statue depicting strength and honor. This masterpiece showcases intricate details of armor and weaponry.",
    artist: "Unknown Artist",
    year: "Circa 500 BC",
  };

  // Create info display elements
  const infoElement = document.createElement("div");
  infoElement.className = "info-panel";
  infoElement.style.display = "none";
  infoElement.innerHTML = `
        <h2>${statueInfo.title}</h2>
        <p>${statueInfo.description}</p>
        <p><strong>Artist:</strong> ${statueInfo.artist}</p>
        <p><strong>Year:</strong> ${statueInfo.year}</p>
    `;
  document.body.appendChild(infoElement);

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

      // Add interaction detection
      const checkDistance = () => {
        const distance = camera.position.distanceTo(statue.position);
        if (distance < 10) {
          // Adjust this value to change the detection range
          infoElement.style.display = "block";
        } else {
          infoElement.style.display = "none";
        }
      };

      // Modify the animate function to include distance check
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the statue around the Y-axis
        statue.rotation.y += 0.01;
        checkDistance(); // Check distance in each frame

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
