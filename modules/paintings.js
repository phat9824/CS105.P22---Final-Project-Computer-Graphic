import * as THREE from 'three';

export function createPaintings(scene) {
  const textureLoader = new THREE.TextureLoader();

  const data = [
    { url: '../public/artworks/0.jpg', pos: [-10, 5, -19.99], rotY: 0 },
    { url: '../public/artworks/1.jpg', pos: [10, 5, -19.99], rotY: 0 },
    { url: '../public/artworks/3.jpg', pos: [-19.99, 5, -10], rotY: Math.PI / 2 },
    { url: '../public/artworks/5.jpg', pos: [19.99, 5, -10], rotY: -Math.PI / 2 },
    { url: '../public/artworks/8.jpg', pos: [-19.99, 5, 10], rotY: Math.PI / 2 },
    { url: '../public/artworks/9.jpg', pos: [19.99, 5, 10], rotY: -Math.PI / 2 },
    { url: '../public/artworks/6.jpg', pos: [-10, 5, 19.99], rotY: Math.PI },
    { url: '../public/artworks/7.jpg', pos: [10, 5, 19.99], rotY: Math.PI }
  ];

  return data.map(({ url, pos, rotY }) => {
    const texture = textureLoader.load(url);
    const mat = new THREE.MeshBasicMaterial({ map: texture });
    const geo = new THREE.PlaneGeometry(10, 5);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.rotation.y = rotY;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
  });
}
