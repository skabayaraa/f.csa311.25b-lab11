import React from 'react';
import './App.css'; // import the css file to enable your styles.
import { GameState, Cell } from './game';
import BoardCell from './Cell';

/**
 * Define the type of the props field for a React component
 */
interface Props { }

/**
 * Using generics to specify the type of props and state.
 * props and state is a special field in a React component.
 * React will keep track of the value of props and state.
 * Any time there's a change to their values, React will
 * automatically update (not fully re-render) the HTML needed.
 * 
 * props and state are similar in the sense that they manage
 * the data of this component. A change to their values will
 * cause the view (HTML) to change accordingly.
 * 
 * Usually, props is passed and changed by the parent component;
 * state is the internal value of the component and managed by
 * the component itself.
 */
class App extends React.Component<Props, GameState> {
  private initialized: boolean = false;
  private history: GameState[] = []; // Stores history for undo functionality
  state: any;

  /**
   * @param props has type Props
   */
  constructor(props: Props) {
    super(props)
    this.state = { cells: [] }
  }

  /**
   * Starts a new game by resetting the board.
   */
  newGame = async () => {
    const response = await fetch('/newgame');
    const json = await response.json();
    this.setState({ cells: json['cells'] });
    this.history = []; // Reset the history when starting a new game
  }

  /**
   * play will generate an anonymous function that the component
   * can bind with.
   * @param x 
   * @param y 
   * @returns 
   */
  play(x: number, y: number): React.MouseEventHandler {
    return async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      const response = await fetch(`/play?x=${x}&y=${y}`);
      const json = await response.json();
      const newState = json['cells'];
      this.history.push({ cells: [...this.state.cells] }); // Save the current state for undo
      this.setState({ cells: newState });
    }
  }
  setState(arg0: { cells: any; }) {
    throw new Error('Method not implemented.');
  }

  /**
   * Handles the undo action by reverting to the last state
   */
  undo = () => {
    if (this.history.length > 0) {
      const previousState = this.history.pop(); // Get the last saved state
      this.setState({ cells: previousState!.cells }); // Revert to the previous state
    }
  }

  createCell(cell: Cell, index: number): React.ReactNode {
    if (cell.playable)
      return (
        <div key={index}>
          <a href='/' onClick={this.play(cell.x, cell.y)}>
            <BoardCell cell={cell}></BoardCell>
          </a>
        </div>
      )
    else
      return (
        <div key={index}><BoardCell cell={cell}></BoardCell></div>
      )
  }

  /**
   * This function will call after the HTML is rendered.
   * We update the initial state by creating a new game.
   * @see https://reactjs.org/docs/react-component.html#componentdidmount
   */
  componentDidMount(): void {
    if (!this.initialized) {
      this.newGame();
      this.initialized = true;
    }
  }

  /**
   * The only method you must define in a React.Component subclass.
   * @returns the React element via JSX.
   * @see https://reactjs.org/docs/react-component.html
   */
  render(): React.ReactNode {
    return (
      <div>
        <div id="board">
          {this.state.cells.map((cell: Cell, i: number) => this.createCell(cell, i))}
        </div>
        <div id="bottombar">
          <button onClick={this.newGame}>New Game</button>
          <button onClick={this.undo}>Undo</button>
        </div>
      </div>
    );
  }
}

export default App;
