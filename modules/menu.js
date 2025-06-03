import { startAudio, stopAudio } from "./audio.js";

export const hideMenu = () => {
  const menu = document.getElementById("menu");
  menu.style.display = "none";
};

export const showMenu = () => {
  const menu = document.getElementById("menu");
  menu.style.display = "block";
  stopAudio(); // Stop audio when returning to menu
};

export const startExperience = (controls) => {
  // Reset camera position and orientation for a fresh gallery experience
  if (controls && controls.getObject) {
    const obj = controls.getObject();
    obj.position.set(0, 5, 0);
    obj.rotation.set(0, 0, 0);
  }
  controls.lock();
  hideMenu();
  startAudio(); // Start background audio when entering gallery
};

export const setupPlayButton = (controls) => {
  const playButton = document.getElementById("play_button");
  playButton.addEventListener("click", () => startExperience(controls));
};
