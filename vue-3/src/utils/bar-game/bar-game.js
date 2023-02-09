import { AWARD, BAR_LAYOUT, INITIALIZE_ITEM_PLAYER_SELECTED, INITIALIZE_PREVIOUS_ITEM_PLAYER_SELECTED, LEVEL } from "./bar-constant";

export class BarGame {
  boardValue = BAR_LAYOUT;
  level = LEVEL;
  previousEnd = null;
  award = AWARD;
  itemPlayerSelected = INITIALIZE_ITEM_PLAYER_SELECTED;
  previousItemPlayerSelected = INITIALIZE_PREVIOUS_ITEM_PLAYER_SELECTED;
  totalScore = 0;
  isEmptyItemPlayerSelected() {
    return this.itemPlayerSelected.filter(item=>item.amount === 0).length === this.itemPlayerSelected.length;
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
        start: this.level[level][Math.floor(Math.random() * (this.level[level].length - 1))],
        end: this.level[level][Math.floor(Math.random() * (this.level[level].length - 1))]
      };
    } else {
      return {
        start: this.previousEnd,
        end: this.level[level][Math.floor(Math.random() * (this.level[level].length - 1))]
      };
    }
  }
  initializeBarBoard(start, end) {
    let step = 2;
    let newBoardValue = [];
    this.previousEnd = end;
    const isRunFromLeft = Math.round(Math.random() + 1) % 2 === 0;
    if (isRunFromLeft) {
      for (let i = this.boardValue.indexOf(start); i < (step < 1 ? (this.boardValue.indexOf(end) + 1) : this.boardValue.length); i++) {
        newBoardValue.push(this.boardValue[i]);
        if (i === this.boardValue.length - 1) {
          step = step - 1;
          i = -1;
        }
      }
    } else {
      for (let i = this.boardValue.indexOf(start); i >= (step < 1 ? this.boardValue.indexOf(end) : 0); i--) {
        newBoardValue.push(this.boardValue[i]);
        if (i === 0) {
          step = step - 1;
          i = this.boardValue.length - 1;
        }
      }
    }
    return newBoardValue;
  }
  boardRun(level) {
    let { start, end } = this.randomPosition(level);
    switch (end) {
      case 5:
        break;
      case 13:
        break;
      case 14:
        break;
      case 21:
        break;
    }
    this.totalScore = this.getAwardScore(end);
    return this.initializeBarBoard(start, end);
  }
  getAwardScore(endValue) {
    let totalAwardScore = 0;
    const awardItem = this.award.find(item => item.position.indexOf(endValue) >= 0);
    const itemSelected = this.itemPlayerSelected.find(item => item.position.indexOf(endValue) >= 0);
    if (awardItem) {
      totalAwardScore = awardItem.score * itemSelected.amount;
    }
    return totalAwardScore;
  }
  setItemPlayerSelected(type, amount) {
    if(this.isEmptyItemPlayerSelected()) {
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