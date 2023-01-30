import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '../views/LayoutView.vue'
import MobileLayoutView from '../views/MobileLayoutView.vue'
import MobileDetailView from '../views/MobileDetailView.vue'
import MobileFilmView from '../views/MobileFilmView.vue'
import FilmView from '../views/FilmView.vue'
import MusicView from '../views/MusicView.vue'
import MobileMusicView from '../views/MobileMusicView.vue'
import StoryView from '../views/StoryView.vue'
import MobileStoryView from '../views/MobileStoryView.vue'
import MobileSearchView from '../views/MobileSearchView.vue'
import MobileSearch from '../components/client/mobile/MobileSearch.vue'
import SettingView from '../views/MobileSettingView.vue'
import MobileRegisterView from '../views/MobileRegisterView'
import MobileLoginView from '../views/MobileLoginView'
import MobileForgetPasswordView from '../views/MobileForgetPasswordView'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: isMobileDevice() ? MobileLayoutView : LayoutView,
    children: [
      {
        path: '',
        name: 'film',
        component: isMobileDevice() ? MobileFilmView : FilmView,
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: MobileDetailView,
      },
      {
        path: '/music',
        name: 'music',
        component: isMobileDevice() ? MobileMusicView : MusicView ,
      },
      {
        path: '/story',
        name: 'story',
        component: isMobileDevice() ? MobileStoryView : StoryView ,
      },
      {
        path: '/search',
        name: 'search',
        component: MobileSearchView,
        children: [
          {
            path: '',
            name: 'search',
            component: MobileSearch,
          }
        ]
      },
      {
        path: '/setting',
        name: 'setting',
        component: SettingView,
      },
      {
        path: '/register',
        name: 'register',
        component: MobileRegisterView,
      },
      {
        path: '/login',
        name: 'login',
        component: MobileLoginView,
      },
      {
        path: '/forget-password',
        name: 'forget-password',
        component: MobileForgetPasswordView,
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-match',
    component: () => import('../views/ErrorView.vue')
  }
]
function isMobileDevice() {
  return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
}
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
