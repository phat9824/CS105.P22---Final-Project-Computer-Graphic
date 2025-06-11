import * as THREE from "three";
import { displayPaintingInfo, hidePaintingInfo } from "./paintingInfo";
import { updateMovement } from "./movement";

export function setupRendering(scene, camera, renderer, paintings, controls, wallGroup, statue) {
  const clock = new THREE.Clock();

  function render() {
    const delta = clock.getDelta();
    // if (typeof(window.updateMovement) === "function") {
    //   window.updateMovement(delta);
    // }
    updateMovement(delta, controls, camera, wallGroup, statue);

    const distanceThreshold = 8; // set a distance threshold (8 units)
    let paintingToShow;
    paintings.forEach((painting) => {
      const distanceToPainting = camera.position.distanceTo(painting.position); // fixed typo here
      if (distanceToPainting < distanceThreshold) {
        paintingToShow = painting; // set paintingToShow to this painting (painting will show)
      }
    });

    if (paintingToShow) {
      // if there is a painting to show
      displayPaintingInfo(paintingToShow.userData.info);
    } else {
      hidePaintingInfo();
    }

    scene.traverse(obj => {
      if (typeof obj.userData.animate === "function") {
        obj.userData.animate();
      }
    });


    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}
