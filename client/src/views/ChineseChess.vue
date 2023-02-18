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
            <div v-if="row.markMove" class="mark-move">
            </div>
            {{ row.x }} {{ row.y }}
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
import { Crypto } from '@/utils/crypto';
export default {
  name: 'ChineseChess',
  components: { MobileHeader },
  setup() {
    const crypto = new Crypto();
    const encode = crypto.encode({id:1, win: true}, '123456789');
    const decode = crypto.decode(encode, '123456789');
    console.log(encode);
    console.log(decode);
    const chessImage = reactive({
      image: {
        'general-black': require('@/utils/chinese-chess/images/general-black.svg'),
        'advisor-black': require('@/utils/chinese-chess/images/advisor-black.svg'),
        'cannon-black': require('@/utils/chinese-chess/images/cannon-black.svg'),
        'chariot-black': require('@/utils/chinese-chess/images/chariot-black.svg'),
        'elephant-black': require('@/utils/chinese-chess/images/elephant-black.svg'),
        'horse-black': require('@/utils/chinese-chess/images/horse-black.svg'),
        'soldier-black': require('@/utils/chinese-chess/images/soldier-black.svg'),
        'general-red': require('@/utils/chinese-chess/images/general-red.svg'),
        'advisor-red': require('@/utils/chinese-chess/images/advisor-red.svg'),
        'cannon-red': require('@/utils/chinese-chess/images/cannon-red.svg'),
        'chariot-red': require('@/utils/chinese-chess/images/chariot-red.svg'),
        'elephant-red': require('@/utils/chinese-chess/images/elephant-red.svg'),
        'horse-red': require('@/utils/chinese-chess/images/horse-red.svg'),
        'soldier-red': require('@/utils/chinese-chess/images/soldier-red.svg')
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
.mark-move {
  position: absolute;
  z-index: 300;
  border: 2px solid blueviolet;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
}
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
  border-radius: 50%;
}

.row-board {
  width: 31.5px;
  height: 31.5px;
  position: relative;
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
