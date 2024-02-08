<template>
  <div class="content">
    <div class="bar-container">
      <div class="button-wrapper-left">

        <div class="wrapper">
          <label class="title">Điểm thưởng</label>
          <div class="award">{{ awardScore }}</div>
        </div>
        <div class="item-control">
          <CircleButton :size="'45px'" :isDisabled="disableStartButton" type="image"
            :urlImage="require('@/utils/bar-game/images/tao.png')" @buttonClick="enterPoint('apple')" />
        </div>
        <div class="amount">{{ apple }}</div>

        <div class="item-control">
          <CircleButton :size="'45px'" :isDisabled="disableStartButton" type="image"
            :urlImage="require('@/utils/bar-game/images/cam.png')" @buttonClick="enterPoint('orange')" />
        </div>
        <div class="amount">{{ orange }}</div>

        <div class="item-control">
          <CircleButton :size="'45px'" :isDisabled="disableStartButton" type="image"
            :urlImage="require('@/utils/bar-game/images/coc.png')" @buttonClick="enterPoint('toadFruit')" />
        </div>
        <div class="amount">{{ toadFruit }}</div>

        <div class="item-control">
          <CircleButton :size="'45px'" :isDisabled="disableStartButton" type="image"
            :urlImage="require('@/utils/bar-game/images/chuong.png')" @buttonClick="enterPoint('bell')" />
        </div>
        <div class="amount">{{ bell }}</div>

        <div></div>
        <CircleButton :size="'50px'" type="text" label="Thoát" @buttonClick="navigatePreviousPage()" />

      </div>
      <div id="bar-board">
        <div v-for="item in barBoard.board" :key="'bar-' + item.index"
          :class="{ 'item': item.index !== 9, 'merge-cell': item.index === 9, 'item-nine': item.index === 9 }">
          <span v-if="item.index !== 9" :class="{
            'flicker': item.flicker,
            'red': item.isLight,
            'inner-item': true,
            'item-one': item.index === 1,
            'item-left': item.index === 8 || item.index === 11 || item.index === 13 || item.index === 15 || item.index === 17,
            'item-seven': item.index === 7,
            'item-nine-teen': item.index === 19,
            'item-twenty-five': item.index === 25,
            'item-top': item.index === 2 || item.index === 3 || item.index === 4 || item.index === 5 || item.index === 6,
            'item-right': item.index === 10 || item.index === 12 || item.index === 14 || item.index === 16 || item.index === 18,
            'item-bottom': item.index === 20 || item.index === 21 || item.index === 22 || item.index === 23 || item.index === 24
          }"></span>
        </div>
      </div>
      <div class="button-wrapper-right">

        <div class="wrapper">
          <label class="title">Điểm của bạn</label>
          <div class="credit">{{ playerScore }}</div>
        </div>

        <div class="amount">{{ watermelon }}</div>
        <div class="item-control">
          <CircleButton :size="'45px'" :isDisabled="disableStartButton" type="image"
            :urlImage="require('@/utils/bar-game/images/dua-hau.png')" @buttonClick="enterPoint('watermelon')" />
        </div>

        <div class="amount">{{ star }}</div>
        <div class="item-control">
          <CircleButton :size="'45px'" :isDisabled="disableStartButton" type="image"
            :urlImage="require('@/utils/bar-game/images/sao.png')" @buttonClick="enterPoint('star')" />
        </div>

        <div class="amount">{{ sevenSeven }}</div>
        <div class="item-control">
          <CircleButton :size="'45px'" :isDisabled="disableStartButton" type="image"
            :urlImage="require('@/utils/bar-game/images/77.png')" @buttonClick="enterPoint('sevenSeven')" />
        </div>

        <div class="amount">{{ bar }}</div>
        <div class="item-control">
          <CircleButton :size="'45px'" :isDisabled="disableStartButton" type="image"
            :urlImage="require('@/utils/bar-game/images/bar.png')" @buttonClick="enterPoint('bar')" />
        </div>

        <CircleButton :size="'50px'" type="text" label="Start" @buttonClick="start()" />

      </div>
    </div>
  </div>
</template>
<script>
import CircleButton from '@/components/shared/CircleButton.vue';
import { ref, reactive } from 'vue';
import { BarGame } from '@/utils/bar-game/bar-game';
import router from '@/router';
export default {
  name: 'BarGame',
  components: { CircleButton },
  setup() {
    const barGame = new BarGame();
    barGame.renderBarBoard()
    const content = ref('\'11\'');
    const awardScore = ref(0);
    const orange = ref(0);
    const toadFruit = ref(0);
    const apple = ref(0);
    const bell = ref(0);
    const star = ref(0);
    const watermelon = ref(0);
    const sevenSeven = ref(0);
    const bar = ref(0);
    const barBoard = reactive({ board: barGame.barBoard });
    const disableStartButton = ref(false);
    const playerScore = ref(100);
    
    function navigatePreviousPage() {
      router.back();
    }
    function setAmountForItem(type, amount) {
      switch (type) {
        case 'orange': {
          orange.value = amount;
          playerScore.value -= amount;
        }
          break;
        case 'toadFruit': {
          toadFruit.value = amount;
          playerScore.value -= amount;
        }
          break;
        case 'apple': {
          apple.value = amount;
          playerScore.value -= amount;
        }
          break;
        case 'bell': {
          bell.value = amount;
          playerScore.value -= amount;
        }
          break;
        case 'star': {
          star.value = amount;
          playerScore.value -= amount;
        }
          break;
        case 'watermelon': {
          watermelon.value = amount;
          playerScore.value -= amount;
        }
          break;
        case 'sevenSeven': {
          sevenSeven.value = amount;
          playerScore.value -= amount;
        }
          break;
        case 'bar': {
          bar.value = amount;
          playerScore.value -= amount;
        }
          break;
      }
    }
    function enterPoint(type) {
      switch (type) {
        case 'orange': {
          if (playerScore.value > 0) {
            if (orange.value >= 150) return;
            orange.value++;
            playerScore.value = playerScore.value - 1;
            barGame.setItemPlayerSelected(type, orange.value);
          }
        }
          break;
        case 'toadFruit': {
          if (playerScore.value > 0) {
            if (toadFruit.value >= 150) return;
            toadFruit.value++;
            playerScore.value = playerScore.value - 1;
            barGame.setItemPlayerSelected(type, toadFruit.value);
          }
        }
          break;
        case 'apple': {
          if (playerScore.value > 0) {
            if (apple.value >= 150) return;
            apple.value++;
            playerScore.value = playerScore.value - 1;
            barGame.setItemPlayerSelected(type, apple.value);
          }
        }
          break;
        case 'bell': {
          if (playerScore.value > 0) {
            if (bell.value >= 150) return;
            bell.value++;
            playerScore.value = playerScore.value - 1;
            barGame.setItemPlayerSelected(type, bell.value);
          }
        }
          break;
        case 'star': {
          if (playerScore.value > 0) {
            if (star.value >= 150) return;
            star.value++;
            playerScore.value = playerScore.value - 1;
            barGame.setItemPlayerSelected(type, star.value);
          }
        }
          break;
        case 'watermelon': {
          if (playerScore.value > 0) {
            if (watermelon.value >= 150) return;
            watermelon.value++;
            playerScore.value = playerScore.value - 1;
            barGame.setItemPlayerSelected(type, watermelon.value);
          }
        }
          break;
        case 'sevenSeven': {
          if (playerScore.value > 0) {
            if (sevenSeven.value >= 150) return;
            sevenSeven.value++;
            playerScore.value = playerScore.value - 1;
            barGame.setItemPlayerSelected(type, sevenSeven.value);
          }
        }
          break;
        case 'bar': {
          if (playerScore.value > 0) {
            if (bar.value >= 150) return;
            bar.value++;
            playerScore.value = playerScore.value - 1;
            barGame.setItemPlayerSelected(type, bar.value);
          }
        }
          break;
      }
    }
    async function start() {
      if (awardScore.value) {
        playerScore.value += awardScore.value;
        awardScore.value = 0;
        return;
      }
      if (isAmountEmpty() && barGame.isScorePlayerBiggerScoreItemSelected(playerScore.value)) {
        barGame.getPreviousItemPlayerSelected().forEach((item, index) => {
          setAmountForItem(item.type, item.amount);
          barGame.itemPlayerSelected[index].amount = item.amount;
        })
      }
      if (!disableStartButton.value
        && ((playerScore.value && barGame.isScorePlayerBiggerScoreItemSelected(playerScore.value))
          || !isAmountEmpty())) {
        const boardValue = barGame.boardRun('perfectly');
        barBoard.board.forEach(item => item.isLight = false);
        barBoard.board.find(item => item.index === boardValue[0]).isLight = true;
        let i = 0;
        const lastIndexResult = [];
        barGame.getEndResult().forEach(element => {
          lastIndexResult.push(boardValue.lastIndexOf(element))
        });
        barGame.runAudioStart(true);
        while (i < boardValue.length) {
          disableStartButton.value = true;
          const timer = 200;
          await barGame.sleep(timer);
          barBoard.board.find(item => item.index === boardValue[i]).isLight = true;
          if (i >= 4) {
            barBoard.board.find(item => item.index === boardValue[i - 4]).isLight = lastIndexResult.includes(i - 4);
            if (i === boardValue.length - 1) {
              barBoard.board.find(item => item.index === boardValue[i - 3]).isLight = lastIndexResult.includes(i - 3);
              await barGame.sleep(timer);
              barBoard.board.find(item => item.index === boardValue[i - 2]).isLight = lastIndexResult.includes(i - 2);
              await barGame.sleep(timer);
              barBoard.board.find(item => item.index === boardValue[i - 1]).isLight = lastIndexResult.includes(i - 1);
            }
          }
          if (i === boardValue.length - 4) {
            barGame.runAudioStart(false);
            barGame.runAudioEnd(true);
          }
          i++;
        }
        barGame.runAudioEnd(false);
        disableStartButton.value = false;
        awardScore.value = barGame.getTotalScore();
        clearAmount();
        barGame.resetSelectedItem();
      } else return;
    }

    function isAmountEmpty() {
      return !orange.value && !apple.value && !toadFruit.value && !bell.value
        && !sevenSeven.value && !star.value && !bar.value && !watermelon.value;
    }
    function clearAmount() {
      orange.value = 0;
      apple.value = 0;
      toadFruit.value = 0;
      bell.value = 0;
      sevenSeven.value = 0;
      star.value = 0;
      bar.value = 0;
      watermelon.value = 0;
    }

    return {
      barBoard, disableStartButton, content, playerScore, orange, toadFruit, bell, apple,
      star, sevenSeven, bar, watermelon, awardScore, start, enterPoint, navigatePreviousPage
    };
  }
}
</script>

<style scoped>
.flicker {
  animation: flicker 0.6s;
  animation-iteration-count: infinite;
}

@keyframes flicker {
  0% {
    background: gray;
    opacity: 0.5;
  }

  50% {
    opacity: 1;
    background: red;
  }

  75% {
    background: gray;
    opacity: 0.5;
  }

  100% {
    opacity: 1;
    background: red;
  }
}

.red {
  background-color: red !important;
  transition: background-color 0.2s ease-in;
}

.title {
  font-size: 14px;
  text-align: center;
  width: 100%;
  user-select: none;
  color: rgba(251, 255, 0, 0.906);
  font-weight: bold;
  text-transform: uppercase;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}

.award,
.credit {
  width: 100%;
  background: var(--four-color);
  border-radius: 5px;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  line-height: 30px;
  height: 30px;
}

.amount {
  width: 100%;
  height: 30px;
  background: var(--four-color);
  border-radius: 5px;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  line-height: 30px;
  user-select: none;
}

.button-wrapper-left {
  display: grid;
  grid-template-columns: 1fr minmax(60px, 1fr);
  grid-template-rows: repeat(auto-fit,50px);
  gap: 5px;
  align-items: center;
}

.button-wrapper-right {
  display: grid;
  grid-template-columns: minmax(60px, 1fr) 1fr;
  grid-template-rows: repeat(auto-fit,50px);
  gap: 5px;
  align-items: center;
}

.control-board {
  display: flex;
  border: 1px solid black;
  justify-content: space-between;
  align-items: flex-end;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 1px 4px 6px var(--four-color);
  width: 322px;
  margin: auto;
}

.item-nine::after {
  content: v-bind(content) !important;
  bottom: 34px;
  left: 88px;
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
  left: 10px;
  top: -10px;
}

.item-right {
  left: -12px;
  top: 10px;
}

.item-top {
  right: 10px;
  bottom: -10px;
}

.item-one {
  right: -10px;
  bottom: -10px;
}

.item-seven {
  left: -10px;
  bottom: -10px;
}

.item-nine-teen {
  right: -10px;
  top: -10px;
}

.item-twenty-five {
  left: -10px;
  top: -10px;
}

.item-left {
  top: 10px;
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
  width: 21px;
  height: 21px;
  opacity: 1;
  position: absolute;
  z-index: 100;
  border-radius: 50%;
}

.item {
  border: 2px solid black;
  position: relative;
  width: 43px;
  height: 43px;
}

.bar-container {
  display: flex;
  justify-content: center;
  padding: 16px 40px;
  flex-direction: row;
}

#bar-board {
  display: grid;
    width: 315px;
    height: 315px;
  background-image: url('@/utils/bar-game/images/bar-board.png');
  background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    grid-template-columns: repeat(7, 45px);
    grid-template-rows: repeat(7, 45px);
    gap: 0 0px;
    grid-column-start: 1;
    grid-column-end: 9;
    margin: auto;
}

</style>
