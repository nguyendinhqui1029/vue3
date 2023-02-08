<template>
  <ul class="menu-wrapper">
    <li class="menu-item" v-for="item in menuList" :key="item.id" @click="menuItemClick(item)">
      <router-link :class="{ 'menu-item': true, 'active': item.isActive }" :to="item.url">
        <vue-feather :type="item.icon"></vue-feather>
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>
<script scope>
import router from '@/router';
import { watchEffect } from 'vue';
export default {
  name: 'MobileMenu',
  props: { menuList: Array },
  setup(props, content) {
    watchEffect(() => {
      props.menuList.forEach(menuItem => {
        const isMatchPath = menuItem.url === router.currentRoute.value.path;
        const isMatchQuery = menuItem.key.includes(router.currentRoute.value.query?.type);
        menuItem.isActive = isMatchPath || isMatchQuery;
      });
    });
    function menuItemClick(item) {
      content.emit('menu-click', item);
    }
    return { menuItemClick };
  }
}
</script>
<style scoped>
.menu-item:nth-child(3) {
  border-radius: 50%;
  margin-bottom: 50px;
  width: 80px;
  height: 80px;
  box-shadow: 0px 0px 1px 5px;
  background-color: var(--primary-color);
}

.menu-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 55px;
  background: var(--primary-color);
}

.menu-item {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  color: var(--second-color);
  text-decoration: none;
}

.vue-feather {
  margin-bottom: 3px;
}

.active {
  color: var(--three-color);
}
</style>