import * as THREE from 'three';
import { displayPaintingInfo, hidePaintingInfo } from './paintingInfo';


export function setupRendering(scene, camera, renderer, paintings, controls) {
  const clock = new THREE.Clock();

  function render() {
    const delta = clock.getDelta();
    if (typeof window.updateMovement === 'function') {
      window.updateMovement(delta);
    }

    const distanceThreshold = 8; // set a distance threshold (8 units)
    let paintingToShow;
    paintings.forEach((painting) => {
      const distanceToPainting = camera.position.distanceTo(painting.postion) // get distacne to painting 
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

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}
