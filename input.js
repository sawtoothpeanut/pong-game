import { player } from "./gameObjects.js";

// Handle canvas click event
export function handleCanvasClick(e) {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (y > 180 && y < 220) {
    isPlayerVsComputer = true;
    gameStarted = true;
  } else if (y > 220 && y < 260) {
    isPlayerVsComputer = false;
    gameStarted = true;
  }
}

// Handle keyboard input
export function handleKeyboardInput(e) {
  switch (e.key) {
    case "ArrowUp":
      computer.dy = -paddleSpeed;
      break;
    case "ArrowDown":
      computer.dy = paddleSpeed;
      break;
    case "w":
    case "W":
      player.dy = -paddleSpeed;
      break;
    case "s":
    case "S":
      player.dy = paddleSpeed;
      break;
  }
}

// Handle key up
export function handleKeyUp(e) {
  switch (e.key) {
    case "ArrowUp":
    case "ArrowDown":
      computer.dy = 0;
      break;
    case "w":
    case "W":
    case "s":
    case "S":
      player.dy = 0;
      break;
  }
}
