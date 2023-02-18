<template>
  <div class="admin-wrapper">
        <div class="content-left">
          <MenuLeft/>
        </div>
        <div class="content-right">
          <div class="menu-top">
            <vue-feather type="menu"></vue-feather>
            <vue-feather type="bell"></vue-feather>
            <vue-feather type="home"></vue-feather>
          </div>
          <div class="content">Content
            <TextEditor @saveValue="saveValue($event)" :editorValue="'1234'"/>

          </div>
        </div>
  </div>
</template>

<script>
import MenuLeft from '@/components/admin/MenuLeft.vue';
import TextEditor from '@/components/shared/TextEditor.vue';
export default {
  name: 'AdminView',
  components: { MenuLeft,TextEditor },
  setup() {
    function saveValue(value) {
      console.log(value.value)
    }
    return { saveValue };
  }
}
</script>
<style scoped>
.admin-wrapper {
  display: flex;
  flex-direction: row;
}
.menu-top {
  display: flex;
  align-items: center;
  height: 55px;
  min-height: 55px;
  border-bottom: 2px solid var(--five-color);
}
.content-right {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
}
.content-left {
  min-width: 70px;
  width: 250px;
  height: calc( 100vh - 56px);
}
.content {
  height: calc( 100vh - 56px);
  overflow-y: auto;
  padding: 16px;
}
</style>
