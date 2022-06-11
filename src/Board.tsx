import Square from './Square';

interface IBoardProps {
  rows: number;
  columns: number;
  squareRevealed: boolean[][];
  squareFlagged: boolean[][];
  squareContents: string[][];
  handleClick: (e: React.MouseEvent, r: number, c: number) => void;
  handleRightClick: (e: React.MouseEvent, r: number, c: number) => void;
}

export default function Board({
  rows,
  columns,
  squareRevealed,
  squareFlagged,
  squareContents,
  handleClick,
  handleRightClick,
}: IBoardProps) {
  const squares = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      squares.push(
        <Square
          key={`${r},${c}`}
          isRevealed={squareRevealed[r][c]}
          isFlagged={squareFlagged[r][c]}
          content={squareContents[r][c]}
          handleClick={(e) => handleClick(e, r, c)}
          handleRightClick={(e) => handleRightClick(e, r, c)}
        />
      );
    }
  }

  return (
    <div className={`mb-12 grid grid-cols-30 border-4 mx-auto max-w-fit`}>
      {squares}
    </div>
  );
}
