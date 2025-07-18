import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { useGameStore } from "../store/gameStore";

export default function LoadFromFEN() {
  const [fen, setFen] = useState("");
  const loadFromFEN = useGameStore(useShallow((state) => state.loadFromFEN));

  function handleLoad() {
    try {
      loadFromFEN(fen);
    } catch (err) {
      console.error(err);
    }
    setFen("");
  }

  return (
    <div className="mb-1">
      <input
        className="border px-2"
        type="text"
        id="fen"
        placeholder="Enter FEN"
        value={fen}
        onChange={(e) => setFen(e.target.value)}
      />
      <button
        className="cursor-pointer border bg-gray-200 px-2"
        type="button"
        onClick={handleLoad}
      >
        Load
      </button>
    </div>
  );
}
