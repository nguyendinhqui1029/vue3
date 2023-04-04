<template>
  <MobileHeader menuType="back-menu" />
  <div class="tab-wrapper">
    <MobileFilterTab :tabList="tabList" @tab-click="filterByTab($event)" />
  </div>
  <div class="container" v-if="tabActive === 1">
    <div class="advertisement-item">
      <h4>Quảng cáo</h4>
      <div class="button-group">
        <ButtonControl @buttonClick="receiveCoin(id)" label="Nhận xu"/>
        <span>10 xu</span>
      </div>
    </div> 
  </div>
  <div class="container" v-else>
    Trao đổi coin
  </div>
</template>
<script>
import MobileHeader from '@/components/client/mobile/MobileHeader.vue';
import MobileFilterTab from '../components/client/mobile/MobileFilterTab.vue'
import ButtonControl from '@/components/shared/ButtonControl.vue';
import { reactive, ref } from 'vue'
export default {
  name: 'MobileReceiveCoinView',
  components: { MobileHeader, MobileFilterTab, ButtonControl },
  setup() {
    const tabList = reactive([
      { id: 1, active: true, name: 'Xem quảng cáo' },
      { id: 2, active: false, name: 'Điền phiếu khảo sát' },
      { id: 3, active: false, name: 'Xem video' },
      { id: 4, active: false, name: 'Like & Share bài viết' }
    ]);
    const tabActive = ref(tabList.find(tab=>tab.active).id);
    function filterByTab(tabId) {
      tabActive.value = tabId;
    }

    function receiveCoin(id) {
      console.log(id)
    }
    return { tabList,tabActive, filterByTab, receiveCoin };
  }
}
</script>

<style scoped>
.button {
  width: 130px;
}
.button-group {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
h4 {
  margin: 0;
  padding: 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.container {
  padding: 16px;
}
.advertisement-item {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--four-color);
  border-radius: 10px;
  padding: 16px;
  box-shadow: 1px 2px 2px var(--four-color);
}
.tab-wrapper {
  background: var(--primary-color);
}
</style>
