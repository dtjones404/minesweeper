import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GameState } from '../types/gameState';
import {
  faFaceAngry,
  faFaceGrin,
  faFaceSmile,
} from '@fortawesome/free-solid-svg-icons';
import Timer from './Timer';

interface IControlPanelProps {
  gameState: GameState;
  flagCount: number;
  mines: number;
  startTime: Date;
  handleReset: (e: React.MouseEvent) => void;
}

export default function ControlPanel({
  gameState,
  flagCount,
  mines,
  startTime,
  handleReset,
}: IControlPanelProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-stretch gap-8">
        <div className="bg-stone-800 w-16 flex justify-center items-center p-2 rounded text-white text-2xl">
          {mines - flagCount}
        </div>
        <button
          className="bg-stone-800 border-2 hover:border-yellow-400 transition-colors p-2 rounded"
          onClick={handleReset}
        >
          <FontAwesomeIcon
            className="text-4xl text-yellow-400"
            icon={
              gameState === 'PLAYING'
                ? faFaceSmile
                : gameState === 'WON'
                ? faFaceGrin
                : faFaceAngry
            }
          />
        </button>

        <Timer startTime={startTime} gameState={gameState} />
      </div>
      {
        <h2
          className={`text-center text-3xl text-red-600 ${
            gameState !== 'PLAYING' ? 'visible' : 'invisible'
          }`}
        >
          {gameState === 'LOST' ? 'GAME OVER' : 'YOU WIN!'}
        </h2>
      }
    </div>
  );
}
