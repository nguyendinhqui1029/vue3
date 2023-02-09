export class BarGame {
  boardValue = [
    1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 25, 24, 23, 22, 21, 20, 19, 17, 15, 13, 11, 8
  ];
  level = {
    normal: [1,2,3,4,7,10,25,24,22,19,17,11],
    medium: [1,8,3,7,12,18,23,19,17,15,16],
    hight: [6,12,18,23,20,15,8,22,25]
  }
  previousEnd = null;
  award = [
    { score: 2, position: [6, 12, 18, 23, 20, 15, 8] },
    { score: 5, position: [16, 11] },
    { score: 10, position: [1,2,7,25,24,19] },
    { score: 20, position: [10,22,17] },
    { score: 50, position: [3] },
    { score: 100, position: [4] }];
  itemPlayerSelected = [
    { type: 'orange', amount: 0, position: [1, 18, 25] },
    { type: 'toadFruit', amount: 0, position: [7, 20, 19] },
    { type: 'apple', amount: 0, position: [5, 6, 16, 11] },
    { type: 'bell', amount: 0, position: [8, 2, 24] },
    { type: 'star', amount: 0, position: [15, 17] },
    { type: 'watermelon', amount: 0, position: [10, 12] },
    { type: 'sevenSeven', amount: 0, position: [22, 23] },
    { type: 'bar', amount: 0, position: [3, 4] }
  ];
  totalScore = 0;
  resetSelectedItem() {
    this.itemPlayerSelected.forEach(item => {
      item.amount = 0;
    });
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

  boardRun(level) {
    let { start, end } = this.randomPosition(level);
    let step = 2;
    let newBoardValue = [];
    this.previousEnd = end;
    const isRunFromLeft = Math.round(Math.random() + 1) % 2 === 0;
    if(isRunFromLeft) {
      for (let i = this.boardValue.indexOf(start); i < (step < 1 ? (this.boardValue.indexOf(end) + 1) : this.boardValue.length); i++) {
        newBoardValue.push(this.boardValue[i]);
        if (i === this.boardValue.length - 1) {
          step = step - 1;
          i = -1;
        }
      }
    }else {
      for (let i = this.boardValue.indexOf(start); i >= (step < 1 ? this.boardValue.indexOf(end) : 0); i--) {
        newBoardValue.push(this.boardValue[i]);
        if (i === 0) {
          step = step - 1;
          i = this.boardValue.length - 1;
        }
      }
    }
    
    switch (end) {
      case 9:
        break;
      case 13:
        break;
      case 14:
        break;
    }
    this.totalScore = this.getAwardScore(end);
    return newBoardValue;
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
    const index = this.itemPlayerSelected.findIndex(item => item.type === type);
    if (index >= 0) {
      this.itemPlayerSelected[index].amount = amount
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