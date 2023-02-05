<template>
  <div class="detail-wrapper">
    <div class="menu">
      <MobileHeader :menuType="'back-menu'"/>
    </div>
    <MobileCard :isShowVideo="true"/>
    <CarouselContainer :itemList="filmTheSameCategory" @itemClick="navigateToDetail($event)"/>
    <div class="content">
      <h3>Nội dung phim và review</h3>
      <p>
        Monster Strike: An Encore and Continuance - Pandora Box Monster Strike: An Encore and Continuance - Pandora Box 2016 Full HD Vietsub Thuyết Minh Akira sẽ không chơi trong một đội vì Ren không giống như cựu thành viên thứ tư của họ là Haruma, và Minami đầu óc không trung đã bị chiếm hữu bởi chính sự hiện diện xấu xa đã buộc những người khác phải tấn công Ren và Aoi.
Sau khi đánh bại các Chiến thần, Ren và những người bạn của mình đang sống trong giấc mơ.
Có vẻ như cuối cùng họ cũng đã lấy lại được cuộc sống bình thường. Tuy nhiên, một cô gái bí ẩn tên là Pandora xuất hiện, mang theo một chiếc hộp không bao giờ được mở.
Một sự cố đáng tiếc dẫn đến việc mở hộp (tất nhiên), thiết lập thế giới cho một số thay đổi lớn...
      </p>
    </div>
    <div class="content">
      <h3>Tags</h3>
      <div class="tags-wrapper">
        <div class="tag-item">Phim Nhật Bản</div>
        <div class="tag-item">Phim Anime</div>
        <div class="tag-item">Toshiya Niidome,</div>
        <div class="tag-item">An Encore </div>
      </div>
    </div>
  </div>
</template>
<script scope>
  import MobileCard from '@/components/shared/MobileCard.vue'
  import CarouselContainer from '@/components/shared/CarouselContainer.vue'
  import MobileHeader from '../components/client/mobile/MobileHeader.vue'
  import router from '@/router';
  import { watchEffect, ref } from 'vue';
  export default {
    name: 'MobileDetailView',
    components: { MobileCard, CarouselContainer, MobileHeader },
    setup(){
      const type = ref('');
      const filmTheSameCategory = [{ id: 1, name: 'Film 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 2, name: '123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 3, name: 'nhạc 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' },
        { id: 4, name: 'Test 123', description: '', episode: 1, idVideo: '3lMnks3YPpM' }];
      function navigateToDetail(id) {
        router.replace({path: `/detail/${id}`, query: { type: type.value}});
      }
      watchEffect( ()=>{
        type.value = router.currentRoute.value.query?.type;
        console.log(router.currentRoute.value.query)
      })
      return { filmTheSameCategory, navigateToDetail};
    }
  }
</script>
<style scoped>
  .tag-item {
    text-align: center;
    border-radius: 25px;
    border: 1px solid var(--three-color);
    padding: 7px;
    line-height: 30px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tags-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 5px;
    padding: 16px 0;
  }
  .content h3{
    color: var(--primary-color);
    margin: 0;
  }
  .content {
    padding: 16px;
  }
  .detail-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .menu {
    background: var(--primary-color);
  }
</style>