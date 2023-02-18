<template>
  <router-view/>
</template>
<script>
import { setTheme } from '@/utils/utils';
export default {
  name:'App',
  setup() {
    const isDark = localStorage.getItem('isDark') === 'true';
    setTheme(isDark);
  }
}
</script>
<style>
body {
  margin: 0 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
