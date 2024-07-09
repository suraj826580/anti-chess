import React from "react";
import styled from "styled-components";
import Square from "./Square";
import Piece from "./Piece";

const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 50px);
  grid-template-rows: repeat(8, 50px);
  border: 2px solid #333;
`;

const Board = ({ board, onSquareClick }) => {
  return (
    <BoardWrapper>
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            isBlack={(rowIndex + colIndex) % 2 === 1}
            onClick={() => onSquareClick(rowIndex, colIndex)}>
            {piece && <Piece type={piece.type} color={piece.color} />}
          </Square>
        ))
      )}
    </BoardWrapper>
  );
};

export default Board;
