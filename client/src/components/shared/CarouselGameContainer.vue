<template>
  <div class="carousel-wrapper">
    <div class="item" v-for=" item in itemList" :key="item.id">
      <GameCard 
        :url="item.url" 
        :title="item.title" 
        :status="item.status"
        @click="itemClick(item.id)"/>
    </div>
  </div>
</template>
<script scope>
import GameCard from '@/components/shared/GameCard.vue'
export default {
  name: 'CarouselGameContainer',
  components: { GameCard },
  props: { itemList: [] },
  setup(props, content){
    function itemClick(id) {
      content.emit('item-click', id);
    }
    return { itemClick }
  }
}
</script>
<style scoped>
.item {
  scroll-snap-align: center;
}
.carousel-wrapper {
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  flex: 1;
  gap: 10px;
  scroll-snap-type: x mandatory;
}

.carousel-wrapper::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>