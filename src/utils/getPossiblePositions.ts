import { isValidMove } from "./isValidMove.ts";
import { isPromotion } from "./move.ts";
import getUpdatedPosition from "./getUpdatedPosition.ts";
import type { Index, Promotion, Position, Move } from "../types.ts";

function getPossiblePositionsFromIndex(position: Position, index: Index) {
  let possiblePositions: Position[] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (
        isValidMove(
          position.board,
          position.turn,
          index,
          { i, j },
          position.enPassantTarget,
          position.castlingRights[position.turn],
        )
      ) {
        if (isPromotion(position.board, position.turn, index, { i, j })) {
          for (let k = 1; k <= 4; k++) {
            possiblePositions.push(
              getUpdatedPosition(position, {
                start: index,
                end: { i, j },
                promotion: k.toString() as Promotion,
              }),
            );
          }
        } else {
          possiblePositions.push(
            getUpdatedPosition(position, {
              start: index,
              end: { i, j },
              promotion: null,
            }),
          );
        }
      }
    }
  }
  return possiblePositions;
}

export function getPossiblePositions(position: Position) {
  let possiblePositions: Position[] = [];
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      possiblePositions.push(
        ...getPossiblePositionsFromIndex(position, { i, j }),
      );
  return possiblePositions;
}

function getPossiblePositionsFromIndexWithMoves(
  position: Position,
  index: Index,
) {
  let possiblePositions: { position: Position; move: Move }[] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (
        isValidMove(
          position.board,
          position.turn,
          index,
          { i, j },
          position.enPassantTarget,
          position.castlingRights[position.turn],
        )
      ) {
        if (isPromotion(position.board, position.turn, index, { i, j })) {
          for (let k = 1; k <= 4; k++) {
            possiblePositions.push({
              position: getUpdatedPosition(position, {
                start: index,
                end: { i, j },
                promotion: k.toString() as Promotion,
              }),
              move: {
                start: index,
                end: { i, j },
                promotion: k.toString() as Promotion,
              },
            });
          }
        } else {
          possiblePositions.push({
            position: getUpdatedPosition(position, {
              start: index,
              end: { i, j },
              promotion: null,
            }),
            move: {
              start: index,
              end: { i, j },
              promotion: null,
            },
          });
        }
      }
    }
  }
  return possiblePositions;
}

export function getPossiblePositionsWithMoves(position: Position) {
  let possiblePositions: { position: Position; move: Move }[] = [];
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      possiblePositions.push(
        ...getPossiblePositionsFromIndexWithMoves(position, { i, j }),
      );
  return possiblePositions;
}
