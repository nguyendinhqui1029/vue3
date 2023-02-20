<template>
  <div class="admin-wrapper">
        <div class="content-left">
          <MenuLeft :menuList="menuList"/>
        </div>
        <div class="content-right">
          <div class="content">
            <router-view></router-view>
          </div>
        </div>
  </div>
</template>

<script>
import MenuLeft from '@/components/admin/MenuLeft.vue';

import { reactive } from 'vue';
export default {
  name: 'AdminView',
  components: { MenuLeft },
  setup() {
    const menuList = reactive([
      {id: 1,name:'Tổng hợp', url:'/admin', alias:'overview', isActive: true},
      {id: 2,name:'Thêm bài viết', url:'/admin/add-post', alias:'add-post', isActive: false},
      {id: 3,name:'Danh sách bài viết', url:'/admin/post-list', alias:'post-list', isActive: false},
      {id: 4,name:'Đặt lịch xuất bản', url:'/admin/publication-timer', alias:'publication-timer', isActive: false},
      {id: 5,name:'Quản lí trò chơi', url:'/admin/game-manager', alias:'game-manager', isActive: false}])
    return { menuList};
  }
}
</script>
<style scoped>
.vue-feather {
  width: 35px;
  height: 35px;
}
.admin-wrapper {
  display: flex;
  flex-direction: row;
}
.content-right {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  background: #0B81FF;
}
.content-left {
  min-width: 70px;
  width: 250px;
}
.content {
  height: calc( 100vh - 16px);
  overflow-y: auto;
  margin-top: 16px;
  padding: 16px;
  background: #ffff;
  border-top-left-radius: 30px;
}
</style>
