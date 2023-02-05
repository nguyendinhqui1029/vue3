<template>
  <div class="admin-wrapper">
        <div class="content-left">
          <MenuLeft/>
        </div>
        <div class="content-right">
          <div class="menu-top">Top</div>
          <div class="content">Content</div>
        </div>
  </div>
</template>

<script>
import MenuLeft from '@/components/admin/MenuLeft.vue';
export default {
  name: 'AdminView',
  components: { MenuLeft }
}
</script>
<style scoped>
.admin-wrapper {
  display: flex;
  flex-direction: row;
  height: 100vh;
  min-height: 100vh;
}
.menu-top {
  height: 55px;
}
.content-right {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.content-left {
  min-width: 70px;
  width: 300px;
}
.content {
  flex: 1;
}
</style>
