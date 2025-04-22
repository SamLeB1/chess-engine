import { isValidMove } from "./isValidMove.ts";
import { isPromotion } from "./move.ts";
import type { Piece, Index, CastlingRightsPlayer } from "../types.ts";

export function getValidMovesFromIndex(
  board: (Piece | null)[][],
  turn: "w" | "b",
  start: Index,
  enPassantTarget: Index | null,
  castlingRights: CastlingRightsPlayer,
) {
  let validMoves: Index[] = [];
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      if (
        isValidMove(
          board,
          turn,
          start,
          { i, j },
          enPassantTarget,
          castlingRights,
        )
      )
        validMoves.push({ i, j });
  return validMoves;
}

function getValidMovesFromIndexCount(
  board: (Piece | null)[][],
  turn: "w" | "b",
  castlingRights: CastlingRightsPlayer,
  enPassantTarget: Index | null,
  index: Index,
) {
  let count = 0;
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      if (
        isValidMove(
          board,
          turn,
          index,
          { i, j },
          enPassantTarget,
          castlingRights,
        )
      ) {
        if (isPromotion(board, turn, index, { i, j })) count += 4;
        else count += 1;
      }
  return count;
}

export function getValidMovesCount(
  board: (Piece | null)[][],
  turn: "w" | "b",
  castlingRights: CastlingRightsPlayer,
  enPassantTarget: Index | null,
) {
  let count = 0;
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      count += getValidMovesFromIndexCount(
        board,
        turn,
        castlingRights,
        enPassantTarget,
        { i, j },
      );
  return count;
}
