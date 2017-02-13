<template>
  <div id="app">
    <div v-if="!loggedIn" class="login">
      <login @login="login"></login>
    </div>
    <div v-if="loggedIn" class="the-app">
      <header>
        <topbar></topbar>
      </header>
      <div class="layout">
        <div class="side-menu">
          <side-menu></side-menu>
        </div>
        <div class="middle-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Topbar from 'components/topbar/Topbar.vue'
  import SideMenu from 'components/side-menu/SideMenu.vue'
  import LoginService from './services/LoginService'
  import EventHub from './services/EventHub'
  import Login from 'components/login/Login.vue'
  import './app.scss'
  export default {
    name: 'app',
    data () {
      return {
        loggedIn: false
      }
    },
    components: {
      Topbar,
      SideMenu,
      Login
    },
    mounted () {
      EventHub.$on('logout', () => {
        this.loggedIn = false
      })
      LoginService.restore()
        .then(() => {
          this.loggedIn = true
        })
    },
    methods: {
      login (data) {
        LoginService.login(data.address, data.password)
          .then(() => {
            this.loggedIn = true
          })
          .catch(() => {
            console.log('Cannot restore last session!')
          })
      }
    }
  }
</script>

<style>
</style>
