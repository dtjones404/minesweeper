import { useState, useEffect } from 'react';
import { GameState } from '../types/gameState';

interface ITimerProps {
  startTime: Date;
  gameState: GameState;
}

export default function Timer({ startTime, gameState }: ITimerProps) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (gameState === 'PLAYING') {
      const interval = setInterval(
        () =>
          setSeconds(
            Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
          ),
        1000
      );

      return () => clearInterval(interval);
    }
  }, [startTime, gameState]);
  return (
    <div className="bg-stone-800 w-16 flex justify-center items-center p-2 rounded text-white text-2xl">
      {seconds}
    </div>
  );
}
