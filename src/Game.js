import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Board from "./Board";
import MoveHistory from "./MoveHistory";
import GameInfo from "./GameInfo";

const GameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
`;

const GameBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const StatusMessage = styled.div`
  margin: 20px 0;
  font-size: 18px;
  font-weight: bold;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
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
  const [validMoves, setValidMoves] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]);
  const [enPassantTarget, setEnPassantTarget] = useState(null);
  const [whiteCanCastleKingside, setWhiteCanCastleKingside] = useState(true);
  const [whiteCanCastleQueenside, setWhiteCanCastleQueenside] = useState(true);
  const [blackCanCastleKingside, setBlackCanCastleKingside] = useState(true);
  const [blackCanCastleQueenside, setBlackCanCastleQueenside] = useState(true);

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
    const startRow = color === "white" ? 6 : 1;

    if (!board[row + direction][col]) {
      moves.push([row + direction, col]);
      if (row === startRow && !board[row + 2 * direction][col]) {
        moves.push([row + 2 * direction, col]);
      }
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

    if (enPassantTarget) {
      const [epRow, epCol] = enPassantTarget;
      if (Math.abs(col - epCol) === 1 && row + direction === epRow) {
        moves.push([epRow, epCol]);
      }
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

    if (currentPlayer === "white") {
      if (
        whiteCanCastleKingside &&
        board[7][5] === null &&
        board[7][6] === null
      ) {
        moves.push([7, 6]);
      }
      if (
        whiteCanCastleQueenside &&
        board[7][1] === null &&
        board[7][2] === null &&
        board[7][3] === null
      ) {
        moves.push([7, 2]);
      }
    } else {
      if (
        blackCanCastleKingside &&
        board[0][5] === null &&
        board[0][6] === null
      ) {
        moves.push([0, 6]);
      }
      if (
        blackCanCastleQueenside &&
        board[0][1] === null &&
        board[0][2] === null &&
        board[0][3] === null
      ) {
        moves.push([0, 2]);
      }
    }

    return moves;
  };

  const checkWinCondition = (board) => {
    const currentPlayerPieces = board
      .flat()
      .filter((piece) => piece && piece.color === currentPlayer);
    return currentPlayerPieces.length === 0;
  };

  const checkStalemate = () => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === currentPlayer) {
          const moves = getValidMoves(row, col);
          if (moves.length > 0) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const promotePawn = (row, col) => {
    const color = board[row][col].color;
    const promotionPieces = ["queen", "rook", "bishop", "knight"];
    const newPiece =
      promotionPieces[Math.floor(Math.random() * promotionPieces.length)];
    const newBoard = [...board];
    newBoard[row][col] = { type: newPiece, color: color };
    setBoard(newBoard);
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
        setValidMoves([]);
        return;
      }

      const isValidMove = validMoves.some(([r, c]) => r === row && c === col);

      if (isValidMove) {
        const newBoard = board.map((row) => [...row]);
        newBoard[row][col] = piece;
        newBoard[selectedRow][selectedCol] = null;

        if (piece.type === "king" && Math.abs(selectedCol - col) === 2) {
          const rookCol = col === 6 ? 7 : 0;
          const newRookCol = col === 6 ? 5 : 3;
          newBoard[row][newRookCol] = newBoard[row][rookCol];
          newBoard[row][rookCol] = null;
        }

        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
        setSelectedPiece(null);
        setValidMoves([]);

        const moveNotation = `${piece.type} ${String.fromCharCode(
          97 + selectedCol
        )}${8 - selectedRow} to ${String.fromCharCode(97 + col)}${8 - row}`;
        setMoveHistory([...moveHistory, moveNotation]);

        if (piece.type === "pawn" && (row === 0 || row === 7)) {
          promotePawn(row, col);
        }

        if (piece.type === "pawn" && Math.abs(selectedRow - row) === 2) {
          setEnPassantTarget([row, col]);
        } else {
          setEnPassantTarget(null);
        }

        if (piece.type === "king" || piece.type === "rook") {
          if (currentPlayer === "white") {
            setWhiteCanCastleKingside(false);
            setWhiteCanCastleQueenside(false);
          } else {
            setBlackCanCastleKingside(false);
            setBlackCanCastleQueenside(false);
          }
        }

        if (checkWinCondition(newBoard)) {
          setStatus(
            `${
              currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
            } wins!`
          );
        } else if (checkStalemate()) {
          setStatus(
            `${
              currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
            } wins by stalemate!`
          );
        }
      } else {
        setStatus("Invalid move");
        setSelectedPiece(null);
        setValidMoves([]);
      }
    } else {
      const piece = board[row][col];
      if (piece && piece.color === currentPlayer) {
        setSelectedPiece([row, col]);
        setStatus("Select a destination");
        setValidMoves(getValidMoves(row, col));
      } else {
        setStatus("Select a valid piece");
      }
    }
  };

  const handleQuit = () => {
    const winner = currentPlayer === "white" ? "Black" : "White";
    setStatus(`${winner} wins! ${currentPlayer} quit the game.`);
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setCurrentPlayer("white");
    setSelectedPiece(null);
    setStatus("Select a piece to move");
    setCapturePositions([]);
    setValidMoves([]);
    setMoveHistory([]);
    setEnPassantTarget(null);
    setWhiteCanCastleKingside(true);
    setWhiteCanCastleQueenside(true);
    setBlackCanCastleKingside(true);
    setBlackCanCastleQueenside(true);
  };

  const countPieces = (color) => {
    return board.flat().filter((piece) => piece && piece.color === color)
      .length;
  };

  return (
    <GameWrapper>
      <GameBoard>
        <h1>Anti-Chess</h1>
        <StatusMessage>{status}</StatusMessage>
        <Board
          board={board}
          onSquareClick={handleSquareClick}
          selectedPiece={selectedPiece}
          validMoves={validMoves}
        />
        <Button onClick={handleQuit}>Quit</Button>
        <Button onClick={handleReset}>Reset Game</Button>
      </GameBoard>
      <SidePanel>
        <GameInfo
          currentPlayer={currentPlayer}
          whitePieces={countPieces("white")}
          blackPieces={countPieces("black")}
        />
        <MoveHistory moves={moveHistory} />
      </SidePanel>
    </GameWrapper>
  );
};

export default Game;
