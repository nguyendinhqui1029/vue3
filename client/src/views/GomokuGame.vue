<template>
  <div class="content">
    <div class="competitor">
      <div class="bets-money">
      </div>
      <UserProfile class="user-profile"/>
    </div>
    <div id="background">
      <div id="container">
        <div class="row" v-for="(items, index) in board.chessBoard" :key="index">
          <div :class="{ 'column': true, [item.icon]: true, 'won': item.markWon }" v-for="(item, indexItem) in items"
            :key="indexItem" @click="itemClick(item)">
          </div>
        </div>
        <div class="result" v-if="isGameOver">
          <span class="message">{{ message }}</span>
          <div class="button-group">
            <ButtonControl label="Chơi lại" @buttonClick="newGame()" />
            <ButtonControl label="Thoát game" type="secondary" @buttonClick="navigateToPreviousPage()" />
          </div>
        </div>
      </div>
    </div>

    <div class="player">
      <div class="actions">
        <vue-feather class="info" :type="'info'" @click="showGameRule()"></vue-feather>
        <vue-feather class="mic" :type="isMuteMic ? 'mic-off' :'mic'" @click="toggleMic()"></vue-feather>
        <vue-feather class="log-out" @click="navigateToPreviousPage()" :type="'log-out'"></vue-feather>
      </div>
      <UserProfile class="user-profile"/>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from 'vue';
import { GomokuGame } from '@/utils/gomoku-game';
import ButtonControl from '@/components/shared/ButtonControl.vue';
import UserProfile from '@/components/shared/UserProfile.vue';
import router from '@/router';
export default {
  name: 'GomokuGame',
  components: { ButtonControl, UserProfile },
  setup() {
    const isGameOver = ref(false);
    const message = ref('');
    const isMuteMic = ref(false);
    const gomokuGame = new GomokuGame();
    const board = reactive({ chessBoard: [] });

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
    function navigateToPreviousPage() {
      router.back();
    }

    function showGameRule() {
      console.log('showGameRule')
    }

    function toggleMic() {
      isMuteMic.value = !isMuteMic.value;
      console.log('toggleMic')
    }
    return { gomokuGame, message, isGameOver, board, isMuteMic,
      itemClick, newGame, navigateToPreviousPage, showGameRule, toggleMic }
  },
  mounted() {
      const height = document.getElementById('container').getBoundingClientRect().height;
      const width = document.getElementById('container').getBoundingClientRect().width;
      this.gomokuGame.row = Math.floor(height/24.6);
      this.gomokuGame.col = Math.floor(width/24.6);
      this.gomokuGame.initializeBoard();
      this.board.chessBoard = this.gomokuGame.board;
  },
}
</script>

<style scoped>
.user-profile {
  transform: translateY(70%);
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
.bets-money, .actions {
  border-top: 35px solid #565739;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  height: 0;
  width: 140px;
  position: absolute;
}
.mic, .log-out, .info {
  position: absolute;
  top: -30px;
  color: #dcbd53;
}

.mic {
  right: 57px;
} 
.log-out {
 right: 10px;
}  
.info {
  left: 10px;
}

.competitor,
.player {
  display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 60px;
    width: 20%;
    position: relative;
}

.competitor {
  align-items: flex-start;
}
#background {
  display: flex;
  background-image: url('@/assets/images/caro-table.png');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 35px;
  align-items: center;
  justify-content: center;
  min-width: 355px;
  width: 60%;
}

.content {
  display: flex;
  flex-direction: row;
  height: 100%;
  background-image: url('@/assets/images/background.jpg');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

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

#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  transform: translateX(-4px);
}

.column {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23px;
  height: 23px;
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

@media only screen and (min-width: 700px) {
  #background {
    padding: 60px;
  }
}
</style>
