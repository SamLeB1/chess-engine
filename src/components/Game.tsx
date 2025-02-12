import { useGameStore } from "../store/gameStore.ts";
import Square from "./Square.tsx";
import img_bishop_b from "../assets/images/Chess_bdt45.svg";
import img_bishop_w from "../assets/images/Chess_blt45.svg";
import img_king_b from "../assets/images/Chess_kdt45.svg";
import img_king_w from "../assets/images/Chess_klt45.svg";
import img_knight_b from "../assets/images/Chess_ndt45.svg";
import img_knight_w from "../assets/images/Chess_nlt45.svg";
import img_pawn_b from "../assets/images/Chess_pdt45.svg";
import img_pawn_w from "../assets/images/Chess_plt45.svg";
import img_queen_b from "../assets/images/Chess_qdt45.svg";
import img_queen_w from "../assets/images/Chess_qlt45.svg";
import img_rook_b from "../assets/images/Chess_rdt45.svg";
import img_rook_w from "../assets/images/Chess_rlt45.svg";
import type { Piece } from "../types.ts";

export default function Game() {
  const board = useGameStore((state) => state.board);

  function getBgColor(i: number, j: number) {
    if (i % 2 === 0) {
      if (j % 2 === 0) return "light";
      else return "dark";
    } else {
      if (j % 2 === 0) return "dark";
      else return "light";
    }
  }

  function getPieceImg(piece: Piece) {
    switch (piece) {
      case "w0":
        return img_pawn_w;
      case "w1":
        return img_rook_w;
      case "w2":
        return img_knight_w;
      case "w3":
        return img_bishop_w;
      case "w4":
        return img_queen_w;
      case "w5":
        return img_king_w;
      case "b0":
        return img_pawn_b;
      case "b1":
        return img_rook_b;
      case "b2":
        return img_knight_b;
      case "b3":
        return img_bishop_b;
      case "b4":
        return img_queen_b;
      case "b5":
        return img_king_b;
      default:
        return null;
    }
  }

  return (
    <div>
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => (
            <Square
              key={j}
              index={{ i, j }}
              bgColor={getBgColor(i, j)}
              piece={square}
              img={getPieceImg(square as Piece)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
