<template>
  <div class="switch-wrapper" @click="switchClick()">
      <span :class="{'active':isActive, 'in-active':!isActive}"></span>
      <small>tắt</small>
      <small>bật</small>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'SwitchButton',
  props: {
    initialValue: Boolean
  },
  setup(props, content){
    const isActive = ref(props.initialValue);
    function switchClick() {
      isActive.value = !isActive.value;
      content.emit('value-change',isActive.value);
    }
    return { isActive, switchClick }
  }
}
</script>

<style scoped>
 .switch-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 65px;
  height: 30px;
  background: var(--five-color);
  border-radius: 25px;
  border: 1px solid var(--three-color);
  position: relative;
 }
 .switch-wrapper span {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: var(--primary-color);
 }

 .switch-wrapper small {
   padding: 7px;
 }
 .in-active {
  animation: in-active 0.5s ease;
  animation-fill-mode: forwards;
 }
 @keyframes in-active {
  from {
    left: 35px;
  }
  to {
    left: 0;
  }
 }
 .active {
  animation: active 0.5s ease;
  animation-fill-mode: forwards;
 }
 @keyframes active {
  from {
    left: 0;
  }
  to {
    left: 35px;
  }
 }
</style>
