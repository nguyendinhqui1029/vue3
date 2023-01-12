import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '../views/LayoutView.vue'
import MobileLayoutView from '../views/MobileLayoutView.vue'
import DetailView from '../views/DetailView.vue'
import FilmView from '../views/FilmView.vue'
import MusicView from '../views/MusicView.vue'
import StoryView from '../views/StoryView.vue'
import MobileSearchView from '../views/MobileSearchView.vue'
import MobileSearch from '../components/client/mobile/MobileSearch.vue'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: isMobileDevice() ? MobileLayoutView : LayoutView,
    children: [
      {
        path: '',
        name: 'film',
        component: FilmView,
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: DetailView,
      },
      {
        path: '/music',
        name: 'music',
        component: MusicView,
      },
      {
        path: '/story',
        name: 'story',
        component: StoryView,
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
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
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
