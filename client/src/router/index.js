import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '@/views/LayoutView.vue'
import MobileLayoutView from '@/views/MobileLayoutView.vue'
import MobileDetailView from '@/views/MobileDetailView.vue'
import MobileWalletView from '@/views/MobileWalletView.vue'
import StoryView from '@/views/StoryView.vue'
import MobileStoryView from '@/views/MobileStoryView.vue'
import MobileSearchView from '@/views/MobileSearchView.vue'
import MobileSearch from '@/components/client/mobile/MobileSearch.vue'
import SettingView from '@/views/MobileSettingView.vue'
import MobileRegisterView from '@/views/MobileRegisterView'
import MobileLoginView from '@/views/MobileLoginView'
import MobileForgetPasswordView from '@/views/MobileForgetPasswordView'
import GameView from '@/views/GameView'
import GomokuGame from '@/views/GomokuGame'
import MobileReceiveCoinView from '@/views/MobileReceiveCoinView'
import OverviewView from '@/components/admin/OverviewView'
import AddPostView from '@/components/admin/AddPostView'
import PostListView from '@/components/admin/PostListView'
import PublicationTimerView from '@/components/admin/PublicationTimerView'
import GameManagerView from '@/components/admin/GameManagerView'
import LayoutGameView from '@/views/LayoutGameView'
import GameRoomsView from '@/views/GameRoomsView'
import LandingPageGameView from '@/views/LandingPageGameView'


const routes = [
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
    path: '/game',
    name: 'game',
    component: LayoutGameView ,
    beforeEnter: () => {
      if (localStorage.getItem('isLogin') === 'true') {
        return true;
      } else {
        router.push({ path: '/login' });
        return false;
      }
    },
    children:[
      {
        path: '',
        name: 'game',
        component: GameView,
      },
      {
        path: '/rooms/:idGame',
        name: 'rooms',
        component: GameRoomsView,
      },
      {
        path: '/loading-game/:token',
        name: 'loading-game',
        component: LandingPageGameView,
      },
      {
        path: '/gomoku-game',
        name: 'gomoku-game',
        component: GomokuGame,
      }
    ]
  },
  {
    path: '',
    name: 'layout',
    component: isMobileDevice() ? MobileLayoutView : LayoutView,
    beforeEnter: () => {
      if (localStorage.getItem('isLogin') === 'true') {
        return true;
      } else {
        router.push({ path: '/login' });
        return false;
      }
    },
    children: [
      {
        path: '/credit-card',
        name: 'credit-card',
        component: MobileWalletView
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
        path: '',
        name: 'story',
        component: isMobileDevice() ? MobileStoryView : StoryView,
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
