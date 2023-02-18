
<template>
  <div class="menu">
    <MobileHeader :menuType="'main-menu'"/>
    <MobileFilterTab :tabList="tabList" @tab-click="filterByTab($event)" />
  </div>
  <CategoriesContainer v-for="item in categoryByFilterTab.categoriesByTab" :key="item.id" :header="item.name" :itemList="item.items" @card-click="navigateToDetail($event)" />
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
  name: 'MobileFilmView',
  components: { CategoriesContainer, MobileFilterTab, MobileHeader },
  setup() {
    const icons = Object.keys(feather.icons);
    const type = ref('');
    const tabList = reactive([
      { id: null, active: true, name: 'Tất cả' }, { id: 1, active: false, name: 'Hành động' },
      { id: 2, active: false, name: 'Tình cảm' }, { id: 3, active: false, name: 'Trinh thám' }
    ]);
    const filmByCategory = reactive([
      {
        id: 3, name: 'Trinh thám',
        items: [{ id: 1, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 2, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 3, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 4, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' }]
      },
      {
        id: 1, name: 'Hành động',
        items: [{ id: 1, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 2, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 3, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 4, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' }]
      },
      {
        id: 2, name: 'Tình cảm',
        items: [{ id: 1, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 2, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 3, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 4, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' }]
      }]);
      let categoryByFilterTab = reactive({categoriesByTab: []});
    type.value = router.currentRoute.value.name;
    filterByTab(null);
    function filterByTab(idTab) {
      if(idTab) {
        categoryByFilterTab.categoriesByTab = filmByCategory.filter(filmType=>filmType.id === idTab);
      } else {
        categoryByFilterTab.categoriesByTab = filmByCategory;
      }
    }
    function navigateToDetail(idVideo) {
      router.push({ path: `/detail/${idVideo}`, query: { type: type.value} });
    }
    return {icons, tabList, categoryByFilterTab, filterByTab, navigateToDetail }
  }
}
</script>
<style scoped>
.menu {
  background: var(--primary-color);
}
</style>