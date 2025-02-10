import { useState } from "react";
import Square from "./Square.tsx";
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

  function getBgColor(i: number, j: number) {
    if (i % 2 === 0) {
      if (j % 2 === 0) return "light";
      else return "dark";
    } else {
      if (j % 2 === 0) return "dark";
      else return "light";
    }
  }

  return (
    <div>
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => (
            <Square
              key={j}
              bgColor={getBgColor(i, j)}
              piece={square}
              img={null}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
