import { getDirection } from "./index.ts";
import {
  getEnPassantTarget,
  isEnPassant,
  isCastle,
  isHalfmoveClockReset,
} from "./move.ts";
import type { Move, Piece, CastlingRights, Position } from "../types.ts";

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
  let castlingRights: CastlingRights = JSON.parse(
    JSON.stringify(position.castlingRights),
  );
  let row = position.turn === "w" ? 7 : 0;
  if (start.i === row) {
    if (start.j === 7) castlingRights[position.turn].kingside = false;
    if (start.j === 0) castlingRights[position.turn].queenside = false;
    if (start.j === 4) {
      castlingRights[position.turn].kingside = false;
      castlingRights[position.turn].queenside = false;
    }
  }
  row = row === 7 ? 0 : 7;
  const enemy = position.turn === "w" ? "b" : "w";
  if (end.i === row) {
    if (end.j === 7) castlingRights[enemy].kingside = false;
    if (end.j === 0) castlingRights[enemy].queenside = false;
  }
  return {
    board: updatedBoard,
    turn: position.turn === "w" ? "b" : "w",
    castlingRights,
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
