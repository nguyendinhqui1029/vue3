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
        <div>10000</div>
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
          Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here Your scrolling text goes here 
        </marquee>
      </div>
      <div class="categories-wrapper">
        <div class="categories">
          <span >Phổ biến</span>
          <span class="active">Game bài</span>
          <span >Sắp ra mắt</span>
        </div>
      </div>
      <div class="content">
        <CarouselGameContainer :itemList="filmTheSameCategory" @itemClick="navigateToRooms($event)"/>
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
    function navigateToRooms(id) {
      router.push({ path: `/rooms/${id}` })
    }
    return { toggleSound, home, navigateToRooms, isMuteSound, filmTheSameCategory }
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
    background-image:  linear-gradient(to top, rgba(248, 232, 8, 0.961), rgba(188, 174, 71, 0.934),  rgba(120, 119, 119, 0.1));

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
  background-image:  linear-gradient(to right, rgba(120, 119, 119, 0.1), rgb(78, 73, 73, 0.3),  rgba(120, 119, 119, 0.1));
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
    top: 5px;
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
