<template>
  <MobileHeader menuType="back-menu" />
  <form class="form">
    <InputControl @valueChange="emailValueChange($event)" label="Email" :initialValue="email" type="email"
      placeholder="Nhập email" />
    <div class="button-group">
      <ButtonControl @buttonClick="handleClickRegister()" :label="'Lấy lại mật khẩu'" type="primary" />
      <ButtonControl @buttonClick="handleClickBack()" :label="'Trở lại'" type="secondary" />
    </div>
  </form>
  <div class="container">
    <div class="row" v-for="(items, index) in board.chessBoard" :key="index">
      <div class="column" v-for="(item, indexItem) in items" :key="indexItem" @click="itemClick(item)">
        {{ item.value }}
      </div>
    </div>
  </div>
</template>
<script>
import InputControl from '@/components/shared/InputControl.vue';
import ButtonControl from '@/components/shared/ButtonControl.vue';
import MobileHeader from '@/components/client/mobile/MobileHeader.vue';
import { ref, reactive } from 'vue';
import router from '@/router';
import { CaroGame } from '@/utils/caro-game';
export default {
  name: 'MobileForgetPasswordView',
  components: { InputControl, ButtonControl, MobileHeader },
  setup() {
    const caro = new CaroGame();
    caro.renderChessBoard()
    const email = ref('a@gmail.com');
    const board = reactive({ chessBoard: caro.getChessBoard() });
    let isPlayerX = false;
    function emailValueChange(value) {
      console.log(value)
    }
    function handleClickRegister() {
      console.log('button Click')
    }
    function handleClickBack() {
      router.back();
    }

    function itemClick(chessBox) {
      if (!isPlayerX) {
        caro.placeAMove(chessBox, caro.PLAYER_O);
        board.chessBoard = [...caro.getChessBoard()];
        if (caro.hasPlayerWon(caro.PLAYER_O)) {
          setTimeout(() => {
            if (confirm('Bạn hay quá! Chơi lại nha.')) {
              caro.renderChessBoard();
              board.chessBoard = [...caro.getChessBoard()];
            }
            return;
          }, 1000);
        }
        isPlayerX = !isPlayerX;
      }
      if (caro.isGameOver()) {
        setTimeout(() => {
          if (confirm('Hòa nhau rồi! Chơi lại nha?')) {
            caro.renderChessBoard();
            board.chessBoard = [...caro.getChessBoard()];
          }
          return;
        }, 1000);
      }
      if (isPlayerX) {
        caro.minimax(0, caro.PLAYER_X);
        caro.placeAMove(caro.computerMove, caro.PLAYER_X);
        board.chessBoard = [...caro.getChessBoard()];
        if (caro.hasPlayerWon(caro.PLAYER_X)) {
          setTimeout(() => {
            if (confirm('Bạn thua rồi! Chơi lại không?')) {
              caro.renderChessBoard();
              board.chessBoard = [...caro.getChessBoard()];
            }
            return;
          }, 1000);
        }
        isPlayerX = !isPlayerX;
      }
    }
    return { email, board, emailValueChange, handleClickRegister, handleClickBack, itemClick }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
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

.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 50px;
  width: 250px;
}
</style>
