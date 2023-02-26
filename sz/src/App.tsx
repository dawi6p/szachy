import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import ChessInstance as ChessInstance from 'chess.js';
const Chess = require("chess.js");

const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );

  return (
    <div className="flex-center">
      <h1>Random Chess</h1>
      <Chessboard
        width={400}
        position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      />
    </div>
  );
};

export default App;