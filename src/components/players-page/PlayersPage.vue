<template>
  <div class="players-page">
    <div class="expanded row">
      <div class="small-12 column">
        <table class="table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Steam ID</th>
            <th>Violation</th>
            <th>IP address</th>
            <th>Duration</th>
            <th>Health</th>
            <th>Ping</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="p in players">
            <td><router-link :to="{name: 'player', params: {id: p.SteamID}}" v-text="p.DisplayName"></router-link></td>
            <td><router-link :to="{name: 'player', params: {id: p.SteamID}}" v-text="p.SteamID"></router-link></td>
            <td v-text="p.VoiationLevel"></td>
            <td v-text="p.Address"></td>
            <td v-text="p.Duration"></td>
            <td v-text="p.Health"></td>
            <td v-text="p.Ping"></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import PlayersService from '../../services/PlayersService.js'
  export default {
    data () {
      return {
        players: []
      }
    },
    mounted () {
      PlayersService.list()
        .then((res) => {
          console.log('res', res)
          this.players = res.map((p) => {
            p.Duration = p.ConnectedSeconds
            p.Health = Math.round(p.Health)
            return p
          })
        })
    }
  }
</script>
