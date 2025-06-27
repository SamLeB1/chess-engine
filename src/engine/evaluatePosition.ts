import { getValidMovesCount } from "../utils/getValidMoves.ts";
import { isInCheck } from "../utils/isValidMove.ts";
import type { Position } from "../types.ts";

export default function evaluatePosition(position: Position) {
  const { board, turn, castlingRights, enPassantTarget } = position;

  const validMovesCount = getValidMovesCount(
    board,
    turn,
    castlingRights[turn],
    enPassantTarget,
  );
  if (validMovesCount === 0) {
    if (isInCheck(board, turn)) return turn === "w" ? -Infinity : Infinity;
    else return 0;
  }

  let wValue = 0;
  let bValue = 0;
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece)
        switch (piece[1]) {
          case "0":
            piece[0] === "w" ? (wValue += 1) : (bValue += 1);
            break;
          case "1":
            piece[0] === "w" ? (wValue += 5) : (bValue += 5);
            break;
          case "2":
            piece[0] === "w" ? (wValue += 3) : (bValue += 3);
            break;
          case "3":
            piece[0] === "w" ? (wValue += 3) : (bValue += 3);
            break;
          case "4":
            piece[0] === "w" ? (wValue += 9) : (bValue += 9);
        }
    }
  return wValue - bValue;
}
