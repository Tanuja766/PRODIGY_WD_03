import React from 'react';
import { useGame } from './hooks/useGame';
import GameBoard from './components/GameBoard';
import GameStatus from './components/GameStatus';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';

function App() {
  const { gameState, makeMove, resetGame, changeMode, resetScores } = useGame();
  
  const isGameActive = gameState.status === 'playing';
  const isAITurn = gameState.mode === 'ai' && gameState.currentPlayer === 'O' && isGameActive;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] animate-pulse"></div>
      
      <div className="relative z-10 max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Tic-Tac-Toe
          </h1>
          <p className="text-white/80 text-lg">
            The Ultimate Strategy Game
          </p>
        </div>

        <ScoreBoard scores={gameState.scores} mode={gameState.mode} />
        
        <GameStatus 
          status={gameState.status}
          currentPlayer={gameState.currentPlayer}
          winner={gameState.winner}
          mode={gameState.mode}
        />

        <div className="flex justify-center">
          <GameBoard
            board={gameState.board}
            onCellClick={makeMove}
            winningCells={gameState.winningCells}
            disabled={!isGameActive || isAITurn}
          />
        </div>

        <GameControls
          mode={gameState.mode}
          onModeChange={changeMode}
          onReset={resetGame}
          onResetScores={resetScores}
        />

        <div className="text-center text-white/60 text-sm">
          {gameState.mode === 'ai' ? (
            <p>Challenge the AI and test your strategy skills!</p>
          ) : (
            <p>Take turns and be the first to get three in a row!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;