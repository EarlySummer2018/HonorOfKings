import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewsInfo from '../views/newsInfo.vue'
import HeroInfo from '../views/HeroInfo.vue'
import Main from '../views/Main.vue'
import HeroList from '../components/HeroList.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Main,
    children: [{
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/newsInfo/:id',
        name: 'NewsInfo',
        component: NewsInfo,
        props: true
      }
    ]
  },
  {
    path: '/heroInfo/:id',
    name: 'HeroInfo',
    component: HeroInfo,
    props: true
  },
  {
    path: '/heroList',
    name: 'heroList',
    component: HeroList
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router