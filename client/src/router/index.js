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
import GameView from '../views/GameView'
import GomokuGame from '@/views/GomokuGame'
import ChineseChess from '@/views/ChineseChess'
import BarGame from '@/views/BarGame'
import MobileReceiveCoinView from '@/views/MobileReceiveCoinView'
import OverviewView from '@/components/admin/OverviewView'
import AddPostView from '@/components/admin/AddPostView'
import PostListView from '@/components/admin/PostListView'
import PublicationTimerView from '@/components/admin/PublicationTimerView'
import GameManagerView from '@/components/admin/GameManagerView'


const routes = [
  {
    path: '/register',
    name: 'register',
    component: MobileRegisterView,
  },
  {
    path: '',
    name: 'login',
    component: MobileLoginView,
  },
  {
    path: '/luck',
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
        path: '/receive-coin',
        name: 'receive-coin',
        component: MobileReceiveCoinView,
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
        path: '/game',
        name: 'game',
        component: GameView,
      },
      {
        path: '/gomoku-game',
        name: 'gomoku-game',
        component: GomokuGame,
      },
      {
        path: '/chinese-chess',
        name: 'chinese-chess',
        component: ChineseChess,
      },
      {
        path: '/bar-game',
        name: 'bar-game',
        component: BarGame,
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
    component: () => import('../views/AdminView.vue'),
    children: [
      {
        path: '',
        name: 'overview',
        component: OverviewView,
      },
      {
        path: 'add-post',
        name: 'add-post',
        component: AddPostView,
      },
      {
        path: 'post-list',
        name: 'post-list',
        component: PostListView,
      },
      {
        path: 'publication-timer',
        name: 'publication-timer',
        component: PublicationTimerView,
      },
      {
        path: 'game-manager',
        name: 'game-manager',
        component: GameManagerView,
      }
    ]
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
