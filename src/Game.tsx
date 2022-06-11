import React, { useEffect, useState } from 'react';
import { GameState } from '../types/gameState';
import Board from './Board';
import ControlPanel from './ControlPanel';

const ROWS = 16;
const COLUMNS = 30;
const MINES = 99;

const DIRS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export default function Game() {
  const [gameState, setGameState] = useState('PLAYING' as GameState);
  const [squareRevealed, setSquareRevealed] = useState(
    new Array(ROWS).fill(null).map(() => new Array(COLUMNS).fill(false))
  );
  const [squareContents, setSquareContents] = useState(
    new Array(ROWS).fill(null).map(() => new Array(COLUMNS).fill(''))
  );
  const [squareFlagged, setSquareFlagged] = useState(
    new Array(ROWS).fill(null).map(() => new Array(COLUMNS).fill(false))
  );
  const [flagCount, setFlagCount] = useState(0);
  const [startTime, setStartTime] = useState(new Date());

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (getHiddenSquareCount() === MINES) setGameState('WON');
  }, [squareRevealed]);

  const mineRandomSquare = (content: string[][]) => {
    const helper = () => {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLUMNS);
      return [r, c];
    };
    let [r, c] = helper();
    while (content[r][c] === '💣') [r, c] = helper();
    content[r][c] = '💣';
  };

  const isInBounds = (r: number, c: number) => {
    return r >= 0 && r < ROWS && c >= 0 && c < COLUMNS;
  };

  const getMineCount = (r: number, c: number, content: string[][]) => {
    let mineCount = 0;

    for (const [dr, dc] of DIRS) {
      const r1 = r + dr,
        c1 = c + dc;
      if (isInBounds(r1, c1) && content[r1][c1] == '💣') mineCount++;
    }

    return mineCount ? mineCount : '';
  };

  const getHiddenSquareCount = () => {
    let count = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLUMNS; c++) {
        if (!squareRevealed[r][c]) count++;
      }
    }
    return count;
  };

  const revealEmptySquares = (r: number, c: number) => {
    const visited = new Set();
    const dfs = (r: number, c: number) => {
      visited.add(`${r},${c}`);
      revealed[r][c] = true;
      if (squareContents[r][c] !== '') return;

      for (const [dr, dc] of DIRS) {
        const r1 = r + dr,
          c1 = c + dc;
        if (isInBounds(r1, c1) && !visited.has(`${r1},${c1}`)) dfs(r1, c1);
      }
    };
    const revealed = JSON.parse(JSON.stringify(squareRevealed));
    dfs(r, c);
    setSquareRevealed(revealed);
  };

  const resetGame = () => {
    const content = new Array(ROWS)
      .fill(null)
      .map(() => new Array(COLUMNS).fill(''));

    for (let i = 0; i < MINES; i++) mineRandomSquare(content);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLUMNS; c++) {
        if (content[r][c] !== '💣') content[r][c] = getMineCount(r, c, content);
      }
    }

    setSquareContents(content);
    setSquareRevealed(
      new Array(ROWS).fill(null).map(() => new Array(COLUMNS).fill(false))
    );
    setSquareFlagged(
      new Array(ROWS).fill(null).map(() => new Array(COLUMNS).fill(false))
    );
    setGameState('PLAYING');
    setFlagCount(0);
    setStartTime(new Date());
  };

  const handleClick = (e: React.MouseEvent, r: number, c: number) => {
    if (squareRevealed[r][c] || gameState !== 'PLAYING' || squareFlagged[r][c])
      return;

    setSquareRevealed((oldState) => {
      const newState = JSON.parse(JSON.stringify(oldState));
      newState[r][c] = true;
      return newState;
    });

    if (squareContents[r][c] === '💣') setGameState('LOST');
    if (squareContents[r][c] === '') revealEmptySquares(r, c);
  };

  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (squareRevealed[r][c] || gameState !== 'PLAYING') return;

    setFlagCount((oldState) => {
      if (squareFlagged[r][c]) return oldState - 1;
      else return oldState + 1;
    });
    setSquareFlagged((oldState) => {
      const newState = JSON.parse(JSON.stringify(oldState));
      newState[r][c] = !newState[r][c];
      return newState;
    });
  };

  const handleReset = (e: React.MouseEvent) => {
    resetGame();
  };

  return (
    <div className="mx-auto flex flex-col justify-center border-2 bg-white my-8 rounded">
      <h1 className="text-3xl my-6 text-center">Minesweeper</h1>
      <ControlPanel
        gameState={gameState}
        flagCount={flagCount}
        mines={MINES}
        startTime={startTime}
        handleReset={handleReset}
      />

      <Board
        rows={ROWS}
        columns={COLUMNS}
        squareRevealed={squareRevealed}
        squareFlagged={squareFlagged}
        squareContents={squareContents}
        handleClick={handleClick}
        handleRightClick={handleRightClick}
      />
    </div>
  );
}
