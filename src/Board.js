// src/Board.js
import React from "react";
import styled from "styled-components";
import Square from "./Square";
import Piece from "./Piece";

const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 60px);
  grid-template-rows: repeat(8, 60px);
  border: 2px solid #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const Board = ({ board, onSquareClick, selectedPiece, validMoves }) => {
  return (
    <BoardWrapper>
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isSelected =
            selectedPiece &&
            selectedPiece[0] === rowIndex &&
            selectedPiece[1] === colIndex;
          const isValidMove =
            validMoves &&
            validMoves.some(([r, c]) => r === rowIndex && c === colIndex);
          const isCapture = isValidMove && board[rowIndex][colIndex] !== null;

          return (
            <Square
              key={`${rowIndex}-${colIndex}`}
              isBlack={(rowIndex + colIndex) % 2 === 1}
              onClick={() => onSquareClick(rowIndex, colIndex)}
              isSelected={isSelected}
              isValidMove={isValidMove}
              isCapture={isCapture}>
              {piece && <Piece type={piece.type} color={piece.color} />}
            </Square>
          );
        })
      )}
    </BoardWrapper>
  );
};

export default Board;
