import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';

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


function createPainting(imageURL, width, height, position) {
  const textureLoader = new THREE.TextureLoader();
  const paintingTexture = textureLoader.load(imageURL);
  const paintingMaterial = new THREE.MeshBasicMaterial({
    map: paintingTexture,
  });
  const paintingGeometry = new THREE.PlaneGeometry(width, height);
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
  painting.position.set(position.x, position.y, position.z);

  return painting;
}

// painting front wall 
const painting1 = createPainting("artworks/0.jpg", 10, 5, new THREE.Vector3(-10, 5, -19.99));

const painting2 = createPainting("artworks/1.jpg", 10, 5, new THREE.Vector3(10, 5, -19.99));

const painting3 = createPainting("artworks/3.jpg", 10, 5, new THREE.Vector3(-19.99, 5, -10)); // left wall (near the front wall)
painting3.rotation.y = Math.PI / 2;

const painting4 = createPainting("artworks/5.jpg", 10, 5, new THREE.Vector3(19.99, 5, -10)); // right wall (near the front wall)
painting4.rotation.y = -Math.PI / 2;

const painting5 = createPainting("artworks/8.jpg", 10, 5, new THREE.Vector3(-19.99, 5, 10)); // left wall (near the back wall)
painting5.rotation.y = Math.PI / 2;

const painting6 = createPainting("artworks/9.jpg", 10, 5, new THREE.Vector3(19.99, 5, 10)); // right wall (near the back wall)
painting6.rotation.y = -Math.PI / 2;

// painting back wall 
const painting7 = createPainting("artworks/6.jpg", 10, 5, new THREE.Vector3(-10, 5, 19.99)); 
painting7.rotation.y = Math.PI;

const painting8 = createPainting("artworks/7.jpg", 10, 5, new THREE.Vector3(10, 5, 19.99)); 
painting8.rotation.y = Math.PI;

scene.add(painting1, painting2, painting3, painting4, painting5, painting6, painting7, painting8);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x101010, 1.0); // color, intensity
// ambientLight.position = camera.position; // Light follows camera
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
// document.addEventListener("keydown", onKeyDown, false);

// Floor texture
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load("img/floor.jpg");
// const floorTexture = new THREE.ImageUtils.loadTexture("img/floor.jpg");
// Fix border of texture inside
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(20, 20);

// Floor plane
const planeGeometry = new THREE.PlaneGeometry(45, 45);
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

// Create wall material with realistic colors and texture 
const wallTexture = textureLoader.load('img/white-texture.jpg');
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(1, 1);

const wallMaterial = new THREE.MeshLambertMaterial({ map: wallTexture }) // create the material with the texture for the walls 

// Front Wall
const frontWall = new THREE.Mesh(
  new THREE.BoxGeometry(45, 20, 0.001),
  new THREE.MeshLambertMaterial({ map: wallTexture })
);
frontWall.position.z = -20;

const leftWall = new THREE.Mesh(
  new THREE.BoxGeometry(45, 20, 0.001),
  new THREE.MeshLambertMaterial({ map: wallTexture })
);
leftWall.rotation.y = Math.PI / 2; // This is 90 degrees
leftWall.position.x = -20;


const rightWall = new THREE.Mesh(
  new THREE.BoxGeometry(45, 20, 0.001),
  new THREE.MeshLambertMaterial({ map: wallTexture })
);
rightWall.rotation.y = Math.PI / 2; // This is 90 degrees
rightWall.position.x = 20;

const backWall = new THREE.Mesh(
  new THREE.BoxGeometry(45, 20, 0.001),
  new THREE.MeshLambertMaterial({ map: wallTexture })
);
backWall.position.z = 20;

wallGroup.add(frontWall, backWall, leftWall, rightWall);


// Loop through each wall and create bounding box
for (let i = 0; i < wallGroup.children.length; i++) {
  wallGroup.children[i].BoundingBox = new THREE.Box3();
  wallGroup.children[i].BoundingBox.setFromObject(wallGroup.children[i]);
}

// check if the player intersects with the wall 
function checkCollision() {
  const playerBoundingBox = new THREE.Box3(); // create a bounding box for the player
  const cameraWorldPosition = new THREE.Vector3(); // create a vector to hold the camera position 
  camera.getWorldPosition(cameraWorldPosition); // get the camera position and store it in the vector 

  playerBoundingBox.setFromCenterAndSize(cameraWorldPosition, new THREE.Vector3(1, 1, 1));

  // loop through each wall 
  for (let i = 0; i < wallGroup.children.length; i++) {
    const wall = wallGroup.children[i]; // get the wall 
    if (playerBoundingBox.intersectsBox(wall.BoundingBox)) {
      // check if the player's bounding box intersects with any of the wall bounding boxes 
      return true; // if it does, return true
    }
  }
  return false; // if it doesn't, return false 
}

const ceilingTexture = textureLoader.load('img/white-texture.jpg');
const ceilingGeometry = new THREE.PlaneGeometry(45, 50);
const ceilingMaterial = new THREE.MeshLambertMaterial({ map: ceilingTexture });
const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

ceilingPlane.rotation.x = Math.PI / 2;
ceilingPlane.position.y = 10;

scene.add(ceilingPlane);

// Optimize the lights and shadows 
renderer.shadowMap.enabled = true; // enable shadows 
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Enable shadows on objects 
floorPlane.receiveShadow = true;
ceilingPlane.receiveShadow = true;
frontWall.castShadow = true;
frontWall.receiveShadow = true;
leftWall.castShadow = true;
leftWall.receiveShadow = true;
rightWall.castShadow = true;
rightWall.receiveShadow = true;
backWall.castShadow = true;
backWall.receiveShadow = true;
painting1.castShadow = true;
painting1.receiveShadow = true;
painting2.castShadow = true;
painting2.receiveShadow = true;

// Controls 
const controls = new PointerLockControls(camera, document.body);
// Lock the pointer (controls are activated) and hide the menu when the experience starts
function startExperience(){
  // Lock the pointer
  controls.lock();
  // Hide the menu 
  hideMenu();
}

const playButton = document.getElementById('play_button');
playButton.addEventListener('click', startExperience);

// Hide menu
function hideMenu(){
  const menu = document.getElementById('menu');
  menu.style.display = 'none';
}

// Show menu
function showMenu(){
  const menu = document.getElementById('menu');
  menu.style.display = 'block';
}

controls.addEventListener('unlock', showMenu);

// object to hold the keys pressed 
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

// Event Listener for when we press the keys
// 'keydown' is a event that fires when a key is pressed 
document.addEventListener('keydown', (event) => {
  if (event.key in keysPressed) {
    keysPressed[event.key] = true; // if it is, set the value to true
  }
}, false);

// Event Listener for when we release the keys
// 'keyup' is a event that fires when a key is released 
document.addEventListener('keyup', (event) => {
  if (event.key in keysPressed) {
    keysPressed[event.key] = false; // if it is, set the value to false
  }
}, true);

const clock = new THREE.Clock(); // create a clock to keep track of the time between frames 

function updateMovement(delta) {
  const moveSpeed = 5*delta;

  const previousPosition = camera.position.clone(); // clone the camera position before the movement 
  if (keysPressed.ArrowRight || keysPressed.d) {
    controls.moveRight(moveSpeed);
  }
  if (keysPressed.ArrowLeft || keysPressed.a) {
    controls.moveRight(-moveSpeed);
  }
  if (keysPressed.ArrowUp || keysPressed.w) {
    controls.moveForward(moveSpeed);
  }
  if (keysPressed.ArrowDown || keysPressed.s) {
    controls.moveForward(-moveSpeed);
  }

  if (checkCollision()) {
    camera.position.copy(previousPosition); // reset the camera position to the previous position 
  }

}

// function onKeyDown(event) {
//   let keycode = event.which;

//   // right arrow key
//   if (keycode === 39 || keycode === 68) {
//     controls.moveRight(0.08);
//   }
//   // left arrow key
//   else if (keycode === 37 || keycode === 65) {
//     controls.moveRight(-0.08);
//   }
//   // up arrow key
//   else if (keycode === 38 || keycode === 87) {
//     controls.moveForward(0.08);
//   }
//   // down arrow key
//   else if (keycode === 40 || keycode === 83) {
//     controls.moveForward(-0.08);
//   }
// }

let render = function () {
  const delta = clock.getDelta();
  updateMovement(delta);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();
