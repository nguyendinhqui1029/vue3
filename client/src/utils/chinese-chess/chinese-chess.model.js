import { CHESS_TYPE } from "./chinese-chess.constant";

export class Chessman {
  value = 0;
  icon = '';
  x = 0;
  y = 0;
  chessType = CHESS_TYPE.BOX_EMPTY;
  isActive = false;
  markMove = false;
  constructor(value, chessType, icon) {
    this.value = value;
    this.chessType = chessType;
    this.icon = icon;
  }
  setPositionInitialize(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Quân tướng
export class General extends Chessman {
  boxAllowMove = {
    black: [
      { start: { x: 0, y: 3 }, end: [{ x: 0, y: 4 }, { x: 1, y: 3 }] },
      { start: { x: 0, y: 4 }, end: [{ x: 0, y: 3 }, { x: 0, y: 5 }, { x: 1, y: 4 }] },
      { start: { x: 0, y: 5 }, end: [{ x: 0, y: 4 }, { x: 1, y: 5 }] },
      { start: { x: 1, y: 3 }, end: [{ x: 0, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 4 }] },
      { start: { x: 1, y: 4 }, end: [{ x: 1, y: 3 }, { x: 1, y: 5 }, { x: 2, y: 4 }, { x: 0, y: 4 }] },
      { start: { x: 1, y: 5 }, end: [{ x: 0, y: 5 }, { x: 2, y: 5 }, { x: 1, y: 4 }] },
      { start: { x: 2, y: 3 }, end: [{ x: 1, y: 3 }, { x: 2, y: 4 }] },
      { start: { x: 2, y: 4 }, end: [{ x: 2, y: 3 }, { x: 1, y: 4 }, { x: 2, y: 5 }] },
      { start: { x: 2, y: 5 }, end: [{ x: 1, y: 5 }, { x: 2, y: 4 }] }
    ],
    red: [
      { start: { x: 7, y: 3 }, end: [{ x: 7, y: 4 }, { x: 8, y: 3 }] },
      { start: { x: 7, y: 4 }, end: [{ x: 7, y: 3 }, { x: 7, y: 5 }, { x: 8, y: 4 }] },
      { start: { x: 7, y: 5 }, end: [{ x: 7, y: 4 }, { x: 8, y: 5 }] },
      { start: { x: 8, y: 3 }, end: [{ x: 7, y: 3 }, { x: 9, y: 3 }, { x: 8, y: 4 }] },
      { start: { x: 8, y: 4 }, end: [{ x: 8, y: 3 }, { x: 8, y: 5 }, { x: 7, y: 4 }, { x: 9, y: 4 }] },
      { start: { x: 8, y: 5 }, end: [{ x: 9, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 4 }] },
      { start: { x: 9, y: 3 }, end: [{ x: 8, y: 3 }, { x: 9, y: 4 }] },
      { start: { x: 9, y: 4 }, end: [{ x: 9, y: 3 }, { x: 8, y: 4 }, { x: 9, y: 5 }] },
      { start: { x: 9, y: 5 }, end: [{ x: 8, y: 5 }, { x: 9, y: 4 }] }
    ]
  }
  constructor(value, x, y, chessType, icon) {
    super(value, chessType, icon);
    this.setPositionInitialize(x, y)
  }

  isMove(previouslyChessman, currentChessman, chessBoard) {
    console.log(chessBoard);
    if (previouslyChessman.chessType === currentChessman.chessType) {
      previouslyChessman.isActive = false;
      currentChessman.isActive = true;
      return false;
    }
    if (previouslyChessman.chessType === CHESS_TYPE.BOX_BLACK) {
      const chessFlow = this.boxAllowMove.black.find(chessBlack => {
        return chessBlack.start.x === previouslyChessman.x && chessBlack.start.y === previouslyChessman.y;
      });
      const isAllowMove = chessFlow && chessFlow.end.find(chess => chess.x === currentChessman.x && chess.y === currentChessman.y);
      if (currentChessman.chessType !== previouslyChessman.chessType && !!isAllowMove) {
        return true;
      }
    } else if (previouslyChessman.chessType === CHESS_TYPE.BOX_RED) {
      const chessFlow = this.boxAllowMove.red.find(chessRed => {
        return chessRed.start.x === previouslyChessman.x && chessRed.start.y === previouslyChessman.y;
      });
      const isAllowMove = chessFlow && chessFlow.end.find(chess => chess.x === currentChessman.x && chess.y === currentChessman.y);
      if (currentChessman.chessType !== previouslyChessman.chessType && !!isAllowMove) {
        return true;
      }
    } else return false;
  }
}

//Quân Sĩ
export class Advisor extends Chessman {
  boxAllowMove = {
    black: [
      { start: { x: 0, y: 3 }, end: [{ x: 1, y: 4 }] },
      { start: { x: 0, y: 5 }, end: [{ x: 1, y: 4 }] },
      { start: { x: 1, y: 4 }, end: [{ x: 0, y: 3 }, { x: 0, y: 5 }, { x: 2, y: 3 }, { x: 2, y: 5 }] },
      { start: { x: 2, y: 3 }, end: [{ x: 1, y: 4 }] },
      { start: { x: 2, y: 5 }, end: [{ x: 1, y: 4 }] }
    ],
    red: [
      { start: { x: 9, y: 3 }, end: [{ x: 8, y: 4 }] },
      { start: { x: 9, y: 5 }, end: [{ x: 8, y: 4 }] },
      { start: { x: 8, y: 4 }, end: [{ x: 9, y: 3 }, { x: 9, y: 5 }, { x: 7, y: 3 }, { x: 7, y: 5 }] },
      { start: { x: 7, y: 3 }, end: [{ x: 8, y: 4 }] },
      { start: { x: 7, y: 5 }, end: [{ x: 8, y: 4 }] }
    ]
  }
  constructor(value, x, y, chessType, icon) {
    super(value, chessType, icon);
    this.setPositionInitialize(x, y)
  }
  isMove(previouslyChessman, currentChessman, chessBoard) {
    console.log(chessBoard);
    if (previouslyChessman.chessType === currentChessman.chessType) {
      previouslyChessman.isActive = false;
      currentChessman.isActive = true;
      return false;
    }
    if (previouslyChessman.chessType === CHESS_TYPE.BOX_BLACK) {
      const chessFlow = this.boxAllowMove.black.find(chessBlack => {
        return chessBlack.start.x === previouslyChessman.x && chessBlack.start.y === previouslyChessman.y;
      });
      const isAllowMove = chessFlow && chessFlow.end.find(chess => chess.x === currentChessman.x && chess.y === currentChessman.y);
      if (currentChessman.chessType !== previouslyChessman.chessType && !!isAllowMove) {
        return true;
      }
    } else if (previouslyChessman.chessType === CHESS_TYPE.BOX_RED) {
      const chessFlow = this.boxAllowMove.red.find(chessRed => {
        return chessRed.start.x === previouslyChessman.x && chessRed.start.y === previouslyChessman.y;
      });
      const isAllowMove = chessFlow && chessFlow.end.find(chess => chess.x === currentChessman.x && chess.y === currentChessman.y);
      if (currentChessman.chessType !== previouslyChessman.chessType && !!isAllowMove) {
        return true;
      }
    } else return false;
  }
}

//Quân Xe
export class Chariot extends Chessman {

  constructor(value, x, y, chessType, icon) {
    super(value, chessType, icon);
    this.setPositionInitialize(x, y)
  }
  isMove() {
    return true;
  }
}

//Quân Pháo
export class Cannon extends Chessman {

  constructor(value, x, y, chessType, icon) {
    super(value, chessType, icon);
    this.setPositionInitialize(x, y)
  }
  isMove() {
    return true;
  }
}

//Quân Tượng
export class Elephant extends Chessman {
  boxAllowMove = {
    black: [
      { start: { x: 0, y: 2 }, end: [{ x: 2, y: 0 },{ x: 2, y: 4 }] },
      { start: { x: 0, y: 6 }, end: [{ x: 2, y: 8 },{ x: 2, y: 4 }] },
      { start: { x: 2, y: 0 }, end: [{ x: 4, y: 2 },{ x: 0, y: 2 }] },
      { start: { x: 2, y: 4 }, end: [{ x: 0, y: 2 },{ x: 4, y: 2 },{ x: 4, y: 6 },{ x: 0, y: 6 }] },
      { start: { x: 2, y: 8 }, end: [{ x: 4, y: 6 },{ x: 0, y: 6 }] },
      { start: { x: 4, y: 2 }, end: [{ x: 2, y: 0 },{ x: 2, y: 4 }] },
      { start: { x: 4, y: 6 }, end: [{ x: 2, y: 8 },{ x: 2, y: 4 }] }
    ],
    red: [
      { start: { x: 9, y: 2 }, end: [{ x: 7, y: 0 },{ x: 7, y: 4 }] },
      { start: { x: 9, y: 6 }, end: [{ x: 7, y: 8 },{ x: 7, y: 4 }] },
      { start: { x: 7, y: 0 }, end: [{ x: 9, y: 2 },{ x: 5, y: 2 }] },
      { start: { x: 7, y: 4 }, end: [{ x: 5, y: 2 },{ x: 9, y: 2 },{ x: 9, y: 6 },{ x: 5, y: 6 }] },
      { start: { x: 7, y: 8 }, end: [{ x: 5, y: 6 },{ x: 9, y: 6 }] },
      { start: { x: 5, y: 2 }, end: [{ x: 7, y: 0 },{ x: 7, y: 4 }] },
      { start: { x: 5, y: 6 }, end: [{ x: 7, y: 8 },{ x: 7, y: 4 }] }
    ]
  }
  constructor(value, x, y, chessType, icon) {
    super(value, chessType, icon);
    this.setPositionInitialize(x, y)
  }
  isMove(previouslyChessman, currentChessman, chessBoard) {
    if(chessBoard[(previouslyChessman.y+currentChessman.y)/2][(previouslyChessman.x+currentChessman.x)/2].chessType !== CHESS_TYPE.BOX_EMPTY) return false;
    if (previouslyChessman.chessType === currentChessman.chessType) {
      previouslyChessman.isActive = false;
      currentChessman.isActive = true;
      return false;
    }
    if (previouslyChessman.chessType === CHESS_TYPE.BOX_BLACK) {
      const chessFlow = this.boxAllowMove.black.find(chessBlack => {
        return chessBlack.start.x === previouslyChessman.x && chessBlack.start.y === previouslyChessman.y;
      });
      const isAllowMove = chessFlow && chessFlow.end.find(chess => chess.x === currentChessman.x && chess.y === currentChessman.y);
      if (currentChessman.chessType !== previouslyChessman.chessType && !!isAllowMove) {
        return true;
      }
    } else if (previouslyChessman.chessType === CHESS_TYPE.BOX_RED) {
      const chessFlow = this.boxAllowMove.red.find(chessRed => {
        return chessRed.start.x === previouslyChessman.x && chessRed.start.y === previouslyChessman.y;
      });
      const isAllowMove = chessFlow && chessFlow.end.find(chess => chess.x === currentChessman.x && chess.y === currentChessman.y);
      if (currentChessman.chessType !== previouslyChessman.chessType && !!isAllowMove) {
        return true;
      }
    } else return false;
  }
}

//Quân Mã
export class Horse extends Chessman {
  boxAllowMove = { black: [], red: [] };
  constructor(value, x, y, chessType, icon) {
    super(value, chessType, icon);
    this.setPositionInitialize(x, y)
  }
  setPositionInitialize(x, y) {
    super.setPositionInitialize(x, y);
    this.getMoveRule();
  }
  getMoveRule() {
    this.boxAllowMove = { black: [], red: [] };
    if (this.chessType === CHESS_TYPE.BOX_BLACK) {
      const listEnd = [];
      if(this.x === 0) {
        listEnd.push({ x: this.x + 2  , y: this.y + 1 });
        listEnd.push({ x: this.x + 2  , y: this.y - 1 });
      }
      if(this.x === 0) {
        listEnd.push({ x: this.x + 2  , y: this.y + 1 });
        listEnd.push({ x: this.x + 2  , y: this.y - 1 });
      }
      listEnd.push();
      this.boxAllowMove.black.push({
        start: { x: this.x, y: this.y },
        end: [
          { x: this.x + 2  , y: this.y + 1 },
          { x: this.x + 2, y: this.y - 1 },
          { x: this.x - 2, y: this.y + 1 },
          { x: this.x - 2, y: this.y - 1},
          { x: this.x + 1, y: this.y - 2},
          { x: this.x - 1, y: this.y - 2},
          { x: this.x - 1, y: this.y + 2},
          { x: this.x + 1, y: this.y + 2}
        ]
      });
    } else if (this.chessType === CHESS_TYPE.BOX_RED) {
      this.boxAllowMove.red.push({
        start: { x: this.x, y: this.y },
        end: [
          { x: this.x + 2  , y: this.y + 1 },
          { x: this.x + 2, y: this.y - 1 },
          { x: this.x - 2, y: this.y + 1 },
          { x: this.x - 2, y: this.y - 1},
          { x: this.x + 1, y: this.y - 2},
          { x: this.x - 1, y: this.y - 2},
          { x: this.x - 1, y: this.y + 2},
          { x: this.x + 1, y: this.y + 2}
        ]
      });
    }
  }
  isMove(previouslyChessman, currentChessman, chessBoard) {
    console.log(chessBoard);
    if (previouslyChessman.chessType === currentChessman.chessType) {
      previouslyChessman.isActive = false;
      currentChessman.isActive = true;
      return false;
    }
    if (previouslyChessman.chessType === CHESS_TYPE.BOX_BLACK) {
      const chessFlow = this.boxAllowMove.black.find(chessBlack => {
        return chessBlack.start.x === previouslyChessman.x && chessBlack.start.y === previouslyChessman.y;
      });
      const isAllowMove = chessFlow && chessFlow.end.find(chess => chess.x === currentChessman.x && chess.y === currentChessman.y);
      if (currentChessman.chessType !== previouslyChessman.chessType && !!isAllowMove) {
        return true;
      }
    } else if (previouslyChessman.chessType === CHESS_TYPE.BOX_RED) {
      const chessFlow = this.boxAllowMove.red.find(chessRed => {
        return chessRed.start.x === previouslyChessman.x && chessRed.start.y === previouslyChessman.y;
      });
      const isAllowMove = chessFlow && chessFlow.end.find(chess => chess.x === currentChessman.x && chess.y === currentChessman.y);
      if (currentChessman.chessType !== previouslyChessman.chessType && !!isAllowMove) {
        return true;
      }
    } else return false;
  }
}

//Quân Tốt
export class Soldier extends Chessman {
  boxAllowMove = { black: [], red: [] }
  constructor(value, x, y, chessType, icon) {
    super(value, chessType, icon);
    this.setPositionInitialize(x, y);
  }
  setPositionInitialize(x, y) {
    super.setPositionInitialize(x, y);
    this.getMoveRule();
  }

  getMoveRule() {
    this.boxAllowMove = { black: [], red: [] };
    if (this.chessType === CHESS_TYPE.BOX_BLACK) {
      this.boxAllowMove.black.push({
        start: { x: this.x, y: this.y },
        end: this.x < 5 ? [
          { x: this.x + 1, y: this.y }
        ] : [
          { x: this.x + 1, y: this.y },
          { x: this.x, y: this.y === 8 ? this.y : this.y + 1 },
          { x: this.x, y: this.y === 0 ? this.y : this.y - 1 }
        ]
      });
    } else if (this.chessType === CHESS_TYPE.BOX_RED) {
      this.boxAllowMove.red.push({
        start: { x: this.x, y: this.y },
        end: this.x > 4 ? [
          { x: this.x - 1, y: this.y }
        ] : [
          { x: this.x === 0 ? this.x : this.x - 1, y: this.y },
          { x: this.x, y: this.y === 8 ? this.y : this.y + 1 },
          { x: this.x, y: this.y === 0 ? this.y : this.y - 1 }
        ]
      });
    }
  }
  isMove(previouslyChessman, currentChessman, chessBoard) {
    console.log(chessBoard);
    if (previouslyChessman.chessType === currentChessman.chessType) {
      previouslyChessman.isActive = false;
      currentChessman.isActive = true;
      return false;
    }
    if (previouslyChessman.chessType === CHESS_TYPE.BOX_BLACK) {
      const chessFlow = this.boxAllowMove.black.find(chessBlack => {
        return chessBlack.start.x === previouslyChessman.x && chessBlack.start.y === previouslyChessman.y;
      });
      const isAllowMove = chessFlow && chessFlow.end.find(chess => chess.x === currentChessman.x && chess.y === currentChessman.y);
      if (currentChessman.chessType !== previouslyChessman.chessType && !!isAllowMove) {
        return true;
      }
    } else if (previouslyChessman.chessType === CHESS_TYPE.BOX_RED) {
      const chessFlow = this.boxAllowMove.red.find(chessRed => {
        return chessRed.start.x === previouslyChessman.x && chessRed.start.y === previouslyChessman.y;
      });
      const isAllowMove = chessFlow && chessFlow.end.find(chess => chess.x === currentChessman.x && chess.y === currentChessman.y);
      if (currentChessman.chessType !== previouslyChessman.chessType && !!isAllowMove) {
        return true;
      }
    } else return false;
  }
}