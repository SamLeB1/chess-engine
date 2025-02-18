import { Index, Piece } from "./types.ts";

function getMovement(start: Index, end: Index) {
  return {
    x: end.j - start.j,
    y: end.i - start.i,
  };
}

function isValidMovePawn(
  board: (Piece | null)[][],
  turn: "w" | "b",
  start: Index,
  end: Index,
) {
  const movement = getMovement(start, end);
  const endPiece = board[end.i][end.j];
  const direction = turn === "w" ? -1 : 1;
  const startRow = turn === "w" ? 6 : 1;
  if (movement.x === 0 && movement.y === direction) {
    if (!endPiece) return true;
  }
  if (
    movement.x === 0 &&
    movement.y === 2 * direction &&
    start.i === startRow
  ) {
    if (!board[start.i + direction][start.j] && !endPiece) return true;
  }
  if (Math.abs(movement.x) === 1 && movement.y === direction) {
    if (endPiece && endPiece[0] !== turn) return true;
  }
  return false;
}

export function isValidMove(
  board: (Piece | null)[][],
  turn: "w" | "b",
  start: Index,
  end: Index,
) {
  if (start.i === end.i && start.j === end.j) return false;
  const piece = board[start.i][start.j];
  if (!piece) return false;
  if (piece[0] !== turn) return false;
  switch (piece[1]) {
    case "0":
      return isValidMovePawn(board, turn, start, end);
    case "1":
      return false;
    case "2":
      return false;
    case "3":
      return false;
    case "4":
      return false;
    case "5":
      return false;
    default:
      return false;
  }
}

export function getValidMoves(
  board: (Piece | null)[][],
  turn: "w" | "b",
  start: Index,
) {
  let validMoves: Index[] = [];
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      if (isValidMove(board, turn, start, { i, j })) validMoves.push({ i, j });
  return validMoves;
}
