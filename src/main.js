// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import HomePage from 'components/home-page/HomePage.vue'
import ConsolePage from 'components/console-page/ConsolePage.vue'
import PlayersPage from 'components/players-page/PlayersPage.vue'
import ChatPage from 'components/chat-page/ChatPage.vue'
import MapPage from 'components/map-page/MapPage.vue'
Vue.use(VueRouter)
const routes = [
  {
    name: 'home',
    path: '',
    component: HomePage
  },
  {
    name: 'chat',
    path: '/chat',
    component: ChatPage
  },
  {
    name: 'map',
    path: '/map',
    component: MapPage
  },
  {
    name: 'players',
    path: '/players',
    component: PlayersPage
  },
  {
    name: 'console',
    path: '/console',
    component: ConsolePage
  }
]

const router = new VueRouter({
  routes
})
/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
