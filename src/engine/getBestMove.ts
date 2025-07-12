import evaluatePosition from "./evaluatePosition.ts";
import {
  getPossiblePositions,
  getPossiblePositionsWithMoves,
} from "../utils/getPossiblePositions.ts";
import { isGameOver } from "../utils/gameOver.ts";
import type { Position } from "../types.ts";

function minimax(
  position: Position,
  depth: number,
  alpha: number,
  beta: number,
) {
  if (depth === 0 || isGameOver(position))
    return evaluatePosition(position, depth);
  const possiblePositions = getPossiblePositions(position);
  if (position.turn === "w") {
    let maxEval = -Infinity;
    for (let i = 0; i < possiblePositions.length; i++) {
      const currEval = minimax(possiblePositions[i], depth - 1, alpha, beta);
      if (currEval > maxEval) maxEval = currEval;
      if (currEval > alpha) alpha = currEval;
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < possiblePositions.length; i++) {
      const currEval = minimax(possiblePositions[i], depth - 1, alpha, beta);
      if (currEval < minEval) minEval = currEval;
      if (currEval < beta) beta = currEval;
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export default function getBestMove(position: Position) {
  const possiblePositions = getPossiblePositionsWithMoves(position);
  if (possiblePositions.length === 0) return null;
  let bestMove = possiblePositions[0].move;
  const depth = 4;
  let alpha = -Infinity;
  let beta = Infinity;

  if (position.turn === "w") {
    let maxEval = -Infinity;
    for (let i = 0; i < possiblePositions.length; i++) {
      const currEval = minimax(
        possiblePositions[i].position,
        depth - 1,
        alpha,
        beta,
      );
      if (currEval > maxEval) {
        maxEval = currEval;
        bestMove = possiblePositions[i].move;
      }
      if (currEval > alpha) alpha = currEval;
      if (beta <= alpha) break;
    }
  } else {
    let minEval = Infinity;
    for (let i = 0; i < possiblePositions.length; i++) {
      const currEval = minimax(
        possiblePositions[i].position,
        depth - 1,
        alpha,
        beta,
      );
      if (currEval < minEval) {
        minEval = currEval;
        bestMove = possiblePositions[i].move;
      }
      if (currEval < beta) beta = currEval;
      if (beta <= alpha) break;
    }
  }
  return bestMove;
}
