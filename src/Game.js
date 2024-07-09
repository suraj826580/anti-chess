import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Board from "./Board";

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatusMessage = styled.div`
  margin: 20px 0;
  font-size: 18px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 5px 10px;
  font-size: 16px;
`;

const initialBoard = [
  [
    { type: "rook", color: "black" },
    { type: "knight", color: "black" },
    { type: "bishop", color: "black" },
    { type: "queen", color: "black" },
    { type: "king", color: "black" },
    { type: "bishop", color: "black" },
    { type: "knight", color: "black" },
    { type: "rook", color: "black" },
  ],
  Array(8)
    .fill()
    .map(() => ({ type: "pawn", color: "black" })),
  ...Array(4).fill(Array(8).fill(null)),
  Array(8)
    .fill()
    .map(() => ({ type: "pawn", color: "white" })),
  [
    { type: "rook", color: "white" },
    { type: "knight", color: "white" },
    { type: "bishop", color: "white" },
    { type: "queen", color: "white" },
    { type: "king", color: "white" },
    { type: "bishop", color: "white" },
    { type: "knight", color: "white" },
    { type: "rook", color: "white" },
  ],
];

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("white");
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [status, setStatus] = useState("Select a piece to move");
  const [capturePositions, setCapturePositions] = useState([]);

  useEffect(() => {
    const newCapturePositions = findCapturePositions();
    setCapturePositions(newCapturePositions);

    if (newCapturePositions.length > 0) {
      setStatus(
        `${
          currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
        } must capture a piece`
      );
    } else {
      setStatus(
        `${
          currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
        }'s turn`
      );
    }
  }, [board, currentPlayer]);

  const findCapturePositions = () => {
    const positions = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === currentPlayer) {
          const moves = getValidMoves(row, col);
          const captureMoves = moves.filter(
            ([r, c]) => board[r][c] && board[r][c].color !== currentPlayer
          );
          if (captureMoves.length > 0) {
            positions.push([row, col]);
          }
        }
      }
    }
    return positions;
  };

  const getValidMoves = (row, col) => {
    const piece = board[row][col];
    if (!piece) return [];

    const moves = [];
    switch (piece.type) {
      case "pawn":
        moves.push(...getPawnMoves(row, col, piece.color));
        break;
      case "rook":
        moves.push(...getRookMoves(row, col));
        break;
      case "knight":
        moves.push(...getKnightMoves(row, col));
        break;
      case "bishop":
        moves.push(...getBishopMoves(row, col));
        break;
      case "queen":
        moves.push(...getRookMoves(row, col), ...getBishopMoves(row, col));
        break;
      case "king":
        moves.push(...getKingMoves(row, col));
        break;
    }

    return moves.filter(([r, c]) => r >= 0 && r < 8 && c >= 0 && c < 8);
  };

  const getPawnMoves = (row, col, color) => {
    const moves = [];
    const direction = color === "white" ? -1 : 1;

    if (!board[row + direction][col]) {
      moves.push([row + direction, col]);
    }

    if (
      col > 0 &&
      board[row + direction][col - 1] &&
      board[row + direction][col - 1].color !== color
    ) {
      moves.push([row + direction, col - 1]);
    }
    if (
      col < 7 &&
      board[row + direction][col + 1] &&
      board[row + direction][col + 1].color !== color
    ) {
      moves.push([row + direction, col + 1]);
    }

    return moves;
  };

  const getRookMoves = (row, col) => {
    const moves = [];
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        moves.push([x, y]);
        if (board[x][y]) break;
        x += dx;
        y += dy;
      }
    }

    return moves;
  };

  const getKnightMoves = (row, col) => {
    const moves = [
      [row - 2, col - 1],
      [row - 2, col + 1],
      [row - 1, col - 2],
      [row - 1, col + 2],
      [row + 1, col - 2],
      [row + 1, col + 2],
      [row + 2, col - 1],
      [row + 2, col + 1],
    ];

    return moves.filter(([r, c]) => r >= 0 && r < 8 && c >= 0 && c < 8);
  };

  const getBishopMoves = (row, col) => {
    const moves = [];
    const directions = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        moves.push([x, y]);
        if (board[x][y]) break;
        x += dx;
        y += dy;
      }
    }

    return moves;
  };

  const getKingMoves = (row, col) => {
    const moves = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          moves.push([newRow, newCol]);
        }
      }
    }
    return moves;
  };

  const handleSquareClick = (row, col) => {
    if (selectedPiece) {
      const [selectedRow, selectedCol] = selectedPiece;
      const piece = board[selectedRow][selectedCol];

      if (
        capturePositions.length > 0 &&
        !capturePositions.some(
          ([r, c]) => r === selectedRow && c === selectedCol
        )
      ) {
        setStatus("You must capture a piece");
        setSelectedPiece(null);
        return;
      }

      const validMoves = getValidMoves(selectedRow, selectedCol);
      const isValidMove = validMoves.some(([r, c]) => r === row && c === col);

      if (isValidMove) {
        const newBoard = board.map((row) => [...row]);
        newBoard[row][col] = piece;
        newBoard[selectedRow][selectedCol] = null;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
        setSelectedPiece(null);

        if (checkWinCondition(newBoard)) {
          setStatus(
            `${
              currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
            } wins!`
          );
        }
      } else {
        setStatus("Invalid move");
        setSelectedPiece(null);
      }
    } else {
      const piece = board[row][col];
      if (piece && piece.color === currentPlayer) {
        setSelectedPiece([row, col]);
        setStatus("Select a destination");
      } else {
        setStatus("Select a valid piece");
      }
    }
  };

  const checkWinCondition = (newBoard) => {
    return !newBoard
      .flat()
      .some((piece) => piece && piece.color === currentPlayer);
  };

  const handleQuit = () => {
    const winner = currentPlayer === "white" ? "Black" : "White";
    setStatus(`${winner} wins! ${currentPlayer} quit the game.`);
  };

  return (
    <GameWrapper>
      <h1>Anti-Chess</h1>
      <StatusMessage>{status}</StatusMessage>
      <Board board={board} onSquareClick={handleSquareClick} />
      <Button onClick={handleQuit}>Quit</Button>
    </GameWrapper>
  );
};

export default Game;
