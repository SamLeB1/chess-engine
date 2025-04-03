function isValidFenBoard(board: string) {
  const rows = board.split("/");
  if (rows.length !== 8) return false;
  for (let i = 0; i < rows.length; i++) {
    let sum = 0;
    for (let j = 0; j < rows[i].length; j++) {
      const char = rows[i][j];
      if (
        char !== "p" &&
        char !== "P" &&
        char !== "r" &&
        char !== "R" &&
        char !== "n" &&
        char !== "N" &&
        char !== "b" &&
        char !== "B" &&
        char !== "q" &&
        char !== "Q" &&
        char !== "k" &&
        char !== "K" &&
        char !== "1" &&
        char !== "2" &&
        char !== "3" &&
        char !== "4" &&
        char !== "5" &&
        char !== "6" &&
        char !== "7" &&
        char !== "8"
      )
        return false;
      if (Number(char)) sum += Number(char);
      else sum += 1;
    }
    if (sum !== 8) return false;
  }
}

function isValidFen(fen: string) {
  const fields = fen.split(" ");
  if (fields.length !== 6) return false;
}
