<template>
  <div class="setting-wrapper">
      <MobileHeader :menuType="'back-menu'"/>
      <ul class="setting">
          <li>Chế độ ban đêm
            <SwitchButton :initialValue="darkMode" @value-change="switchButtonChange($event)"/>
          </li>
          <li>
            <router-link class="router-link" to="register">Đăng kí</router-link>
          </li>
          <li>
            <router-link class="router-link" to="">Đăng nhập</router-link>
          </li>
          <li>
            <router-link  class="router-link" to="">Quên mật khẩu</router-link>
          </li>
          <li>Đăng xuất</li>
      </ul>
  </div>
</template>
<script>
import MobileHeader from '@/components/client/mobile/MobileHeader.vue'
import SwitchButton from '@/components/shared/SwitchButton.vue'
import { ref } from 'vue'
export default {
  name: 'SettingView',
  components: { MobileHeader, SwitchButton},
  setup() {
    const darkMode = ref(true);
    function switchButtonChange(isDark) {
      console.log(isDark)
    }
    return  { darkMode, switchButtonChange }
  },
  
}
</script>

<style scoped>
 .setting-wrapper {
  display: flex;
  flex-direction: column;
 }

 .setting {
    margin: 0;
    padding: 16px;
    list-style: none;
 }

 .setting li {
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
 }
 .router-link {
  text-decoration: none;
  color: var(--four-color);
 }
</style>
