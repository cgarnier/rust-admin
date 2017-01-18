<template>
  <div class="player-info">
    <div v-if="player || true">
      <div class="row">
        <div class="small-12" v-if="!isConnected">
          <p>This player is not connected</p>
        </div>
        <div v-if="isConnected" class="column username">
          <h3>{{player.DisplayName}}</h3>
          <div class="steam-btns">
            <a class="button steam" target="_blank" :href="'http://www.steamcommunity.com/profiles/' + player.SteamID"><i class="ion-steam"></i><span>Profile</span></a>
            <a v-if="player.OwnerSteamID !== '0'" class="button steam" target="_blank" :href="'http://www.steamcommunity.com/profiles/' + player.OwnerSteamID"><i class="ion-steam"></i><span>Owner</span></a>
          </div>
        </div>
      </div>
      <div class="tiles row">
        <div class="column small-6 large-4">
          <stats-tile v-if="isConnected" class="aqua" name="Violation Level" :value="player.VoiationLevel" icon="ion-person-stalker"></stats-tile>
        </div>
        <div class="column small-6 large-4">
          <stats-tile v-if="isConnected" class="green" name="IP Address" :value="ip(player.Address)" icon="ion-person-stalker"></stats-tile>
        </div>
        <div class="column small-6 large-4">
          <stats-tile v-if="isConnected" class="red" name="Duration" :value="duration(player.ConnectedSeconds)" icon="ion-person-stalker"></stats-tile>
        </div>
        <div class="column small-6 large-4">
          <stats-tile v-if="isConnected" class="orange" name="Health" :value="player.Health" icon="ion-person-stalker"></stats-tile>
        </div>
        <div class="column small-6 large-4">
          <stats-tile v-if="isConnected" class="aqua" name="Ping" :value="player.Ping" icon="ion-person-stalker"></stats-tile>
        </div>
        <div class="column small-6 large-4">
          <stats-tile v-if="isConnected" class="green" name="Level" :value="player.CurrentLevel" icon="ion-person-stalker"></stats-tile>
        </div>
        <div class="column small-6 large-4">
          <stats-tile v-if="isConnected" class="red" name="XP" :value="player.UnspentXp" icon="ion-person-stalker"></stats-tile>
        </div>
      </div>

      <div class="actions">
        <div class="row">
          <div class="column small-12">
            <h4>Actions</h4>
            <button class="button warning" @click="beforeKick"><i class="ion-alert"></i> Kick</button>
            <button class="button alert" @click="beforeBan"><i class="ion-minus-circled"></i> Ban</button>
          </div>
        </div>
      </div>
      <div class="logs">
        <div class="row">
          <div class="column small-12">
            <h4>Related logs</h4>
            <console :logs="logs" :read-only="true"></console>
          </div>
        </div>
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
  import ConfirmModal from '../confirm-modal/ConfirmModal.vue'
  import PlayersService from '../../services/PlayersService'
  import StatsTile from '../stats-tile/StatsTile.vue'
  import Console from '../console/Console.vue'
  import ConsoleService from '../../services/ConsoleService'
  import Utils from '../../services/Utils'
  import './player-page.scss'
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
        error: null,
        kickConfirmationShown: false,
        banConfirmationShown: false,
        isConnected: false
      }
    },
    mounted () {
      console.log('route', this.$route.params.id)
      PlayersService.get(this.$route.params.id)
        .then(p => {
          console.log('player', p)
          this.player = p
          this.isConnected = true
        })
        .catch(err => {
          this.isConnected = false
          console.error(err)
          this.error = err.message
        })
      ConsoleService.filterBySteamID(this.$route.params.id)
        .then(res => {
          this.logs = res
        })
    },
    methods: {
      beforeKick () {
        this.kickConfirmationShown = true
      },
      beforeBan () {
        this.banConfirmationShown = true
      },
      kick () {
        PlayersService.kick(this.$route.params.id)
          .then(() => {
            this.kickConfirmationShown = false
          })
      },
      ban () {
        PlayersService.ban(this.$route.params.id)
          .then(() => {
            this.banConfirmationShown = false
          })
      },
      duration (time) {
        return Utils.formatDuration(time)
      },
      ip (addr) {
        return addr.split(':')[0]
      }
    },
    components: {
      StatsTile,
      Console,
      ConfirmModal
    }
  }
</script>
