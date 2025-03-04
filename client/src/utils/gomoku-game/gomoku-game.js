export class Point {
  x = 0;
  y = 0;
  value = 0;
  icon = '';
  xIcon = 'active-x';
  oIcon = 'active-o';
  markWon = false;
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.markWon = false;
  }
  setState(isXMove) {
    if (isXMove) {
      this.icon = this.xIcon;
      this.value = 2;
      this.isXMove = false;
    } else {
      this.icon = this.oIcon;
      this.value = 1;
      this.isXMove = true;
    }
  }
}
export class GomokuGame {
  row = 20;
  col = 20;
  winScore = 10000000;
  board = [];
  availablePoint = [];
  isGameOver = false;
  playerWin = false;
  aiWin = false;
  isDraw = false;
  reNewGame() {
    this.playerWin = false;
    this.aiWin = false;
    this.isDraw = false;
    this.winScore = 10000000;
    this.isGameOver = false;
    this.availablePoint = [];
    this.initializeBoard();
  }
  initializeBoard() {
    this.board = [];
    for (let i = 0; i < this.row; i++) {
      const rows =[];
      for (let j = 0; j < this.col; j++) {
        const point = new Point(i, j, 0);
        rows.push(point);
        this.availablePoint.push(point);
      }
      this.board.push(rows);
    }
  }

  pointClick(point) {
    if(this.isGameOver || this.board[point.x][point.y].value !== 0) return;
    const matrix = this.getMatrixBoard();
    for(let i = 0; i < matrix.length; i++) {
      this.isDraw = true;
      if(matrix[i].filter(value=> value === 0).length) {
        this.isDraw = false;
        break;
      }
    }
    this.board[point.x][point.y].setState(true);
		if (this.getScore(this.getMatrixBoard(), true, false) >= this.winScore) {
			this.playerWin = true;
      this.markCellWon(point,point.value);
      this.isGameOver = this.isDraw || this.aiWin || this.playerWin;
			return;
		}
		let nextMoveX = 0 , nextMoveY = 0;
		let bestMove = this.calcNextMove(3);
		if (bestMove != null) {
			nextMoveX = bestMove[0];
			nextMoveY = bestMove[1];
		}else {
      console.log(bestMove)
    }
		
		this.board[nextMoveX][nextMoveY].setState(false);
		if (this.getScore(this.getMatrixBoard(), false, true) >= this.winScore) {
			this.aiWin = true;
      this.markCellWon(this.board[nextMoveX][nextMoveY],this.board[nextMoveX][nextMoveY]  .value);
      this.isGameOver = this.isDraw || this.aiWin || this.playerWin;
      return;
		}
    this.isGameOver = this.isDraw || this.aiWin || this.playerWin;
	}

  calcNextMove(depth) {
    const board = this.getMatrixBoard();
    let bestMove = this.searchWinningMove(board);
    const badMove = this.searchLoseMove(board);
    let move = [];

    if (badMove[1] != null && badMove[2] != null) {
      move[0] = badMove[1];
      move[1] = badMove[2];
      return move;
    }

    if (bestMove[1] != null && bestMove[2] != null) {
      move[0] = bestMove[1];
      move[1] = bestMove[2];
    } else {
      bestMove = this.minimaxAlphaBeta(depth, board, true, -1.0, this.winScore);
      if (bestMove[1] == null) {
        move = null;
      } else {
        move[0] = bestMove[1];
        move[1] = bestMove[2];
      }
    }
    return move;
  }

  playNextMove(board, move, isUserTurn) {
    const i = move[0], j = move[1];
    let newBoard = [];
    for (let h = 0; h < this.row; h++) {
      const rows = [];
      for (let k = 0; k < this.col; k++) {
        rows.push(board[h][k]);
      }
      newBoard.push(rows);
    }
    newBoard[i][j] = isUserTurn ? 2 : 1;
    return newBoard;
  }

  searchWinningMove(board) {
    const allPossibleMoves = this.generateMoves(board);
    const winningMove = [null, null];

    allPossibleMoves.forEach(move => {
      const dummyBoard = this.playNextMove(board, move, false);
      if (this.getScore(dummyBoard, false, false) >= this.winScore) {
        winningMove[1] = move[0];
        winningMove[2] = move[1];
        return winningMove;
      }
    })
    return winningMove;
  }

  searchLoseMove(board) {
    const allPossibleMoves = this.generateMoves(board);
    const losingMove = [];
    allPossibleMoves.forEach(move => {
      const dummyBoard = this.playNextMove(board, move, true);
      if (this.getScore(dummyBoard, true, false) >= this.winScore) {
        losingMove[1] = move[0];
        losingMove[2] = move[1];
        return losingMove;
      }
    })
    return losingMove;
  }

  minimaxAlphaBeta(depth, board, max, alpha, beta) {
    if (depth == 0) {
      return [this.evaluateBoardForWhite(board, !max), null, null];
    }
    const allPossibleMoves = this.generateMoves(board);

    if (allPossibleMoves.length == 0) {
      return [this.evaluateBoardForWhite(board, !max), null, null];
    }

    let bestMove = [];
    if (max) {
      bestMove[0] = -1;
      for (let i = 0; i < allPossibleMoves.length; i++) {
        const dummyBoard = this.playNextMove(board, allPossibleMoves[i], false);
        const tempMove = this.minimaxAlphaBeta(depth - 1, dummyBoard, !max, alpha, beta);
        if (tempMove[0] > alpha) {
          alpha = tempMove[0];
        }
        if (tempMove[0] >= beta) {
          return tempMove;
        }
        if (tempMove[0] > bestMove[0]) {
          bestMove = tempMove;
          bestMove[1] = allPossibleMoves[i][0];
          bestMove[2] = allPossibleMoves[i][1];
        }
      }
    }
    else {
      bestMove[0] = 100000000;
      bestMove[1] = allPossibleMoves[0][0];
      bestMove[2] = allPossibleMoves[0][1];
      for (let i = 0; i < allPossibleMoves.length; i++) {
        const dummyBoard = this.playNextMove(board, allPossibleMoves[i], true);
        const tempMove = this.minimaxAlphaBeta(depth - 1, dummyBoard, !max, alpha, beta);
        if (tempMove[0] < beta) {
          beta = tempMove[0];
        }
        if (tempMove[0] <= alpha) {
          return tempMove;
        }
        if (tempMove[0] < bestMove[0]) {
          bestMove = tempMove;
          bestMove[1] = allPossibleMoves[i][0];
          bestMove[2] = allPossibleMoves[i][1];
        }
      }
    }
    return bestMove;
  }

  evaluateBoardForWhite(board, userTurn) {
    let blackScore = this.getScore(board, true, userTurn);
    const whiteScore = this.getScore(board, false, userTurn);
    if (blackScore == 0) {
      blackScore = 1;
    }
    return whiteScore / blackScore;
  }

  generateMoves(boardMatrix) {
    const moveList = [];
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (boardMatrix[i][j] > 0) continue;
        if (i > 0) {
          if (j > 0) {
            if (boardMatrix[i - 1][j - 1] > 0 || boardMatrix[i][j - 1] > 0) {
              const move = [i, j];
              moveList.push(move);
              continue;
            }
          }
          if (j < this.col - 1) {
            if (boardMatrix[i - 1][j + 1] > 0 || boardMatrix[i][j + 1] > 0) {
              const move = [i, j];
              moveList.push(move);
              continue;
            }
          }
          if (boardMatrix[i - 1][j] > 0) {
            const move = [i, j];
            moveList.push(move);
            continue;
          }
        }
        if (i < this.row - 1) {
          if (j > 0) {
            if (boardMatrix[i + 1][j - 1] > 0 || boardMatrix[i][j - 1] > 0) {
              const move = [i, j];
              moveList.push(move);
              continue;
            }
          }
          if (j < this.col - 1) {
            if (boardMatrix[i + 1][j + 1] > 0 || boardMatrix[i][j + 1] > 0) {
              const move = [i, j];
              moveList.push(move);
              continue;
            }
          }
          if (boardMatrix[i + 1][j] > 0) {
            const move = [i, j];
            moveList.push(move);
            continue;
          }
        }
      }
    }
    return moveList;
  }

  getScore(board,forX, blacksTurn) {
    return this.evaluateHorizontal(board, forX, blacksTurn) 
    + this.evaluateVertical(board, forX, blacksTurn) 
    + this.evaluateDiagonal(board, forX, blacksTurn);
  }

  evaluateHorizontal(boardMatrix, forX, playersTurn) {
		let consecutive = 0;
		let blocks = 2;
		let score = 0;
    for (let i = 0; i < boardMatrix.length; i++) {
      for (let j = 0; j < boardMatrix[0].length; j++) {
        if (boardMatrix[i][j] == (forX ? 2 : 1)) {
          consecutive++;
        }
        else if (boardMatrix[i][j] == 0) {
          if (consecutive > 0) {
            blocks--;
            score += this.getConsecutiveSetScore(consecutive, blocks, forX == playersTurn);
            consecutive = 0;
            blocks = 1;
          }
          else {
            blocks = 1;
          }
        } else if (consecutive > 0) {
          score += this.getConsecutiveSetScore(consecutive, blocks, forX == playersTurn);
          consecutive = 0;
          blocks = 2;
        } else {
          blocks = 2;
        }
      }
      if(consecutive > 0) {
        score += this.getConsecutiveSetScore(consecutive, blocks, forX == playersTurn);
      }
      consecutive = 0;
      blocks = 2;
    }
    return score;
  }
  evaluateVertical(boardMatrix, forX, playersTurn) {
    let consecutive = 0;
    let blocks = 2;
    let score = 0;

    for (let j = 0; j < boardMatrix[0].length; j++) {
      for (let i = 0; i < boardMatrix.length; i++) {
        if (boardMatrix[i][j] == (forX ? 2 : 1)) {
          consecutive++;
        } else if (boardMatrix[i][j] == 0) {
          if (consecutive > 0) {
            blocks--;
            score += this.getConsecutiveSetScore(consecutive, blocks, forX == playersTurn);
            consecutive = 0;
            blocks = 1;
          } else {
            blocks = 1;
          }
        } else if (consecutive > 0) {
          score += this.getConsecutiveSetScore(consecutive, blocks, forX == playersTurn);
          consecutive = 0;
          blocks = 2;
        } else {
          blocks = 2;
        }
      }
      if (consecutive > 0) {
        score += this.getConsecutiveSetScore(consecutive, blocks, forX == playersTurn);
      }
      consecutive = 0;
      blocks = 2;

    }
    return score;
  }
  evaluateDiagonal(boardMatrix, forX, playersTurn) {
    let consecutive = 0;
    let blocks = 2;
    let score = 0;
    for (let k = 0; k <= 2 * (boardMatrix.length - 1); k++) {
      const iStart = Math.max(0, k - boardMatrix.length + 1);
      const iEnd = Math.min(boardMatrix.length - 1, k);
      for (let i = iStart; i <= iEnd; ++i) {
        const j = k - i;

        if (boardMatrix[i][j] == (forX ? 2 : 1)) {
          consecutive++;
        }
        else if (boardMatrix[i][j] == 0) {
          if (consecutive > 0) {
            blocks--;
            score += this.getConsecutiveSetScore(consecutive, blocks, forX == playersTurn);
            consecutive = 0;
            blocks = 1;
          }
          else {
            blocks = 1;
          }
        }
        else if (consecutive > 0) {
          score += this.getConsecutiveSetScore(consecutive, blocks, forX == playersTurn);
          consecutive = 0;
          blocks = 2;
        }
        else {
          blocks = 2;
        }

      }
      if (consecutive > 0) {
        score += this.getConsecutiveSetScore(consecutive, blocks, forX == playersTurn);
      }
      consecutive = 0;
      blocks = 2;
    }
    for (let k = 1 - boardMatrix.length; k < boardMatrix.length; k++) {
      const iStart = Math.max(0, k);
      const iEnd = Math.min(boardMatrix.length + k - 1, boardMatrix.length - 1);
      for (let i = iStart; i <= iEnd; ++i) {
        const j = i - k;
        if (boardMatrix[i][j] == (forX ? 2 : 1)) {
          consecutive++;
        }
        else if (boardMatrix[i][j] == 0) {
          if (consecutive > 0) {
            blocks--;
            score += this.getConsecutiveSetScore(consecutive, blocks, forX == playersTurn);
            consecutive = 0;
            blocks = 1;
          }
          else {
            blocks = 1;
          }
        } else if (consecutive > 0) {
          score += this.getConsecutiveSetScore(consecutive, blocks, forX == playersTurn);
          consecutive = 0;
          blocks = 2;
        } else {
          blocks = 2;
        }
      }
      if (consecutive > 0) {
        score += this.getConsecutiveSetScore(consecutive, blocks, forX == playersTurn);
      }
      consecutive = 0;
      blocks = 2;
    }
    return score;
  }
  getConsecutiveSetScore(count, blocks, currentTurn) {
    const winGuarantee = 1000000;
    if (blocks == 2 && count <= 5) return 0;
    switch (count) {
      case 5: {
        return this.winScore;
      }
      case 4: {
        if (currentTurn) return winGuarantee;
        else {
          return blocks == 0 ? winGuarantee / 4 : 200;
        }
      }
      case 3: {
        if (blocks == 0) {
          return currentTurn ? 50000 : 200;
        }
        else {
          return currentTurn ? 10 : 5;
        }
      }
      case 2: {
        if (blocks == 0) {
          return currentTurn ? 7 : 5;
        }
        return 3;
      }
      case 1: return 1;
    }
    return this.winScore * 2;
  }

  getMatrixBoard() {
    const matrix = [];
    for (let i = 0; i < this.row; i++) {
      const rows = [];
      for (let j = 0; j < this.col; j++) {
        const value = this.board[i][j].value;
        rows.push(value);
      }
      matrix.push(rows);
    }
    return matrix;
  }

  markCellWon(point, turn) {
    const markWon = this.markWonHorizontal(point, turn)
    .concat(this.markWonVertical(point, turn))
    .concat(this.markWonDiagonalPrimary(point, turn))
    .concat(this.markWonDiagonalSub(point, turn));
    markWon.forEach(chessBox=>{
      this.board[chessBox.x][chessBox.y].markWon = true;
    })
  }
  markWonHorizontal(point, turn) {
    const matrix = this.getMatrixBoard();
    let positionChessWon = [];
    let wonLeft = 0;
    let wonRight = 0;
    let blockRight = false;
    let blockLeft = false;
    for(let i= point.y; i>= 0; i--) {
      if(matrix[point.x][i] === turn) {
        wonLeft++;
        positionChessWon.push({x: point.x, y: i});
      }else if(matrix[point.x][i] !== 0) {
        blockLeft = true;
        break;
      }else break;
    }
    for(let i= point.y + 1; i < this.col; i++) {
      if(matrix[point.x][i] === turn) {
        wonRight++;
        positionChessWon.push({x: point.x, y: i});
      }else if(matrix[point.x][i] !== 0) {
        blockRight = true;
        break;
      }else break;
    }

    return (!blockRight || !blockLeft) && wonLeft + wonRight >= 5 ? positionChessWon : [];
  }

  markWonVertical(point, turn) {
    const matrix = this.getMatrixBoard();
    let positionChessWon = [];
    let wonTop = 0;
    let wonBottom = 0;
    let blockBottom = false;
    let blockTop = false;
    for(let i= point.x; i>= 0; i--) {
      if(matrix[i][point.y] === turn) {
        wonTop++;
        positionChessWon.push({x: i, y: point.y});
      }else if(matrix[i][point.y] !== 0) {
        blockTop = true;
        break;
      }else break;
    }
    for(let i= point.x + 1; i < this.row; i++) {
      if(matrix[i][point.y] === turn) {
        wonBottom++;
        positionChessWon.push({x: i, y: point.y});
      }else if(matrix[i][point.y] !== 0) {
        blockBottom = true;
        break;
      }else break;
    }

    return (!blockBottom || !blockTop) && wonTop + wonBottom >= 5 ? positionChessWon : [];
  }
  markWonDiagonalPrimary(point, turn) {
    const matrix = this.getMatrixBoard();
    let positionChessWon = [];
    let wonDiagonalPrimaryLeft = 0;
    let wonDiagonalPrimaryRight = 0;
    let clockDiagonalPrimaryRight = false;
    let blockDiagonalPrimaryRight = false;
    for(let i= 0; i < this.col; i++) {
      if(point.x - i < 0 || point.y - i < 0) break;
      if(matrix[point.x - i][point.y - i] === turn) {
        wonDiagonalPrimaryLeft++;
        positionChessWon.push({x: point.x - i, y: point.y - i});
      }else if(matrix[point.x - i][point.y - i] !== 0) {
        blockDiagonalPrimaryRight = true;
        break;
      }else break;
    }
    for(let i= 1; i < this.col; i++) {
      if(point.x + i <= this.col || point.y + i <= this.col) break;
      if(matrix[point.x + i][point.y + i] === turn) {
        wonDiagonalPrimaryRight++;
        positionChessWon.push({x: point.x + i, y: point.y + i});
      }else if(matrix[point.x + i][point.y + i] !== 0) {
        clockDiagonalPrimaryRight = true;
        break;
      }else break;
    }

    return (!clockDiagonalPrimaryRight || !blockDiagonalPrimaryRight) && wonDiagonalPrimaryLeft + wonDiagonalPrimaryRight >= 5 ? positionChessWon : [];
  }
  markWonDiagonalSub(point, turn) {
    const matrix = this.getMatrixBoard();
    let positionChessWon = [];
    let wonDiagonalSubLeft = 0;
    let wonDiagonalSubRight = 0;
    let clockDiagonalSubRight = false;
    let blockDiagonalSubRight = false;
    for(let i= 0; i < this.col; i++) {
      if(point.x + i >= this.col || point.y - i < 0) break;
      if(matrix[point.x + i][point.y - i] === turn) {
        wonDiagonalSubLeft++;
        positionChessWon.push({x: point.x + i, y: point.y - i});
      }else if(matrix[point.x + i][point.y - i] !== 0) {
        blockDiagonalSubRight = true;
        break;
      }else break;
    }
    for(let i= 1; i < this.col; i++) {
      if(point.x - i < 0 || point.y + i <= this.col) break;
      if(matrix[point.x - i][point.y + i] === turn) {
        wonDiagonalSubRight++;
        positionChessWon.push({x: point.x - i, y: point.y + i});
      }else if(matrix[point.x - i][point.y + i] !== 0) {
        clockDiagonalSubRight = true;
        break;
      }else break;
    }

    return (!clockDiagonalSubRight || !blockDiagonalSubRight) && wonDiagonalSubLeft + wonDiagonalSubRight >= 5 ? positionChessWon : [];
  }
}
