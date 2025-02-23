import { Index, Piece } from "./types.ts";

function getMovement(start: Index, end: Index) {
  return {
    x: end.j - start.j,
    y: end.i - start.i,
  };
}

function getDistance(start: Index, end: Index) {
  return {
    x: Math.abs(end.j - start.j),
    y: Math.abs(end.i - start.i),
  };
}

function getDirection(start: Index, end: Index) {
  const movement = getMovement(start, end);
  return {
    x: movement.x === 0 ? 0 : movement.x / Math.abs(movement.x),
    y: movement.y === 0 ? 0 : movement.y / Math.abs(movement.y),
  };
}

function isEmptyDiagonal(board: (Piece | null)[][], start: Index, end: Index) {
  const distance = getDistance(start, end);
  if (distance.x !== distance.y) return false;
  if (distance.x < 2) return true;
  const direction = getDirection(start, end);
  for (let i = 1; i < distance.x; i++)
    if (board[start.i + i * direction.y][start.j + i * direction.x])
      return false;
  return true;
}

function isEmptyRowOrCol(board: (Piece | null)[][], start: Index, end: Index) {
  const distance = getDistance(start, end);
  if (distance.x !== 0 && distance.y !== 0) return false;
  const totalDistance = distance.x + distance.y;
  if (totalDistance < 2) return true;
  const direction = getDirection(start, end);
  for (let i = 1; i < totalDistance; i++)
    if (board[start.i + i * direction.y][start.j + i * direction.x])
      return false;
  return true;
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

function isValidMoveKnight(
  board: (Piece | null)[][],
  turn: "w" | "b",
  start: Index,
  end: Index,
) {
  const distance = getDistance(start, end);
  if (
    (distance.x === 1 && distance.y === 2) ||
    (distance.x === 2 && distance.y === 1)
  ) {
    const endPiece = board[end.i][end.j];
    if (!endPiece || endPiece[0] !== turn) return true;
  }
  return false;
}

function isValidMoveBishop(
  board: (Piece | null)[][],
  turn: "w" | "b",
  start: Index,
  end: Index,
) {
  const endPiece = board[end.i][end.j];
  if ((!endPiece || endPiece[0] !== turn) && isEmptyDiagonal(board, start, end))
    return true;
  else return false;
}

function isValidMoveRook(
  board: (Piece | null)[][],
  turn: "w" | "b",
  start: Index,
  end: Index,
) {
  const endPiece = board[end.i][end.j];
  if ((!endPiece || endPiece[0] !== turn) && isEmptyRowOrCol(board, start, end))
    return true;
  else return false;
}

function isValidMoveQueen(
  board: (Piece | null)[][],
  turn: "w" | "b",
  start: Index,
  end: Index,
) {
  const endPiece = board[end.i][end.j];
  if (
    (!endPiece || endPiece[0] !== turn) &&
    (isEmptyDiagonal(board, start, end) || isEmptyRowOrCol(board, start, end))
  )
    return true;
  else return false;
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
      return isValidMoveRook(board, turn, start, end);
    case "2":
      return isValidMoveKnight(board, turn, start, end);
    case "3":
      return isValidMoveBishop(board, turn, start, end);
    case "4":
      return isValidMoveQueen(board, turn, start, end);
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
