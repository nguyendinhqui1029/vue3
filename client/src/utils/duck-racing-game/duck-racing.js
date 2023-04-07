import { OddsTable, Reward } from "./odds-table.const";
import { DuckBlue } from '@/utils/duck-racing-game/duck-blue.js';
import { CityBackground } from '@/utils/duck-racing-game/city-background';
import { RoadBackground } from '@/utils/duck-racing-game/road-background';
export class DuckRacing {
  oddsTable;
  constructor() {
    this.oddsTable=[];
  }
  initialGame() {
    const duck1 = new DuckBlue(0.01, -55, 'duck_1', require('@/utils/duck-racing-game/images/duck_1.png'));
    const duck2 = new DuckBlue(0.03, -35, 'duck_2', require('@/utils/duck-racing-game/images/duck_2.png'));
    const duck3 = new DuckBlue(0.05, -10, 'duck_3', require('@/utils/duck-racing-game/images/duck_blue_3.png'));
    const duck4 = new DuckBlue(0.06, 15, 'duck_4', require('@/utils/duck-racing-game/images/duck_blue_4.png'));
    const duck5 = new DuckBlue(0.08, 35, 'duck_5', require('@/utils/duck-racing-game/images/duck_5.png'));
    const duck6 = new DuckBlue(0.1, 50, 'duck_6', require('@/utils/duck-racing-game/images/duck_6.png'));
    
    const city = new CityBackground(1.5, 'city-background', require('@/utils/duck-racing-game/images/background-city.png'));
    const road = new RoadBackground(1.5, 'road-background');

    duck1.drawDuck();
    duck2.drawDuck();
    duck3.drawDuck();
    duck4.drawDuck();
    duck5.drawDuck();
    duck6.drawDuck();
    city.drawCity();
    road.drawRoad();
    setTimeout(()=>{
      duck1.start = true;
      duck2.start = true;
      duck3.start = true;
      duck4.start = true;
      duck5.start = true;
      duck6.start = true;
      road.start = true;
      city.start = true;
    }, 5000);
  }

  getOddsTable() {
    const awardMixin = this.mixItemInList();
    let index = 0;
    this.oddsTable = OddsTable.map(item=>{
      if(item.type === 'button') {
        item.reward = awardMixin[index];
        index++;
      }
      return {...item}
    });
    return this.oddsTable;
  }

  mixItemInList() {
    const listItemDistinct = [];
    while(listItemDistinct.length < Reward.length) {
      const number = Math.floor(Math.random() * Reward.length);
      if(!listItemDistinct.includes(number)) {
        listItemDistinct.push(number)
      }
    }
    let objectReward = {};
    listItemDistinct.forEach((item,index)=>{
      objectReward[item] = Reward[index]
    })
    return objectReward;
  }
}