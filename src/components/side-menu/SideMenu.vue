<template>
  <ul class="menu vertical">
    <li>
      <router-link :to="{name: 'home'}">Home</router-link>
    </li>
    <li>
      <router-link :to="{name: 'players'}">Players</router-link>
    </li>
    <li>
      <router-link :to="{name: 'map'}">Map</router-link>
    </li>
    <li>
      <router-link :to="{name: 'chat'}">Chat</router-link>
    </li>
    <li>
      <router-link :to="{name: 'console'}">Console</router-link>
    </li>
  </ul>
</template>
<script type="text/babel">
  export default {
  }
</script>
