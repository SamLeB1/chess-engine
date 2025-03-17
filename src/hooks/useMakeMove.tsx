import { useShallow } from "zustand/shallow";
import { useGameStore } from "../store/gameStore.ts";
import type { Index } from "../types.ts";

export default function useMakeMove() {
  const {
    turn,
    selectedSquare,
    castlingRights,
    moveSelectedSquare,
    removeCastlingRights,
  } = useGameStore(
    useShallow((state) => ({
      turn: state.turn,
      selectedSquare: state.selectedSquare,
      castlingRights: state.castlingRights,
      moveSelectedSquare: state.moveSelectedSquare,
      removeCastlingRights: state.removeCastlingRights,
    })),
  );

  function getSideToRemoveCastlingRights() {
    if (!selectedSquare) return null;
    const { kingside, queenside } = castlingRights[turn];
    if (!kingside && !queenside) return null;

    const row = turn === "w" ? 7 : 0;
    if (selectedSquare.i === row && selectedSquare.j === 7 && kingside)
      return "kingside";
    else if (selectedSquare.i === row && selectedSquare.j === 0 && queenside)
      return "queenside";
    else if (selectedSquare.i === row && selectedSquare.j === 4) return "all";
    else return null;
  }

  function getSideToRemoveCastlingRightsEnemy(index: Index) {
    const enemy = turn === "w" ? "b" : "w";
    const { kingside, queenside } = castlingRights[enemy];
    if (!kingside && !queenside) return null;

    const row = turn === "w" ? 0 : 7;
    if (index.i === row && index.j === 7 && kingside) return "kingside";
    else if (index.i === row && index.j === 0 && queenside) return "queenside";
    else return null;
  }

  function handleCastlingRights(index: Index) {
    const side = getSideToRemoveCastlingRights();
    if (side) removeCastlingRights(turn, side);
    const sideEnemy = getSideToRemoveCastlingRightsEnemy(index);
    if (sideEnemy) {
      const enemy = turn === "w" ? "b" : "w";
      removeCastlingRights(enemy, sideEnemy);
    }
  }

  function makeMove(index: Index) {
    moveSelectedSquare(index);
    handleCastlingRights(index);
  }

  return makeMove;
}
