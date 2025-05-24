export function hideMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'none';
}

export function showMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'block';
}

export function startExperience(controls) {
  controls.lock();
  hideMenu();
}

export function setupPlayButton(controls) {
  const playButton = document.getElementById('play_button');
  playButton.addEventListener('click', () => startExperience(controls));
}

export function setupMenu() {
  // optional setup code
}
