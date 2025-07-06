import Game from "./components/Game.tsx";
import LoadFromFEN from "./components/LoadFromFEN.tsx";

export default function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <LoadFromFEN />
        <Game />
      </div>
    </div>
  );
}
