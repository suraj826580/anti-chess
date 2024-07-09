import React from "react";
import styled from "styled-components";

const PieceWrapper = styled.div`
  font-size: 30px;
  user-select: none;
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
