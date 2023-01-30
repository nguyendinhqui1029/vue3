<template>
  <div class="layout-wrapper">
      <div class="menu">
        <ul>
          <li>Logo</li>
          <li>Phim</li>
          <li>Truyện</li>
          <li>Karaoke</li>
          <li>search</li>
          <li>dark mode</li>
        </ul>
      </div>
      <div class="content">
        <div class="container"></div>
        <div class="center-container">
          <router-view></router-view>
        </div>
        <div class="container"></div>
      </div>
      <div class="footer">Footer</div>
  </div>
</template>
<script>
export default {
  name: 'LayoutView',
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
.menu ul {
  list-style: none;
  display: flex;
}
.menu ul li {
  padding: 0 60px;
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
