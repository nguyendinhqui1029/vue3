<template>
  <div class="check-box-wrapper">
    <input :id="id" :disabled="isDisabled" type="checkbox" class="check-box" :checked="isCheck" @click="checkboxClick()" />
    <label :for="id" class="title">{{ label }}</label>
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  name: 'CheckBoxControl',
  props: {
    content:{
      type: String || Number
    },
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
    const id = ref(`checkbox-${(new Date().getTime() + Math.random())}`.replace('.','-'));
    function checkboxClick() {
      if(!props.isDisabled) {
        isCheck.value = !isCheck.value
        context.emit('checkboxClick',{checked:isCheck.value, value: props.content});
      }
    }
    return {id, isCheck, checkboxClick }
  }
}
</script>

<style scoped>
.check-box-wrapper {
  display: flex;
  align-items: flex-start;
  width: 100%;
}
.title {
  margin-left: 5px;
  user-select: none;
  width: calc( 100% - 25px);
}
.title, .check-box {
  cursor: pointer;
}
 .check-box {
  width: 20px;
  height: 20px;
 }


 .disabled {
  opacity: 0.5;
  cursor: default;
 }
</style>
