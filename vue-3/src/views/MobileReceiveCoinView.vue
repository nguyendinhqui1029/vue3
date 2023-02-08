<template>
  <MobileHeader menuType="back-menu" />
  <div class="tab-wrapper">
    <MobileFilterTab :tabList="tabList" @tab-click="filterByTab($event)" />
  </div>
  <div class="container" v-if="tabActive === 1">
    Receive Coin 
  </div>
  <div class="container" v-else>
    Trao đổi coin
  </div>
</template>
<script>
import MobileHeader from '@/components/client/mobile/MobileHeader.vue';
import MobileFilterTab from '../components/client/mobile/MobileFilterTab.vue'
import { reactive, ref } from 'vue'
export default {
  name: 'MobileReceiveCoinView',
  components: { MobileHeader, MobileFilterTab },
  setup() {
    const tabList = reactive([
      { id: 1, active: true, name: 'Nhận xu' },
      { id: 2, active: false, name: 'Trao đổi xu' }
    ]);
    const tabActive = ref(tabList.find(tab=>tab.active).id);
    function filterByTab(tabId) {
      tabActive.value = tabId;
    }
    return { tabList,tabActive, filterByTab };
  }
}
</script>

<style scoped>
.tab-wrapper {
  background: var(--primary-color);
}
</style>
