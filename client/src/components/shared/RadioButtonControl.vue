<template>
  <div class="radio-wrapper">
    <input :id="id" :disabled="isDisabled" type="radio" class="radio" :checked="isCheck" @click="radioClick()" />
    <label :for="id" class="title">{{ label }}</label>
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  name: 'RadioButtonControl',
  props: {
    value: {
      type: Boolean,
      require: true,
      default: false
    },
    label: {
      type: String,
      require: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context){
    const isCheck = ref(props.value);
    const id = ref(`radio-${(new Date().getTime() + Math.random())}`.replace('.','-'));
    function radioClick() {
      if(!props.isDisabled) {
        isCheck.value = !isCheck.value
        context.emit('radioClick',isCheck.value);
      }
    }
    return {id, isCheck, radioClick }
  }
}
</script>

<style scoped>
.radio-wrapper {
  display: flex;
  align-items: center;
}
.title {
  margin-left: 5px;
  user-select: none;
}
.title, .radio {
  cursor: pointer;
}
 .radio {
  width: 20px;
  height: 20px;
 }


 .disabled {
  opacity: 0.5;
  cursor: default;
 }
</style>
