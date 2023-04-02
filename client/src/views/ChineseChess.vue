<template>
  <div class="content">
    <div class="left">
      <div class="bets-money">
      </div>
      <div class="user-wrapper">
        <UserProfile/>
      </div>
    </div>
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
            <div class="image" v-if="row.icon" :style="{ 'background-image': 'url(' + chessImage.image[row.icon] + ')' }"
              :class="{ 'chess-selected': row.isActive }"></div>
            <div v-if="row.markMove" class="mark-move">
            </div>
            <!-- {{ row.x }} {{ row.y }} -->
          </div>
        </div>
      </div>
    </div>
    <div class="right"> 
      <div class="actions">
        <vue-feather class="info" :type="'info'"></vue-feather>
        <vue-feather class="mic" :type="'mic'"></vue-feather>
        <vue-feather class="log-out" @click="navigateToPreviousPage()" :type="'log-out'"></vue-feather>
      </div>
      <div class="user-wrapper">
        <UserProfile/>
      </div>
      <div class="button-wrapper">
        <div class="button-draw">Xin Hòa</div>
        <div class="button-lose">Xin Thua</div>
      </div>
    </div>
  </div>
</template>
<script>
import { ChineseChessGame } from '@/utils/chinese-chess/chinese-chess-game';
import { reactive } from 'vue';
import UserProfile from '@/components/shared/UserProfile.vue';
import router from '@/router';
export default {
  name: 'ChineseChess',
  components: { UserProfile },
  setup() {
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

    function navigateToPreviousPage() {
      router.back();
    }
    return { clickChessBox, navigateToPreviousPage, board, chessImage };
  }
}
</script>

<style scoped>
.button-wrapper {
  display: flex;
  height: 40px;
  justify-content: space-around;
}
.button-draw {
  border: 2px solid #ffbc5d;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding: 2px;
    background-image: linear-gradient(0deg, #ffdf5d, transparent);
    font-weight: bold;
    color: white;
}

.button-lose {
    border: 2px solid #ffdf5d;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding: 2px;
    background-image: linear-gradient(0deg, #ffdf5d, transparent);
    font-weight: bold;
    color: white;
}
.mic, .log-out, .info {
  position: absolute;
  top: -30px;
  color: #dcbd53;
}

.mic {
 right: 62px;
} 
.log-out {
 right: 10px;
}  
.info {
  left: 10px;
}
.user-wrapper {
  padding: 10px;
}
.mark-move {
  position: absolute;
  z-index: 300;
  border: 2px solid blueviolet;
  top: 0;
  left: 3px;
  width: 25px;
  height: 25px;
}

.chess-selected {
  border: 1px solid red;
  border-radius: 50%;
}

.image {
  width: 95%;
  height: 95%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 90%;
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
  margin: 1.5px;
  gap: 3.5px;
  transform: translate(-17px, -17px);
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
  width: 46px;
  background: var(--four-color);
  position: absolute;
  transform: rotate(45deg);
}

.diagonal-sub::before {
  content: '';
  height: 2px;
  width: 46px;
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
  grid-template-rows: repeat(9, 35px);
  grid-template-columns: repeat(8, 34.5px);
  margin: auto;
  position: relative;
  background-image: url('@/assets/images/board.jpg');
  border: 20px solid;
  border-image: url('@/assets/images/board.jpg') 1;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  overflow: hidden;
}

.left,
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.bets-money, .actions {
  border-top: 35px solid #565739;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  height: 0;
  width: 141px;
  position: relative;
}

.bets-money::before {
  content: 'Tiền Cược';
  color: #bcbd96;
  position: absolute;
  top: -25px;
  font-size: 12px;
}

.bets-money::after {
  position: absolute;
  content: '50000';
  background: #3e3f31;
  width: 80px;
  height: 23px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dcbd53;
  top: -28px;
  right: 0;
}
</style>
