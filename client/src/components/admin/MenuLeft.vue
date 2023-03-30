<template>
  <div class="menu-wrapper">
    <router-link class="router-link" to="/">
      <div class="logo"></div>
    </router-link>
    <hr class="divide" />
    <ul>
      <router-link v-for="menu in menuList" :key="menu.id" class="router-link" :to="menu.url" @click="menuChange(menu)">
        <li :class="{ 'active': menu.isActive }">
          {{ menu.name }}
        </li>
      </router-link>

      <li>Đăng xuất</li>
    </ul>
  </div>
</template>

<script>
import router from '@/router';
export default {
  name: 'MenuLeft',
  props: {
    menuList: {
      type: Array,
      require: true
    }
  },
  setup(props) {
    props.menuList.forEach(menuItem=>{
          menuItem.isActive = menuItem.alias === router.currentRoute.value.name;
    });
    function menuChange(menu) {
      props.menuList.forEach(menuItem=>{
          menuItem.isActive = menuItem.id === menu.id;
      });
    }
    return {menuChange};
  }
}
</script>
<style scoped>
.divide {
  z-index: 1000;
  position: absolute;
  left: 16px;
  width: 86%;
  margin-top: -25px;
}

.logo {
  width: 50px;
  height: 50px;
  background-image: url('@/assets/images/logo/logo.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0px 0px 30px 16px;
  padding-top: 16px;
}

.router-link {
  text-decoration: none;
  color: var(--second-color);
}

.menu-wrapper {
  width: 100%;
  min-width: 70px;
  max-width: 100%;
  background: #0B81FF;
  height: 100%;
  color: var(--second-color);
  position: relative;
}

.menu-wrapper ul {
  margin: 0;
  padding: 0;
  list-style: none;
  margin-left: 16px;
}

.menu-wrapper ul li {
  line-height: 40px;
  padding: 0 20px;
  cursor: pointer;
}

.active {
  background: #ffff;
  color: black;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  position: relative;
}

.active::after {
  content: '';
  background: #0B81FF;
  width: 40px;
  height: 40px;
  right: 0;
  position: absolute;
  border-radius: 50%;
  top: -40px;
  box-shadow: 15px 15px 0px #fff
}

.active::before {
  content: '';
  background: #0B81FF;
  width: 40px;
  height: 40px;
  right: 0;
  position: absolute;
  border-radius: 50%;
  top: 40px;
  box-shadow: 18px -18px 0px #ffff;
}
</style>