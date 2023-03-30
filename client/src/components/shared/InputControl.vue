<template>
  <div class="input-wrapper">
    <label class="label">{{ label }}</label>
      <input class="input" 
      :disabled="isDisabled" 
      :class="{'disabled': isDisabled}" 
      @input="$emit('update:modelValue',$event.target.value)" 
      @focusin="$emit('focusin')"
      @focusout="$emit('focusout')"
      :type="type" 
      :placeholder="placeholder" 
      :value="modelValue"/>
  </div>
</template>
<script>
export default {
  name: 'InputControl',
  props: {
    modelValue: String,
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      require: true
    },
    placeholder: String,
    isDisabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  cursor: default;
 }
 .input-wrapper {
  width: 100%;
  display: flex;
  border: 1px solid var(--three-color);
  border-radius: 5px;
  height: 45px;
  margin-top: 20px;
  box-sizing: border-box;
  position: relative;
  background: var(--second-color);
 }
 .input {
  width: 100%;
  border: none;
  background: transparent;
  text-indent: 16px;
  user-select: none;
 }
 .input:focus {
  outline: none;
 }

 .label {
  position: absolute;
  top: -11px;
  left: 16px;
  background-image: linear-gradient(transparent 50%, var(--second-color) 10%);
  padding: 0 3px;
 }
</style>
