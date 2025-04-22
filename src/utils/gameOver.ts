import { getValidMovesCount } from "./getValidMoves.ts";
import { isInCheck } from "./isValidMove.ts";
import type { Piece, CastlingRights, Index } from "../types.ts";

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
