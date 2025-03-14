import { useState } from "react";
import { useGameStore } from "../store/gameStore.ts";
import PromotionMenu from "./PromotionMenu.tsx";
import { isValidMove } from "../utils/isValidMove.ts";
import type { Index, Piece } from "../types.ts";

type SquareProps = {
  index: Index;
  isSelected: boolean;
  moveIndicator: "ring" | "dot" | null;
  bgColor: "light" | "dark";
  piece: Piece | null;
  img: string | null;
};

export default function Square({
  index,
  isSelected,
  moveIndicator,
  bgColor,
  piece,
  img,
}: SquareProps) {
  const {
    board,
    turn,
    selectedSquare,
    enPassantTarget,
    castlingRights,
    changeTurn,
    selectSquare,
    moveSelectedSquare,
    removeCastlingRights,
  } = useGameStore((state) => state);
  const [isOpenPromotionMenu, setIsOpenPromotionMenu] = useState(
    index.i === 2 && index.j === 0 ? true : false,
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

  function getSideToRemoveCastlingRightsEnemy() {
    const enemy = turn === "w" ? "b" : "w";
    const { kingside, queenside } = castlingRights[enemy];
    if (!kingside && !queenside) return null;

    const row = turn === "w" ? 0 : 7;
    if (index.i === row && index.j === 7 && kingside) return "kingside";
    else if (index.i === row && index.j === 0 && queenside) return "queenside";
    else return null;
  }

  function handleCastlingRights() {
    const side = getSideToRemoveCastlingRights();
    if (side) removeCastlingRights(turn, side);
    const sideEnemy = getSideToRemoveCastlingRightsEnemy();
    if (sideEnemy) {
      const enemy = turn === "w" ? "b" : "w";
      removeCastlingRights(enemy, sideEnemy);
    }
  }

  function handleClick() {
    if (
      selectedSquare &&
      isValidMove(
        board,
        turn,
        selectedSquare,
        index,
        enPassantTarget,
        castlingRights[turn],
      )
    ) {
      moveSelectedSquare(index);
      handleCastlingRights();
      changeTurn();
    } else selectSquare(index);
  }

  if (piece && img)
    return (
      <div
        className={`relative flex h-16 w-16 cursor-pointer items-center justify-center ${isSelected ? "bg-yellow-300" : bgColor === "light" ? "bg-lightsquare" : "bg-darksquare"}`}
        onClick={handleClick}
      >
        <img className="h-15 w-15" src={img} alt="" />
        {moveIndicator === "ring" && (
          <div className="absolute h-full w-full rounded-full border-[6px] opacity-20" />
        )}
      </div>
    );
  else
    return (
      <div
        className={`relative h-16 w-16 ${bgColor === "light" ? "bg-lightsquare" : "bg-darksquare"}`}
        onClick={handleClick}
      >
        {moveIndicator === "dot" && (
          <div className="absolute top-1/2 left-1/2 h-1/3 w-1/3 -translate-1/2 rounded-full bg-black opacity-20" />
        )}
        {isOpenPromotionMenu && (
          <PromotionMenu
            pieceColor="w"
            isReversed={false}
            setIsOpen={setIsOpenPromotionMenu}
          />
        )}
      </div>
    );
}
