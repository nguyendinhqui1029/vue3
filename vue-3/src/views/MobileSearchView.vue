<template>
  <div class="search-view-wrapper">
    <div class="header-wrapper">
      <vue-feather @click="back()" :type="'arrow-left'"></vue-feather>
      <input type="text" class="input-search" v-model="valueInput"/>
      {{ valueInput.value }}
    </div>
    
    <router-view></router-view>
  </div>
</template>
<script scope>
import router from '@/router';
import { ref, watch } from 'vue';
export default {
  name: 'MobileSearchView',
  setup() {
    const valueInput = ref(router.currentRoute.value.query?.q || '');
    watch(valueInput,()=>{
      router.replace({path:'/search', query:{ q: valueInput.value, type: router.currentRoute.value.query.type },});
    })
    function back() {
      router.back();
    }
    return { valueInput, back };
  }
}
</script>
<style scoped>
.input-search {
  border: none;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 35px;
  border-radius: 25px;
  text-indent: 10px;
  color: var(--four-color);
}
.input-search:focus {
  outline: none;
}
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