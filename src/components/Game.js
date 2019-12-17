import React from "react";
import "./Game.css";
import {HEIGHT, WIDTH, CELL_SIZE, Cell} from "./Cell"

class Game extends React.Component {
  state = {cells: [],};

  constructor(props) {
    super(props);
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = this.makeEmptyBoard();
    this.boardRef = React.createRef();
  }
  
  // Create an empty board
  makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }

  // Create cells from this.board
  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({x, y});
        }
      }
    }
    return cells;
  }

  getElementOffset() {
    const rect = this.boardRef.current.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      x: (rect.left + window.pageXOffset) - doc.clientLeft,
      y: (rect.top + window.pageYOffset) - doc.clientTop,
    };
  }

  handleClick = (event) => {
    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;

    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);

    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x];
    }
    this.setState({cells: this.makeCells()});
  };

  render() {
    const {cells} = this.state;
    return (
        <div>
          <div className="Board"
               style={{
                 width: WIDTH,
                 height: HEIGHT,
                 backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
               }}
               onClick={this.handleClick}
               ref={this.boardRef}
          >
            {cells.map(cell => (
                <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
            ))}
          </div>
        </div>
    );
  }
}

export default Game;