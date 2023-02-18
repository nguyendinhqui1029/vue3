<template>
  <div class="categories-wrapper">
    <h3>{{ header }}</h3>
    <div class="items">
      <MobileCard v-for="item in itemList" 
      :key="item.id" 
      :idVideo="item.idVideo"   
      :title="item.name"
      :episode="item.episode"
      @click="cardItemClick(item.id)"/>
    </div>
  </div>
</template>
<script scope>
  import MobileCard from './MobileCard.vue';
  export default {
    name: 'CategoriesContainer',
    components:{ MobileCard },
    props: {
      header: String,
      itemList: Array
    },
    setup(props,content) {
      function cardItemClick(idItem) {
          content.emit('card-click', idItem)
      }
      return { cardItemClick };
    }
  }
</script>
<style scoped>
  .categories-wrapper h3 {
    color: var(--primary-color);
    margin: 10px 0;
    user-select: none;
  }
  .categories-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    margin-bottom: 30px;
  }
  .items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 5px;
  }
</style>