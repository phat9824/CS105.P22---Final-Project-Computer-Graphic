import * as THREE from "three";

export function createWalls(scene, textureLoader) {
  const wallTexture = textureLoader.load("/img/white-texture.jpg");
  wallTexture.wrapS = THREE.RepeatWrapping;
  wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(1, 1);

  const wallMaterial = new THREE.MeshLambertMaterial({ map: wallTexture });
  const wallGroup = new THREE.Group();

  const dimensions = { width: 60, height: 30, depth: 0.001 };

  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(
      dimensions.width,
      dimensions.height,
      dimensions.depth
    ),
    wallMaterial
  );
  frontWall.position.z = -30;

  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(
      dimensions.width,
      dimensions.height,
      dimensions.depth
    ),
    wallMaterial
  );
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.x = -30;

  const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(
      dimensions.width,
      dimensions.height,
      dimensions.depth
    ),
    wallMaterial
  );
  rightWall.rotation.y = Math.PI / 2;
  rightWall.position.x = 30;

  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(
      dimensions.width,
      dimensions.height,
      dimensions.depth
    ),
    wallMaterial
  );
  backWall.position.z = 30;

  wallGroup.add(frontWall, backWall, leftWall, rightWall);
  scene.add(wallGroup);

  return wallGroup;
}
