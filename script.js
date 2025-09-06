
const board = document.getElementById("board");
const winnerText = document.getElementById("winner");
const playerXScoreElement = document.getElementById("playerXScore");
const playerOScoreElement = document.getElementById("playerOScore");

const winImage = document.getElementById("winImage");
const leftImage = document.getElementById("leftImage");
const rightImage = document.getElementById("rightImage");
const drawImage = document.getElementById("drawImage");


let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let playerXScore = 0;
let playerOScore = 0;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createBoard() {
  board.innerHTML = "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  winnerText.textContent = "";

  hideAllImages();

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}


function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (currentPlayer === "X") {
    leftImage.style.display = "block";
    rightImage.style.display = "none";
  } else {
    rightImage.style.display = "block";
    leftImage.style.display = "none";
  }

  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    winnerText.textContent = `Player ${currentPlayer} Wins! 🎉`;

    winImage.classList.remove("left", "right");

    if (currentPlayer === "X") {
      winImage.classList.add("left");  
    } else {
      winImage.classList.add("right"); 
    }

    winImage.style.display = "block";
    leftImage.style.display = "none";
    rightImage.style.display = "none";
    gameActive = false;

    winSound.currentTime = 0;
    winSound.play();
    bgMusic.pause();
    if (currentPlayer === "X") {
      playerXScore++;
      playerXScoreElement.textContent = playerXScore;
    } else {
      playerOScore++;
      playerOScoreElement.textContent = playerOScore;
    }
    return;
  }

if (!gameState.includes("")) {
  winnerText.textContent = "It's a Draw! 🤝";

  // Reset classes and clone for right side
  drawImage.classList.remove("left", "right");
  drawImage.classList.add("left");
  drawImage.style.display = "block";

  // Clone the draw image for right side
  const rightDraw = drawImage.cloneNode(true);
  rightDraw.classList.remove("left");
  rightDraw.classList.add("right");
  document.body.appendChild(rightDraw);

  leftImage.style.display = "none";
  rightImage.style.display = "none";
  gameActive = false;

  drawSound.currentTime = 0;
  drawSound.play();
  bgMusic.pause();
}

}



function restartGame() {
  // Hide win/draw images
  winImage.style.display = "none";
  drawImage.style.display = "none";

  const rightDraw = document.querySelector(".draw-img.right");
  if (rightDraw && rightDraw !== drawImage) {
    rightDraw.remove();
  }
  winSound.pause();
  winSound.currentTime = 0;
  drawSound.pause();
  drawSound.currentTime = 0;
  bgMusic.play();

  createBoard();
}



function newGame() {
  playerXScore = 0;
  playerOScore = 0;
  playerXScoreElement.textContent = playerXScore;
  playerOScoreElement.textContent = playerOScore;
  createBoard();
}


function hideAllImages() {
  winImage.style.display = "none";
  leftImage.style.display = "none";
  rightImage.style.display = "none";
  drawImage.style.display = "none";
}


const bgMusic = document.getElementById("bgMusic");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");

bgMusic.volume = 0.3;


document.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(err => console.log("Play failed:", err));
  }
}, { once: true });


const muteBtn = document.getElementById("muteBtn");
const volumeControl = document.getElementById("volumeControl");

bgMusic.volume = 0.3;
winSound.volume = 0.4;
drawSound.volume = 0.3;
volumeControl.value = 0.3;


muteBtn.addEventListener("click", () => {
  if (bgMusic.volume > 0 || winSound.volume > 0 || drawSound.volume > 0) {
    bgMusic.volume = 0;
    winSound.volume = 0;
    drawSound.volume = 0;
    volumeControl.value = 0;
  } else {
    bgMusic.volume = 0.3;
    winSound.volume = 0.2;
    drawSound.volume = 0.2;
    volumeControl.value = 0.3;
  }
});


volumeControl.addEventListener("input", () => {
  bgMusic.volume = volumeControl.value;
  winSound.volume = volumeControl.value * 0.6;
  drawSound.volume = volumeControl.value * 0.6;
});




createBoard();
