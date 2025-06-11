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
import { addObjectsToScene } from "./modules/sceneHelpers.js";
import { setupPlayButton } from "./modules/menu.js";
import { setupAudio } from "./modules/audio.js";  // ensure audio.js exists

// Optional: if you have these modules installed
// import { clickHandling } from "./modules/clickHandling.js";
// import { setupVR } from "./modules/VRSupport.js";

import { loadStatueModel } from "./modules/statue.js";
import { loadCeilingLampModel } from "./modules/ceilingLamp.js";
import { clickHandling } from "./modules/clickHandling.js";

// 1. Scene, camera, controls, renderer
let { camera, controls, renderer } = setupScene();

// 2. Audio listener attached to camera
setupAudio(camera);

// 3. Texture loader
const textureLoader = new THREE.TextureLoader();

// 4. Core geometry
const walls = createWalls(scene, textureLoader);
const floor = setupFloor(scene, textureLoader);
const ceiling = createCeiling(scene, textureLoader);
const paintings = createPaintings(scene, textureLoader);

// 5. Lighting
const lighting = setupLighting(scene, paintings);

// 6. Bounding boxes for collision/interaction
createBoundingBoxes(walls);
createBoundingBoxes(paintings);

// 7. Add primary objects to scene
// addObjectsToScene(scene, [...walls.children, floor, ceiling, ...paintings]);
addObjectsToScene(scene, paintings);

// 8. Load extra models (ceiling lamp & statue)
loadCeilingLampModel(scene);
loadStatueModel(scene, renderer, camera, (statue) => {
    // 9. UI & controls
    createBoundingBoxes(statue);
    setupPlayButton(controls);
    clickHandling(renderer, camera, paintings);
    setupEventListeners(controls, camera, walls);

    // 10. Start render loop
    setupRendering(scene, camera, renderer, paintings, controls, walls, statue);
});

// setupPlayButton(controls);
// clickHandling(renderer, camera, paintings);
// setupEventListeners(controls, camera, walls);

// // 10. Start render loop
// setupRendering(scene, camera, renderer, paintings, controls, walls);


