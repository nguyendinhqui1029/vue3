<template>
  <div class="container">
    <Transition name="slide-fade">
      <div class="menu-wrapper" v-if="isShowNewOdds">
        <div class="new-odds">
          <div class="header-new-odds">Tỉ lệ cược</div>
          <div class="item" v-for="(item, index) in oddsTable.oddsTable" :key="index" :class="{ [item.class]: true }"
            @click="item.type === 'button' && placeBet(item)">
            {{ item.reward }}
            <span class="bets-money" v-if="item.type === 'button' && totalBetsMoney(item.betsMoney) > 0">{{
              totalBetsMoney(item.betsMoney) }}</span>
          </div>
        </div>
        <div class="history">
          <span class="result-title">Kết quả</span>
          <ul>
            <li>
              <span>1</span>-<span>2</span><span>5</span>
            </li>
            <li>
              <span>1</span>-<span>2</span><span>5</span>
            </li>
          </ul>
          <ButtonControl label="Bắt đầu đua" @buttonClick="startGame()" />
        </div>
      </div>
    </Transition>


    <div class="count-down" v-if="!isShowNewOdds && countDown >= 0">{{ countDown }}</div>
    <canvas id="duck_1">
        </canvas>
        <canvas id="duck_2">
        </canvas>
        <canvas id="duck_3">
        </canvas>
        <canvas id="duck_4">
        </canvas>
        <canvas id="duck_5">
        </canvas>
        <canvas id="duck_6">
        </canvas>
    <div class="background">
      <canvas id="city-background">
      </canvas>
      <canvas id="road-background">
      </canvas>
    </div>
  </div>
</template>
<script>
import { DuckRacing } from '@/utils/duck-racing-game/duck-racing';
import { delay } from '@/utils/utils';
import ButtonControl from '@/components/shared/ButtonControl.vue';
import { reactive, ref } from 'vue';
export default {
  name: 'DuckRacingGame',
  components: { ButtonControl },
  setup() {
    const duckRacing = new DuckRacing();
    const oddsTable = reactive({ oddsTable: duckRacing.getOddsTable() });
    const isShowNewOdds = ref(true);
    const countDown = ref(5);
    duckRacing.stopGame.subscribe(value => {
      isShowNewOdds.value = value;
      oddsTable.oddsTable = duckRacing.getOddsTable();
    });
    function placeBet(boxClickData) {
      oddsTable.oddsTable.forEach(item => {
        if (item.x === boxClickData.x && item.y === boxClickData.y) {
          if (!item.betsMoney.length) {
            item.betsMoney.push({ idUser: 1, money: 1 });
          } else {
            const userId = 1
            const index = item.betsMoney.findIndex(item => item.id === userId);
            if (index >= 0) {
              item.betsMoney[index].money += 1;
            } else {
              item.betsMoney.push({ idUser: userId, money: 1 })
            }
          }
        }
      });
    }

    async function startGame() {
      isShowNewOdds.value = false;
      countDown.value = 5;
      while (countDown.value >= 0) {
        await delay(1000);
        countDown.value--;
      }
      duckRacing.startGame();
    }
    return { oddsTable, isShowNewOdds, duckRacing, countDown, placeBet, startGame };
  },
  methods: {
    totalBetsMoney(betsMoneyByUsers) {
      return betsMoneyByUsers.map(item => item.money).reduce((a, b) => a + b, 0);
    }
  },
  mounted() {
    this.duckRacing.initialGame();
  },
  unmounted() {
    if (this.duckRacing.stopGame) {
      this.duckRacing.stopGame.unsubscribe();
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.container {
  max-height: 376px;
  max-width: 668px;
  min-height: 280px;
  margin: auto;
  position: absolute;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.container .count-down {
  position: absolute;
  z-index: 350;
  color: red;
  font-size: 60px;
  font-weight: 900;
  height: 48px;
  width: 48px;
  line-height: 40px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.col-span-4 {
  grid-column: 3/7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: yellow;
}

.history {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.history .result-title {
  display: block;
  text-align: center;
  font-size: 25px;
  color: red;
  font-weight: bold;
  line-height: 40px;
}

.history ul {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  gap: 10px;
  height: 200px;
  overflow: auto;
  margin-bottom: 10px;
}

.history ul::-webkit-scrollbar-thumb,
.history ul::-webkit-scrollbar-track {
  background: transparent;
}

.history ul li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: yellow;
  font-weight: bold;
  font-size: 20px;
  padding: 0 16px;
}

.menu-wrapper {
  display: flex;
  flex-direction: row;
  position: absolute;
  z-index: 300;
  background: gray;
  opacity: 0.9;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
}

.header-new-odds {
  grid-column: 1/7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  color: red;
}

.bets-money {
  color: red;
  font-size: 13px;
  font-weight: bold;
}

.new-odds .button {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 20px;
  color: yellow;
  font-weight: bold;
  padding: 3px;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: rgb(2, 255, 15);
  font-weight: bold;
}

.new-odds {
  display: grid;
  grid-template-columns: repeat(6, minmax(40px, 70px));
  grid-template-rows: repeat(auto-fit, minmax(30px, 45px));
  flex: 2;
}

.item {
  border: 2px solid blue;
}

.border-none {
  border: none !important;
}

#duck_1 {
  z-index: 200;
}

#duck_2 {
  z-index: 199;
}

#duck_3 {
  z-index: 198;
}

#duck_4 {
  z-index: 197;
}

#duck_5 {
  z-index: 196;
}

#duck_6 {
  z-index: 195;
}

#duck_1,
#duck_2,
#duck_3,
#duck_4,
#duck_5,
#duck_6 {
  position: absolute;
}

.background {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30% 26%;
}

#city-background {
  height: 100%;
  width: 100%;
}

#road-background {
  height: 100%;
  width: 100%;
}
</style>
