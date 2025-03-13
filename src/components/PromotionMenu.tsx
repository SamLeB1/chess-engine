import img_bishop_b from "../assets/images/Chess_bdt45.svg";
import img_bishop_w from "../assets/images/Chess_blt45.svg";
import img_knight_b from "../assets/images/Chess_ndt45.svg";
import img_knight_w from "../assets/images/Chess_nlt45.svg";
import img_queen_b from "../assets/images/Chess_qdt45.svg";
import img_queen_w from "../assets/images/Chess_qlt45.svg";
import img_rook_b from "../assets/images/Chess_rdt45.svg";
import img_rook_w from "../assets/images/Chess_rlt45.svg";

type PromotionMenuProps = {
  pieceColor: "w" | "b";
  isReversed: boolean;
};

export default function PromotionMenu({
  pieceColor,
  isReversed,
}: PromotionMenuProps) {
  return (
    <div
      className={`absolute z-10 flex shadow-2xl ${isReversed ? "bottom-0 flex-col-reverse" : "flex-col"}`}
    >
      <button className="flex h-16 w-16 cursor-pointer items-center justify-center bg-white">
        <img
          className="h-15 w-15"
          src={pieceColor === "w" ? img_queen_w : img_queen_b}
          alt=""
        />
      </button>
      <button className="flex h-16 w-16 cursor-pointer items-center justify-center bg-white">
        <img
          className="h-15 w-15"
          src={pieceColor === "w" ? img_rook_w : img_rook_b}
          alt=""
        />
      </button>
      <button className="flex h-16 w-16 cursor-pointer items-center justify-center bg-white">
        <img
          className="h-15 w-15"
          src={pieceColor === "w" ? img_bishop_w : img_bishop_b}
          alt=""
        />
      </button>
      <button className="flex h-16 w-16 cursor-pointer items-center justify-center bg-white">
        <img
          className="h-15 w-15"
          src={pieceColor === "w" ? img_knight_w : img_knight_b}
          alt=""
        />
      </button>
    </div>
  );
}
