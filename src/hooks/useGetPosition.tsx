import { useShallow } from "zustand/shallow";
import { useGameStore } from "../store/gameStore";
import type { Position } from "../types";

export default function useGetPosition() {
  const {
    board,
    turn,
    castlingRights,
    enPassantTarget,
    halfmoveClock,
    fullmoveNumber,
  } = useGameStore(
    useShallow((state) => ({
      board: state.board,
      turn: state.turn,
      castlingRights: state.castlingRights,
      enPassantTarget: state.enPassantTarget,
      halfmoveClock: state.halfmoveClock,
      fullmoveNumber: state.fullmoveNumber,
    })),
  );

  function getPosition(): Position {
    return {
      board,
      turn,
      castlingRights,
      enPassantTarget,
      halfmoveClock,
      fullmoveNumber,
    };
  }

  return getPosition;
}
