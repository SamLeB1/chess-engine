import evaluatePosition from "./evaluatePosition.ts";
import {
  getPossiblePositions,
  getPossiblePositionsWithMoves,
} from "../utils/getPossiblePositions.ts";
import { isGameOver } from "../utils/gameOver.ts";
import type { Position } from "../types.ts";

function minimax(position: Position, depth: number) {
  if (depth === 0 || isGameOver(position)) return evaluatePosition(position);
  const possiblePositions = getPossiblePositions(position);
  if (position.turn === "w") {
    let maxEval = -Infinity;
    for (let i = 0; i < possiblePositions.length; i++) {
      const currEval = minimax(possiblePositions[i], depth - 1);
      if (currEval > maxEval) maxEval = currEval;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < possiblePositions.length; i++) {
      const currEval = minimax(possiblePositions[i], depth - 1);
      if (currEval < minEval) minEval = currEval;
    }
    return minEval;
  }
}

export default function getBestMove(position: Position) {
  const possiblePositions = getPossiblePositionsWithMoves(position);
  if (possiblePositions.length === 0) return null;
  let bestMove = possiblePositions[0].move;
  const depth = 2;
  if (position.turn === "w") {
    let maxEval = -Infinity;
    for (let i = 0; i < possiblePositions.length; i++) {
      const currEval = minimax(possiblePositions[i].position, depth - 1);
      if (currEval > maxEval) {
        maxEval = currEval;
        bestMove = possiblePositions[i].move;
      }
    }
  } else {
    let minEval = Infinity;
    for (let i = 0; i < possiblePositions.length; i++) {
      const currEval = minimax(possiblePositions[i].position, depth - 1);
      if (currEval < minEval) {
        minEval = currEval;
        bestMove = possiblePositions[i].move;
      }
    }
  }
  return bestMove;
}
