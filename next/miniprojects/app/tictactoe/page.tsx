"use client";
import BackButton from "@/components/BackButton";
import Square from "./components/Square";
import { useState } from "react";

export function Board({ turn, reset, onPlay, isXturn, squares }) {
  const onClick = (i) => {
    if (winner) {
      console.log("win");
      return;
    }
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (isXturn) {
      nextSquares[i] = "x";
    } else {
      nextSquares[i] = "o";
    }
    onPlay(nextSquares);
    turn++;
  };
  const winner = calculateWinner(squares);

  return (
    <div>
      <header>
        <nav>
          <BackButton />
        </nav>
      </header>
      <main>
        <div className="first-row" style={{ display: "flex" }}>
          <Square value={squares[0]} handleClick={() => onClick(0)} />
          <Square value={squares[1]} handleClick={() => onClick(1)} />
          <Square value={squares[2]} handleClick={() => onClick(2)} />
        </div>
        <div className="first-row" style={{ display: "flex" }}>
          <Square value={squares[3]} handleClick={() => onClick(3)} />
          <Square value={squares[4]} handleClick={() => onClick(4)} />
          <Square value={squares[5]} handleClick={() => onClick(5)} />
        </div>
        <div className="first-row" style={{ display: "flex" }}>
          <Square value={squares[6]} handleClick={() => onClick(6)} />
          <Square value={squares[7]} handleClick={() => onClick(7)} />
          <Square value={squares[8]} handleClick={() => onClick(8)} />
        </div>
        <div className="clear">
          <button onClick={reset}>reset</button>
        </div>
      </main>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isXturn, setIsXturn] = useState(true);
  const [currentTurn, setcurrentTurn] = useState(0);

  const currentMove = history[currentTurn];
  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentTurn + 1), nextSquares];
    setHistory(nextHistory);
    setcurrentTurn(nextHistory.length - 1);
    setIsXturn(!isXturn);
  };
  console.log(history);
  const reset = () => {
    setHistory([Array(9).fill(null)]);
  };
  const timeTravel = (index) => {
    setcurrentTurn(index);
    setIsXturn(index % 2 === 0);
    console.log(isXturn);
  };
  const moves = history.map((e, index) => (
    <button key={index} onClick={() => timeTravel(index)}>
      turn: {index}
    </button>
  ));

  return (
    <>
      <Board
        reset={reset}
        onPlay={handlePlay}
        squares={currentMove}
        isXturn={isXturn}
        turn={currentTurn}
      />
      {moves}
    </>
  );
}

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(squares[a]);
      return squares[a];
    }
  }
  return null;
}
