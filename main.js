import { gameLoop } from "./gameLogic.js";
import { handleCanvasClick, handleKeyboardInput } from "./input.js";

const canvas = document.getElementById("pong");
canvas.width = 800;
canvas.height = 600;

// Add event listeners for canvas click and keyboard input
canvas.addEventListener("click", (e) => handleCanvasClick(e, canvas));
document.addEventListener("keydown", (e) => handleKeyboardInput(e));
document.addEventListener("keyup", (e) => handleKeyboardInput(e));

// Start the game loop when the window has finished loading
window.onload = () => {
  gameLoop(canvas);
};
