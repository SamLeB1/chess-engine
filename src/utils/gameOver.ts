import { getValidMovesCount } from "./getValidMoves.ts";
import { isInCheck } from "./isValidMove.ts";
import type { Piece, CastlingRights, Index, Position } from "../types.ts";

export function isCheckmate(
  board: (Piece | null)[][],
  turn: "w" | "b",
  castlingRights: CastlingRights,
  enPassantTarget: Index | null,
) {
  if (
    getValidMovesCount(board, turn, castlingRights[turn], enPassantTarget) ===
      0 &&
    isInCheck(board, turn)
  )
    return true;
  else return false;
}

export function isStalemate(
  board: (Piece | null)[][],
  turn: "w" | "b",
  castlingRights: CastlingRights,
  enPassantTarget: Index | null,
) {
  if (
    getValidMovesCount(board, turn, castlingRights[turn], enPassantTarget) ===
      0 &&
    !isInCheck(board, turn)
  )
    return true;
  else return false;
}

export function isGameOver(position: Position) {
  const { board, turn, castlingRights, enPassantTarget } = position;
  if (
    isCheckmate(board, turn, castlingRights, enPassantTarget) ||
    isStalemate(board, turn, castlingRights, enPassantTarget)
  )
    return true;
  else return false;
}
