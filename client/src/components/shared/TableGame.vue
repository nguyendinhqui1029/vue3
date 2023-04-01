<template>
  <div class="table-wrapper">
    <div class="content">
      <span v-if="maxAmount"><span class="current-people">{{ amount }}</span>/{{ maxAmount }}</span>
      <small v-if="idRoom">ID:{{ idRoom }}</small>
    </div>
  </div>
</template>
<script scope>
import {ref} from 'vue'
export default {
  name: 'TableGame',
  props: {
    amount:{
      type: Number,
      required: true
    },
    maxAmount:{
      type: Number,
      required: true
    },
    idRoom:{
      type: Number,
      required: true
    },
    money: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const betMoney = ref(`'${props.money} xu'`);
    return { betMoney }
  }
}
</script>

<style scoped>

.content span, small {
  margin: 3px;
  color: white;
}
.current-people {
  color: yellow !important;
  font-weight: bold;
}
.content {
  position: absolute;
  width: inherit;
  height: inherit;
  top: 20px;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.table-wrapper {
  width: 115px;
  height: 70px;
  border: 7px solid rgb(59 49 33);
  border-radius: 40px;
  box-shadow: 0px 0px 5px #000000a3;
  background: #11bae4;
  position: relative;
  justify-content: center;
    display: flex;
}

.table-wrapper::before {
    position: absolute;
    z-index: 1;
    top: -7px;
    content: v-bind(betMoney);
    width: -moz-max-content;
    width: max-content;
    height: 20px;
    border-radius: 20px;
    background-image: linear-gradient(to top, rgb(15, 130, 15),rgb(76, 242, 76));
    opacity: 0.9;
    padding: 2px 6px;
    color: rgb(249, 247, 245);
    font-size: 10px;
    line-height: 20px;
}

.table-wrapper::after {
  position: absolute;
  top: 0;
  display: flex;
  content: '';
  width: 112px;
  height: 66px;
  border: 2px solid rgb(249, 247, 245);
  border-radius: 40px;
}
</style>