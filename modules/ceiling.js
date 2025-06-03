import * as THREE from "three";

export function createCeiling(scene, textureLoader) {
  const ceilingTexture = textureLoader.load("/img/white-texture.jpg");

  const ceilingGeometry = new THREE.PlaneGeometry(45, 50);
  const ceilingMaterial = new THREE.MeshLambertMaterial({
    map: ceilingTexture,
  });
  const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

  ceilingPlane.rotation.x = Math.PI / 2;
  ceilingPlane.position.y = 10;
  ceilingPlane.receiveShadow = true;

  scene.add(ceilingPlane);
  return ceilingPlane;
}
