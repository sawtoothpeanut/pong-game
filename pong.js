// Canvas and context
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Paddle dimensions and speed
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 5;

// Initialize scores and winning score
let playerScore = 0;
let computerScore = 0;
const winningScore = 3;

// Initialize showWinner variable
let showWinner = false;

// Initialize game based on user's choice
let gameStarted = false;
let isPlayerVsComputer = true;

// Player and computer paddle objects
const player = {
  x: 10,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 0,
};

const computer = {
  x: canvas.width - 10 - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 0,
};

// Ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 7,
  dx: 3,
  dy: 2,
};

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
        gameStarted = false;
        playerScore = 0;
        computerScore = 0;
        showWinner = false;

        // Reset player and computer paddle positions
        player.y = canvas.height / 2 - paddleHeight / 2;
        computer.y = canvas.height / 2 - paddleHeight / 2;

        // Reset ball position
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx *= -1;
      }, 5000); // Delay of 5 seconds before resetting the game
    } else {
      // Reset ball position only if no player has won
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.dx *= -1;
    }
  }
}


// Draw scores
function drawScores() {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(playerScore, canvas.width / 4, 50);
  ctx.fillText(computerScore, (3 * canvas.width) / 4, 50);
}

// Draw "Player X Wins!" message
function drawWinner(winner) {
  ctx.fillStyle = "white";
  ctx.font = "48px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`Player ${winner} Wins!`, canvas.width / 2, canvas.height / 2);
}

// Draw game objects
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Draw scores
   drawScores();

  // Draw paddles and ball
  drawPaddle(player.x, player.y, player.width, player.height, "white");
  drawPaddle(computer.x, computer.y, computer.width, computer.height, "white");
  if (!showWinner) {
    drawBall(ball.x, ball.y, ball.radius, "white");
  }

  // Draw winner
  if (playerScore === winningScore) {
    drawWinner(1);
  } else if (computerScore === winningScore) {
    drawWinner(2);
  }
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

// Start the game loop when the window has finished loading
window.onload = () => {
  gameLoop();
};

// Handle canvas click event
canvas.addEventListener("click", (e) => {
  if (gameStarted) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (y > 180 && y < 220) {
    isPlayerVsComputer = true;
    gameStarted = true;
  } else if (y > 220 && y < 260) {
    isPlayerVsComputer = false;
    gameStarted = true;
  }
})

// Keyboard event listeners
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    computer.dy = -paddleSpeed;
  } else if (e.key === "ArrowDown") {
    computer.dy = paddleSpeed;
  }
  
  if (e.key === "w" || e.key === "W") {
    player.dy = -paddleSpeed;
  } else if (e.key === "s" || e.key === "S") {
    player.dy = paddleSpeed;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    computer.dy = 0;
  }
  
  if (e.key === "w" || e.key === "W" || e.key === "s" || e.key === "S") {
    player.dy = 0;
  }
});




