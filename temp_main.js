import * as THREE from "three";
import { scene, setupScene } from "./modules/scene.js";
import { createPaintings } from "./modules/paintings.js";
import { createWalls } from "./modules/walls.js";
import { setupLighting } from "./modules/lighting.js";
import { setupFloor } from "./modules/floor.js";
import { createCeiling } from "./modules/ceiling.js";
import { createBoundingBoxes } from "./modules/boundingBox.js";
import { setupRendering } from "./modules/rendering.js";
import { setupEventListeners } from "./modules/eventListeners.js";
import { setupPlayButton } from "./modules/menu.js";

let { camera, controls, renderer } = setupScene();

const textureLoader = new THREE.TextureLoader();

const walls = createWalls(scene, textureLoader);
const floor = setupFloor(scene, textureLoader);
const ceiling = createCeiling(scene, textureLoader);
const paintings = createPaintings(scene, textureLoader);

setupLighting(scene, paintings);

createBoundingBoxes(walls);
createBoundingBoxes(paintings);

setupPlayButton(controls);
setupEventListeners(controls, camera, walls);

setupRendering(scene, camera, renderer, paintings, controls, walls);
