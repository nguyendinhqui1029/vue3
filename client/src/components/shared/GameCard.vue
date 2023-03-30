<template>
  <div class="card-wrapper">
    <div class="content">
      <div class="logo" :style="{ 'background-image': 'url(' +imageUrl+ ')' }">
      </div>
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>
<script scope>
import { ref } from 'vue';
export default {
  name: 'GameCard',
  props: {
    url: {
      type: String,
      required: true
    },
    title: String,
    status: Number
  },
  setup(props) {
    const imageUrl = ref(props.url);
    return {imageUrl};
  }
}
</script>
<style scoped>
.logo {
  flex: 6;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  background-size: 163px 200px;
  background-position: center;
  background-repeat: no-repeat;
}
.title {
  display: flex;
  flex: 1;
  border-top: 4px solid rgb(255, 215, 0);
  line-height: 25px;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  font-weight: bold;
  font-size: 20px;
  background-image: linear-gradient(0deg,#a7a7a6fb,#565654fb);
  color: rgba(240, 248, 13, 0.717);
}
.content {
    display: flex;
    position: absolute;
    flex-direction: column;
    z-index: 10;
    left: 4px;
    top: 4px;
    width: calc(170px - 7px);
    height: calc(244px - 7px);
    background: red;
    border-radius: 16px;
}
.card-wrapper {
  width: 170px;
  height: 245px;
  border-radius: 20px;
  position: relative;
  display: flex;
  background: rgb(255, 215, 0);
  overflow: hidden;
  align-self: center;
  justify-content: center;
}

.card-wrapper::before {
  content: '';
  position: absolute;
  height: 150%;
  width: 70px;
  background-image: linear-gradient(#d7e897dd, #d7e897dd);
  animation: animate 4s linear infinite;
  top: -88px;
  left: 23px;
}
.card-wrapper::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 1);
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>