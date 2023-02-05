
<template>
  <CategoriesContainer v-for="item in filmByCategory" :key="item.id" :header="item.name" :itemList="item.items" @card-click="navigateToDetail($event)" />
</template>
<script scope>
import { reactive, ref } from 'vue';
import CategoriesContainer from '@/components/shared/CategoriesContainer.vue'
import router from '@/router';
export default {
  name: 'MobileFilmView',
  components: { CategoriesContainer },
  setup() {
    const type = ref('');
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
    function navigateToDetail(idVideo) {
      router.push({ path: `/detail/${idVideo}`, query: { type: type.value} });
    }
    return { filmByCategory, navigateToDetail }
  }
}
</script>
<style scoped>

</style>