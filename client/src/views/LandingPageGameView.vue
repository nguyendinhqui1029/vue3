<template>
  <div class="landing-page-wrapper" v-if="!isShowGamePage">
    <div class="advertisement">ấda</div>
    <div class="loading-wrapper">
      <div id="loading">
        <input type="checkbox" id="water" />
        <label for="water">
          <div id="fill"></div>
        </label>
        <span>Progress</span>
        <span id="progress">0%</span>
      </div>
    </div>
  </div>
  <div class="game-view" v-if="isShowGamePage">
    <component :is="payload.typeGame"></component>
  </div>
</template>
<script scope>
import { ref } from 'vue';

import BarGame from '@/views/BarGame.vue';
import ChineseChess from '@/views/ChineseChess.vue';
import GomokuGame from '@/views/GomokuGame.vue';
import DuckRacingGame from '@/views/DuckRacingGame.vue';

import router from '@/router';
import { useStore } from 'vuex';
import { Crypto } from '@/utils/crypto';

export default {
  name: 'LandingPageGameView',
  props: { itemList: Array },
  components: { BarGame, ChineseChess, GomokuGame, DuckRacingGame},
  setup() {
    const crypto = new Crypto();
    const store = useStore();
    let currentPercent = ref('0%');
    const isShowGamePage = ref(false);
    const payload = ref(JSON.parse(crypto.decode(router.currentRoute.value.params.token, store.state.gameTypePayloadKey)));
    function renderProgressBar(isNotLoading) {
      isShowGamePage.value = false;
      const elm = document.querySelector('#progress');
      const interval = setInterval(function(){
        if(!elm.innerHTML.match(/100%/gi)){
          if((parseInt(elm.innerHTML) + 1) === 97 && !isNotLoading) return;
          this.currentPercent = (parseInt(elm.innerHTML) + 1) + '%';
          elm.innerHTML = this.currentPercent;
          const currentStep = document.querySelector('#fill');
          if(currentStep) {
            currentStep.style.width = this.currentPercent;
          }
        } else {
          clearInterval(interval);
          isShowGamePage.value = true;
          elm.innerHTML = '0%';
        }
      }, 30);
    }
    return { currentPercent, renderProgressBar, isShowGamePage, payload };
  },
  mounted(){
    if(!this.payload || !this.payload.passAuthor) {
      router.push({path:'/game'})
      return;
    }
    //ToDo get config by typeGame":"1","roomId":123
    this.renderProgressBar(true);
  }
}
</script>
<style scoped>
.game-view {
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.loading-wrapper {
  flex: 1;
}
#loading {
  position: relative;
  width: 50vw;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

input {
  display: none;
}

label {
  position: relative;
  display: block;
  width: 100%;
  height: 20px;
  background: transparent;
  border-radius: 0.4rem;
  border: 2px solid white;
  overflow: hidden;
  box-shadow: -2px 0 8px 0 rgba(white, 0.6);
}

label div {
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #A3E2EF 35%, #4F9CC0);
  height: 100%;
  width: 0%;
  box-shadow: 0 0 8px 1px white inset;

}

label div::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url('@/assets/images/bubbles-mask.gif');
  mix-blend-mode: overlay;
  opacity: 0.5;
}

span {
  display: inline-block;
  color: #4F9CC0;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-top: 0.7rem;
}

span:last-child {
  float: right;
}

.advertisement {
  flex: 2;
}
.landing-page-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}</style>