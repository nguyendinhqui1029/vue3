<template>
  <div v-if="menuType === 'back-menu'" class="header-wrapper">
    <vue-feather @click="back()" :type="'arrow-left'"></vue-feather>
    <vue-feather :type="'settings'" @click="navigateToSetting()"></vue-feather>
  </div>
  <div v-else-if="menuType === 'search-menu'" class="header-wrapper">
    <vue-feather @click="back()" :type="'arrow-left'"></vue-feather>
    <input type="text" class="input-search" v-model="valueInput" @input="event => valueInput = event.target.value" />
    <vue-feather class="clear-icon" :type="'x'" @click="clearValue()"></vue-feather>
  </div>
  <div v-else class="header-wrapper">
    <div class="logo"></div>
    <div class="icon-group">
      <vue-feather :type="'search'" @click="searchClick()"></vue-feather>
      <vue-feather :type="'settings'" @click="navigateToSetting()"></vue-feather>
    </div>
  </div>
</template>
<script scope>
import router from '@/router';
import { watch, ref } from 'vue';
export default {
  name: 'MobileHeader',
  props: {
    menuType: {
      type: String,
      default: 'main-menu',
      validator: function (value) {
        return [
          'main-menu',
          'back-menu',
          'search-menu'
        ].indexOf(value) !== -1
      }
    }
  },
  setup() {
    const valueInput = ref(router.currentRoute.value.query?.q || '');
    watch(valueInput, () => {
      router.replace({ path: '/search', query: { q: valueInput.value, type: router.currentRoute.value.query.type } });
    })
    function navigateToSetting() {
      router.push({ path: '/setting', query: { type: router.currentRoute.value.query.type } });
    }
    function searchClick() {
      router.push({ path: '/search', query: { type: router.currentRoute.value.name } });
    }
    function back() {
      router.back();
    }
    function clearValue() {
      valueInput.value = '';
    }
    return { valueInput, back, searchClick, navigateToSetting, clearValue };
  }
}
</script>
<style scoped>
.input-search {
  border: none;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 35px;
  border-radius: 25px;
  text-indent: 10px;
  color: var(--four-color);
  padding-right: 35px;
  position: relative;
}

.clear-icon {
  position: absolute;
  right: 25px;
  width: 30px;
  color: var(--primary-color);
}

.input-search:focus {
  outline: none;
}

.icon-group {
  display: flex;
  gap: 20px;
}

.logo {
  width: 70px;
  height: 70px;
  background-image: url('../../../assets/images/logo/logo.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.header-wrapper {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--second-color);
  padding: 0 16px;
  background: var(--primary-color);
  position: relative;
}</style>