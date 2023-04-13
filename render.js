import { canvas } from "./main.js";
import { player, computer, ball, showWinner, gameStarted, isPlayerVsComputer, playerScore, computerScore, winningScore } from "./gameObjects.js";

// Draw paddle
function drawPaddle(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// Draw ball
function drawBall(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

// Draw menu
function drawMenu() {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Pong Game", canvas.width / 2, 100);

  ctx.font = "18px Arial";
  ctx.fillText("Player vs Computer", canvas.width / 2, 200);
  ctx.fillText("Player vs Player", canvas.width / 2, 240);
}

// Draw scores
function drawScores() {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${playerScore} - ${computerScore}`, canvas.width / 2, 50);
}

// Draw winner
function drawWinner(player) {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  if (player === 1) {
    ctx.fillText("Player 1 Wins!", canvas.width / 2, 100);
  } else if (player === 2) {
    ctx.fillText("Player 2 Wins!", canvas.width / 2, 100);
  }
}

// Export draw functions
export { drawPaddle, drawBall, drawMenu, drawScores, drawWinner };
