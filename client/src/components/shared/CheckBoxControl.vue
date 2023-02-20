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
        context.emit('checkboxClick',isCheck.value);
      }
    }
    return {id, isCheck, checkboxClick }
  }
}
</script>

<style scoped>
.check-box-wrapper {
  display: flex;
  align-items: center;
}
.title {
  margin-left: 5px;
  user-select: none;
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
