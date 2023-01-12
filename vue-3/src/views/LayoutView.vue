<template>
  <div class="layout-wrapper">
      <div class="menu">Menu</div>
      <div class="content">Content</div>
      <div class="footer">Footer</div>
  </div>
</template>
<script>
export default {
  name: 'LayoutView',
}
</script>

<style scoped>
.menu {
  background: yellow;
}
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 16px);
}
.content {
  background: orange;
  flex: 1;
}

.footer {
  background: blue;
}
</style>
