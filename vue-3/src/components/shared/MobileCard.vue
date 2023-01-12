<template>
  <div class="card-wrapper">
    <div class="video" :id="id" :style="{ 'height': videoHeight }">
      <div v-if="isShowVideo">
        <youtube-iframe 
        :video-id="idVideo" 
        :player-width="'100%'" 
        :player-height="'100%'" 
        :no-cookie="false">
        </youtube-iframe>
      </div>
      <div v-else>
        <img class="image" src="https://i.ytimg.com/vi/G2z77mnguNM/mqdefault.jpg">
      </div>
    </div>
    <div class="content-wrapper">
      <h4>
        {{ title }}
      </h4>
      <small v-if="!!episode">Tập {{ episode }}</small>
    </div>
  </div>
</template>
<script scope>
import { ref } from 'vue';
export default {
  name: 'MobileCard',
  props: {
    isShowVideo: Boolean,
    idVideo: String,
    title: String,
    episode: Number
  },
  setup() {
    const id = ref(Date.now());
    const videoHeight = ref(240);
    return { id, videoHeight };
  },
  mounted() {
    const videoContainer = document.getElementById(this.id);
    if (videoContainer) {
      this.videoHeight = videoContainer.offsetWidth / 2;
    }
  }
}
</script>
<style scoped>
.image {
  width: 100%;
  height: 100%;
}

.card-wrapper {
  background: var(--second-color);
  border-bottom: 6px solid var(--five-color);
}

.content-wrapper {
  padding: 5px 16px;
}

.content-wrapper h4 {
  margin: 5px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content-wrapper small {
  color: var(--four-color);
}
</style>