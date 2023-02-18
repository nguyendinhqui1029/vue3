<template>
  <div class="carousel-wrapper">
    <div class="item" v-for=" item in itemList" :key="item.id">
      <MobileCard 
        :isShowVideo="false" 
        :idVideo="item.idVideo" 
        :title="item.name" 
        :episode="item.episode"
        @click="itemClick(item.id)"/>
    </div>
  </div>
</template>
<script scope>
import MobileCard from '@/components/shared/MobileCard.vue'
export default {
  name: 'CarouselContainer',
  components: { MobileCard },
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
  min-width: 340px;
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