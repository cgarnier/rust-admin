<template>
  <div class="server-info">
    <div class="expanded row">
      <div class="column small-12">
        <h2>{{hostname}}</h2>
      </div>
    </div>
    <div class="tiles">
      <stats-tile name="Players" :value="players"></stats-tile>
      <stats-tile name="Joining" :value="joining"></stats-tile>
      <stats-tile name="Queued" :value="queued"></stats-tile>
      <stats-tile name="Entities" :value="entityCount"></stats-tile>
      <stats-tile name="In game time" :value="gameTime"></stats-tile>
      <stats-tile name="Map" :value="map"></stats-tile>
      <stats-tile name="FPS" :value="framerate"></stats-tile>
      <stats-tile name="Up time" :value="upTime"></stats-tile>
      <stats-tile name="Memory" :value="memory"></stats-tile>
    </div>
  </div>
</template>
<script type="text/babel">
  import ServerInfosService from '../../services/ServerInfosService'
  import StatsTile from '../stats-tile/StatsTile.vue'
  import moment from 'moment'
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
        let uptime = moment.utc(moment(new Date())
          .diff(moment(new Date((new Date().getTime()) - (data.Uptime * 1000)))))
        this.hostname = data.Hostname
        this.players = `${data.Players} / ${data.MaxPlayers}`
        this.queued = data.Queued
        this.joining = data.Joining
        this.entityCount = data.EntityCount
        this.upTime = uptime.format('DDD') + ' days ' + uptime
          .format('HH:mm')
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
