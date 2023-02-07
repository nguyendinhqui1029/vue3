<template>
  <MobileHeader menuType="back-menu" />
  <div class="content">
    <div class="chinese-chess-board">
      <div class="box" v-for="n in 65" :key="n" :class="{
        'merge-col': n === 33,
        'diagonal-primary': n === 4 || n === 13 || n === 62 || n === 53,
        'diagonal-sub': n === 5 || n === 12 || n === 61 || n === 54,
        'right-triangle-bottom-left-before': n === 17 || n === 19 || n === 21 || n === 23 || n === 34 || n === 36 || n === 38 || n === 40,
        'right-triangle-top-left-before': n === 25 || n === 27 || n === 29 || n === 31 || n === 42 || n === 44 || n === 46 || n === 48 || n === 51 || n === 57,
        'right-triangle-top-right-before': n === 26 || n === 28 || n === 30 || n === 32 || n === 43 || n === 45 || n === 47 || n === 49 || n === 50 || n === 56,
        'right-triangle-bottom-right-before': n === 18 || n === 20 || n === 22 || n === 24 || n === 35 || n === 37 || n === 39 || n === 41,
        'right-triangle-bottom-right-after': n === 42 || n === 48,
        'right-triangle-bottom-left-after': n === 43 || n === 49
      }">
      </div>
      <div class="chess-box">
        <div class="col-board" v-for="(col, index) in board.chessBoard" :key="index">
          <div class="row-board" v-for="(row, indexItem) in col" :key="indexItem" @click="clickChessBox(row)">
            <div class="image" v-if="row.icon"
              :style="{ 'background-image': 'url(' + chessImage.image[row.icon] + ')' }"
              :class="{'chess-selected': row.isActive}"></div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MobileHeader from '@/components/client/mobile/MobileHeader.vue';
import { ChineseChessGame } from '@/utils/chinese-chess/chinese-chess-game';
import { reactive } from 'vue';
export default {
  name: 'ChineseChess',
  components: { MobileHeader },
  setup() {
    const chessImage = reactive({
      image: {
        'general-black': require('@/assets/images/general-black.png'),
        'advisor-black': require('@/assets/images/advisor-black.png'),
        'cannon-black': require('@/assets/images/cannon-black.png'),
        'chariot-black': require('@/assets/images/chariot-black.png'),
        'elephant-black': require('@/assets/images/elephant-black.png'),
        'horse-black': require('@/assets/images/horse-black.png'),
        'soldier-black': require('@/assets/images/soldier-black.png'),
        'general-red': require('@/assets/images/general-red.png'),
        'advisor-red': require('@/assets/images/advisor-red.png'),
        'cannon-red': require('@/assets/images/cannon-red.png'),
        'chariot-red': require('@/assets/images/chariot-red.png'),
        'elephant-red': require('@/assets/images/elephant-red.png'),
        'horse-red': require('@/assets/images/horse-red.png'),
        'soldier-red': require('@/assets/images/soldier-red.png')
      }
    });
    const chineseChessGame = new ChineseChessGame();
    let board = reactive({ chessBoard: chineseChessGame.chessBoard });
    function clickChessBox(chessBox) {
      chineseChessGame.chessBoxClick(chessBox);
      board.chessBoard = [...chineseChessGame.chessBoard];
    }
    return { clickChessBox, board, chessImage };
  }
}
</script>

<style scoped>
.chess-selected {
  border: 1px solid red;
  border-radius: 50%;
}
.image {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 110%;
}

.row-board {
  width: 31.5px;
  height: 31.5px;
}

.col-board {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin: 6.5px;
  gap: 13.5px;
  transform: translate(-21px, -21px);
  text-align: center;
}

.chess-box {
  position: absolute;
  z-index: 10000;
  display: flex;
  width: 100%;
  height: 100%;
}

.right-triangle-top-left-after::after {
  content: '';
  width: 7px;
  height: 7px;
  border-left: 3px solid var(--four-color);
  border-top: 3px solid var(--four-color);
  position: absolute;
  top: 3px;
  left: 3px;
}

.right-triangle-top-right-after::after {
  content: '';
  width: 7px;
  height: 7px;
  border-right: 3px solid var(--four-color);
  border-top: 3px solid var(--four-color);
  position: absolute;
  top: 3px;
  right: 3px;
}

.right-triangle-bottom-left-after::after {
  content: '';
  width: 7px;
  height: 7px;
  border-left: 3px solid var(--four-color);
  border-bottom: 3px solid var(--four-color);
  position: absolute;
  bottom: 3px;
  left: 3px;
}

.right-triangle-bottom-right-after::after {
  content: '';
  width: 7px;
  height: 7px;
  border-right: 3px solid var(--four-color);
  border-bottom: 3px solid var(--four-color);
  position: absolute;
  bottom: 3px;
  right: 3px;
}

.right-triangle-top-left-before::before {
  content: '';
  width: 7px;
  height: 7px;
  border-left: 3px solid var(--four-color);
  border-top: 3px solid var(--four-color);
  position: absolute;
  top: 3px;
  left: 3px;
}

.right-triangle-top-right-before::before {
  content: '';
  width: 7px;
  height: 7px;
  border-right: 3px solid var(--four-color);
  border-top: 3px solid var(--four-color);
  position: absolute;
  top: 3px;
  right: 3px;
}

.right-triangle-bottom-left-before::before {
  content: '';
  width: 7px;
  height: 7px;
  border-left: 3px solid var(--four-color);
  border-bottom: 3px solid var(--four-color);
  position: absolute;
  bottom: 3px;
  left: 3px;
}

.right-triangle-bottom-right-before::before {
  content: '';
  width: 7px;
  height: 7px;
  border-right: 3px solid var(--four-color);
  border-bottom: 3px solid var(--four-color);
  position: absolute;
  bottom: 3px;
  right: 3px;
}

.diagonal-primary::before {
  content: '';
  height: 2px;
  width: 62px;
  background: var(--four-color);
  position: absolute;
  transform: rotate(45deg);
}

.diagonal-sub::before {
  content: '';
  height: 2px;
  width: 62px;
  background: var(--four-color);
  position: absolute;
  transform: rotate(-45deg);
}

.merge-col {
  grid-column-start: 1;
  grid-column-end: 9;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  position: relative;
}

.chinese-chess-board {
  display: grid;
  grid-template-rows: 45px 45px 45px 45px 45px 45px 45px 45px 45px;
  grid-template-columns: 45px 45px 45px 45px 45px 45px 45px 45px;
  margin: auto;
  position: relative;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: calc(100% - 50px);
}
</style>
