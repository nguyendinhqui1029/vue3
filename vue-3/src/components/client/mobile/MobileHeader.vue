<template>
  <div v-if="!isShowHeaderBack" class="header-wrapper">
    <img class="logo" src="../../../assets/images/logo.png"/>
    <vue-feather :type="'search'" @click="searchClick()"></vue-feather>
  </div>
  <div v-if="isShowHeaderBack" class="header-wrapper">
    <vue-feather @click="back()" :type="'arrow-left'"></vue-feather>
  </div>
</template>
<script scope>
  import router from '@/router';
  export default {
    name: 'MobileHeader',
    props:{
      isShowHeaderBack: Boolean
    },
    setup() {
      function searchClick() {
        router.push({path: '/search', query: {type: router.currentRoute.value.name}});
      }
      function back() {
        router.back();
      }
      return { back, searchClick};
    }
  }
</script>
<style scoped>
.logo {
  width: 70px;
  height: 40px;
}
.header-wrapper {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--second-color);
  padding: 0 16px;
}
</style>