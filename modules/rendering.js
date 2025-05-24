import * as THREE from 'three';


export function setupRendering(scene, camera, renderer, paintings, controls) {
  const clock = new THREE.Clock();

  function render() {
    const delta = clock.getDelta();
    if (typeof window.updateMovement === 'function') {
      window.updateMovement(delta);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}
