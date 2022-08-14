import React, { useState } from 'react';
import Board from './Board';


const jumpTo = (state, setState, step) => {
    setState({
        "history": state.history,
        "stepNumber": step,
        "xIsNext": (step % 2 === 0)
    });
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

const Game = () => {
    const [state, setState] = useState({
        squares: Array(9).fill(null),
        xIsNext: true,
        history: [Array(9).fill(null)],
        stepNumber: 0
    });

    let current = state.history[state.stepNumber];

    const winner = calculateWinner(current);

    let status;

    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
    }
    
    return (
        <div className="game">
            <div className="game-board">
                <Board state={state} setState={setState} />
            </div>
            <div className="game-info">
                <div>{ status }</div>
                <ol>
                    {
                        state.history.map((step, move) => {
                            const desc = move ?
                                "Go to move #" + move :
                                "Go to game start";
                            return (
                                <li key={step}>
                                    <button onClick={() => jumpTo(state, setState, move)}>{desc}</button>
                                </li>
                            );
                        })
                    }
                </ol>
            </div>
        </div>
    )
}

export default Game;
