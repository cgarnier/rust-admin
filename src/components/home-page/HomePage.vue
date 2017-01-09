<template>
  <div class="home-page">
    <server-info></server-info>
  </div>
</template>

<script type="text/babel">
  import ServerInfo from '../server-infos/ServerInfos.vue'
  export default {
    components: {
      ServerInfo
    }
  }
</script>
