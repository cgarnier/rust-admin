// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Promise polyfill
import Promise from 'promise-polyfill'
if (!window.Promise) {
  window.Promise = Promise
}

import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import HomePage from 'components/home-page/HomePage.vue'
import ConsolePage from 'components/console-page/ConsolePage.vue'
import PlayersPage from 'components/players-page/PlayersPage.vue'
import ChatPage from 'components/chat-page/ChatPage.vue'
import MapPage from 'components/map-page/MapPage.vue'
import PlayerPage from 'components/player-page/PlayerPage.vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
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
    name: 'player',
    path: '/players/:id',
    component: PlayerPage
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
