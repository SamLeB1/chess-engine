import { create } from "zustand";
import { getDistance, getDirection } from "../utils/index.ts";
import type { Index, Piece, CastlingRights } from "../types.ts";

type GameState = {
  board: (Piece | null)[][];
  turn: "w" | "b";
  selectedSquare: Index | null;
  castlingRights: CastlingRights;
  changeTurn: () => void;
  selectSquare: (index: Index) => void;
  moveSelectedSquare: (index: Index) => void;
  removeCastlingRights: (side: "kingside" | "queenside" | "all") => void;
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
    });
  },
  removeCastlingRights: (side: "kingside" | "queenside" | "all") => {
    let castlingRights: CastlingRights = JSON.parse(
      JSON.stringify(get().castlingRights),
    );
    const turn = get().turn;
    if (side === "all") {
      castlingRights[turn].kingside = false;
      castlingRights[turn].queenside = false;
    } else castlingRights[turn][side] = false;
    set({ castlingRights });
  },
}));
