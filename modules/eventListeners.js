import * as THREE from 'three';


const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false,
};

export function setupEventListeners(controls, camera, wallGroup) {
  document.addEventListener('keydown', (event) => {
    if (event.key in keysPressed) {
      keysPressed[event.key] = true;
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.key in keysPressed) {
      keysPressed[event.key] = false;
    }
  });

  function checkCollision() {
    const playerBox = new THREE.Box3();
    const camPos = new THREE.Vector3();
    camera.getWorldPosition(camPos);
    playerBox.setFromCenterAndSize(camPos, new THREE.Vector3(1, 1, 1));

    for (let wall of wallGroup.children) {
      if (wall.BoundingBox && playerBox.intersectsBox(wall.BoundingBox)) {
        return true;
      }
    }
    return false;
  }

  let lastPos = new THREE.Vector3();

  function updateMovement(delta) {
    const moveSpeed = 5 * delta;
    lastPos.copy(camera.position);

    if (keysPressed.ArrowRight || keysPressed.d) controls.moveRight(moveSpeed);
    if (keysPressed.ArrowLeft || keysPressed.a) controls.moveRight(-moveSpeed);
    if (keysPressed.ArrowUp || keysPressed.w) controls.moveForward(moveSpeed);
    if (keysPressed.ArrowDown || keysPressed.s) controls.moveForward(-moveSpeed);

    if (checkCollision()) camera.position.copy(lastPos);
  }

  window.updateMovement = updateMovement;
}
