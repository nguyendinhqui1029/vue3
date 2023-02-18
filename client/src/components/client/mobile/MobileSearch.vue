<template>
  <div class="search-wrapper" v-if="searchSuggest.length">
    <CategoriesContainer :header="searchBy" :itemList="searchSuggest" @card-click="navigateToDetail($event)" />
  </div>
  <div class="empty-result" v-if="!searchSuggest.length && valueSearch">
    Không tìm thấy kết quả nào phù hợp.
  </div>
</template>
<script scope>
import router from '@/router';
import { watchEffect, ref } from 'vue';
import CategoriesContainer from '@/components/shared/CategoriesContainer.vue';
export default {
  name: 'MobileSearch',
  components: { CategoriesContainer },
  setup() {
    const listDefault = [{ id: 1, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 2, name: '123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 3, name: 'nhạc 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 4, name: 'Test 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' }]
    const searchSuggest = ref([]);
    const searchBy = ref('');
    const valueSearch = ref('');
    const type = ref('');

    watchEffect(()=>{
      type.value = router.currentRoute.value.query?.type;
      valueSearch.value = router.currentRoute.value.query?.q?.trim();
      searchBy.value= `Tìm theo: ${valueSearch.value}`;
      if(valueSearch.value){
        searchSuggest.value = listDefault.filter(item=>item.name.toLowerCase().includes(valueSearch.value.toLowerCase()));
      }else {
        searchSuggest.value = [];
      }
    });
    function navigateToDetail(id) {
      router.push({path: `/detail/${id}`, query: { type: type.value}});
    }
    return { searchSuggest, searchBy, valueSearch, navigateToDetail}
  }
}
</script>
<style scoped>
.empty-result {
  padding: 16px;
  font-style: italic;
  text-align: center;
}
.value-suggest {
  list-style: none;
  margin: 0;
  padding: 16px;
}
.item {
  line-height: 35px;
  height: 35px;
  cursor: pointer;
}
</style>