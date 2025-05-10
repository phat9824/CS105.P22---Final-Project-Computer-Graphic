// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // near
  1000 // far
);
scene.add(camera);
camera.position.z = 5; // move camera back to 5 units

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true }); // for smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfffff, 1); // background color
document.body.appendChild(renderer.domElement); // add renderer to html

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x101010, 1.0); // color, intensity
ambientLight.position = camera.position; // Light follows camera
scene.add(ambientLight);

// Directional Light ~ SunLight
const sunLight = new THREE.DirectionalLight(0xddddd, 1.0);
sunLight.position.y = 15;
scene.add(sunLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "blue" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Controls
document.addEventListener("keydown", onKeyDown, false);

// Floor texture
const floorTexture = new THREE.ImageUtils.loadTexture("img/floor.jpg");
// Fix border of texture inside
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(20, 20);

// Floor plane
const planeGeometry = new THREE.PlaneBufferGeometry(45, 45);
const planeMaterial = new THREE.MeshBasicMaterial({
  map: floorTexture,
  side: THREE.DoubleSide,
});

const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
floorPlane.rotation.x = Math.PI / 2; // Rotate plane 90 degree -> In XZ plane, see -Y
floorPlane.position.y = -Math.PI; // plane can only be seen at front, the back can not be seen -> move down to see
scene.add(floorPlane);

// Walls
let wallGroup = new THREE.Group();
scene.add(wallGroup);

// Front Wall
const frontWall = new THREE.Mesh(
  new THREE.BoxGeometry(45, 20, 0.001),
  new THREE.MeshBasicMaterial({ color: "green" })
);
frontWall.position.z = -20;
wallGroup.add(frontWall);

function onKeyDown(event) {
  let keycode = event.which;

  // right arrow key
  if (keycode === 39) {
    camera.translateX(-0.05);
  }
  // left arrow key
  else if (keycode === 37) {
    camera.translateX(0.05);
  }
  // up arrow key
  else if (keycode === 38) {
    camera.translateY(-0.05);
  }
  // down arrow key
  else if (keycode === 40) {
    camera.translateY(0.05);
  }
}

let render = function () {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();
