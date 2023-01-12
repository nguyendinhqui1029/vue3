
<template>
  <div class="menu">
    <MobileHeader />
    <MobileFilterTab :tabList="tabList" @tab-click="filterByTab($event)" />
  </div>
  <CategoriesContainer v-for="item in filmByCategory" :key="item.id" :header="item.name" :itemList="item.items" @card-click="navigateToDetail($event)" />
</template>
<script scope>
import { reactive, ref } from 'vue';
import MobileFilterTab from '../components/client/mobile/MobileFilterTab.vue'
import MobileHeader from '../components/client/mobile/MobileHeader.vue'
import CategoriesContainer from '@/components/shared/CategoriesContainer.vue'
import router from '@/router';
export default {
  name: 'FilmView',
  components: { CategoriesContainer, MobileFilterTab, MobileHeader },
  setup() {
    const type = ref('');
    const tabList = reactive([
      { id: 1, active: true, name: 'Tất cả' }, { id: 2, active: false, name: 'Hành động' },
      { id: 3, active: false, name: 'Tình cảm' }, { id: 4, active: false, name: 'Phim hài' },
      { id: 5, active: false, name: 'Cổ trang' }, { id: 6, active: false, name: 'Hoạt hình' },
    ]);
    const filmByCategory = reactive([
      {
        id: 1, name: 'Trinh thám',
        items: [{ id: 1, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 2, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 3, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 4, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' }]
      },
      {
        id: 2, name: 'Hành động',
        items: [{ id: 1, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 2, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 3, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 4, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' }]
      },
      {
        id: 3, name: 'Tình cảm',
        items: [{ id: 1, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 2, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 3, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 4, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' }]
      }]);
    type.value = router.currentRoute.value.name;
    function filterByTab(idTab) {
      console.log(idTab)
    }
    function navigateToDetail(idVideo) {
      router.push({ path: `/detail/${idVideo}`, query: { type: type.value} });
    }
    return { tabList, filmByCategory, filterByTab, navigateToDetail }
  }
}
</script>
<style scoped>
.menu {
  background: var(--primary-color);
}
</style>