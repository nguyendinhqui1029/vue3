<template>
  <div class="card-wrapper">
      <div :id="id" :style="{ height: videoHeight}" v-if="isShowVideo">
        <youtube-iframe 
        :video-id="idVideo" 
        :player-width="'100%'" 
        :player-height="videoHeight" 
        :no-cookie="false">
        </youtube-iframe>
      </div>
      <div class="image" v-else :id="id" :style="{  'max-height': videoHeight }">
        <img src="https://i.ytimg.com/vi/G2z77mnguNM/mqdefault.jpg">
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
    return { id, videoHeight};
  },
  mounted() {
    const videoContainer = document.getElementById(this.id);
    if (videoContainer) {
      this.videoHeight = videoContainer.offsetWidth / 1.6;
    }
  }
}
</script>
<style scoped>
.image {
  width: 100%;
}
.image img{
  width: 100%;
}

.card-wrapper {
  background: var(--second-color);
  margin-bottom: 6px;
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