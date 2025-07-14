import type { Piece } from "../types";

function getPieceTypeCount(board: (Piece | null)[][]) {
  let pieceTypeCount = {
    w0: 0,
    w1: 0,
    w2: 0,
    w3: 0,
    w4: 0,
    w5: 0,
    b0: 0,
    b1: 0,
    b2: 0,
    b3: 0,
    b4: 0,
    b5: 0,
  };
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) pieceTypeCount[piece]++;
    }
  }
  return pieceTypeCount;
}

export function isEndgame(board: (Piece | null)[][]) {
  const ptc = getPieceTypeCount(board);
  if (ptc.w4 > 1 || ptc.b4 > 1) return false;
  if (ptc.w4 === 1 && (ptc.w1 > 0 || ptc.w2 + ptc.w3 > 1)) return false;
  if (ptc.b4 === 1 && (ptc.b1 > 0 || ptc.b2 + ptc.b3 > 1)) return false;
  return true;
}
