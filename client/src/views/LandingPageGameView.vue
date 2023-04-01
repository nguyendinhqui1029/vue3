<template>
  <div class="landing-page-wrapper">
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
</template>
<script scope>
import router from '@/router';
import { ref } from 'vue';
export const GameType = {
  BarGame: {
    id: 1,
    path: 'bar-game'
  }
}
export default {
  name: 'LandingPageGameView',
  props: { itemList: Array },
  setup() {
    let currentPercent = ref('0%');
    function getGameView(idGame) {
      switch(idGame) {
        case 1: return GameType.BarGame.path;
        default: return GameType.BarGame.path;
      }
    }
    function renderProgressBar(haveConfig) {
      const elm = document.querySelector('#progress');
      const interval = setInterval(function(){
        if(!elm.innerHTML.match(/100%/gi)){
          if((parseInt(elm.innerHTML) + 1) === 97 && !haveConfig) return;
          this.currentPercent = (parseInt(elm.innerHTML) + 1) + '%';
          elm.innerHTML = this.currentPercent;
          const currentStep = document.querySelector('#fill');
          currentStep.style.width = this.currentPercent;
        } else {
          clearInterval(interval);
          router.replace({path: getGameView(router.currentRoute.value.query.type), query: {q: haveConfig} })
        }
      }, 180);
    }
    return { currentPercent, renderProgressBar };
  },
  mounted(){
    this.renderProgressBar(null);

  }
}
</script>
<style scoped>
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