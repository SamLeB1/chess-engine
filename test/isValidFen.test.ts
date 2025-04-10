import { describe, it, expect } from "vitest";
import {
  isValidFenBoard,
  isValidFenCastlingRights,
  isValidFenEnPassantTarget,
  isValidFenHalfmoveClock,
  isValidFenFullmoveNumber,
  isValidFen,
} from "../src/utils/isValidFen.ts";

describe("isValidFenBoard", () => {
  it("should return false if not 8 rows", () => {
    expect(isValidFenBoard("")).toBe(false);
    expect(isValidFenBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP")).toBe(false);
  });

  it("should return false if invalid char", () => {
    expect(
      isValidFenBoard("0rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"),
    ).toBe(false);
    expect(
      isValidFenBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR9"),
    ).toBe(false);
    expect(
      isValidFenBoard("rnbqkbnr/pppppppp/8a/8/8/8/PPPPPPPP/RNBQKBNR"),
    ).toBe(false);
  });

  it("should return false if row sum not 8", () => {
    expect(
      isValidFenBoard("1rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"),
    ).toBe(false);
    expect(isValidFenBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBN")).toBe(
      false,
    );
    expect(isValidFenBoard("rnbqkbnr/pppppppp/7/8/8/8/PPPPPPPP/RNBQKBNR")).toBe(
      false,
    );
  });

  it("should return true if valid", () => {
    expect(isValidFenBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")).toBe(
      true,
    );
    expect(
      isValidFenBoard("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR"),
    ).toBe(true);
    expect(
      isValidFenBoard("rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR"),
    ).toBe(true);
    expect(
      isValidFenBoard("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R"),
    ).toBe(true);
  });
});

describe("isValidFenCastlingRights", () => {
  it("should return true if -", () => {
    expect(isValidFenCastlingRights("-")).toBe(true);
  });

  it("should return false if length smaller than 1 or bigger than 4", () => {
    expect(isValidFenCastlingRights("")).toBe(false);
    expect(isValidFenCastlingRights("KQkqq")).toBe(false);
  });

  it("should return false if invalid format", () => {
    expect(isValidFenCastlingRights("qkQK")).toBe(false);
    expect(isValidFenCastlingRights("QKkq")).toBe(false);
    expect(isValidFenCastlingRights("KQqk")).toBe(false);
    expect(isValidFenCastlingRights("KK")).toBe(false);
  });

  it("should return true if valid", () => {
    expect(isValidFenCastlingRights("q")).toBe(true);
    expect(isValidFenCastlingRights("kq")).toBe(true);
    expect(isValidFenCastlingRights("Qkq")).toBe(true);
    expect(isValidFenCastlingRights("KQkq")).toBe(true);
  });
});

describe("isValidFenEnPassantTarget", () => {
  it("should return true if -", () => {
    expect(isValidFenEnPassantTarget("-")).toBe(true);
  });

  it("should return false if length not 2", () => {
    expect(isValidFenEnPassantTarget("")).toBe(false);
    expect(isValidFenEnPassantTarget("a")).toBe(false);
    expect(isValidFenEnPassantTarget("a33")).toBe(false);
  });

  it("should return false if invalid char", () => {
    expect(isValidFenEnPassantTarget("z3")).toBe(false);
    expect(isValidFenEnPassantTarget("a1")).toBe(false);
    expect(isValidFenEnPassantTarget("3a")).toBe(false);
  });

  it("should return true if valid", () => {
    expect(isValidFenEnPassantTarget("a3")).toBe(true);
    expect(isValidFenEnPassantTarget("h6")).toBe(true);
  });
});

describe("isValidFenHalfmoveClock", () => {
  it("should return false if length smaller than 1 or bigger than 6", () => {
    expect(isValidFenHalfmoveClock("")).toBe(false);
    expect(isValidFenHalfmoveClock("1234567")).toBe(false);
  });

  it("should return false if length bigger than 1 and starts with 0", () => {
    expect(isValidFenHalfmoveClock("01")).toBe(false);
  });

  it("should return false if invalid char", () => {
    expect(isValidFenHalfmoveClock("-1")).toBe(false);
    expect(isValidFenHalfmoveClock("123a")).toBe(false);
  });

  it("should return true if valid", () => {
    expect(isValidFenHalfmoveClock("0")).toBe(true);
    expect(isValidFenHalfmoveClock("100")).toBe(true);
    expect(isValidFenHalfmoveClock("123456")).toBe(true);
  });
});

describe("isValidFenFullmoveNumber", () => {
  it("should return false if length smaller than 1 or bigger than 6", () => {
    expect(isValidFenFullmoveNumber("")).toBe(false);
    expect(isValidFenFullmoveNumber("1234567")).toBe(false);
  });

  it("should return false if start is 0", () => {
    expect(isValidFenFullmoveNumber("0")).toBe(false);
    expect(isValidFenFullmoveNumber("01")).toBe(false);
  });

  it("should return false if invalid char", () => {
    expect(isValidFenFullmoveNumber("-1")).toBe(false);
    expect(isValidFenFullmoveNumber("123a")).toBe(false);
  });

  it("should return true if valid", () => {
    expect(isValidFenFullmoveNumber("1")).toBe(true);
    expect(isValidFenFullmoveNumber("100")).toBe(true);
    expect(isValidFenFullmoveNumber("123456")).toBe(true);
  });
});

describe("isValidFen", () => {
  it("should return false if not 6 fields", () => {
    expect(isValidFen("")).toBe(false);
    expect(
      isValidFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0"),
    ).toBe(false);
    expect(
      isValidFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 1"),
    ).toBe(false);
  });

  it("should return false if invalid turn", () => {
    expect(
      isValidFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR a KQkq - 0 1"),
    ).toBe(false);
  });

  it("should return true if valid", () => {
    expect(
      isValidFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),
    ).toBe(true);
    expect(
      isValidFen("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"),
    ).toBe(true);
    expect(
      isValidFen(
        "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2",
      ),
    ).toBe(true);
    expect(
      isValidFen(
        "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
      ),
    ).toBe(true);
  });
});
