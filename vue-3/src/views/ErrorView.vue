<template>
  <div class="error-wrapper" id="mobileContentId">
      <h4>Bạn không thể truy cập đến trang này</h4>
      <span @click="back()">Trở lại</span>
  </div>
</template>
<script>
import router from '@/router';
export default {
  name: 'ErrorView',
  setup() {
    function back() {
      router.back();
    }
    return { back };
  }
}
</script>

<style scoped>
  .error-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .error-wrapper h4 {
    color: var(--primary-color);
    margin-top: 70px;
  }

  .error-wrapper span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 30px;
    border-radius: 5px;
    background: var(--primary-color);
    color: var(--second-color);
  }
</style>
