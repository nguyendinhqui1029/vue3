<template>
  <div class="layout-wrapper">
    <div class="content" id="mobileContentId">
      <router-view />
      <ul class="icons">
        <li v-for="icon in icons" :key="icon">
          <vue-feather :type="icon"></vue-feather>
          <span>{{ icon }}</span>
        </li>
      </ul>
    </div>
    <div class="footer">
      <MobileMenu :menuList="menuItemList" @menu-click="menuItemClick($event)" />
    </div>
  </div>
</template>
<script>
import MobileMenu from '../components/client/mobile/MobileMenu.vue'
import feather from 'feather-icons';
import { reactive } from 'vue';
import router from '@/router';
export default {
  name: 'MobileLayoutView',
  components: { MobileMenu },
  setup() {
    const menuItemList = reactive([
      { id: 1, url: '/', key: 'film', isActive: true, icon: 'tv', name: 'Phim' },
      { id: 2, url: '/story', key: 'story', isActive: false, icon: 'book-open', name: 'Truyện' },
      { id: 3, url: '/music', key: 'music', isActive: false, icon: 'mic', name: 'Karaoke' }
    ]);
    const icons = Object.keys(feather.icons);
    function menuItemClick(menu) {
      menuItemList.forEach(item => item.isActive = item.id === menu.id);
    }
    router.beforeEach(() => {
      document.getElementById('mobileContentId').scrollTo(0, 0)
    })
    return { icons, menuItemList, menuItemClick };
  }
}
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
}

.content {
  background: var(--five-color);
  flex: 1;
  overflow-y: auto;
}

.footer {
  background: var(--primary-color);
}
</style>
