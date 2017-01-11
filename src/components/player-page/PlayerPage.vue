<template>
  <div class="player-info">
    <div v-if="player || true" style="white-space: pre;">
      <div class="steam-profile">
        <a class="button" target="_blank" :href="'http://www.steamcommunity.com/profiles/' + player.SteamID">Steam Profile</a>
      </div>
      <h2>{{player.DisplayName}}</h2>
      <div class="tiles">
        <stats-tile name="Violation Level" :value="player.VoiationLevel"></stats-tile>
        <stats-tile name="IP Address" :value="player.Address"></stats-tile>
        <stats-tile name="Duration" :value="player.ConnectedSeconds"></stats-tile>
        <stats-tile name="Health" :value="player.Health"></stats-tile>
        <stats-tile name="Ping" :value="player.Ping"></stats-tile>
      </div>
      <div class="logs">
        <h3>Related logs</h3>
        <console :logs="logs" :read-only="true"></console>
      </div>
    </div>
    <div class="error" v-if="error">
      <span>{{error}}</span>
    </div>
  </div>
</template>

<script type="text/babel">
  import PlayersService from '../../services/PlayersService'
  import StatsTile from '../stats-tile/StatsTile.vue'
  import Console from '../console/Console.vue'
  import ConsoleService from '../../services/ConsoleService'
  export default {
    data () {
      return {
        player: {
          SteamID: null,
          VoiationLevel: null,
          Address: null,
          ConnectedSeconds: null,
          Health: null,
          Ping: null
        },
        logs: [],
        error: null
      }
    },
    mounted () {
      PlayersService.get(this.$route.params.id)
        .then(p => {
          this.player = p
        })
        .catch(err => {
          this.error = err.message
        })
      ConsoleService.filterBySteamID(this.$route.params.id)
        .then(res => {
          this.logs = res
        })
    },
    components: {
      StatsTile,
      Console
    }
  }
</script>
