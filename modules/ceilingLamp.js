import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { gui } from "./lighting";

export const loadCeilingLampModel = (scene, renderer, camera) => {
    const loader = new GLTFLoader();

    loader.load("../public/models/pretty_simple_discoball.glb", (gltf) => {
        const lamp = gltf.scene;

        console.log("Ceiling Lamp", gltf);
        lamp.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                // Điều chỉnh material nếu có
                if (child.material) {
                    child.material.metalness = 0.2;
                    child.material.roughness = 0.4;

                    child.material.emissive = new THREE.Color(0xffffff); // màu phát sáng
                    child.material.emissiveIntensity = 0.7;

                    if (child.material.map) {
                        child.material.map.needsUpdate = true;
                    }
                }
            }
        });

        // Position the lamp
        lamp.position.set(0, 13, 0);
        lamp.scale.set(1, 1, 1);
        lamp.rotation.y = Math.PI;

        // Add the lamp to the scene
        scene.add(lamp);

        let angle = 0;
        const speed = 0.01;

        lamp.userData.animate = () => {
            angle += speed;
            lamp.rotation.y = angle; // xoay tại chỗ quanh trục Y
        };

        const spotlight = new THREE.SpotLight(0xffffff, 2);
        spotlight.angle = 0.7;
        spotlight.penumbra = 0.6;
        spotlight.decay = 1;
        spotlight.distance = 40;
        spotlight.castShadow = true;

        // Gắn đèn vào đèn mô hình
        lamp.add(spotlight);
        spotlight.position.set(0, 0, 0); // từ tâm đèn


        // Add GUI controls for the lamp
        const lampFolder = gui.addFolder("Ceiling Lamp");
        lampFolder
            .add(spotlight, "intensity", 0, 4)
            .onChange((value) => {
            lamp.traverse((child) => {
                if (child.isMesh && child.material) {
                if (value === 0) {
                    child.material.emissiveIntensity = 0; // tắt sáng
                } else {
                    child.material.emissive = new THREE.Color(0xffffff);
                    child.material.emissiveIntensity = value * 0.35; // khớp độ sáng
                }
                }
            });
            });
        lampFolder.close();
    },
  undefined,
  (err) => {
    console.error("Lỗi khi tải mô hình đèn trần:", err);
  });
};
