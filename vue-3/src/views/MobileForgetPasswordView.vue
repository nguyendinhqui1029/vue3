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
    <div class="row" v-for="(items, index) in board.banco" :key="index">
      <div class="column" v-for="(item, indexItem) in items" :key="indexItem" @click="itemClick(index, indexItem)">
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
export default {
  name: 'MobileForgetPasswordView',
  components: { InputControl, ButtonControl, MobileHeader },
  setup() {
    const email = ref('a@gmail.com');
    const board = reactive({ banco: [] });

    let isPlayer = false;
    renderBanCo();
    function renderBanCo() {
      for (let i = 0; i < 9; i++) {
        const rows = [];
        for (let j = 0; j < 9; j++) {
          rows.push({ x: j, y: i, value: '', disable: false });
        }
        board.banco.push(rows)
      }
    }
    function emailValueChange(value) {
      console.log(value)
    }
    function handleClickRegister() {
      console.log('button Click')
    }
    function handleClickBack() {
      router.back();
    }

    function itemClick(x, y) {
      if (board.banco[x][y].disable) return;
      const content = isPlayer ? 'X' : 'O';
      isPlayer = !isPlayer;
      board.banco[x][y].value = content;
      board.banco[x][y].disable = true;
      if (checkEndGame(board.banco[x][y])) {
        console.log('End game')
      }
    }

    function checkEndGame(oco) {
      return endGameVertical(oco) || endGameHorizontal(oco) || endGamePrimary(oco) || endGameSub(oco);
    }

    function endGameVertical(oco) {
      let endGameLeft = 0;
      let endGameRight = 0;
      for(let i = oco.x; i >= 0; i--) {
        if(board.banco[oco.y][i].value === oco.value) {
          endGameLeft++;
        }else break;
      }
      for(let i = oco.x + 1; i < 9; i++) {
        if(board.banco[oco.y][i].value === oco.value) {
          endGameRight++;
        }else break;
      }
      return endGameLeft + endGameRight >= 5;
    }
    function endGameHorizontal(oco) {
      let endGameTop = 0;
      let endGameBottom = 0;
      for(let i = oco.y; i >= 0; i--) {
        if(board.banco[i][oco.x].value === oco.value) {
          endGameTop++;
        }else break;
      }
      for(let i = oco.y + 1; i < 9; i++) {
        if(board.banco[i][oco.x].value === oco.value) {
          endGameBottom++;
        }else break;
      }
      return endGameTop + endGameBottom >= 5;
    }
    function endGamePrimary(oco) {
      let endGameTop = 0;
      let endGameBottom = 0;
      for(let i = 0; i < 9; i++) {
        if( oco.y - i < 0 || oco.x - i < 0) break;
        if(board.banco[oco.y - i][oco.x - i].value === oco.value) {
          endGameTop++;
        }else break;
      }
      for(let i = 1; i < 9; i++) {
        if( oco.y + i >= 9 || oco.x + i >= 9) break;
        if(board.banco[oco.y + i][oco.x + i].value === oco.value) {
          endGameBottom++;
        }else break;
      }
      console.log(endGameTop + endGameBottom)
      return endGameTop + endGameBottom >= 5;
    }
    function endGameSub(oco) {
      let endGameTop = 0;
      let endGameBottom = 0;
      for(let i = 0; i < 9; i++) {
        if( oco.y + i >= 9 || oco.x - i < 0) break;
        if(board.banco[oco.y + i][oco.x - i].value === oco.value) {
          endGameTop++;
        }else break;
      }
      for(let i = 1; i < 9; i++) {
        if( oco.y - i < 0 || oco.x + i >= 9) break;
        if(board.banco[oco.y - i][oco.x + i].value === oco.value) {
          endGameBottom++;
        }else break;
      }
      console.log(endGameTop + endGameBottom)
      return endGameTop + endGameBottom >= 5;
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
