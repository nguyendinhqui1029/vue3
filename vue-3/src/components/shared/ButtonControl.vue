<template>
  <div :class="{button: true, [type]: true, disabled: isDisabled}" @click="buttonClick()">
    {{ label }}
  </div>
</template>
<script>
export default {
  name: 'ButtonControl',
  props: {
    label: {
      type: String,
      require: true
    },
    type: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return [
          'primary',
          'secondary'
        ].indexOf(value) !== -1
      }
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context){
    function buttonClick() {
      if(!props.isDisabled) {
        context.emit('buttonClick');
      }
    }
    return { buttonClick }
  }
}
</script>

<style scoped>
 .button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
 }

 .primary {
  background: var(--primary-color);
  color: var(--second-color);
 }

 .secondary {
  background: var(--second-color);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
 }

 .disabled {
  opacity: 0.5;
  cursor: default;
 }
</style>
