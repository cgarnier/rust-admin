<template>
  <ul class="side-menu menu vertical">
    <li class="main-nav">
      <span>Main navigation</span>
    </li>
    <router-link :to="{name: 'home'}" tag="li" class="menu-item" exact>
      <a><i class="ion-stats-bars"></i> Home</a>
    </router-link>
    <router-link :to="{name: 'players'}" tag="li" class="menu-item">
      <a><i class="ion-person-stalker"></i> Players</a>
    </router-link>
    <router-link v-if="false" :to="{name: 'map'}" tag="li" class="menu-item">
      <a><i class="ion-map"></i> Map</a>
    </router-link>
    <router-link :to="{name: 'chat'}" tag="li" class="menu-item">
      <a><i class="ion-chatbox"></i> Chat</a>
    </router-link>
    <router-link :to="{name: 'console'}" tag="li" class="menu-item">
      <a><i class="ion-monitor"></i> Console</a>
    </router-link>
  </ul>
</template>
<script type="text/babel">
  import './side-menu.scss'
  export default {
  }
</script>

