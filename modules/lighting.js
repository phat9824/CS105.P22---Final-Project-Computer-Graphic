import * as THREE from 'three';

export function setupLighting(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // ánh sáng dịu đều
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // ánh sáng mạnh, có bóng đổ
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}
