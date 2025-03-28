import { getDirection } from "./index.ts";
import {
  getEnPassantTarget,
  isEnPassant,
  isCastle,
  isHalfmoveClockReset,
} from "./move.ts";
import type { Move, Piece, Position } from "../types.ts";

export default function getUpdatedPosition(
  position: Position,
  move: Move,
): Position {
  const { start, end, promotion } = move;
  let updatedBoard: (Piece | null)[][] = JSON.parse(
    JSON.stringify(position.board),
  );
  updatedBoard[end.i][end.j] = updatedBoard[start.i][start.j];
  updatedBoard[start.i][start.j] = null;
  if (promotion)
    updatedBoard[end.i][end.j] = (position.turn + promotion) as Piece;
  if (isEnPassant(position.board, start, end)) {
    const direction = getDirection(start, end);
    updatedBoard[start.i][start.j + direction.x] = null;
  }
  if (isCastle(position.board, start, end)) {
    const direction = getDirection(start, end);
    if (direction.x === 1) {
      updatedBoard[start.i][5] = updatedBoard[start.i][7];
      updatedBoard[start.i][7] = null;
    } else {
      updatedBoard[start.i][3] = updatedBoard[start.i][0];
      updatedBoard[start.i][0] = null;
    }
  }
  return {
    board: updatedBoard,
    turn: position.turn === "w" ? "b" : "w",
    castlingRights: position.castlingRights,
    enPassantTarget: getEnPassantTarget(position.board, start, end),
    halfmoveClock: isHalfmoveClockReset(position.board, start, end)
      ? 0
      : position.halfmoveClock + 1,
    fullmoveNumber:
      position.turn === "w"
        ? position.fullmoveNumber
        : position.fullmoveNumber + 1,
  };
}
