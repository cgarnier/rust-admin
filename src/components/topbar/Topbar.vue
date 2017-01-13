<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <ul class="dropdown menu" data-dropdown-menu>
        <li class="menu-text"><span v-text="name"></span></li>
      </ul>
    </div>
    <div class="top-bar-right">
      <ul class="menu">
        <li><span>{{players}} <i class="ion ion-person-stalker"></i></span></li>
        <li><button type="button" @click="logout" class="button">Logout</button></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel">
  import LoginService from '../../services/LoginService'
  import ServerInfoService from '../../services/ServerInfosService'
  import './topbar.scss'
  export default {
    data () {
      return {
        name: 'ok'
      }
    },
    methods: {
      logout () {
        LoginService.logout()
      },
      handleInfo (info) {
        this.name = info.Hostname
        this.players = info.Players
      }
    },
    mounted () {
      ServerInfoService.on(this.handleInfo)
    }
  }
</script>

