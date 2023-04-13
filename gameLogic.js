import { player, computer, ball } from "./gameObjects.js";
import { handleCanvasClick } from "./input.js";
import { draw } from "./render.js";

// Initialize scores and winning score
let playerScore = 0;
let computerScore = 0;
const winningScore = 3;

// Initialize showWinner variable
let showWinner = false;

// Initialize game based on user's choice
let gameStarted = false;
let isPlayerVsComputer = true;

// Computer AI
function computerAI() {
  if (ball.y < computer.y + computer.height / 2) {
    computer.dy = -paddleSpeed;
  } else if (ball.y > computer.y + computer.height / 2) {
    computer.dy = paddleSpeed;
  } else {
    computer.dy = 0;
  }
}

// Update game state
function update() {
  // Update paddle positions
  player.y += player.dy;
  computer.y += computer.dy;

  // Paddle collision with canvas
  if (player.y < 0) {
    player.y = 0;
  } else if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
  }

  if (computer.y < 0) {
    computer.y = 0;
  } else if (computer.y + computer.height > canvas.height) {
    computer.y = canvas.height - computer.height;
  }

  // Ball movement
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball collision with canvas
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  // Ball collision with paddles
  if (
    (ball.x - ball.radius < player.x + player.width &&
      ball.y > player.y &&
      ball.y < player.y + player.height) ||
    (ball.x + ball.radius > computer.x &&
      ball.y > computer.y &&
      ball.y < computer.y + computer.height)
  ) {
    ball.dx *= -1;
  }

  // Ball out of bounds - update scores and reset
  if (ball.x + ball.radius < 0 || ball.x - ball.radius > canvas.width) {
    if (ball.x + ball.radius < 0) {
      computerScore++;
    } else {
      playerScore++;
    }

    // Check if a player has won
    if (playerScore === winningScore || computerScore === winningScore) {
      showWinner = true;
      setTimeout(() => {
        // Reset game state
        gameStarted = false;
        playerScore = 0;
        computerScore = 0;
        showWinner = false;
        player.y = canvas.height / 2 - paddleHeight / 2;
        computer.y = canvas.height / 2 - paddleHeight / 2;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 3;
        ball.dy = 2;
      }, 5000); // Delay of 5 seconds before resetting the game
    } else {
      // Reset ball position only if no player has won
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.dx = -ball.dx;
    }
  }
}

// Main game loop
function gameLoop() {
    if (!gameStarted) {
      drawMenu();
    } else {
      if (isPlayerVsComputer) {
        computerAI();
      }
  
      if (!showWinner) {
        update();
      }
      draw();
    }
  
    requestAnimationFrame(gameLoop);
  }
