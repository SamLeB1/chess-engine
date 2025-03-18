import { useRef } from "react";
import { MdClose } from "react-icons/md";
import useClickOutside from "../hooks/useClickOutside.tsx";
import useMakeMove from "../hooks/useMakeMove.tsx";
import img_bishop_b from "../assets/images/Chess_bdt45.svg";
import img_bishop_w from "../assets/images/Chess_blt45.svg";
import img_knight_b from "../assets/images/Chess_ndt45.svg";
import img_knight_w from "../assets/images/Chess_nlt45.svg";
import img_queen_b from "../assets/images/Chess_qdt45.svg";
import img_queen_w from "../assets/images/Chess_qlt45.svg";
import img_rook_b from "../assets/images/Chess_rdt45.svg";
import img_rook_w from "../assets/images/Chess_rlt45.svg";
import type { Index, Promotion } from "../types.ts";

type PromotionMenuProps = {
  index: Index;
  pieceColor: "w" | "b";
  isReversed: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PromotionMenu({
  index,
  pieceColor,
  isReversed,
  setIsOpen,
}: PromotionMenuProps) {
  const promotionMenuRef = useRef(null);
  useClickOutside(promotionMenuRef, () => setIsOpen(false));
  const makeMove = useMakeMove();

  function handlePromotion(promotion: Promotion) {
    makeMove(index, promotion);
    setIsOpen(false);
  }

  return (
    <div
      ref={promotionMenuRef}
      className={`absolute z-10 flex shadow-2xl ${isReversed ? "bottom-0 flex-col-reverse" : "top-0 flex-col"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="flex h-16 w-16 cursor-pointer items-center justify-center bg-white"
        type="button"
        onClick={() => handlePromotion("4")}
      >
        <img
          className="h-15 w-15"
          src={pieceColor === "w" ? img_queen_w : img_queen_b}
          alt=""
        />
      </button>
      <button
        className="flex h-16 w-16 cursor-pointer items-center justify-center bg-white"
        type="button"
        onClick={() => handlePromotion("1")}
      >
        <img
          className="h-15 w-15"
          src={pieceColor === "w" ? img_rook_w : img_rook_b}
          alt=""
        />
      </button>
      <button
        className="flex h-16 w-16 cursor-pointer items-center justify-center bg-white"
        type="button"
        onClick={() => handlePromotion("3")}
      >
        <img
          className="h-15 w-15"
          src={pieceColor === "w" ? img_bishop_w : img_bishop_b}
          alt=""
        />
      </button>
      <button
        className="flex h-16 w-16 cursor-pointer items-center justify-center bg-white"
        type="button"
        onClick={() => handlePromotion("2")}
      >
        <img
          className="h-15 w-15"
          src={pieceColor === "w" ? img_knight_w : img_knight_b}
          alt=""
        />
      </button>
      <button
        className="flex h-8 w-16 cursor-pointer items-center justify-center bg-gray-200"
        type="button"
        onClick={() => setIsOpen(false)}
      >
        <MdClose size={20} />
      </button>
    </div>
  );
}
