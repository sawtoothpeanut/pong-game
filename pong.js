// Canvas and context
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Paddle dimensions and speed
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 5;

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

  // Ball out of bounds - reset
  if (ball.x + ball.radius < 0 || ball.x - ball.radius > canvas.width) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
  }
}

// Draw game objects
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles and ball
  drawPaddle(player.x, player.y, player.width, player.height, "white");
  drawPaddle(computer.x, computer.y, computer.width, computer.height, "white");
  drawBall(ball.x, ball.y, ball.radius, "white");
}

// Main game loop
function gameLoop() {
  if (!gameStarted) return;
  
  if (isPlayerVsComputer) {
    computerAI();
  }
  
  update();
  draw();
  
  requestAnimationFrame(gameLoop);
}

// Initialize game based on user's choice
let gameStarted = false;
const startMenu = document.getElementById("start-menu");
const playerVsComputerBtn = document.getElementById("player-vs-computer");
const playerVsPlayerBtn = document.getElementById("player-vs-player");
let isPlayerVsComputer = true;

playerVsComputerBtn.addEventListener("click", () => {
  isPlayerVsComputer = true;
  startMenu.style.display = "none";
  canvas.style.display = "block";
  gameStarted = true;
  gameLoop();
});

playerVsPlayerBtn.addEventListener("click", () => {
  isPlayerVsComputer = false;
  startMenu.style.display = "none";
  canvas.style.display = "block";
  gameStarted = true;
  gameLoop();
});

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




