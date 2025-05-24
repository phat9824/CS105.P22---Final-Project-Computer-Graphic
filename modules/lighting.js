import * as THREE from 'three';

export function setupLighting(scene) {
  const ambientLight = new THREE.AmbientLight(0x101010, 1.0);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0);
  sunLight.position.set(0, 15, 0);
  scene.add(sunLight);
}
