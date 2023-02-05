<template>
  <MobileHeader menuType="back-menu" />
  <div class="container">
    <div class="row" v-for="(items, index) in board.chessBoard" :key="index">
      <div :class="{'column': true, [item.icon]: true,'won': item.markWon}" v-for="(item, indexItem) in items" :key="indexItem" @click="itemClick(item)">
      </div>
    </div>
    <div class="result" v-if="isGameOver">
      <span class="message">{{ message }}</span>
      <div class="button-group">
        <ButtonControl label="Chơi lại" @buttonClick="newGame()" />
        <ButtonControl label="Thoát game" type="secondary" @buttonClick="back()" />
      </div>
    </div>
  </div>
</template>
<script>
import MobileHeader from '@/components/client/mobile/MobileHeader.vue';
import { reactive, ref } from 'vue';
import { GomokuGame } from '@/utils/gomoku-game';
import ButtonControl from '@/components/shared/ButtonControl.vue';
import router from '@/router';
export default {
  name: 'GameView',
  components: { MobileHeader, ButtonControl },
  setup() {
    const isGameOver = ref(false);
    const message = ref('');
    const gomokuGame = new GomokuGame();
    gomokuGame.initializeBoard();
    const board = reactive({ chessBoard: gomokuGame.board });

    function itemClick(chessBox) {
      gomokuGame.pointClick(chessBox);
      board.chessBoard = [...gomokuGame.board];
      isGameOver.value = gomokuGame.isGameOver;
      if (gomokuGame.aiWin) {
        message.value = 'Bạn đã thua! Xin mời bạn chơi lại trận mới.'
      } else if (gomokuGame.playerWin) {
        message.value = 'Chúc mừng bạn đã chiến thắng! Bạn thật tài.'
      } else if (gomokuGame.isDraw) {
        message.value = 'Chúng ta ngang tài ngang sức. Đấu lại thôi nào.'
      }
    }

    function newGame() {
      gomokuGame.reNewGame();
      board.chessBoard = [...gomokuGame.board];
      isGameOver.value = false;
    }
    function back() {
      router.back();
    }
    return { message, isGameOver, board, itemClick, newGame, back }
  }
}
</script>

<style scoped>
.won {
  background: yellow;
}
.message {
  font-size: 25px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
  color: blueviolet;
  padding: 16px;
  z-index: 10;
}
.active-o::before {
  content: '';
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid red;
}

.active-x::before {
  content: '';
  width: 25px;
  height: 3px;
  background: blue;
  transform: rotate(-45deg);
}
.active-x::after {
  content: '';
  width: 25px;
  height: 3px;
  background: blue;
  transform: rotate(45deg);
  position: absolute
}


.button-group {
  display: grid;
  grid-template-columns: 120px 120px;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
}

.result {
  position: absolute;
  z-index: 5;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.column {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid black;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.form {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
</style>
