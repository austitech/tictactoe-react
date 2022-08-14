import React from 'react';
import Square from './Square';


const handleClick = (state, i, setState) => {
    let history = state.history.slice(0, state.stepNumber + 1);
    let current = history[state.stepNumber];
    const squares = current.slice();
    console.log(state)

    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i] = state.xIsNext ? 'X' : 'O';
    setState({
        "squares": squares,
        "xIsNext": !state.xIsNext,
        "history": [...history, squares],
        "stepNumber": state.stepNumber + 1
    })
}

const calculateWinner = (squares) => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

const renderSquare = (state, i, setState) => {
    let board = state.history[state.stepNumber];

    return (
        <Square 
            value={board[i]}
            onClick={() => handleClick(state, i, setState)}
            />
    );
}

const Board = (props) => {
    const state = props.state;
    const setState = props.setState;

    return (
        <div>
            <div className="board-row">
                {renderSquare(state, 0, setState)}
                {renderSquare(state, 1, setState)}
                {renderSquare(state, 2, setState)}
            </div>
            <div className="board-row">
                {renderSquare(state, 3, setState)}
                {renderSquare(state, 4, setState)}
                {renderSquare(state, 5, setState)}
            </div>
            <div className="board-row">
                {renderSquare(state, 6, setState)}
                {renderSquare(state, 7, setState)}
                {renderSquare(state, 8, setState)}
            </div>
        </div>
    );
}

export default Board;