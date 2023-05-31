<template id="dialog">
  <div class="dialog-wrapper">
    <!-- <component :is="component"></component> -->
    ádasdsads
  </div>
</template>
<script>

export default {
  name: 'DialogContainer',
  components: {
    
  },
  props: {
    component: Object,
    isOpen: Boolean
  },
  setup() {

      
  }
}
</script>

<style scoped>
.dialog-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
