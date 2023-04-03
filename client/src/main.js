import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFeather from 'vue-feather';
import '@/assets/css/style.css';
import './registerServiceWorker'
import YoutubeIframe from '@techassi/vue-youtube-iframe';
import ScriptX from 'vue-scriptx';
import Ads from 'vue-google-adsense';
import VueCryptojs from 'vue-cryptojs';
import { createStore } from 'vuex';
const store = createStore({
  state () {
    return {
      gameTypePayloadKey: '123456789'
    }
  },
  mutations: {
    setGameTypePayloadKey(state, payload) {
      state.gameTypePayloadKey = payload;
    }
  }
})
const app = createApp(App);
app.component(VueFeather.name, VueFeather);
app.use(store);
app.use(VueCryptojs);
app.use(ScriptX);
app.use(Ads.Adsense);
app.use(Ads.InArticleAdsense);
app.use(Ads.InFeedAdsense);
app.use(YoutubeIframe);
app.use(router);
app.mount('#app');
