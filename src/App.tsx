import Game from "./components/Game.tsx";
import LoadFromFEN from "./components/LoadFromFEN.tsx";
import CurrentFEN from "./components/CurrentFEN.tsx";

export default function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <LoadFromFEN />
        <CurrentFEN />
        <Game />
      </div>
    </div>
  );
}
