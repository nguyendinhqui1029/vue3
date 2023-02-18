<template>
  <div class="search-view-wrapper">
    <MobileHeader :menuType="'search-menu'"/>
    <router-view></router-view>
  </div>
</template>
<script scope>
import router from '@/router';
import MobileHeader from '@/components/client/mobile/MobileHeader.vue';
export default {
  name: 'MobileSearchView',
  components: { MobileHeader },
  setup() {
    
    function back() {
      router.back();
    }
    return { back };
  }
}
</script>
<style scoped>
.search-view-wrapper {
  display: flex;
  flex-direction: column;
}
.header-wrapper {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--second-color);
  background: var(--primary-color);
  padding: 0 16px;
  gap: 15px;
}
</style>