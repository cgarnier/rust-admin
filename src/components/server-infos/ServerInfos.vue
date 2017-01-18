<template>
  <div class="server-info">
    <div class="tiles row">
      <div class="column small-6 large-4">
        <stats-tile class="aqua" name="Players" :value="players" icon="ion-person-stalker"></stats-tile>
      </div>
      <div class="column small-6 large-4">
        <stats-tile class="green" name="Joining" :value="joining" icon="ion-person-stalker"></stats-tile>
      </div>
      <div class="column small-6 large-4">
        <stats-tile class="orange" name="Queued" :value="queued" icon="ion-person-stalker"></stats-tile>
      </div>
      <div class="column small-6 large-4">
        <stats-tile class="red" name="Entities" :value="entityCount" icon="ion-trash-b"></stats-tile>
      </div>
      <div class="column small-6 large-4">
        <stats-tile class="aqua" name="In game time" :value="gameTime" icon="ion-clock"></stats-tile>
      </div>
      <div class="column small-6 large-4">
        <stats-tile class="green" name="Map" :value="map" icon="ion-map"></stats-tile>
      </div>
      <div class="column small-6 large-4">
        <stats-tile class="orange" name="FPS" :value="framerate" icon="ion-arrow-graph-up-right"></stats-tile>
      </div>
      <div class="column small-6 large-4">
        <stats-tile class="red" name="Up time" :value="upTime" icon="ion-clock"></stats-tile>
      </div>
      <div class="column small-6 large-4">
        <stats-tile class="aqua" name="Memory" :value="memory" icon="ion-arrow-graph-up-right"></stats-tile>
      </div>
    </div>
    <div class="row">
      <div class="column small-12">
        <h5>{{hostname}}</h5>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import ServerInfosService from '../../services/ServerInfosService'
  import StatsTile from '../stats-tile/StatsTile.vue'
  import moment from 'moment'
  import Utils from '../../services/Utils'
  import './server-info.scss'
  export default {
    data () {
      return {
        players: '',
        queued: '',
        joining: null,
        entityCount: null,
        gameTime: null,
        upTime: null,
        map: null,
        framerate: null,
        memory: null,
        hostname: ''
      }
    },
    mounted () {
      ServerInfosService.on(this.handleInfo)
    },
    methods: {
      handleInfo (data) {
        this.hostname = data.Hostname
        this.players = `${data.Players} / ${data.MaxPlayers}`
        this.queued = data.Queued
        this.joining = data.Joining
        this.entityCount = data.EntityCount
        this.upTime = Utils.formatDuration(data.Uptime)
        this.gameTime = moment(data.GameTime).format('HH:mm:ss')
        this.map = data.Map
        this.framerate = data.Framerate
        this.memory = data.Memory
        this.networking = `${data.networkIn} in / ${data.networkIn} out`
      }
    },
    beforeDestroy () {
      ServerInfosService.off(this.handleInfo)
    },
    components: {
      StatsTile
    }
  }
</script>
