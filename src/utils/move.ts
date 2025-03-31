import { getDistance, getDirection } from "./index.ts";
import type { Index, Piece } from "../types.ts";

export function getEnPassantTarget(
  board: (Piece | null)[][],
  start: Index,
  end: Index,
) {
  const piece = board[start.i][start.j];
  if (!piece || piece[1] !== "0") return null;
  const distance = getDistance(start, end);
  if (distance.x !== 0 || distance.y !== 2) return null;
  const direction = getDirection(start, end);
  return { i: start.i + direction.y, j: start.j };
}

export function isEnPassant(
  board: (Piece | null)[][],
  start: Index,
  end: Index,
) {
  const piece = board[start.i][start.j];
  const distance = getDistance(start, end);
  if (piece && piece[1] === "0" && distance.x === 1 && !board[end.i][end.j])
    return true;
  else return false;
}

export function isCastle(board: (Piece | null)[][], start: Index, end: Index) {
  const piece = board[start.i][start.j];
  const distance = getDistance(start, end);
  if (piece && piece[1] === "5" && distance.x === 2) return true;
  else return false;
}

export function isHalfmoveClockReset(
  board: (Piece | null)[][],
  start: Index,
  end: Index,
) {
  const piece = board[start.i][start.j];
  if ((piece && piece[1] === "0") || board[end.i][end.j]) return true;
  else return false;
}

export function isPromotion(
  board: (Piece | null)[][],
  turn: "w" | "b",
  start: Index,
  end: Index,
) {
  const piece = board[start.i][start.j];
  if (!piece || piece[1] !== "0") return false;
  const lastRow = turn === "w" ? 0 : 7;
  if (lastRow !== end.i) return false;
  return true;
}
