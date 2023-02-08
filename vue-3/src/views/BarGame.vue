<template>
  <MobileHeader menuType="back-menu" />
  <div class="content">
    <div class="bar-container">
      <div class="bar-board">
        <div v-for="n in 25" :key="n" :class="{ 'item': n !== 9, 'merge-cell': n === 9, 'item-nine': n === 9 }">
          <span v-if="n !== 9" :class="{
            'blue': (numberLight <= 22 && numberLight >= 2) && n === run[numberLight - 2],
            'yellow': (numberLight <= 21 && numberLight >= 1) && n === run[numberLight - 1],
            'red': n === run[numberLight],
            'inner-item': true,
            'item-one': n === 1,
            'item-left': n === 8 || n === 11 || n === 13 || n === 15 || n === 17,
            'item-seven': n === 7,
            'item-nine-teen': n === 19,
            'item-twenty-five': n === 25,
            'item-top': n === 2 || n === 3 || n === 4 || n === 5 || n === 6,
            'item-right': n === 10 || n === 12 || n === 14 || n === 16 || n === 18,
            'item-bottom': n === 20 || n === 21 || n === 22 || n === 23 || n === 24
          }"></span>
        </div>
      </div>
      <div class="control-board">
        <div class="button-wrapper">
          <div class="amount">{{ orange }}</div>
          <div class="amount">{{ toadFruit }}</div>
          <div class="amount">{{ apple }}</div>
          <div class="amount">{{ bell }}</div>
          <div class="item-control">
            <CircleButton type="image" :urlImage="require('@/utils/bar-game/images/cam.png')"
              @buttonClick="enterPoint('orange')" />
          </div>
          <div class="item-control">
            <CircleButton type="image" :urlImage="require('@/utils/bar-game/images/coc.png')"
              @buttonClick="enterPoint('toadFruit')" />
          </div>
          <div class="item-control">
            <CircleButton type="image" :urlImage="require('@/utils/bar-game/images/tao.png')"
              @buttonClick="enterPoint('apple')" />
          </div>
          <div class="item-control">
            <CircleButton type="image" :urlImage="require('@/utils/bar-game/images/chuong.png')"
              @buttonClick="enterPoint('bell')" />
          </div>
          <div class="amount">{{ star }}</div>
          <div class="amount">{{ watermelon }}</div>
          <div class="amount">{{ sevenSeven }}</div>
          <div class="amount">{{ bar }}</div>
          <div class="item-control">
            <CircleButton type="image" :urlImage="require('@/utils/bar-game/images/dua-hau.png')"
              @buttonClick="enterPoint('star')" />
          </div>
          <div class="item-control">
            <CircleButton type="image" :urlImage="require('@/utils/bar-game/images/sao.png')"
              @buttonClick="enterPoint('watermelon')" />
          </div>
          <div class="item-control">
            <CircleButton type="image" :urlImage="require('@/utils/bar-game/images/77.png')"
              @buttonClick="enterPoint('sevenSeven')" />
          </div>
          <div class="item-control">
            <CircleButton type="image" :urlImage="require('@/utils/bar-game/images/bar.png')"
              @buttonClick="enterPoint('bar')" />
          </div>
        </div>
        <div class="wrapper">
          <label class="title">Điểm thưởng:</label>
          <div class="award">{{ awardScore }}</div>
          <label class="title">Điểm bạn có:</label>
          <div class="credit">{{ currentScore }}</div>
          <CircleButton type="text" label="Start" @buttonClick="start()" />
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import MobileHeader from '@/components/client/mobile/MobileHeader.vue';
import CircleButton from '@/components/shared/CircleButton.vue';
import { ref, reactive } from 'vue';
export default {
  name: 'BarGame',
  components: { MobileHeader, CircleButton },
  setup() {
    const content = ref('\'11\'');
    const currentScore = ref(0);
    const awardScore = ref(0);
    const orange = ref(0);
    const toadFruit = ref(0);
    const apple = ref(0);
    const bell = ref(0);
    const star = ref(0);
    const watermelon = ref(0);
    const sevenSeven = ref(0);
    const bar = ref(0);
    const numberLight = ref(1);
    let run = reactive([1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 25, 24, 23, 22, 21, 20, 19, 17, 15, 13, 11, 8,
      1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 25, 24, 23, 22, 21, 20, 19, 17, 15, 13, 11, 8]);
    function enterPoint(type) {
      switch (type) {
        case 'orange': orange.value++;
          break;
        case 'toadFruit': toadFruit.value++;
          break;
        case 'apple': apple.value++;
          break;
        case 'bell': bell.value++;
          break;
        case 'star': star.value++;
          break;
        case 'watermelon': watermelon.value++;
          break;
        case 'sevenSeven': sevenSeven.value++;
          break;
        case 'bar': bar.value++;
          break;
      }
    }

    async function start() {
      let startNumber = 0;
      const end = (Math.round(Math.random()*26 + 24));
      run = (Math.round(Math.random() + 1)) % 2 === 0 ? run.reverse() : run;
      while (startNumber < end) {
        await sleep(25*(end - startNumber)+10);  
        numberLight.value = startNumber;
        startNumber++;
      }
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    return {
      run, content, enterPoint, orange, toadFruit, bell, apple,
      star, sevenSeven, bar, watermelon, currentScore, awardScore, numberLight, start
    };
  }
}
</script>

<style scoped>
.yellow {
  background-color: yellow !important;
  transition: background-color 0.3s ease-in;
}

.blue {
  background-color: blue !important;
  transition: background-color 0.3s ease-in;
}

.red {
  background-color: red !important;
  transition: background-color 0.3s ease-in;
}
.title {
  font-size: 10px;
  text-align: left;
  width: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;
}

.award,
.credit {
  width: 90px;
  background: var(--four-color);
  border-radius: 5px;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  line-height: 40px;
  height: 40px;
}

.amount {
  width: 100%;
  background: var(--four-color);
  border-radius: 5px;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  line-height: 40px;
}

.button-wrapper {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: 30px 50px 30px 50px;
  gap: 5px;
}

.control-board {
  display: flex;
  border: 1px solid black;
  justify-content: space-between;
  align-items: flex-end;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 1px 4px 6px var(--four-color);
}

.item-nine::after {
  content: v-bind(content) !important;
  bottom: 39px;
  left: 105px;
  width: 45px !important;
  height: 24px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-family: monospace;
  background: black !important;
  color: red;
  opacity: 1 !important;
  position: absolute;
}

.item-bottom {
  left: 13px;
  top: -13px;
}

.item-right {
  left: -8px;
  top: 18px;
}

.item-top {
  right: 9px;
  bottom: -17px;
}

.item-one {
  right: -15px;
  bottom: -15px;
}

.item-seven {
  left: -7px;
  bottom: -17px;
}

.item-nine-teen {
  right: -12px;
  top: -9px;
}

.item-twenty-five {
  left: -10px;
  top: -8px;
}

.item-left {
  top: 16px;
  right: -12px;

}

.merge-cell {
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 7;
  position: relative;
}

.inner-item {
  width: 25px;
  height: 25px;
  opacity: 1;
  position: absolute;
  z-index: 100;
  border-radius: 50%;
}

.item {
  border: 2px solid black;
  position: relative;
  width: 50px;
  height: 50px;
}

.bar-container {
  display: flex;
  justify-content: center;
  padding: 16px;
  flex-direction: column;
}

.bar-board {
  display: grid;
  width: 360px;
  height: 370px;
  background-image: url('@/utils/bar-game/images/bar-board.png');
  background-position: inherit;
  background-repeat: no-repeat;
  background-size: contain;
  grid-template-columns: 51px 51px 51px 51px 51px 51px 51px;
  grid-template-rows: 50px 50px 50px 50px 50px 50px 50px;
  gap: 1.5px 0.5px;
  grid-column-start: 1;
  grid-column-end: 9;
}
</style>
