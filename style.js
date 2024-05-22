const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restart-btn');
const statusDisplay = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let winner = null;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell'));

    if (cell.textContent !== '' || !gameActive) return;

    cell.textContent = currentPlayer;
    checkResult();
}

function checkResult() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const cellA = cells[a].textContent;
        const cellB = cells[b].textContent;
        const cellC = cells[c].textContent;

        if (cellA !== '' && cellA === cellB && cellA === cellC) {
            gameActive = false;
            winner = cellA;
            break;
        }
    }

    if (winner) {
        statusDisplay.textContent = `Player ${winner} wins!`;
        return;
    }

    if (![...cells].some(cell => cell.textContent === '')) {
        gameActive = false;
        statusDisplay.textContent = 'It\'s a draw!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function handleRestart() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
    winner = null;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', handleRestart);