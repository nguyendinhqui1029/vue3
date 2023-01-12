<template>
  <div class="admin-wrapper">
      <div class="menu-top">Menu Top</div>
      <div class="wrapper">
        <div class="menu-left">Menu left</div>
        <div class="content">Content</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AdminView',
}
</script>
<style scoped>
.admin-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.wrapper {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.menu-left {
  min-width: 70px;
  width: 300px;
}
.content {
  flex: 1;
}
</style>
