<template>
  <div class="user-profile-wrapper">
      <div class="avatar-wrapper">
        <div class="avatar" :style="{ 'background-image': 'url(' + avatarUrl + ')' }"></div>
        <span class="name">{{ name }}</span>
      </div>
      <div class="money-wrapper">
        <div class="money-image" :style="{ 'background-image': 'url(' + coinIcon + ')' }"></div>
        <span class="money">{{ money }}</span>
      </div>
      <div class="status" v-if="!time">
        {{ status }}
      </div>
      <div class="time-wrapper" v-if="time">
        {{ minute }} : {{ second }}
      </div>
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  name: 'UserProfile',
  props: {
    avatar: {
      type: String,
      default: require('@/assets/images/avatar.jpg')
    },
    name: {
      type: String,
      default: 'Nguyễn Văn A'
    },
    money: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: 'waiting'
    },
    time: {
      type: Number,
      default: 70000
    }
  },
  setup(props,content){
    const avatarUrl = ref(props.avatar);
    const coinIcon = require('@/assets/images/coin.png');
    const timer = ref(props.time);
    const second = ref((timer.value/1000)%60);
    const minute = ref(Math.floor((timer.value/1000)/60));
    const interval = setInterval(()=>{
      if(minute.value === 0 && second.value === 0) {
        clearInterval(interval);
        content.emit('timeOut');
        return;
      }
      if(second.value === 0) {
        minute.value--;
        second.value = 60;
      }
      second.value--;
      
    }, 1000);
    
    return { avatarUrl, coinIcon, second,  minute};
  }
}
</script>

<style scoped>
.time-wrapper {
  background: #a26c36;
  color: #ffdf5d;
  border: 4px solid #5e3f2c;
  font-size: 17px;
  border-radius: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}
.status {
  color: #fffdc3;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
}

.money {
  color: #c7ae8e;
}
.money-image {
  width: 20px;
  height: 20px;
  border: 2px solid #a4905f;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.avatar-wrapper, .money-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #f9f5e9;
  font-weight: bold;
}

.avatar {
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  border: 2px solid #a4905f;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
  .user-profile-wrapper {
    display: flex;
    flex-direction: column;
    background: #8d7c48;
    height: max-content;
    padding: 10px;
    border: 4px solid #5b5045;
    border-radius: 15px;
    gap: 5px;
  }
</style>
