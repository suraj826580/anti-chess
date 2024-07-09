// src/GameInfo.js
import React from "react";
import styled from "styled-components";

const GameInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PlayerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const PlayerName = styled.span`
  font-weight: bold;
  color: ${(props) => props.color};
`;

const PieceCount = styled.span`
  font-weight: bold;
`;

const GameInfo = ({ currentPlayer, whitePieces, blackPieces }) => {
  return (
    <GameInfoWrapper>
      <h2>Game Info</h2>
      <PlayerInfo>
        <PlayerName color="black">Black</PlayerName>
        <PieceCount>{blackPieces}</PieceCount>
      </PlayerInfo>
      <PlayerInfo>
        <PlayerName color="#cd7f32">White</PlayerName>
        <PieceCount>{whitePieces}</PieceCount>
      </PlayerInfo>
      <div>
        Current Turn:{" "}
        <PlayerName color={currentPlayer === "white" ? "#cd7f32" : "black"}>
          {currentPlayer}
        </PlayerName>
      </div>
    </GameInfoWrapper>
  );
};

export default GameInfo;
