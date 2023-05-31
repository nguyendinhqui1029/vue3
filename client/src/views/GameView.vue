<template>
  <div class="container">
    <div class="menu-top">
      <div class="avatar">
        <vue-feather @click="home()" class='home' :size="35" :type="'corner-down-left'"></vue-feather>
        <div class="info">
        </div>
      </div>
      <div class="current-coin">
        <vue-feather :size="20" :type="'dollar-sign'"></vue-feather>
        <div>{{ currentMoney }}</div>
        <vue-feather :size="20" :type="'plus'"></vue-feather>
      </div>
      <div class="function">
        <vue-feather :size="25" :type="'bell'"></vue-feather>
        <vue-feather :size="25" :type="'user-plus'"></vue-feather>
        <vue-feather @click="toggleSound()" :size="25" :type="isMuteSound ? 'volume-x' : 'volume-2'"></vue-feather>
      </div>
    </div>
    <div class="main-content">
      <div class="notification">
        <marquee behavior="scroll" direction="left">
          Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text
          goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your
          scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes
          here Your scrolling text goes here Your scrolling text goes here
        </marquee>
      </div>
      <div class="categories-wrapper">
        <div class="categories">
          <span>Phổ biến</span>
          <span class="active">Game bài</span>
          <span>Sắp ra mắt</span>
        </div>
      </div>
      <div class="content">
        <CarouselGameContainer :itemList="filmTheSameCategory" @itemClick="navigateToRooms($event)" />
      </div>
    </div>
  </div>
</template>
<script>
import router from '@/router';
import { ref } from 'vue';
import CarouselGameContainer from '@/components/shared/CarouselGameContainer.vue'
export const StatusGame= {
  ready: 1,
  waiting: 2,
  close: 3
}
export default {
  name: 'GameView',
  components: { CarouselGameContainer },
  props:{ 
    currentMoney: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const filmTheSameCategory = [{ id: 'BarGame', title: 'Xèng', url: require('@/assets/images/bar.png'), status: StatusGame.ready },
    { id: 'ChineseChess', title: 'Cờ tướng', url: require('@/assets/images/chinese-chess.png'), status: StatusGame.ready },
    { id: 'GomokuGame', title: 'Cờ caro', url: require('@/assets/images/logo-caro.png'), status: StatusGame.ready },
    { id: 'DuckRacingGame', title: 'Đua vịt', url: require('@/assets/images/duck-race-logo.jpg'), status: StatusGame.ready },
    { id: '4', title: 'Bắn cá', url: require('@/assets/images/king-fish.png'), status: StatusGame.waiting },
    { id: '4', title: 'Tài xỉu', url: require('@/assets/images/tai-xui.png'), status: StatusGame.waiting }];
    const isMuteSound = ref(false)
    const idUser = ref(`'ID: 100101'`);
    function home() {
      router.push({ path: '/' });
    }
    function toggleSound() {
      isMuteSound.value = !isMuteSound.value;
    }
    function navigateToRooms(gameCard) {
      if(gameCard.status !== StatusGame.ready) return;
      router.push({ path: `/rooms/${gameCard.id}` })
    }
    return { toggleSound, home, navigateToRooms, isMuteSound, filmTheSameCategory, idUser }
  }
}
</script>

<style scoped>
.categories-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.active {
  border: 1px solid gold;
  padding: 1px 5px;
  border-radius: 30px;
  line-height: 15px;
  background-image: linear-gradient(to top, rgba(248, 232, 8, 0.961), rgba(188, 174, 71, 0.934), rgba(120, 119, 119, 0.1));

}

.categories {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid gold;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: rgb(247, 243, 194);
  gap: 15px;
  padding: 2px 2px;
}

.notification {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.notification marquee {
  color: azure;
  font-size: 10px;
  width: 50%;
  background-image: linear-gradient(to right, rgba(120, 119, 119, 0.1), rgb(78, 73, 73, 0.3), rgba(120, 119, 119, 0.1));
}

.home {
  margin-left: 20px;
  color: rgb(255, 215, 0);
  font-size: 30px;
}

.info {
  width: 30px;
  height: 30px;
  border-radius: 50% 50%;
  border: 1px solid rgb(223, 190, 2);
  position: relative;
}

.info::after {
  content: '';
  width: 35px;
  height: 35px;
  border-radius: 50% 50%;
  border: 1px solid rgb(223, 190, 2);
  position: absolute;
  top: -4px;
  background-image: url('@/assets/images/avatar.jpg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: red;
}

.info::before {
  display: flex;
  padding-left: 25px;
  content: v-bind(idUser);
  min-width: 75px;
  width: max-content;
  height: 20px;
  border: 1px solid rgb(223, 190, 2);
  border-radius: 20px;
  position: absolute;
  left: 20px;
  top: 5px;
  align-items: center;
  font-size: 11px;
  color: white;
}

.avatar,
.function {
  display: flex;
  width: 35%;
  border-top: none;
  align-items: center;
  background-image: linear-gradient(to bottom, rgb(78, 73, 73, 0.6), rgb(120, 119, 119, 0.7), rgb(78, 73, 73, 0.6));
}

.avatar {
  gap: 20px;
  border-bottom-right-radius: 100px;
  border-bottom: 2px solid rgb(223, 190, 2);
  justify-content: flex-start;
}

.function {
  justify-content: flex-end;
  gap: 20px;
  border-bottom-left-radius: 100px;
  border-bottom: 2px solid rgb(223, 190, 2);
  padding-right: 20px;
}

.function i {
  width: 30px;
  height: 30px;
  color: rgb(223, 190, 2);
}

.current-coin {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 25%;
  color: rgb(223, 190, 2);
  border: 2px solid rgb(255, 215, 0);
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin: 6px 0;
  background-image: linear-gradient(to bottom, rgb(78, 73, 73, 0.6), rgb(120, 119, 119, 0.7), rgb(78, 73, 73, 0.6));
}

.current-coin div {
  width: 60%;
  text-align: center;
  font-size: 25px;
}

.menu-top {
  display: flex;
  justify-content: space-between;
}

.main-content {
  flex: 8;
  padding: 6px 20px;
}

.menu-top,
.menu-bottom {
  flex: 1;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}</style>
