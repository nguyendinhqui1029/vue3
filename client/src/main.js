import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFeather from 'vue-feather';
import '@/assets/css/style.css';
import './registerServiceWorker'
import YoutubeIframe from '@techassi/vue-youtube-iframe';
import ScriptX from 'vue-scriptx';
import Ads from 'vue-google-adsense'
const app = createApp(App);
app.component(VueFeather.name, VueFeather);
app.use(ScriptX)
app.use(Ads.Adsense)
app.use(Ads.InArticleAdsense)
app.use(Ads.InFeedAdsense)
app.use(YoutubeIframe);
app.use(router);
app.mount('#app');
