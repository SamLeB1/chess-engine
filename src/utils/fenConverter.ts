import { isValidFen } from "./isValidFen.ts";
import type { Piece } from "../types.ts";

function convertFenBoardToObj(fenBoard: string) {
  const rows = fenBoard.split("/");
  let board: (Piece | null)[][] = [];
  for (let i = 0; i < rows.length; i++) {
    let row: (Piece | null)[] = [];
    for (let j = 0; j < rows[i].length; j++) {
      const char = rows[i][j];
      if (Number(char)) for (let k = 0; k < Number(char); k++) row.push(null);
      else
        switch (char) {
          case "P":
            row.push("w0");
            break;
          case "p":
            row.push("b0");
            break;
          case "R":
            row.push("w1");
            break;
          case "r":
            row.push("b1");
            break;
          case "N":
            row.push("w2");
            break;
          case "n":
            row.push("b2");
            break;
          case "B":
            row.push("w3");
            break;
          case "b":
            row.push("b3");
            break;
          case "Q":
            row.push("w4");
            break;
          case "q":
            row.push("b4");
            break;
          case "K":
            row.push("w5");
            break;
          case "k":
            row.push("b5");
        }
    }
    board.push(row);
  }
  return board;
}

export function convertFenToObj(fen: string) {
  if (!isValidFen(fen)) return null;
  const fields = fen.split(" ");
  return {
    board: convertFenBoardToObj(fields[0]),
    turn: fields[1],
  };
}
