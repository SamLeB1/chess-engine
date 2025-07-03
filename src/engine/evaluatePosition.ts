import { getValidMovesCount } from "../utils/getValidMoves.ts";
import { isInCheck } from "../utils/isValidMove.ts";
import type { Position } from "../types.ts";

type PieceValues = {
  w0: number;
  w1: number;
  w2: number;
  w3: number;
  w4: number;
  w5: number;
  b0: number;
  b1: number;
  b2: number;
  b3: number;
  b4: number;
  b5: number;
};

type PSTs = {
  w0: number[][];
  w1: number[][];
  w2: number[][];
  w3: number[][];
  w4: number[][];
  w5: number[][];
  b0: number[][];
  b1: number[][];
  b2: number[][];
  b3: number[][];
  b4: number[][];
  b5: number[][];
};

const PIECE_VALUES: PieceValues = {
  w0: 100,
  w1: 500,
  w2: 320,
  w3: 330,
  w4: 900,
  w5: 20000,
  b0: -100,
  b1: -500,
  b2: -320,
  b3: -330,
  b4: -900,
  b5: -20000,
};

const PST_PAWN = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5, 5, 10, 25, 25, 10, 5, 5],
  [0, 0, 0, 20, 20, 0, 0, 0],
  [5, -5, -10, 0, 0, -10, -5, 5],
  [5, 10, 10, -20, -20, 10, 10, 5],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const PST_KNIGHT = [
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20, 0, 0, 0, 0, -20, -40],
  [-30, 0, 10, 15, 15, 10, 0, -30],
  [-30, 5, 15, 20, 20, 15, 5, -30],
  [-30, 0, 15, 20, 20, 15, 0, -30],
  [-30, 5, 10, 15, 15, 10, 5, -30],
  [-40, -20, 0, 5, 5, 0, -20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50],
];

const PST_BISHOP = [
  [-20, -10, -10, -10, -10, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 10, 10, 5, 0, -10],
  [-10, 5, 5, 10, 10, 5, 5, -10],
  [-10, 0, 10, 10, 10, 10, 0, -10],
  [-10, 10, 10, 10, 10, 10, 10, -10],
  [-10, 5, 0, 0, 0, 0, 5, -10],
  [-20, -10, -10, -10, -10, -10, -10, -20],
];

const PST_ROOK = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [5, 10, 10, 10, 10, 10, 10, 5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [0, 0, 0, 5, 5, 0, 0, 0],
];

const PST_QUEEN = [
  [-20, -10, -10, -5, -5, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 5, 5, 5, 0, -10],
  [-5, 0, 5, 5, 5, 5, 0, -5],
  [0, 0, 5, 5, 5, 5, 0, -5],
  [-10, 5, 5, 5, 5, 5, 0, -10],
  [-10, 0, 5, 0, 0, 0, 0, -10],
  [-20, -10, -10, -5, -5, -10, -10, -20],
];

const PST_KING_MID = [
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-20, -30, -30, -40, -40, -30, -30, -20],
  [-10, -20, -20, -20, -20, -20, -20, -10],
  [20, 20, 0, 0, 0, 0, 20, 20],
  [20, 30, 10, 0, 0, 10, 30, 20],
];

const PST_KING_END = [
  [-50, -40, -30, -20, -20, -30, -40, -50],
  [-30, -20, -10, 0, 0, -10, -20, -30],
  [-30, -10, 20, 30, 30, 20, -10, -30],
  [-30, -10, 30, 40, 40, 30, -10, -30],
  [-30, -10, 30, 40, 40, 30, -10, -30],
  [-30, -10, 20, 30, 30, 20, -10, -30],
  [-30, -30, 0, 0, 0, 0, -30, -30],
  [-50, -30, -30, -30, -30, -30, -30, -50],
];

const PSTs: PSTs = {
  w0: PST_PAWN,
  w1: PST_ROOK,
  w2: PST_KNIGHT,
  w3: PST_BISHOP,
  w4: PST_QUEEN,
  w5: PST_KING_MID,
  b0: mirrorPST(PST_PAWN),
  b1: mirrorPST(PST_ROOK),
  b2: mirrorPST(PST_KNIGHT),
  b3: mirrorPST(PST_BISHOP),
  b4: mirrorPST(PST_QUEEN),
  b5: mirrorPST(PST_KING_MID),
};

function mirrorPST(PST: number[][]) {
  let mirroredPST: number[][] = [];
  for (let i = 7; i >= 0; i--) {
    let row: number[] = [];
    for (let j = 0; j <= 7; j++) row.push(PST[i][j] * -1);
    mirroredPST.push(row);
  }
  return mirroredPST;
}

export default function evaluatePosition(position: Position) {
  const { board, turn, castlingRights, enPassantTarget } = position;

  const validMovesCount = getValidMovesCount(
    board,
    turn,
    castlingRights[turn],
    enPassantTarget,
  );
  if (validMovesCount === 0) {
    if (isInCheck(board, turn)) return turn === "w" ? -Infinity : Infinity;
    else return 0;
  }

  let pieceScore = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (!piece) continue;
      pieceScore += PIECE_VALUES[piece] + PSTs[piece][i][j];
    }
  }
  return pieceScore;
}
