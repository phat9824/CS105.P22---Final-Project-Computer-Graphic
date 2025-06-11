import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadFlowerPlotModel = (scene, renderer, camera) => {
    const loader = new GLTFLoader();

    function createFlowerPlot(x, y, z, position_wall) {
            loader.load("../public/models/vaso_gerani.glb", (gltf) => {
            const flowerPot = gltf.scene;

            // Set position and scale for flowerPot
            flowerPot.position.set(x, y, z);
            flowerPot.scale.set(0.07, 0.07, 0.07);

            if (position_wall === 'frontleft') {flowerPot.rotation.y = Math.PI;}
            if (position_wall === 'frontright') {flowerPot.rotation.y = 2 * Math.PI;}
            if (position_wall === 'backright') {flowerPot.rotation.y = 2 * Math.PI;}
            if (position_wall === 'backleft') {flowerPot.rotation.y = -Math.PI;}

            scene.add(flowerPot);
        });
    }

    const frontleftFlower = createFlowerPlot(-35, -1.45, -28.8, 'frontleft');
    const frontrightFlower = createFlowerPlot(35, -1.45, -28.8, 'frontright');
    const backrightFlower = createFlowerPlot(35, -1.45, 28.8, 'backright');
    const backleftFlower = createFlowerPlot(-35, -1.45, 28.8, 'backleft');
};