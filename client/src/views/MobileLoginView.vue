<template>
  <form class="form">
    <InputControl v-model:modelValue="email" label="Email" :initialValue="email" type="email" placeholder="Nhập email"/>
    <InputControl v-model:modelValue="password" label="Password" type="password" placeholder="Nhập password"/>
    <div class="button-group">
      <ButtonControl @buttonClick="handleClickLogin()" :label="'Đăng nhập'" type="primary"/>
      <ButtonControl @buttonClick="handleClickRegister()" :label="'Đăng kí'" type="secondary"/>
    </div>
  </form>
</template>
<script>
import InputControl from '@/components/shared/InputControl.vue';
import ButtonControl from '@/components/shared/ButtonControl.vue';
import { ref } from 'vue';
import router from '@/router';
export default {
  name: 'MobileLoginView',
  components: { InputControl, ButtonControl },
  setup() {
    const email = ref('');
    const password = ref('');
  
    function handleClickLogin() {
      if(email.value === '123' && password.value === '123') {
        router.replace({ path: '/luck', query: {type: 'film' } });
      }
      return;
    }
    function handleClickRegister() {
      router.replace({ path: '/register' })
    }
    return { email, password, handleClickRegister, handleClickLogin}
  }
}
</script>

<style scoped>
 .form {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
 }

 .button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 50px;
  width: 250px;
 }
</style>
