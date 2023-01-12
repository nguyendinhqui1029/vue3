import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueFeather from 'vue-feather';
import '@/assets/css/style.css';
import './registerServiceWorker'
import YoutubeIframe from '@techassi/vue-youtube-iframe';
const app = createApp(App);
app.component(VueFeather.name, VueFeather);
app.use(YoutubeIframe);
app.use(router);
app.mount('#app');
