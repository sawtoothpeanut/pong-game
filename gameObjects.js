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

// Export game objects
export { player, computer, ball, showWinner, gameStarted, isPlayerVsComputer, playerScore, computerScore, winningScore };
