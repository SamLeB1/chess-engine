import { create } from "zustand";
import { getDistance, getDirection } from "../utils/index.ts";
import type { Index, Piece, CastlingRights } from "../types.ts";

type GameState = {
  board: (Piece | null)[][];
  turn: "w" | "b";
  selectedSquare: Index | null;
  enPassantTarget: Index | null;
  castlingRights: CastlingRights;
  changeTurn: () => void;
  selectSquare: (index: Index) => void;
  moveSelectedSquare: (index: Index) => void;
  removeCastlingRights: (
    player: "w" | "b",
    side: "kingside" | "queenside" | "all",
  ) => void;
};

const initBoard: (Piece | null)[][] = [
  ["b1", "b2", "b3", "b4", "b5", "b3", "b2", "b1"],
  ["b0", "b0", "b0", "b0", "b0", "b0", "b0", "b0"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["w0", "w0", "w0", "w0", "w0", "w0", "w0", "w0"],
  ["w1", "w2", "w3", "w4", "w5", "w3", "w2", "w1"],
];

function getEnPassantTarget(
  board: (Piece | null)[][],
  start: Index,
  end: Index,
) {
  const piece = board[start.i][start.j];
  if (!piece || piece[1] !== "0") return null;
  const distance = getDistance(start, end);
  if (distance.x !== 0 || distance.y !== 2) return null;
  const direction = getDirection(start, end);
  return { i: start.i + direction.y, j: start.j };
}

function isEnPassant(board: (Piece | null)[][], start: Index, end: Index) {
  const piece = board[start.i][start.j];
  const distance = getDistance(start, end);
  if (piece && piece[1] === "0" && distance.x === 1 && !board[end.i][end.j])
    return true;
  else return false;
}

function isCastle(board: (Piece | null)[][], start: Index, end: Index) {
  const piece = board[start.i][start.j];
  const distance = getDistance(start, end);
  if (piece && piece[1] === "5" && distance.x === 2) return true;
  else return false;
}

export const useGameStore = create<GameState>((set, get) => ({
  board: initBoard,
  turn: "w",
  selectedSquare: null,
  enPassantTarget: null,
  castlingRights: {
    w: {
      kingside: true,
      queenside: true,
    },
    b: {
      kingside: true,
      queenside: true,
    },
  },
  changeTurn: () => set((state) => ({ turn: state.turn === "w" ? "b" : "w" })),
  selectSquare: (index: Index) => {
    const selectedSquare = get().selectedSquare;
    if (
      selectedSquare &&
      selectedSquare.i === index.i &&
      selectedSquare.j === index.j
    ) {
      set({ selectedSquare: null });
      return;
    }
    const piece = get().board[index.i][index.j];
    if (piece) set({ selectedSquare: index });
    else set({ selectedSquare: null });
  },
  moveSelectedSquare: (index: Index) => {
    const selectedSquare = get().selectedSquare;
    if (!selectedSquare) return;
    const board = get().board;
    let updatedBoard: (Piece | null)[][] = JSON.parse(JSON.stringify(board));
    updatedBoard[index.i][index.j] =
      updatedBoard[selectedSquare.i][selectedSquare.j];
    updatedBoard[selectedSquare.i][selectedSquare.j] = null;
    if (isEnPassant(board, selectedSquare, index)) {
      const direction = getDirection(selectedSquare, index);
      updatedBoard[selectedSquare.i][selectedSquare.j + direction.x] = null;
    }
    if (isCastle(board, selectedSquare, index)) {
      const direction = getDirection(selectedSquare, index);
      if (direction.x === 1) {
        updatedBoard[selectedSquare.i][5] = updatedBoard[selectedSquare.i][7];
        updatedBoard[selectedSquare.i][7] = null;
      } else {
        updatedBoard[selectedSquare.i][3] = updatedBoard[selectedSquare.i][0];
        updatedBoard[selectedSquare.i][0] = null;
      }
    }
    set({
      board: updatedBoard,
      selectedSquare: null,
      enPassantTarget: getEnPassantTarget(board, selectedSquare, index),
    });
  },
  removeCastlingRights: (
    player: "w" | "b",
    side: "kingside" | "queenside" | "all",
  ) => {
    let castlingRights: CastlingRights = JSON.parse(
      JSON.stringify(get().castlingRights),
    );
    if (side === "all") {
      castlingRights[player].kingside = false;
      castlingRights[player].queenside = false;
    } else castlingRights[player][side] = false;
    set({ castlingRights });
  },
}));
