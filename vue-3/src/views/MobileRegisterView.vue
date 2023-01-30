<template>
  <form class="form">
    <InputControl @valueChange="emailValueChange($event)" label="Email" :initialValue="email" type="email" placeholder="Nhập email"/>
    <InputControl @valueChange="emailValueChange($event)" label="Password" type="password" placeholder="Nhập password"/>
    <InputControl @valueChange="emailValueChange($event)" label="Re-password" type="password" placeholder="Nhập lại password"/>
    <ButtonControl @buttonClick="handleClickRegister()" :label="'Đăng kí'" type="primary"/>
    <ButtonControl @buttonClick="handleClickBack()" :label="'Trở lại'" type="secondary"/>
  </form>
</template>
<script>
import InputControl from '@/components/shared/InputControl.vue';
import ButtonControl from '@/components/shared/ButtonControl.vue';
import { ref } from 'vue';
import router from '@/router';
export default {
  name: 'MobileRegisterView',
  components: { InputControl, ButtonControl },
  setup() {
    const email = ref('a@gmail.com');

    function emailValueChange(value) {
      console.log(value)
    }
    function handleClickRegister() {
      console.log('button Click')
    }
    function handleClickBack() {
      router.back();
    }
    return { email, emailValueChange, handleClickRegister, handleClickBack}
  }
}
</script>

<style scoped>
 .form {
  padding: 16px;
 }
</style>
