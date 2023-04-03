<template>
  <MobileHeader menuType="back-menu" />
  <form class="form">
    <InputControl v-model:modelValue="email" label="Email" :initialValue="email" type="email"
      placeholder="Nhập email" />
    <div class="button-group">
      <ButtonControl @buttonClick="handleClickRegister()" :label="'Lấy lại mật khẩu'" type="primary" />
      <ButtonControl @buttonClick="handleClickBack()" :label="'Trở lại'" type="secondary" />
    </div>
  </form>
</template>
<script>
import InputControl from '@/components/shared/InputControl.vue';
import ButtonControl from '@/components/shared/ButtonControl.vue';
import MobileHeader from '@/components/client/mobile/MobileHeader.vue';
import { ref } from 'vue';
import router from '@/router';
export default {
  name: 'MobileForgetPasswordView',
  components: { InputControl, ButtonControl, MobileHeader },
  setup() {
    const email = ref('a@gmail.com');

    function handleClickRegister() {
      console.log('button Click')
    }
    function handleClickBack() {
      router.back();
    }
    return { email, handleClickRegister, handleClickBack }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.column {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid black;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

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
