import * as THREE from "three";

export function createPaintings(scene, textureLoader) {
  const data = [
    {
      url: "/artworks/0.jpg",
      pos: [-10, 5, -29.99],
      rotY: 0,
      info: {
        title: "Starry Night",
        artist: "Vincent van Gogh",
        description: "A famous post-impressionist painting.",
        year: 1889,
      },
    },
    {
      url: "/artworks/1.jpg",
      pos: [10, 5, -29.99],
      rotY: 0,
      info: {
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        description: "The most recognized portrait in the world.",
        year: 1503,
      },
    },
    {
      url: "/artworks/3.jpg",
      pos: [-29.99, 5, -10],
      rotY: Math.PI / 2,
      info: {
        title: "The Scream",
        artist: "Edvard Munch",
        description: "Expressionist masterpiece of anxiety.",
        year: 1893,
      },
    },
    {
      url: "/artworks/5.jpg",
      pos: [29.99, 5, -10],
      rotY: -Math.PI / 2,
      info: {
        title: "Girl with a Pearl Earring",
        artist: "Johannes Vermeer",
        description: "A beautiful tronie of a girl.",
        year: 1665,
      },
    },
    {
      url: "/artworks/8.jpg",
      pos: [-29.99, 5, 10],
      rotY: Math.PI / 2,
      info: {
        title: "The Persistence of Memory",
        artist: "Salvador Dalí",
        description: "Surrealist melting clocks.",
        year: 1931,
      },
    },
    {
      url: "/artworks/9.jpg",
      pos: [29.99, 5, 10],
      rotY: -Math.PI / 2,
      info: {
        title: "The Kiss",
        artist: "Gustav Klimt",
        description: "Symbolist golden embrace.",
        year: 1908,
      },
    },
    {
      url: "/artworks/6.jpg",
      pos: [-10, 5, 29.99],
      rotY: Math.PI,
      info: {
        title: "The Night Watch",
        artist: "Rembrandt",
        description: "Baroque group portrait.",
        year: 1642,
      },
    },
    {
      url: "/artworks/7.jpg",
      pos: [10, 5, 29.99],
      rotY: Math.PI,
      info: {
        title: "Water Lilies",
        artist: "Claude Monet",
        description: "Impressionist water garden.",
        year: 1916,
      },
    },
  ];

  return data.map(({ url, pos, rotY, info }) => {
    const texture = textureLoader.load(url);
    const mat = new THREE.MeshStandardMaterial({ map: texture });
    const geo = new THREE.PlaneGeometry(10, 5);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.rotation.y = rotY;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.info = info; // Attach info to mesh
    scene.add(mesh);
    return mesh;
  });
}
