import type { Piece } from "../types.ts";

type SquareProps = {
  bgColor: "light" | "dark";
  piece: Piece | null;
  img: string | null;
};

export default function Square({ bgColor, piece, img }: SquareProps) {
  return (
    <div
      className={`h-16 w-16 ${bgColor === "light" ? "bg-lightsquare" : "bg-darksquare"}`}
    ></div>
  );
}
