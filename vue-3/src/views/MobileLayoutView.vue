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
      { id: 1, url: '/', key: 'film', isActive: true, icon: 'tv', name: 'Phim' },
      { id: 2, url: '/story', key: 'story', isActive: false, icon: 'book-open', name: 'Truyện' },
      { id: 3, url: '/receive-coin', key: 'receive-coin', isActive: false, icon: 'award', name: 'Cày xu' },
      { id: 4, url: '/music', key: 'music', isActive: false, icon: 'mic', name: 'Karaoke' },
      { id: 5, url: '/game', key: 'game', isActive: false, icon: 'airplay', name: 'Trò chơi' }
    ]);
    function menuItemClick(menu) {
      menuItemList.forEach(item => item.isActive = item.id === menu.id);
    }
    router.beforeEach(() => {
      document.getElementById('mobileContentId').scrollTo(0, 0)
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
