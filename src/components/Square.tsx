import type { Piece } from "../types.ts";

type SquareProps = {
  bgColor: "light" | "dark";
  piece: Piece | null;
  img: string | null;
};

export default function Square({ bgColor, piece, img }: SquareProps) {
  if (piece && img)
    return (
      <div
        className={`flex h-16 w-16 items-center justify-center ${bgColor === "light" ? "bg-lightsquare" : "bg-darksquare"}`}
      >
        <img className="h-15 w-15" src={img} alt="" />
      </div>
    );
  else
    return (
      <div
        className={`h-16 w-16 ${bgColor === "light" ? "bg-lightsquare" : "bg-darksquare"}`}
      />
    );
}
