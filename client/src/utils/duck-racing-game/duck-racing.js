import { OddsTable, Reward } from "./odds-table.const";
import { DuckBlue } from '@/utils/duck-racing-game/duck-blue.js';
import { CityBackground } from '@/utils/duck-racing-game/city-background';
import { RoadBackground } from '@/utils/duck-racing-game/road-background';
import { Subject } from 'rxjs';
import { delay } from "../utils";
export class DuckRacing {
  oddsTable;
  objectGame = [];
  stopGame = new Subject(true);
  constructor() {
    this.oddsTable = [];
  }

  initialGame() {
    this.objectGame = [
      new DuckBlue(0.1, -120, 'duck_1', require('@/utils/duck-racing-game/images/duck_1.png')),
      new DuckBlue(0.01, -90, 'duck_2', require('@/utils/duck-racing-game/images/duck_2.png')),
      new DuckBlue(0.01, -60, 'duck_3', require('@/utils/duck-racing-game/images/duck_blue_3.png')),
      new DuckBlue(0.001, -30, 'duck_4', require('@/utils/duck-racing-game/images/duck_blue_4.png')),
      new DuckBlue(0.01, 0, 'duck_5', require('@/utils/duck-racing-game/images/duck_5.png')),
      new DuckBlue(0.1, 20, 'duck_6', require('@/utils/duck-racing-game/images/duck_6.png')),
      new CityBackground(1.1, 'city-background', require('@/utils/duck-racing-game/images/background-city.png')),
      new RoadBackground(1.1, 'road-background')
    ];
    this.objectGame.forEach(item => item.draw());
  }

  startGame() {
    this.stopGame.next(false);
    this.objectGame.forEach(item => item.start = true);
    const interval = setInterval(async () => {
      const isRoadStop = Math.abs(this.objectGame[this.objectGame.length - 1].x) >= 4300;
      if (isRoadStop) {
        clearInterval(interval);
        this.objectGame.forEach(item => item.stopAnimation());
        await delay(3000);
        // this.stopGame.next(true);
        // this.initialGame();
      }
    }, 100)
  }

  getOddsTable() {
    const awardMixin = this.mixItemInList();
    let index = 0;
    this.oddsTable = OddsTable.map(item => {
      if (item.type === 'button') {
        item.reward = awardMixin[index];
        item.betsMoney = [];
        index++;
      }
      return { ...item}
    });
    return this.oddsTable;
  }

  mixItemInList() {
    const listItemDistinct = [];
    while (listItemDistinct.length < Reward.length) {
      const number = Math.floor(Math.random() * Reward.length);
      if (!listItemDistinct.includes(number)) {
        listItemDistinct.push(number)
      }
    }
    let objectReward = {};
    listItemDistinct.forEach((item, index) => {
      objectReward[item] = Reward[index]
    })
    return objectReward;
  }
}