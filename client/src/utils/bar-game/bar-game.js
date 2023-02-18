import { AWARD, BAR_LAYOUT, INITIALIZE_ITEM_PLAYER_SELECTED, INITIALIZE_PREVIOUS_ITEM_PLAYER_SELECTED, LEVEL, MAX_TURN_SCORE } from "./bar-constant";

export class BarGame {
  boardValue = BAR_LAYOUT;
  level = LEVEL;
  previousEnd = null;
  award = AWARD;
  itemPlayerSelected = INITIALIZE_ITEM_PLAYER_SELECTED;
  previousItemPlayerSelected = INITIALIZE_PREVIOUS_ITEM_PLAYER_SELECTED;
  totalScore = 0;
  turn = 0;
  maxTurn = this.getMaxTurnScore();
  endResult = [];
  barBoard = []
  audioStartRun = new Audio(require('@/utils/bar-game/sound/start-run.mp3'));
  audioEndRun = new Audio(require('@/utils/bar-game/sound/end-run.mp3'));
  mute() {
    this.audioEndRun.muted = true;
    this.audioStartRun.muted = true;
  }
  runAudioEnd(isStart) {
    this.audioEndRun.volume = 1;
    isStart ? this.audioEndRun.play() : this.audioEndRun.pause();
  }
  runAudioStart(isStart) {
    this.audioStartRun.playbackRate = 6;
    this.audioStartRun.volume = 1;
    this.audioStartRun.loop = true;
    isStart ? this.audioStartRun.play() : this.audioStartRun.pause();
  }
  renderBarBoard(){
    for(let i =1; i<= 25; i++) {
      this.barBoard.push({index: i, isLight: false, flicker: false})
    }
  }
  getEndResult() {
    return this.endResult;
  }
  
  getMaxTurnScore() {
    return MAX_TURN_SCORE[Math.floor(Math.random()*5)];
  }
  isEmptyItemPlayerSelected() {
    return this.itemPlayerSelected.filter(item => item.amount === 0).length === this.itemPlayerSelected.length;
  }
  resetPreviousItemPlayerSelected() {
    this.previousItemPlayerSelected.forEach(item => {
      item.amount = 0;
    });
  }
  resetSelectedItem() {
    this.itemPlayerSelected.forEach(item => {
      item.amount = 0;
    });
  }
  isScorePlayerBiggerScoreItemSelected(playerScore) {
    let totalScore = 0;
    this.previousItemPlayerSelected.forEach(item => {
      totalScore += item.amount;
    })
    return playerScore >= totalScore;
  }
  getPreviousItemPlayerSelected() {
    return this.previousItemPlayerSelected;
  }
  getTotalScore() {
    return this.totalScore;
  }
  randomPosition(level) {
    if (this.previousEnd === null || this.previousEnd === undefined) {
      return {
        startValue: this.level[level][Math.floor(Math.random() * (this.level[level].length - 1))],
        endValue: this.level[level][Math.floor(Math.random() * (this.level[level].length - 1))]
      };
    } else {
      return {
        startValue: this.previousEnd,
        endValue: this.level[level][Math.floor(Math.random() * (this.level[level].length - 1))]
      };
    }
  }
  randomResult(level, amountResult) {
    const result = [];
    let {startValue } = this.randomPosition(level);
    for(let i= 2; i <= amountResult; i++){
      let { endValue } = this.randomPosition(level);
      if(![startValue, ...result].includes(endValue)) {
        result.push(endValue);
      }else {
        i--;
      }
    }
    return  {startValue, endValue: result};
  }
  initializeBarBoard(startValue, endValue) {
    try {
      let index = [];
      endValue.forEach(item => {
        index.push(this.boardValue.indexOf(item));
      });
      let newBoardValue = [];
      this.previousEnd = endValue[endValue.length - 1];
      const isRunFromLeft = Math.round(Math.random() + 1) % 2 === 0;
      if (isRunFromLeft) {
        if(index.length > 1) {
          newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(this.boardValue.indexOf(startValue), 0 ));
          for(let i= 0 ;i < index.length; i++) {
            if(index[i] === 0){
              newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(0, 0 ));
            }else if(index[i] === this.boardValue.length - 1) {
              newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(this.boardValue.length - 1, this.boardValue.length - 1 ));
            }else {
              if(i % 2 === 0) {
                newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(this.boardValue.length - 1, index[i]));
              }else {
                newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(index[i - 1] - 1, 0));
                newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(this.boardValue.length - 1, index[i]));
              }
            }
          }
        }else {
          if(this.boardValue.indexOf(startValue) === 0) {
            newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(0, 0));
            newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(this.boardValue.length - 1, 0));
            newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(this.boardValue.length - 1, index[0]));

          }else if(this.boardValue.indexOf(startValue) === this.boardValue.length - 1) {
            newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(this.boardValue.length - 1, 0));
            newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(this.boardValue.length - 1, index[0]));
          }else {
            newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(this.boardValue.indexOf(startValue), 0));
            newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(this.boardValue.length - 1, 0));
            newBoardValue = newBoardValue.concat(this.renderBarBoardLeft(this.boardValue.length - 1, index[0]));
          }
        }
      } else {
        if(index.length > 1) {
          newBoardValue = newBoardValue.concat(this.renderBarBoardRight(this.boardValue.indexOf(startValue), this.boardValue.length - 1 ));
          for(let i= 0 ;i < index.length; i++) {
            if(index[i] === 0){
              newBoardValue = newBoardValue.concat(this.renderBarBoardRight(0, this.boardValue.length - 1 ));
              newBoardValue = newBoardValue.concat(this.renderBarBoardRight(0, 0));
            }else if(index[i] === this.boardValue.length - 1) {
              newBoardValue = newBoardValue.concat(this.renderBarBoardRight(0, index[i] ));
            }else {
              if(i % 2 === 0) {
                newBoardValue = newBoardValue.concat(this.renderBarBoardRight(0, index[i]));
              }else {
                newBoardValue = newBoardValue.concat(this.renderBarBoardRight(index[i-1], index[i]));
              }
            }
          }
        }else {
          if(this.boardValue.indexOf(startValue) === 0) {
            newBoardValue = newBoardValue.concat(this.renderBarBoardRight(this.boardValue.indexOf(startValue), this.boardValue.length - 1));
            newBoardValue = newBoardValue.concat(this.renderBarBoardRight(0, this.boardValue.length - 1));
            newBoardValue = newBoardValue.concat(this.renderBarBoardRight(0, index[0]));

          }else if(this.boardValue.indexOf(startValue) === this.boardValue.length - 1) {
            newBoardValue = newBoardValue.concat(this.renderBarBoardRight(this.boardValue.length - 1, this.boardValue.length - 1));
            newBoardValue = newBoardValue.concat(this.renderBarBoardRight(0, this.boardValue.length - 1));
            newBoardValue = newBoardValue.concat(this.renderBarBoardRight(0, index[0]));
          }else {
            newBoardValue = newBoardValue.concat(this.renderBarBoardRight(this.boardValue.indexOf(startValue), this.boardValue.length - 1));
            newBoardValue = newBoardValue.concat(this.renderBarBoardRight(0, this.boardValue.length - 1));
            newBoardValue = newBoardValue.concat(this.renderBarBoardRight(0, index[0]));
          }
        }
      }
      return newBoardValue;
    } catch (error) {
      console.log(error)
    }

  }
  renderBarBoardLeft(start, end) {
    const newBoardValue = [];
    for(let i = start; i >= end; i--) {
      newBoardValue.push(this.boardValue[i]);
    }
    return newBoardValue;
  }
  renderBarBoardRight(start, end) {
    const newBoardValue = [];
    for(let i =  start; i <= end; i++) {
      newBoardValue.push(this.boardValue[i]);
    }
    return newBoardValue;
  }
  boardRun(level) {
    let amountResult = 2;
    this.turn++;
    if(this.turn === this.maxTurn) {
      this.turn = 0;
      this.maxTurn = this.getMaxTurnScore();
      amountResult = Math.floor(Math.random()*2 + 3);
    }
    let { startValue, endValue } = this.randomResult(level, amountResult);
    if(endValue.includes(5)) {
      this.itemPlayerSelected.forEach(item => {
        this.totalScore += item.amount;
      });
      this.totalScore += this.getAwardScore(endValue);
      this.endResult = endValue;
    }else if(endValue.includes(13)) {
      console.log(1)
    }else if(endValue.includes(14)) {
      console.log(1)
    }else if(endValue.includes(21)) {
      this.barBoard.forEach(item=>item.flicker = true)
    }else {
      this.endResult = endValue;
      this.totalScore = this.getAwardScore(endValue);
    }
    return this.initializeBarBoard(startValue, endValue);
  }
  getAwardScore(endValue) {
    let totalAwardScore = 0;
    for(let i = 0; i< endValue.length; i++) {
      const awardItem = this.award.find(item => item.position.indexOf(endValue[i]) >= 0);
      const itemSelected = this.itemPlayerSelected.find(item => item.position.indexOf(endValue[i]) >= 0);
      if (awardItem && itemSelected) {
        totalAwardScore += awardItem.score * itemSelected.amount;
      }
    }
    return totalAwardScore;
  }
  setItemPlayerSelected(type, amount) {
    if (this.isEmptyItemPlayerSelected()) {
      this.resetPreviousItemPlayerSelected();
    }
    const index = this.itemPlayerSelected.findIndex(item => item.type === type);
    if (index >= 0) {
      this.itemPlayerSelected[index].amount = amount;
      this.previousItemPlayerSelected[index].amount = amount;
    } else return;
  }
  sleep(ms) {
    try {
      return new Promise(resolve => setTimeout(resolve, ms));
    } catch (error) {
      console.log(error)
    }
  }
}