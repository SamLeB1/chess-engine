export type Index = {
  i: number;
  j: number;
};

export type Direction = {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
};

export type Piece =
  | "w0"
  | "w1"
  | "w2"
  | "w3"
  | "w4"
  | "w5"
  | "b0"
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "b5";

export type Promotion = "1" | "2" | "3" | "4";

export type CastlingRights = {
  w: {
    kingside: boolean;
    queenside: boolean;
  };
  b: {
    kingside: boolean;
    queenside: boolean;
  };
};

export type CastlingRightsPlayer = {
  kingside: boolean;
  queenside: boolean;
};
