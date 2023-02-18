<template>
  <div class="menu-wrapper">
      <ul>
        <li class="active">Tổng quan</li>
        <li>Thêm bài viết</li>
        <li>Danh sách bài viết</li>
        <li>Đặt lịch xuất bản</li>
        <li>Đăng xuất</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuLeft',
}
</script>
<style scoped>

.menu-wrapper {
  width: 100%;
  min-width: 70px;
  max-width: 100%;
  background: var(--primary-color);
  height: 100%;
  color: var(--second-color);
  padding-top: 55px;
}
.menu-wrapper ul{
 margin: 0;
 padding: 0;
 list-style: none;
}

.menu-wrapper ul li{
  line-height: 40px;
  padding: 0 20px;
  cursor: pointer;
}

.menu-wrapper ul li:hover{
  background: var(--four-color);
  color: var(--second-color);
}
.active {
  background: var(--second-color);
  color: var(--four-color);
}
</style>