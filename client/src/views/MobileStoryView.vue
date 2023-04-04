
<template>
  <div class="menu">
    <MobileHeader :menuType="'main-menu'"/>
    <MobileFilterTab :tabList="tabList" @tab-click="filterByTab($event)"/>
  </div>
  <CategoriesContainer v-for="item in filmByCategory" :key="item.id" :header="item.name" :itemList="item.items" @card-click="navigateToDetail($event)" />
  <ul class="icons">
        <li v-for="icon in icons" :key="icon">
          <vue-feather :type="icon"></vue-feather>
          <span>{{ icon }}</span>
        </li>
  </ul>
</template>
<script scope>
  import { reactive, ref } from 'vue';
  import MobileFilterTab from '../components/client/mobile/MobileFilterTab.vue'
  import MobileHeader from '../components/client/mobile/MobileHeader.vue'
  import CategoriesContainer from '@/components/shared/CategoriesContainer.vue'
  import router from '@/router';
  import feather from 'feather-icons';
  export default {
    name: 'MobileStoryView',
    components: { CategoriesContainer, MobileFilterTab, MobileHeader },
    setup() {
    const icons = Object.keys(feather.icons);
    const type = ref('');
    const tabList = reactive([
    { id: 1, active: true, name: 'Tất cả' },{ id: 2, active: false, name: 'Hành động' },
    { id: 3, active: false, name: 'Tình cảm' },{ id: 4, active: false, name: 'Phim hài' },
    { id: 5, active: false, name: 'Cổ trang' },{ id: 6, active: false, name: 'Hoạt hình' },
    ]);
    const filmByCategory = reactive([
    { id: 1, name: 'Truyện ngắn', 
      items: [{id:1, name: 'Film 123', episode: 1, idVideo:'3lMnks3YPpM'},
      {id:2, name: 'Film 123', episode: 1, idVideo:'3lMnks3YPpM'},
      {id:3, name: 'Film 123', episode: 1, idVideo:'3lMnks3YPpM'},
      {id:4, name: 'Film 123', episode: 1, idVideo:'3lMnks3YPpM'}]
    },
    { id: 2, name: 'Truyện thần thoại hy lạp',
      items: [{id:1, name: 'Film 123', episode: 1, idVideo:'3lMnks3YPpM'},
      {id:2, name: 'Film 123', episode: 1, idVideo:'3lMnks3YPpM'},
      {id:3, name: 'Film 123', episode: 1, idVideo:'3lMnks3YPpM'},
      {id:4, name: 'Film 123', episode: 1, idVideo:'3lMnks3YPpM'}]
   },
    { id: 3, name: 'Truyện thiếu nhi', 
      items: [{id:1, name: 'Film 123', episode: 1, idVideo:'3lMnks3YPpM'},
      {id:2, name: 'Film 123', episode: 1, idVideo:'3lMnks3YPpM'},
      {id:3, name: 'Film 123', episode: 1, idVideo:'3lMnks3YPpM'},
      {id:4, name: 'Film 123', episode: 1, idVideo:'3lMnks3YPpM'}]
    }]);
    type.value = router.currentRoute.value.name;
    function filterByTab(idTab) {
      console.log(idTab)
    }
    function navigateToDetail(idVideo) {
      router.push({path:`/detail/${idVideo}`, query: { type: type.value}});
    }
    return { tabList,filmByCategory, icons, filterByTab, navigateToDetail}
  }
  }
</script>
<style scoped>
  .menu {
    background: var(--primary-color);
  }
</style>