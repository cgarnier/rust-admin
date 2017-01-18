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
            <td v-text="duration(p.Duration)"></td>
            <td v-text="p.Health"></td>
            <td v-text="p.Ping + ' ms'"></td>
            <td class="actions">
              <button class="button warning small" @click="beforeKick(p)"><i class="ion-alert"></i> Kick</button>
              <button class="button alert small" @click="beforeBan(p)"><i class="ion-minus-circled"></i> Ban</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <confirm-modal v-if="kickConfirmationShown" @confirm="kick" @cancel="kickConfirmationShown = false">
      <p class="text-center"><br><br>Are you sure to want to kick {{player.DisplayName || $route.params.id}} ?</p>
    </confirm-modal>
    <confirm-modal v-if="banConfirmationShown" @confirm="ban" @cancel="banConfirmationShown = false">
      <p class="text-center"><br><br>Are you sure to want to ban {{player.DisplayName || $route.params.id}} ?</p>
    </confirm-modal>
  </div>
</template>
<script type="text/babel">
  import PlayersService from '../../services/PlayersService.js'
  import Utils from '../../services/Utils'
  import ConfirmModal from '../confirm-modal/ConfirmModal.vue'
  import './players-page.scss'
  export default {
    data () {
      return {
        players: [],
        player: null,
        kickConfirmationShown: false,
        banConfirmationShown: false
      }
    },
    mounted () {
      this.update()
        .then(() => {
          this.interval = setInterval(this.update, 500)
        })
    },
    methods: {
      duration (time) {
        return Utils.formatDuration(time)
      },
      update () {
        return PlayersService.list()
          .then((res) => {
            this.players = res.map((p) => {
              p.Duration = p.ConnectedSeconds
              p.Health = Math.round(p.Health)
              return p
            })
          })
      },
      beforeKick (p) {
        this.player = p
        this.kickConfirmationShown = true
      },
      beforeBan (p) {
        this.player = p
        this.banConfirmationShown = true
      },
      kick () {
        PlayersService.kick(this.player.id)
          .then(() => {
            this.kickConfirmationShown = false
            this.player = null
          })
      },
      ban () {
        PlayersService.ban(this.player.id)
          .then(() => {
            this.banConfirmationShown = false
            this.player = null
          })
      }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    components: {
      ConfirmModal
    }
  }
</script>
