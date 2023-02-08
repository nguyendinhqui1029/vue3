import { Advisor, Cannon, Chariot, Chessman, Elephant, General, Horse, Soldier } from "./chinese-chess.model";

export class ChineseChessGame {
  BOX_BLACK = 1;
  BOX_RED = 2;
  BOX_EMPTY = 0;
  col = 9;
  row = 10;
  chessBoard = [];
  chessSelected = null;
  constructor() {
    this.initializeChessBoard();
  }

  initializeChessBoard() {
    for (let i = 0; i < this.col; i++) {
      const rows = [];
      for (let j = 0; j < this.row; j++) {
        const chessBox = new Chessman(0, this.BOX_EMPTY, '');
        chessBox.setPositionInitialize(j, i);
        rows.push(chessBox);
      }
      this.chessBoard.push(rows);
    }
    // Tướng
    const generalBlack = new General(900, 0, 4, this.BOX_BLACK, 'general-black');
    this.chessBoard[generalBlack.y][generalBlack.x] = generalBlack;
    const generalRed = new General(-900, 9, 4, this.BOX_RED, 'general-red');
    this.chessBoard[generalRed.y][generalRed.x] = generalRed;

    //Quân Sĩ
    const advisorBlackLeft = new Advisor(20, 0, 3, this.BOX_BLACK, 'advisor-black');
    this.chessBoard[advisorBlackLeft.y][advisorBlackLeft.x] = advisorBlackLeft;
    const advisorBlackRight = new Advisor(20, 0, 5, this.BOX_BLACK, 'advisor-black');
    this.chessBoard[advisorBlackRight.y][advisorBlackRight.x] = advisorBlackRight;
    const advisorRedLeft = new Advisor(-20, 9, 3, this.BOX_RED, 'advisor-red');
    this.chessBoard[advisorRedLeft.y][advisorRedLeft.x] = advisorRedLeft;
    const advisorRedRight = new Advisor(-20, 9, 5, this.BOX_RED, 'advisor-red');
    this.chessBoard[advisorRedRight.y][advisorRedRight.x] = advisorRedRight;

    //Quân Tượng
    const elephantBlackLeft = new Elephant(20, 0, 2, this.BOX_BLACK, 'elephant-black');
    this.chessBoard[elephantBlackLeft.y][elephantBlackLeft.x] = elephantBlackLeft;

    const elephantBlackRight = new Elephant(20, 0, 6, this.BOX_BLACK, 'elephant-black');
    this.chessBoard[elephantBlackRight.y][elephantBlackRight.x] = elephantBlackRight;

    const elephantRedLeft = new Elephant(-20, 9, 2, this.BOX_RED, 'elephant-red');
    this.chessBoard[elephantRedLeft.y][elephantRedLeft.x] = elephantRedLeft;

    const elephantRedRight = new Elephant(-20, 9, 6, this.BOX_RED, 'elephant-red');
    this.chessBoard[elephantRedRight.y][elephantRedRight.x] = elephantRedRight;


    // Xe
    const chariotBlackLeft = new Chariot(90, 0, 0, this.BOX_BLACK, 'chariot-black');
    this.chessBoard[chariotBlackLeft.y][chariotBlackLeft.x] = chariotBlackLeft;

    const chariotBlackRight = new Chariot(90, 0, 8, this.BOX_BLACK, 'chariot-black');
    this.chessBoard[chariotBlackRight.y][chariotBlackRight.x] = chariotBlackRight;

    const chariotRedLeft = new Chariot(-90, 9, 0, this.BOX_RED, 'chariot-red');
    this.chessBoard[chariotRedLeft.y][chariotRedLeft.x] = chariotRedLeft;

    const chariotRedRight = new Chariot(-90, 9, 8, this.BOX_RED, 'chariot-red');
    this.chessBoard[chariotRedRight.y][chariotRedRight.x] = chariotRedRight;


    //Quân Pháo
    const cannonBlackLeft = new Cannon(45, 2, 1, this.BOX_BLACK, 'cannon-black');
    this.chessBoard[cannonBlackLeft.y][cannonBlackLeft.x] = cannonBlackLeft;

    const cannonBlackRight = new Cannon(45, 2, 7, this.BOX_BLACK, 'cannon-black');
    this.chessBoard[cannonBlackRight.y][cannonBlackRight.x] = cannonBlackRight;

    const cannonRedLeft = new Cannon(-45, 7, 1, this.BOX_RED, 'cannon-red');
    this.chessBoard[cannonRedLeft.y][cannonRedLeft.x] = cannonRedLeft;

    const cannonRedRight = new Cannon(-45, 7, 7, this.BOX_RED, 'cannon-red');
    this.chessBoard[cannonRedRight.y][cannonRedRight.x] = cannonRedRight;

    // Mã
    const horseBlackLeft = new Horse(40, 0, 1, this.BOX_BLACK, 'horse-black');
    this.chessBoard[horseBlackLeft.y][horseBlackLeft.x] = horseBlackLeft;

    const horseBlackRight = new Horse(40, 0, 7, this.BOX_BLACK, 'horse-black');
    this.chessBoard[horseBlackRight.y][horseBlackRight.x] = horseBlackRight;

    const horseRedLeft = new Horse(-40, 9, 1, this.BOX_RED, 'horse-red');
    this.chessBoard[horseRedLeft.y][horseRedLeft.x] = horseRedLeft;

    const horseRedRight = new Horse(-40, 9, 7, this.BOX_RED, 'horse-red');
    this.chessBoard[horseRedRight.y][horseRedRight.x] = horseRedRight;


    //Quân Tốt
    const soldierBlackOne = new Soldier(15, 3, 0, this.BOX_BLACK, 'soldier-black');
    this.chessBoard[soldierBlackOne.y][soldierBlackOne.x] = soldierBlackOne;

    const soldierBlackTwo = new Soldier(15, 3, 2, this.BOX_BLACK, 'soldier-black');
    this.chessBoard[soldierBlackTwo.y][soldierBlackTwo.x] = soldierBlackTwo;

    const soldierBlackThree = new Soldier(15, 3, 4, this.BOX_BLACK, 'soldier-black');
    this.chessBoard[soldierBlackThree.y][soldierBlackThree.x] = soldierBlackThree;

    const soldierBlackFour = new Soldier(15, 3, 6, this.BOX_BLACK, 'soldier-black');
    this.chessBoard[soldierBlackFour.y][soldierBlackFour.x] = soldierBlackFour;

    const soldierBlackFive = new Soldier(15, 3, 8, this.BOX_BLACK, 'soldier-black');
    this.chessBoard[soldierBlackFive.y][soldierBlackFive.x] = soldierBlackFive;

    const soldierRedOne = new Soldier(-15, 6, 0, this.BOX_RED, 'soldier-red');
    this.chessBoard[soldierRedOne.y][soldierRedOne.x] = soldierRedOne;

    const soldierRedTwo = new Soldier(-15, 6, 2, this.BOX_RED, 'soldier-red');
    this.chessBoard[soldierRedTwo.y][soldierRedTwo.x] = soldierRedTwo;

    const soldierRedThree = new Soldier(-15, 6, 4, this.BOX_RED, 'soldier-red');
    this.chessBoard[soldierRedThree.y][soldierRedThree.x] = soldierRedThree;

    const soldierRedFour = new Soldier(-15, 6, 6, this.BOX_RED, 'soldier-red');
    this.chessBoard[soldierRedFour.y][soldierRedFour.x] = soldierRedFour;

    const soldierRedFive = new Soldier(-15, 6, 8, this.BOX_RED, 'soldier-red');
    this.chessBoard[soldierRedFive.y][soldierRedFive.x] = soldierRedFive;

  }

  chessBoxClick(chessBox) {
    this.moveTo(chessBox);
  }

  moveTo(chessBox) {
    if (this.chessSelected) {
      if (this.chessSelected.chessType === this.BOX_EMPTY || (this.chessSelected.x === chessBox.x && this.chessSelected.y === chessBox.y)) {
        this.chessSelected.isActive = false;
        this.chessSelected = null;
        return;
      }
      if (chessBox.chessType === this.chessSelected.chessType) {
        this.chessBoard[this.chessSelected.y][this.chessSelected.x].isActive = false;
        chessBox.isActive = true;
        this.chessSelected = chessBox;
        this.chessBoard[chessBox.y][chessBox.x] = chessBox;
      } else if (chessBox.chessType !== this.chessSelected.chessType) {
        const emptyBox = new Chessman(0, 0, '');
        emptyBox.setPositionInitialize(this.chessSelected.x, this.chessSelected.y);
        this.chessBoard[this.chessSelected.y][this.chessSelected.x] = emptyBox;
        this.chessSelected.setPositionInitialize(chessBox.x, chessBox.y);
        this.chessSelected.isActive = false;
        this.chessBoard[chessBox.y][chessBox.x] = this.chessSelected;
        this.chessSelected = null;
      } else return;
    } else {
      chessBox.isActive = true;
      this.chessSelected = chessBox;
      this.chessBoard[chessBox.y][chessBox.x] = chessBox;
    }
  }

  // evaluateBoard(board) {
  //   var totalEvaluation = 0;
  //   for (var i = 0; i < this.row; i++) {
  //     for (var j = 0; j < this.col; j++) {
  //       totalEvaluation = totalEvaluation + this.getPieceValue(board[i][j], i, j);
  //     }
  //   }
  //   return totalEvaluation;
  // }


  // getPieceValue(piece, x, y) {
  //   if (piece || piece.value === 0) {
  //     return 0;
  //   }
  //   var getAbsoluteValue = function (piece, isRed, x, y) {
  //     if (piece.type === 'p') { //chốt
  //       return 15 + (isRed ? pEvalRed[x][y] : pEvalBlack[x][y]);
  //     } else if (piece.type === 'r') { //Xe
  //       return 90 + (isRed ? rEvalRed[x][y] : rEvalBlack[x][y]);
  //     } else if (piece.type === 'c') { //pháo
  //       return 45 + (isRed ? cEvalRed[x][y] : cEvalBlack[x][y]);
  //     } else if (piece.type === 'n') { // mã
  //       return 40 + (isRed ? nEvalRed[x][y] : nEvalBlack[x][y]);
  //     } else if (piece.type === 'b') { // tượng
  //       return 20 + (isRed ? bEvalRed[x][y] : bEvalBlack[x][y]);
  //     } else if (piece.type === 'a') { // sỹ
  //       return 20 + (isRed ? aEvalRed[x][y] : aEvalBlack[x][y]);
  //     } else if (piece.type === 'k') { // tướng
  //       return 900 + (isRed ? kEvalRed[x][y] : kEvalBlack[x][y]);
  //     }
  //     throw "Unknown piece type: " + piece.type;
  //   };

  //   var absoluteValue = getAbsoluteValue(piece, piece.chessType === this.BOX_RED, x, y);
  //   return piece.chessType === this.BOX_RED ? absoluteValue : -absoluteValue;
  // }
}