import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { useGameStore } from "../store/gameStore.ts";
import useMakeMove from "../hooks/useMakeMove.tsx";
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
    selectSquare,
  } = useGameStore(
    useShallow((state) => ({
      board: state.board,
      turn: state.turn,
      selectedSquare: state.selectedSquare,
      enPassantTarget: state.enPassantTarget,
      castlingRights: state.castlingRights,
      selectSquare: state.selectSquare,
    })),
  );
  const makeMove = useMakeMove();
  const [isOpenPromotionMenu, setIsOpenPromotionMenu] = useState(false);

  function isPromotion() {
    if (!selectedSquare) return false;
    const piece = board[selectedSquare.i][selectedSquare.j];
    if (!piece || piece[1] !== "0") return false;
    const lastRow = turn === "w" ? 0 : 7;
    if (lastRow !== index.i) return false;
    return true;
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
      if (isPromotion()) setIsOpenPromotionMenu(true);
      else makeMove(index, null);
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
        {isOpenPromotionMenu && (
          <PromotionMenu
            index={index}
            pieceColor={turn}
            isReversed={index.i === 7 ? true : false}
            setIsOpen={setIsOpenPromotionMenu}
          />
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
            index={index}
            pieceColor={turn}
            isReversed={index.i === 7 ? true : false}
            setIsOpen={setIsOpenPromotionMenu}
          />
        )}
      </div>
    );
}
