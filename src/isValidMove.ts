import { Index, Piece } from "./types.ts";

export default function isValidMove(
  board: (Piece | null)[][],
  turn: "w" | "b",
  start: Index,
  end: Index,
) {
  const piece = board[start.i][start.j];
  if (!piece) return false;
  if (piece[0] !== turn) return false;
  switch (piece[1]) {
    case "0":
      return false;
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
