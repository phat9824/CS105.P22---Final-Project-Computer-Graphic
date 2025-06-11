import * as THREE from "three";

export function setupFloor(scene, textureLoader) {
  const floorTexture = textureLoader.load("/img/floor.jpg");
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(20, 20);

  const planeGeometry = new THREE.PlaneGeometry(60, 60);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
    roughness: 0.8,      // tweak to your taste
    metalness: 0.0
  });

  const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
  floorPlane.rotation.x = Math.PI / 2;
  floorPlane.position.y = -Math.PI;
  floorPlane.receiveShadow = true;

  scene.add(floorPlane);
  return floorPlane;
}
