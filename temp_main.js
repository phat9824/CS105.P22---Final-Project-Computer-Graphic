import * as THREE from 'three';
import { scene, setupScene } from './modules/scene.js';
import { setupLighting } from './modules/lighting.js';
import { setupFloor } from './modules/floor.js';
import { createWalls } from './modules/walls.js';
import { createPaintings } from './modules/paintings.js';
import { createCeiling } from './modules/ceiling.js';
import { setupRendering } from './modules/rendering.js';
import { setupPlayButton, setupMenu } from './modules/menu.js';
import { setupEventListeners } from './modules/eventListeners.js';
import { createBoundingBoxes } from './modules/boundingBox.js';

let { camera, controls, renderer } = setupScene();

setupLighting(scene);
setupMenu();

const floor = setupFloor(scene);
const wallGroup = createWalls(scene);
const paintings = createPaintings(scene);
const ceiling = createCeiling(scene);

createBoundingBoxes([...wallGroup.children, ...paintings]);

setupPlayButton(controls);
setupEventListeners(controls, camera, wallGroup);

setupRendering(scene, camera, renderer, paintings, controls);
