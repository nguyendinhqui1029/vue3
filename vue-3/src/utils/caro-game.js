
class ChessBox {
  constructor(x, y, value, disable) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.disable = disable;
  }
}
export class CaroGame {
   BOARD_WIDTH = 3;
   BOARD_HEIGHT = 3;
   NO_PLAYER = '';
   PLAYER_X = 1;
   PLAYER_O = 2;
   AMOUNT_WIN = 3;
   computerMove = new ChessBox();
   board = [];
  getChessBoard() {
    return this.board;
  }
  renderChessBoard() {
    this.board = [];
    for (let i = 0; i < this.BOARD_HEIGHT; i++) {
      const rows = [];
      for (let j = 0; j < this.BOARD_WIDTH; j++) {
        rows.push(new ChessBox(i, j, this.NO_PLAYER, false));
      }
      this.board.push(rows);
    }
  }

  getCellEmpty() {
    const cellEmpties = [];
    for (let i = 0; i < this.BOARD_HEIGHT; i++) {
      for (let j = 0; j < this.BOARD_WIDTH; j++) {
        if(this.board[i][j].value === this.NO_PLAYER)
        {
          cellEmpties.push(new ChessBox(i, j, this.NO_PLAYER, false));
        }
      }
    }
    return cellEmpties;
  }

  placeAMove(chessBox, player) {
    if(this.board[chessBox.x][chessBox.y].disable || this.board[chessBox.x][chessBox.y].value !== this.NO_PLAYER) return false;
    this.board[chessBox.x][chessBox.y].value = player;
    this.board[chessBox.x][chessBox.y].disable = true;
    return true;
  }

  isGameOver() {
    return !this.hasPlayerWon( this.PLAYER_X) 
    && !this.hasPlayerWon(this.PLAYER_O) 
    && !this.getCellEmpty().length;
  }
  hasPlayerWon(player) {
  for(let i = 0; i < this.BOARD_HEIGHT; i++) {
    for(let j = 0; j < this.BOARD_WIDTH; j++) {
      if(this.isPlayerWon(this.board, this.board[i][j], player)) {
        return true;
      }
    }
  } 
   return false;
  }
  isPlayerWon(board, chessBox, player) {
    return this.endGameVertical(board, chessBox, player) 
    || this.endGameHorizontal(board, chessBox, player) 
    || this.endGamePrimary(board, chessBox, player) 
    || this.endGameSub(board, chessBox, player)
  }

  endGameVertical(board, chessBox, player) {
    let endGameLeft = 0;
    let endGameRight = 0;
    for (let i = chessBox.x; i >= 0; i--) {
      if (board[chessBox.y][i].value === chessBox.value && chessBox.value === player) {
        endGameLeft++;
      } else break;
    }
    for (let i = chessBox.x + 1; i < this.BOARD_WIDTH; i++) {
      if (board[chessBox.y][i].value === chessBox.value && chessBox.value === player) {
        endGameRight++;
      } else break;
    }
    return endGameLeft + endGameRight >= this.AMOUNT_WIN;
  }
  endGameHorizontal(board, chessBox, player) {
    let endGameTop = 0;
    let endGameBottom = 0;
    for (let i = chessBox.y; i >= 0; i--) {
      if (board[i][chessBox.x].value === chessBox.value && chessBox.value === player) {
        endGameTop++;
      } else break;
    }
    for (let i = chessBox.y + 1; i < this.BOARD_HEIGHT; i++) {
      if (board[i][chessBox.x].value === chessBox.value && chessBox.value === player) {
        endGameBottom++;
      } else break;
    }
    return endGameTop + endGameBottom >= this.AMOUNT_WIN;
  }
  endGamePrimary(board, chessBox, player) {
    let endGameTop = 0;
    let endGameBottom = 0;
    for (let i = 0; i < this.BOARD_HEIGHT; i++) {
      if (chessBox.y - i < 0 || chessBox.x - i < 0) break;
      if (board[chessBox.y - i][chessBox.x - i].value === chessBox.value && chessBox.value === player) {
        endGameTop++;
      } else break;
    }
    for (let i = 1; i < this.BOARD_HEIGHT; i++) {
      if (chessBox.y + i >= this.BOARD_HEIGHT || chessBox.x + i >= this.BOARD_HEIGHT) break;
      if (board[chessBox.y + i][chessBox.x + i].value === chessBox.value && chessBox.value === player) {
        endGameBottom++;
      } else break;
    }
    return endGameTop + endGameBottom >= this.AMOUNT_WIN;
  }
  endGameSub(board, chessBox, player) {
    let endGameTop = 0;
    let endGameBottom = 0;
    for (let i = 0; i < this.BOARD_HEIGHT; i++) {
      if (chessBox.y + i >= this.BOARD_HEIGHT || chessBox.x - i < 0) break;
      if (board[chessBox.y + i][chessBox.x - i].value === chessBox.value && chessBox.value === player) {
        endGameTop++;
      } else break;
    }
    for (let i = 1; i < this.BOARD_HEIGHT; i++) {
      if (chessBox.y - i < 0 || chessBox.x + i >= this.BOARD_HEIGHT) break;
      if (board[chessBox.y - i][chessBox.x + i].value === chessBox.value && chessBox.value === player) {
        endGameBottom++;
      } else break;
    }
    return endGameTop + endGameBottom >= this.AMOUNT_WIN;
  }

  minimax(depth, player) {
    if(this.hasPlayerWon(this.PLAYER_X)) return 10;
    if(this.hasPlayerWon(this.PLAYER_O)) return -10;
    const cellsEmpty = this.getCellEmpty();
    if(!cellsEmpty.length) return 0;
    let min = 999999;
    let max = -999999;
    for(let i= 0; i< cellsEmpty.length; i++) {
      const chessBox = cellsEmpty[i];
      if(player === this.PLAYER_X) {
        this.placeAMove(chessBox, this.PLAYER_X);
        const currentScore = this.minimax(depth + 1, this.PLAYER_O);
        max = Math.max(currentScore, max);
        if(currentScore >= 0 && depth === 0) this.computerMove = chessBox;
        if(currentScore === 10) {
          this.board[chessBox.x][chessBox.y].value =  this.NO_PLAYER;
          this.board[chessBox.x][chessBox.y].disable =  false;
          break;
        }
        if(i === cellsEmpty.length - 1 && max < 0 && depth === 0) this.computerMove = chessBox;
        
      }else if(player === this.PLAYER_O) {
        this.placeAMove(chessBox, this.PLAYER_O);
        const currentScore = this.minimax(depth + 1, this.PLAYER_X);
        min = Math.min(currentScore, min);
        if(min === -10) {
          this.board[chessBox.x][chessBox.y].value =  this.NO_PLAYER;
          this.board[chessBox.x][chessBox.y].disable =  false;
          break;
        }
        
      }
      this.board[chessBox.x][chessBox.y].value =  this.NO_PLAYER;
      this.board[chessBox.x][chessBox.y].disable =  false;
    }
    return player === this.PLAYER_X ? max : min;
  }
}