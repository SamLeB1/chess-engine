import getBestMove from "./engine/getBestMove";
import type { Position } from "./types";

self.onmessage = (e: MessageEvent<Position>) => {
  const bestMove = getBestMove(e.data);
  postMessage(bestMove);
};
