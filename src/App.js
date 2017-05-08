import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let checkDone = false;
  let count = 0;
  for (let i = 0; i < 9;i++)
    if(squares[i]) count += 1;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return (count == 9 ? "Draw!" : null);
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Reset(props){
  const divStyle = {
    display: props.show,
  };

  return (
    <div style={divStyle}>
      <div>
        <button onClick={props.onClick}>
          Reset
        </button>
    </div>
    <div>
      <span> 
        Press this button to reset the game! 
        <hr></hr>
      </span>
    </div>
    </div>
  );
}

class Board extends Component {
  constructor() {
    super();

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      displayReset: 'none',
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    let newDisplay;

    if(squares[i] || calculateWinner(squares))
      return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });

    if (calculateWinner(squares)) {
      newDisplay = 'block';
      this.setState({
        displayReset: newDisplay,
      });
      return;
    } 
  }

  reset(){
    this.setState({
      squares: Array(9).fill(null),
      displayReset: 'none',
      xIsNext: true,
    })
  }

  renderReset(){
    return <Reset
      show={this.state.displayReset}
      onClick={() => this.reset()}
    />;
  }

  renderSquare(i) {
    return <Square
      value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        {this.renderReset()}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
