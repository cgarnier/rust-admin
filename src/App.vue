<template>
  <div id="app">
    <div v-if="!loggedIn && !restoreSession" class="login">
      <div class="login-form">
        <form @submit.prevent="login">
          <input v-model="address" type="text" name="address" placeholder="Rcon address">
          <input v-model="password" type="password" name="address" placeholder="Rcon password">
          <button type="submit">Login</button>
        </form>
      </div>
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
  import './app.scss'
  export default {
    name: 'app',
    data () {
      return {
        loggedIn: false,
        address: '',
        password: '',
        restoreSession: true
      }
    },
    components: {
      Topbar,
      SideMenu
    },
    mounted () {
      EventHub.$on('logout', () => {
        this.loggedIn = false
      })
      LoginService.restore()
        .then(() => {
          this.loggedIn = true
        })
        .catch(() => {
          this.restoreSession = false
        })
    },
    methods: {
      login () {
        LoginService.login(this.address, this.password)
          .then(() => {
            this.loggedIn = true
          })
      }
    }
  }
</script>

<style>
</style>
