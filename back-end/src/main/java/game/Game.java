package game;

public class Game {
    private String[][] board; // Game board 3x3
    private String currentPlayer; // "X" or "O"
    private String winner; // "X", "O", or null if no winner

    public Game() {
        board = new String[3][3]; // Initialize a 3x3 board
        currentPlayer = "X"; // X starts first
        winner = null; // No winner initially
    }

    public String[][] getBoard() {
        return board;
    }

    public String getCurrentPlayer() {
        return currentPlayer;
    }

    public String getWinner() {
        return winner;
    }

    public Game play(int x, int y) {
        if (x >= 0 && x < 3 && y >= 0 && y < 3 && board[x][y] == null) {
            board[x][y] = currentPlayer; // Place current player's mark
            checkWinner();
            switchPlayer(); // After a move, switch to the other player
        }
        return this;
    }

    private void checkWinner() {
        // Check rows, columns, and diagonals for a winner
        for (int i = 0; i < 3; i++) {
            // Check rows
            if (board[i][0] != null && board[i][0].equals(board[i][1]) && board[i][1].equals(board[i][2])) {
                winner = board[i][0]; // Set winner
                return;
            }
            // Check columns
            if (board[0][i] != null && board[0][i].equals(board[1][i]) && board[1][i].equals(board[2][i])) {
                winner = board[0][i]; // Set winner
                return;
            }
        }
        // Check diagonals
        if (board[0][0] != null && board[0][0].equals(board[1][1]) && board[1][1].equals(board[2][2])) {
            winner = board[0][0]; // Set winner
            return;
        }
        if (board[0][2] != null && board[0][2].equals(board[1][1]) && board[1][1].equals(board[2][0])) {
            winner = board[0][2]; // Set winner
            return;
        }
    }

    private void switchPlayer() {
        currentPlayer = currentPlayer.equals("X") ? "O" : "X"; // Switch player
    }
}
