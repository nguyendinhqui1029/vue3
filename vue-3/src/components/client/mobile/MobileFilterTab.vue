<template>
  <div class="filter-tab-wrapper">
    <ul class="filter-tab">
      <li v-for="tab in tabList" :key="tab.id" :class="{'filter-tab-item': true, 'active': tab.active}" @click="tabClick(tab.id)">
        {{ tab.name }}
      </li>
    </ul>
  </div>
</template>
<script scope>
export default {
  name: 'MobileFilterTab',
  props: {
    tabList: Array
  },
  setup(props, content) {
    function tabClick(idTab){
      props.tabList.forEach(tab=>tab.active= tab.id === idTab);
      content.emit('tab-click', idTab);
    }
    return {tabClick};
  }
}
</script>
<style scoped>
.active {
  color: var(--second-color) !important;
  background: var(--three-color) !important;
}

.filter-tab-item {
  white-space: nowrap;
  list-style: none;
  padding: 7px;
  border: 1px solid var(--three-color);
  border-radius: 25px;
  background: var(--second-color);
}

.filter-tab::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.filter-tab {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 10px;
  margin: 0;
  padding: 0 16px;
}

.filter-tab-wrapper {
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>