export function isValidFenBoard(board: string) {
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
  return true;
}

export function isValidFenCastlingRights(castlingRights: string) {
  if (castlingRights === "-") return true;
  if (castlingRights.length < 1 || castlingRights.length > 4) return false;
  let possibleChars = ["K", "Q", "k", "q"];
  for (let i = 0; i < castlingRights.length; i++) {
    const charIndex = possibleChars.indexOf(castlingRights[i]);
    if (charIndex !== -1) possibleChars.splice(0, charIndex + 1);
    else return false;
  }
  return true;
}

export function isValidFenEnPassantTarget(enPassantTarget: string) {
  if (enPassantTarget === "-") return true;
  if (
    enPassantTarget.length === 2 &&
    (enPassantTarget[0] === "a" ||
      enPassantTarget[0] === "b" ||
      enPassantTarget[0] === "c" ||
      enPassantTarget[0] === "d" ||
      enPassantTarget[0] === "e" ||
      enPassantTarget[0] === "f" ||
      enPassantTarget[0] === "g" ||
      enPassantTarget[0] === "h") &&
    (enPassantTarget[1] === "3" || enPassantTarget[1] === "6")
  )
    return true;
  else return false;
}

export function isValidFenHalfmoveClock(halfmoveClock: string) {
  if (halfmoveClock.length < 1 || halfmoveClock.length > 6) return false;
  if (halfmoveClock.length > 1 && halfmoveClock[0] === "0") return false;
  for (let i = 0; i < halfmoveClock.length; i++)
    if (
      halfmoveClock[i] !== "0" &&
      halfmoveClock[i] !== "1" &&
      halfmoveClock[i] !== "2" &&
      halfmoveClock[i] !== "3" &&
      halfmoveClock[i] !== "4" &&
      halfmoveClock[i] !== "5" &&
      halfmoveClock[i] !== "6" &&
      halfmoveClock[i] !== "7" &&
      halfmoveClock[i] !== "8" &&
      halfmoveClock[i] !== "9"
    )
      return false;
  return true;
}

export function isValidFenFullmoveNumber(fullmoveNumber: string) {
  if (
    fullmoveNumber.length < 1 ||
    fullmoveNumber.length > 6 ||
    fullmoveNumber[0] === "0"
  )
    return false;
  for (let i = 0; i < fullmoveNumber.length; i++)
    if (
      fullmoveNumber[i] !== "0" &&
      fullmoveNumber[i] !== "1" &&
      fullmoveNumber[i] !== "2" &&
      fullmoveNumber[i] !== "3" &&
      fullmoveNumber[i] !== "4" &&
      fullmoveNumber[i] !== "5" &&
      fullmoveNumber[i] !== "6" &&
      fullmoveNumber[i] !== "7" &&
      fullmoveNumber[i] !== "8" &&
      fullmoveNumber[i] !== "9"
    )
      return false;
  return true;
}

export function isValidFen(fen: string) {
  const fields = fen.split(" ");
  if (fields.length !== 6) return false;
  if (!isValidFenBoard(fields[0])) return false;
  if (fields[1] !== "w" && fields[1] !== "b") return false;
  if (!isValidFenCastlingRights(fields[2])) return false;
  if (!isValidFenEnPassantTarget(fields[3])) return false;
  if (!isValidFenHalfmoveClock(fields[4])) return false;
  if (!isValidFenFullmoveNumber(fields[5])) return false;
  return true;
}
