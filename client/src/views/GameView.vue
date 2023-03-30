<template>
  <div class="container">
    <!-- <router-link :to="{path:'/gomoku-game',query:{ type: 'game'}}">
      <div class="item">
        <div class="logo" :style="{ 'background-image': 'url(' + require('../assets/images/gomoku-game.png') + ')' }"></div>
        <small class="title-game">Caro</small>
      </div>
    </router-link>
    <router-link :to="{path:'/chinese-chess',query:{ type: 'game'}}">
      <div class="item">
        <div class="logo"> Cờ tướng</div>
        <small class="title-game">Cờ tướng</small>
      </div>
    </router-link>
    <router-link :to="{path:'/bar-game',query:{ type: 'game'}}">
      <div class="item">
        <div class="logo"> Bar</div>
        <small class="title-game">Bar game</small>
      </div>
    </router-link> -->
    <div class="menu-top">
      <div class="avatar">
        <vue-feather @click="home()" class='home' :size="35" :type="'corner-down-left'"></vue-feather>
        <div class="info">
        </div>
      </div>
      <div class="current-coin">
        <vue-feather :size="20" :type="'dollar-sign'"></vue-feather>
        <div>10000</div>
        <vue-feather :size="20" :type="'plus'"></vue-feather>
      </div>
      <div class="function">
        <vue-feather :size="25" :type="'list'"></vue-feather>
        <vue-feather :size="25" :type="'user-plus'"></vue-feather>
        <vue-feather @click="toggleSound()" :size="25" :type="isMuteSound ? 'volume-x' : 'volume-2'"></vue-feather>
      </div>
    </div>
    <div class="main-content">
      <div class="notification">
        <marquee behavior="scroll" direction="left">
          Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here 
        </marquee>
      </div>
      <div class="content">
        <CarouselGameContainer :itemList="filmTheSameCategory" @itemClick="navigateToDetail($event)"/>
      </div>
    </div>
  </div>
</template>
<script>
import router from '@/router';
import { ref } from 'vue';
import CarouselGameContainer from '@/components/shared/CarouselGameContainer.vue'
export default {
  name: 'GameView',
  components: { CarouselGameContainer },
  setup() {
    const filmTheSameCategory = [{ id: '1', title: 'Xèng',  url:require('@/assets/images/bar.png'), status: 1 },
        { id: '3', title: 'Đá bóng',  url:require('@/assets/images/da_bong.png'), status: 1 },
        { id: '4', title: 'Bắn cá',  url:require('@/assets/images/king-fish.png'), status: 1 },
        { id: '4', title: 'Tài xỉu',  url:require('@/assets/images/tai-xui.png'), status: 1 }];
    const isMuteSound = ref(false)
    function home() {
      router.push({ path: '/' });
    }
    function toggleSound() {
      isMuteSound.value = !isMuteSound.value;
    }
    return { toggleSound, home, isMuteSound, filmTheSameCategory }
  }
}
</script>

<style scoped>
.notification {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.notification marquee {
  width: 50%;
  background-image:  linear-gradient(to right, rgba(120, 119, 119, 0.1), rgb(78, 73, 73, 0.3),  rgba(120, 119, 119, 0.1));
}
.home {
  margin-left: 20px;
  color: rgb(255, 215, 0);
  font-size: 30px;
}

.info {
  width: 40px;
  height: 40px;
  border-radius: 50% 50%;
  border: 1px solid rgb(223, 190, 2);
  position: relative;
  margin-left: 20px
}

.info::after {
  content: '';
  width: 40px;
  height: 40px;
  border-radius: 50% 50%;
  border: 1px solid rgb(223, 190, 2);
  position: absolute;
  top: 0;
  background-image: url('@/assets/images/logo/logo.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: red;
}

.info::before {
  display: block;
  padding-left: 25px;
  content: 'id: ';
  width: 100px;
  height: 20px;
  border: 1px solid rgb(223, 190, 2);
  border-radius: 20px;
  position: absolute;
  left: 20px;
  top: 10px;
}

.avatar,
.function {
  display: flex;
  width: 35%;
  border: 2px solid rgb(255, 215, 0);
  border-top: none;
  align-items: center;
  justify-content: flex-start;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-image: linear-gradient(to bottom, rgb(78, 73, 73, 0.6), rgb(120, 119, 119, 0.7), rgb(78, 73, 73, 0.6));
}
.function {
  justify-content: center;
  gap: 20px;
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
  justify-content: space-around;
}

.main-content {
  flex: 6;
  padding: 20px;
}

.menu-top,
.menu-bottom {
  flex: 1;
}

/* a {
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
} */

.container {
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to right, rgb(151, 12, 12), rgb(223, 2, 57), rgb(151, 12, 12));
  width: 100vw;
  height: 100vh;
}</style>
