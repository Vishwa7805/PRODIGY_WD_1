const boxes = document.querySelectorAll(".box");
const newGame = document.querySelector(".newgame_btn");
const player1Container = document.querySelector(".player_1");
const player2Container = document.querySelector(".player_2");
const player1Display = document.querySelector(".player_1_display");
const player2Display = document.querySelector(".player_2_display");
const player1Score = document.querySelector(".player_1_score");
const player2Score = document.querySelector(".player_2_score");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let running = true;
let currentPlayer = "X";
let options = ["", "", "", "", "", "", "", "", ""];
let p1Score = 0;
let p2Score = 0;

initializeGame();

function initializeGame() {
    boxes.forEach(box => box.addEventListener("click", clicked));
    newGame.addEventListener("click", restartGame);
    updateHighlight(currentPlayer);
}

function updateHighlight(currentPlayer) {
    if (currentPlayer == "X") {
        player1Container.classList.add("highlight");
        player2Container.classList.remove("highlight");
    }
    else {
        player2Container.classList.add("highlight");
        player1Container.classList.remove("highlight");
    }
}

function clicked() {
    const boxIndex = this.getAttribute("box_index");

    if (options[boxIndex] !== "" || !running) return;

    updateBox(this, boxIndex);
    checkWinner();
}


function updateBox(box, boxIndex) {
    options[boxIndex] = currentPlayer;
    box.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    updateHighlight(currentPlayer);
}

function checkWinner() {
    let winStatus = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            winStatus = true;
            break;
        }
    }
    if (winStatus) {
        displayWinner();
    }
    else if (!options.includes("")) {
        player1Display.textContent = "Draw";
        player2Display.textContent = "Draw";
        running = false;
    }
    else {
        changePlayer();
    }
}

function displayWinner() {
    if (currentPlayer == "X") {
        player1Display.textContent = "Win";
        player2Display.textContent = "Lose";
        p1Score++;
    }
    else {
        player2Display.textContent = "Win";
        player1Display.textContent = "Lose";
        p2Score++;
    }
    player1Score.textContent = p1Score;
    player2Score.textContent = p2Score;
    running = false;
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    boxes.forEach(box => box.textContent = "");
    player1Display.textContent = "";
    player2Display.textContent = "";
    running = true;
    updateHighlight(currentPlayer);
}