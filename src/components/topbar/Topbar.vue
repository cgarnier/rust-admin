<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <ul class="dropdown menu" data-dropdown-menu>
        <li class="menu-text">Rust admin</li>
      </ul>
    </div>
    <div class="top-bar-right">
      <ul class="menu">
        <li><button type="button" @click="logout" class="button">Logout</button></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel">
  import LoginService from '../../services/LoginService'
  export default {
    methods: {
      logout () {
        LoginService.logout()
      }
    }
  }
</script>
