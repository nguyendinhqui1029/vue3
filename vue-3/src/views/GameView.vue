<template>
  <MobileHeader menuType="back-menu" />
  <div class="container">
    <router-link to="gomoku-game">
      <div class="item">
        <div class="logo" :style="{ 'background-image': 'url(' + require('../assets/images/gomoku-game.png') + ')' }"></div>
        <small class="title-game">Caro</small>
      </div>
    </router-link>
    <router-link to="/chinese-chess">
      <div class="item">
        <div class="logo"> Cờ tướng</div>
        <small class="title-game">Cờ tướng</small>
      </div>
    </router-link>
    <router-link to="/chinese-chess">
      <div class="item">
        <div class="logo"> game 1</div>
        <small class="title-game">Tên game</small>
      </div>
    </router-link>
    <router-link to="/chinese-chess">
      <div class="item">
        <div class="logo"> game 1</div>
        <small class="title-game">Tên game</small>
      </div>
    </router-link>
    <router-link to="/chinese-chess">
      <div class="item">
        <div class="logo"> game 1</div>
        <small class="title-game">Tên game</small>
      </div>
    </router-link>
  </div>
</template>
<script>
import MobileHeader from '@/components/client/mobile/MobileHeader.vue';
export default {
  name: 'GameView',
  components: { MobileHeader },
  setup() {

  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.title-game {
  text-align: center;
  margin-top: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--four-color);
}

.item {
  display: flex;
  flex-direction: column;
}

.logo {
  border-radius: 10px;
  height: 80px;
  cursor: pointer;
  box-shadow: inset 0px 0px 4px 2px var(--three-color);
  color: var(--four-color);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  padding: 16px;
  display: grid;
  grid-template-columns: 80px 80px 80px 80px;
  grid-template-rows: auto;
  gap: 12px;
}
</style>
