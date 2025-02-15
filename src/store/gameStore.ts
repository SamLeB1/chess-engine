import { create } from "zustand";
import type { Index, Piece } from "../types.ts";

type GameState = {
  board: (Piece | null)[][];
  turn: "w" | "b";
  selectedSquare: Index | null;
  changeTurn: () => void;
  selectSquare: (index: Index) => void;
  moveSelectedSquare: (index: Index) => void;
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
  changeTurn: () => set((state) => ({ turn: state.turn === "w" ? "b" : "w" })),
  selectSquare: (index: Index) => set({ selectedSquare: index }),
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
}));
