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

function convertObjBoardToFen(board: (Piece | null)[][]) {
  let fenBoard = "";
  for (let i = 0; i < 8; i++) {
    let emptyCount = 0;
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        if (emptyCount) {
          fenBoard += emptyCount.toString();
          emptyCount = 0;
        }
        switch (piece) {
          case "w0":
            fenBoard += "P";
            break;
          case "b0":
            fenBoard += "p";
            break;
          case "w1":
            fenBoard += "R";
            break;
          case "b1":
            fenBoard += "r";
            break;
          case "w2":
            fenBoard += "N";
            break;
          case "b2":
            fenBoard += "n";
            break;
          case "w3":
            fenBoard += "B";
            break;
          case "b3":
            fenBoard += "b";
            break;
          case "w4":
            fenBoard += "Q";
            break;
          case "b4":
            fenBoard += "q";
            break;
          case "w5":
            fenBoard += "K";
            break;
          case "b5":
            fenBoard += "k";
        }
      } else emptyCount++;
    }
    if (emptyCount) fenBoard += emptyCount.toString();
    if (i < 7) fenBoard += "/";
  }
  return fenBoard;
}

function convertObjCastlingRightsToFen(castlingRights: CastlingRights) {
  if (
    !castlingRights.w.kingside &&
    !castlingRights.w.queenside &&
    !castlingRights.b.kingside &&
    !castlingRights.b.queenside
  )
    return "-";
  let fenCastlingRights = "";
  if (castlingRights.w.kingside) fenCastlingRights += "K";
  if (castlingRights.w.queenside) fenCastlingRights += "Q";
  if (castlingRights.b.kingside) fenCastlingRights += "k";
  if (castlingRights.b.queenside) fenCastlingRights += "q";
  return fenCastlingRights;
}

function convertObjEnPassantTargetToFen(enPassantTarget: Index | null) {
  if (!enPassantTarget) return "-";
  let fenEnPassantTarget = "";

  if (enPassantTarget.j === 0) fenEnPassantTarget += "a";
  else if (enPassantTarget.j === 1) fenEnPassantTarget += "b";
  else if (enPassantTarget.j === 2) fenEnPassantTarget += "c";
  else if (enPassantTarget.j === 3) fenEnPassantTarget += "d";
  else if (enPassantTarget.j === 4) fenEnPassantTarget += "e";
  else if (enPassantTarget.j === 5) fenEnPassantTarget += "f";
  else if (enPassantTarget.j === 6) fenEnPassantTarget += "g";
  else fenEnPassantTarget += "h";

  if (enPassantTarget.i === 2) fenEnPassantTarget += "6";
  else fenEnPassantTarget += "3";

  return fenEnPassantTarget;
}

function convertObjToFen(position: Position) {
  const board = convertObjBoardToFen(position.board);
  const turn = position.turn;
  const castlingRights = convertObjCastlingRightsToFen(position.castlingRights);
  const enPassantTarget = convertObjEnPassantTargetToFen(
    position.enPassantTarget,
  );
  const halfmoveClock = position.halfmoveClock.toString();
  const fullmoveNumber = position.fullmoveNumber.toString();
  return `${board} ${turn} ${castlingRights} ${enPassantTarget} ${halfmoveClock} ${fullmoveNumber}`;
}
