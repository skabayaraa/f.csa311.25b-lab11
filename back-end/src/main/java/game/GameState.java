package game;

public class GameState {
    private String[][] board;
    private String currentPlayer;
    private String winner;

    public GameState(Game game) {
        this.board = game.getBoard();
        this.currentPlayer = game.getCurrentPlayer().toString();
        this.winner = game.getWinner() == null ? null : game.getWinner().toString();
    }

    public static GameState forGame(Game game) {
        return new GameState(game);
    }

    @Override
    public String toString() {
        StringBuilder state = new StringBuilder();
        for (String[] row : board) {
            for (String cell : row) {
                state.append(cell == null ? "-" : cell).append(" ");
            }
            state.append("\n");
        }
        state.append("\nCurrent Player: ").append(currentPlayer).append("\n");

        if (winner != null) {
            state.append("Winner: ").append(winner);
        } else {
            state.append("No winner yet.");
        }

        return state.toString();
    }
}
