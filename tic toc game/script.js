const board = document.getElementById("board");
const status = document.getElementById("status");
const restartButton = document.getElementById("restart");
const overlay = document.getElementById("overlay");
const resultText = document.getElementById("result-text");
const newGameButton = document.getElementById("new-game-button");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner(player) {
    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] === player && boardState[b] === player && boardState[c] === player) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return boardState.every(cell => cell !== "");
}

function showResult(message) {
    overlay.style.display = "flex";
    resultText.textContent = message;
}

function handleClick(event) {
    const cellIndex = event.target.dataset.index;
    if (boardState[cellIndex] === "" && !checkWinner("X") && !checkWinner("O")) {
        boardState[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add(currentPlayer);

        if (checkWinner(currentPlayer)) {
            showResult(`Player ${currentPlayer} wins!`);
        } else if (checkDraw()) {
            showResult("It's a draw!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function restartGame() {
    overlay.style.display = "none";
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    status.textContent = "Player X's turn";
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
}

board.addEventListener("click", handleClick);
restartButton.addEventListener("click", restartGame);
newGameButton.addEventListener("click", () => {
    restartGame();
    overlay.style.display = "none";
   
});

// Create the tic-tac-toe grid
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
}

restartGame();