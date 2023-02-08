<template>
  <MobileHeader menuType="back-menu" />
  <div class="content">
    <div class="bar-container">
      <div class="bar-board">
        <div v-for="n in 25" :key="n" class="item"
         :class="{
          'item-nine': n === 9,
          'merge-cell': n === 9,
          'item-one': n === 1,
          'item-left': n === 8 || n === 11 || n === 13 || n === 15 || n === 17,
          'item-seven': n === 7,
          'item-nine-teen': n === 19,
          'item-twenty-five': n === 25,
          'item-top': n === 2 || n === 3 || n === 4 || n === 5 || n === 6,
          'item-right': n === 10 || n === 12 || n === 14 || n === 16 || n === 18,
          'item-bottom': n === 20 || n === 21 || n === 22 || n === 23 || n === 24
        }"></div>
      </div>
      <div class="control-board">
        <div class="item-control" v-for="n in 24" :key="n"> {{ n }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import MobileHeader from '@/components/client/mobile/MobileHeader.vue';
import { ref } from 'vue';
export default {
  name: 'BarGame',
  components: { MobileHeader },
  setup() {
    const content = ref('\'11\'')

    return {content};
  }
}
</script>

<style scoped>
.control-board {
  display: grid;
  width: 100%;
  border: 1px solid black;
  height: 120px;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px;
  grid-template-rows: 50px 50px 50px;
}
.item-nine::after {
  content: v-bind(content) !important;
  bottom: 37px;
  left: 104px;
  width: 45px !important;
  height: 24px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-family: monospace;
  background: black !important;
  color: red;
  opacity: 1 !important;
}

.item-bottom::after {
  left: 16px;
  top: -10px;
}

.item-right::after {
  left: -10px;
  top: 15px;
}

.item-top::after {
  right: 15px;
  bottom: -10px;
}

.item-one::after {
  right: -10px;
  bottom: -10px;
}

.item-seven::after {
  left: -10px;
  bottom: -10px;
}

.item-nine-teen::after {
  right: -10px;
  top: -10px;
}

.item-twenty-five::after {
  left: -10px;
  top: -10px;
}

.item-left::after {
  top: 15px;
  right: -10px;
}

.merge-cell {
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 7;
}

.item::after {
  content: '';
  width: 15px;
  height: 15px;
  background: gray;
  opacity: 0.75;
  position: absolute;
  z-index: 100;
}

.item {
  border: 2px solid black;
  position: relative;
}

.bar-container {
  display: flex;
  justify-content: center;
  padding: 16px;
  flex-direction: column;
}

.bar-board {
  display: grid;
  width: 360px;
  height: 370px;
  background-image: url('@/utils/bar-game/images/bar-board.png');
  background-position: inherit;
  background-repeat: no-repeat;
  background-size: contain;
  grid-template-columns: 51px 51px 51px 51px 51px 51px 51px;
  grid-template-rows: 50px 50px 50px 50px 50px 50px 50px;
  gap: 1.5px 0.5px;
  grid-column-start: 1;
  grid-column-end: 9;
}
</style>
