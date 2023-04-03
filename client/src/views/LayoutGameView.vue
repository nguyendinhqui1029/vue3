<template>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>
<script>
export default {
  name: 'LayoutGameView'
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, rgb(151, 12, 12), rgb(223, 2, 57), rgb(151, 12, 12));
}
</style>
