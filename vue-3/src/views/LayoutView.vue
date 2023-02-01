<template>
  <div class="layout-wrapper">
      <div class="menu">
        <DesktopMenu/>
      </div>
      <div class="content">
        <div class="container"></div>
        <div class="center-container">
          <h2>Website cho desktop đang được phát triển. Vui lòng truy cập website này bằng mobile.</h2>
          <router-view></router-view>
        </div>
        <div class="container"></div>
      </div>
      <div class="footer">Footer</div>
  </div>
</template>
<script>
import DesktopMenu from '@/components/client/DesktopMenu.vue';
export default {
  name: 'LayoutView',
  components: {
    DesktopMenu
  }
}
</script>

<style scoped>
.container {
  flex: 2;
}
.center-container {
  flex: 7;
}
.menu {
  background: var(--primary-color);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: fixed;
  width: 100%;
  z-index: 100;
}
.layout-wrapper {
  display: flex;
  flex-direction: column;
}
.content {
  display: flex;
  flex-direction: row;
  flex: 1;
  transform: translateY(50px);
  margin-bottom: 50px;
  background: var(--five-color);
}

.footer {
  background: var(--primary-color);
}
</style>
