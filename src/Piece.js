import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PieceWrapper = styled.div`
  font-size: 40px;
  user-select: none;
  animation: ${fadeIn} 0.5s ease;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Piece = ({ type, color }) => {
  const getPieceSymbol = () => {
    switch (type) {
      case "pawn":
        return color === "white" ? "♙" : "♟";
      case "rook":
        return color === "white" ? "♖" : "♜";
      case "knight":
        return color === "white" ? "♘" : "♞";
      case "bishop":
        return color === "white" ? "♗" : "♝";
      case "queen":
        return color === "white" ? "♕" : "♛";
      case "king":
        return color === "white" ? "♔" : "♚";
      default:
        return null;
    }
  };

  return <PieceWrapper>{getPieceSymbol()}</PieceWrapper>;
};

export default Piece;
