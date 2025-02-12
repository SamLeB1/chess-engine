import { useShallow } from "zustand/shallow";
import { useGameStore } from "../store/gameStore.ts";
import type { Index, Piece } from "../types.ts";

type SquareProps = {
  index: Index;
  bgColor: "light" | "dark";
  piece: Piece | null;
  img: string | null;
};

export default function Square({ index, bgColor, piece, img }: SquareProps) {
  const { selectedSquare, selectSquare, moveSelectedSquare } = useGameStore(
    useShallow((state) => ({
      selectedSquare: state.selectedSquare,
      selectSquare: state.selectSquare,
      moveSelectedSquare: state.moveSelectedSquare,
    })),
  );

  function handleClick() {
    if (selectedSquare) moveSelectedSquare(index);
    else selectSquare(index);
  }

  if (piece && img)
    return (
      <div
        className={`flex h-16 w-16 items-center justify-center ${bgColor === "light" ? "bg-lightsquare" : "bg-darksquare"}`}
        onClick={handleClick}
      >
        <img className="h-15 w-15" src={img} alt="" />
      </div>
    );
  else
    return (
      <div
        className={`h-16 w-16 ${bgColor === "light" ? "bg-lightsquare" : "bg-darksquare"}`}
        onClick={handleClick}
      />
    );
}
