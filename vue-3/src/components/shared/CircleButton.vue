<template>
  <div v-if="type === null" :class="{button: true}">
    <div class="inner" :class="{disabled: isDisabled}" @click="buttonClick()"></div>
  </div>
  <div v-if="type === 'image'" :class="{button: true}">
    <div class="inner image" :style="{'background-image': 'url('+urlImage+')'}" :class="{disabled: isDisabled}"
     @click="buttonClick()"></div>
  </div>
  <div v-if="type === 'text'" :class="{button: true}">
    <div class="inner text" :class="{disabled: isDisabled}" @click="buttonClick()">
      {{ label }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'CircleButton',
  props: {
    urlImage: String,
    label: {
      type: String
    },
    type: {
      type: String,
      default: null,
      validator: function (value) {
        return [
          null,
          'text',
          'image'
        ].indexOf(value) !== -1
      }
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["buttonClick"],
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
.image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid var(--four-color);
  cursor: pointer;
  box-shadow: 2px 2px 6px var(--four-color);
  color: var(--second-color);
  font-size: 12px;
}
 .button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid;
  background: #0B81FF;
  user-select: none;
 }

 .disabled {
  cursor: default;
 }
</style>
