class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerDisplay = document.getElementById('currentPlayer');
        this.gameStatusDisplay = document.getElementById('gameStatus');
        this.resetBtn = document.getElementById('resetBtn');
        this.resetScoreBtn = document.getElementById('resetScoreBtn');
        this.winModal = document.getElementById('winModal');
        this.winMessage = document.getElementById('winMessage');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        
        this.init();
    }
    
    init() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.resetScoreBtn.addEventListener('click', () => this.resetScore());
        this.playAgainBtn.addEventListener('click', () => {
            this.winModal.classList.remove('show');
            this.resetGame();
        });
        
        this.updateDisplay();
    }
    
    handleCellClick(index) {
        if (!this.gameActive || this.board[index] !== '') return;
        
        this.board[index] = this.currentPlayer;
        this.renderBoard();
        
        if (this.checkWinner()) {
            this.endGame(`${this.currentPlayer} wins!`);
            this.scores[this.currentPlayer]++;
            this.updateScoreDisplay();
            this.showWinModal(`${this.currentPlayer} wins!`);
        } else if (this.board.every(cell => cell !== '')) {
            this.endGame("It's a draw!");
            this.showWinModal("It's a draw!");
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateDisplay();
        }
    }
    
    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.highlightWinningCells(pattern);
                return true;
            }
            return false;
        });
    }
    
    highlightWinningCells(pattern) {
        pattern.forEach(index => {
            this.cells[index].classList.add('winner');
        });
    }
    
    renderBoard() {
        this.cells.forEach((cell, index) => {
            cell.textContent = this.board[index];
            cell.className = 'cell';
            if (this.board[index]) {
                cell.classList.add(this.board[index].toLowerCase());
            }
        });
    }
    
    updateDisplay() {
        this.currentPlayerDisplay.innerHTML = `Current Player: <span class="highlight">${this.currentPlayer}</span>`;
        this.gameStatusDisplay.textContent = this.gameActive ? 'Click any square to start' : 'Game over';
    }
    
    updateScoreDisplay() {
        document.getElementById('scoreX').textContent = this.scores.X;
        document.getElementById('scoreO').textContent = this.scores.O;
    }
    
    endGame(message) {
        this.gameActive = false;
        this.gameStatusDisplay.textContent = message;
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        this.updateDisplay();
    }
    
    resetScore() {
        this.scores = { X: 0, O: 0 };
        this.updateScoreDisplay();
    }
    
    showWinModal(message) {
        this.winMessage.textContent = message;
        this.winModal.classList.add('show');
    }
}

// Add some modern animations
const style = document.createElement('style');
style.textContent = `
    .cell {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .cell.x, .cell.o {
        animation: popIn 0.3s ease;
    }
    
    @keyframes popIn {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
