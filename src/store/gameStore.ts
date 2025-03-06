import { create } from "zustand";
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
    let updatedBoard: (Piece | null)[][] = JSON.parse(
      JSON.stringify(get().board),
    );
    updatedBoard[index.i][index.j] =
      updatedBoard[selectedSquare.i][selectedSquare.j];
    updatedBoard[selectedSquare.i][selectedSquare.j] = null;
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
