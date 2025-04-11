import { isValidFen } from "./isValidFen.ts";
import type { Piece, CastlingRights, Index, Position } from "../types.ts";

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

function convertFenCastlingRightsToObj(fenCastlingRights: string) {
  let castlingRights: CastlingRights = {
    w: {
      kingside: false,
      queenside: false,
    },
    b: {
      kingside: false,
      queenside: false,
    },
  };
  if (fenCastlingRights === "-") return castlingRights;
  for (let i = 0; i < fenCastlingRights.length; i++) {
    if (fenCastlingRights[i] === "K") castlingRights.w.kingside = true;
    if (fenCastlingRights[i] === "Q") castlingRights.w.queenside = true;
    if (fenCastlingRights[i] === "k") castlingRights.b.kingside = true;
    if (fenCastlingRights[i] === "q") castlingRights.b.queenside = true;
  }
  return castlingRights;
}

function convertFenEnPassantTargetToObj(
  fenEnPassantTarget: string,
): Index | null {
  if (fenEnPassantTarget === "-") return null;
  let i, j;

  if (fenEnPassantTarget[1] === "3") i = 5;
  else if (fenEnPassantTarget[1] === "6") i = 2;
  else return null;

  if (fenEnPassantTarget[0] === "a") j = 0;
  else if (fenEnPassantTarget[0] === "b") j = 1;
  else if (fenEnPassantTarget[0] === "c") j = 2;
  else if (fenEnPassantTarget[0] === "d") j = 3;
  else if (fenEnPassantTarget[0] === "e") j = 4;
  else if (fenEnPassantTarget[0] === "f") j = 5;
  else if (fenEnPassantTarget[0] === "g") j = 6;
  else if (fenEnPassantTarget[0] === "h") j = 7;
  else return null;

  return { i, j };
}

export function convertFenToObj(fen: string): Position | null {
  if (!isValidFen(fen)) return null;
  const fields = fen.split(" ");
  return {
    board: convertFenBoardToObj(fields[0]),
    turn: fields[1] as "w" | "b",
    castlingRights: convertFenCastlingRightsToObj(fields[2]),
    enPassantTarget: convertFenEnPassantTargetToObj(fields[3]),
    halfmoveClock: Number(fields[4]),
    fullmoveNumber: Number(fields[5]),
  };
}
