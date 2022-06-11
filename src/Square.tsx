interface ISquareProps {
  isRevealed: boolean;
  isFlagged: boolean;
  content: string;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
  handleRightClick: React.MouseEventHandler<HTMLDivElement>;
}

const CONTENT_TO_TEXT_COLOR: { [key: string]: string } = {
  1: 'text-blue-700',
  2: 'text-green-700',
  3: 'text-red-700',
  4: 'text-purple-700',
  5: 'text-purple-700',
  6: 'text-purple-700',
  7: 'text-purple-700',
  8: 'text-purple-700',
};

export default function Square({
  isRevealed,
  isFlagged,
  content,
  handleClick,
  handleRightClick,
}: ISquareProps) {
  return (
    <div
      className={`border-2 flex justify-center items-center font-bold text-lg select-none border-stone-100 ${
        CONTENT_TO_TEXT_COLOR[content]
      } ${
        isRevealed ? 'bg-stone-200' : 'bg-stone-400'
      } w-[30px] h-[30px] active:border-black`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {isFlagged ? '🚩' : isRevealed ? content : null}
    </div>
  );
}
