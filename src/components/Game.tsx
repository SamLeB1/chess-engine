import { useState } from "react";
import type { Piece } from "../types.ts";

const initBoard: (Piece | null)[][] = [
  ["b1", "b2", "b3", "b4", "b5", "b3", "b2", "b1"],
  ["b0", "b0", "b0", "b0", "b0", "b0", "b0", "b0"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["w1", "w2", "w3", "w4", "w5", "w3", "w2", "w1"],
  ["w0", "w0", "w0", "w0", "w0", "w0", "w0", "w0"],
];

export default function Game() {
  const [board, setBoard] = useState<(Piece | null)[][]>(initBoard);

  return <h1>Game</h1>;
}
