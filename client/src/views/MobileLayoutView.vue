<template>
  <div class="layout-wrapper">
    <div class="content" id="mobileContentId">
      <router-view />
    </div>
    <div class="footer">
        <MobileMenu :menuList="menuItemList" @menu-click="menuItemClick($event)" />
    </div>
  </div>
</template>
<script>
import MobileMenu from '../components/client/mobile/MobileMenu.vue'
import { reactive } from 'vue';
import router from '@/router';
export default {
  name: 'MobileLayoutView',
  components: { MobileMenu },
  setup() {
    const menuItemList = reactive([
      { id: 3, url: '/', key: 'story', isActive: false, icon: 'book-open', name: 'Truyện' },
      { id: 1, url: '/game', key: 'game', isActive: true, icon: 'airplay', name: 'Trò chơi' },
      { id: 4, url: '/receive-coin', key: 'receive-coin', isActive: false, icon: 'gift', name: 'Cày xu' },
      { id: 2, url: '/credit-card', key: 'credit-card', isActive: false, icon: 'credit-card', name: 'Tài khoản' },
      { id: 5, url: '/setting', key: 'settings', isActive: false, icon: 'settings', name: 'Cài đặt' },
      
    ]);
    function menuItemClick(menu) {
      menuItemList.forEach(item => item.isActive = item.id === menu.id);
    }
    router.beforeEach(() => {
      if(document.getElementById('mobileContentId')) {
        document.getElementById('mobileContentId').scrollTo(0, 0);
      }
    })
    return {menuItemList, menuItemClick };
  }
}
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
  position: relative;
}

.content {
  background: var(--five-color);
  flex: 1;
  overflow-y: auto;
  margin-bottom: 55px;
}

.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
