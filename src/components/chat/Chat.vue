<template>
  <div class="chat">
    <div @click.stop class="chat-settings">
      <button class="button dropdown tiny" @click="settingsShown = !settingsShown"><i class="ion-gear-a"></i></button>
      <ul v-if="settingsShown" class="vertical dropdown menu" data-dropdown-menu>
        <li><a><input type="checkbox" v-model="richText" id="richText"><label for="richText">Enable rich text</label></a></li>
      </ul>
    </div>
    <div ref="win" class="chat-wrapper">
      <div class="chat-content">
        <div class="chat-entry" v-for="entry in formattedChatEntries">
          <span class="date">
            {{entry.date}}
          </span>
          <span class="name">
            <span v-if="entry.id === '0' || entry.id === 0">{{entry.name}}</span>
            <router-link v-else :to="{name: 'player', params: {id: entry.id}}">{{entry.name}}</router-link>
          </span>
          <chat-message :message="entry.message" :rich-text="richText"></chat-message>
        </div>
        <div ref="bottom"></div>
      </div>
    </div>
    <div class="chat-input">
      <form @submit.prevent="submit">
        <input type="text" v-model="input"/>
        <button class="button">Send</button>
      </form>
    </div>
  </div>
</template>

<script type="text/babel">
  import ChatService from '../../services/ChatService'
  import moment from 'moment'
  import Vue from 'vue'
  import ChatMessage from '../chat-message/ChatMessage.vue'
  import './chat.scss'
  export default {
    data () {
      return {
        chatEntries: [],
        input: '',
        richText: true,
        settingsShown: false
      }
    },
    mounted () {
      ChatService.tail()
        .then((res) => {
          this.chatEntries = res
        })
      ChatService.on(this.handleMessage)

      document.addEventListener('click', this.clickHandler)
    },
    methods: {
      submit () {
        ChatService.send(this.input)
        this.input = ''
      },
      handleMessage (data) {
        this.chatEntries.push(data)
        console.log('new message', data)
      },
      clickHandler () {
        this.settingsShown = false
      }
    },
    computed: {
      formattedChatEntries () {
        Vue.nextTick(() => {
          this.$refs.win.scrollTop = this.$refs.win.scrollHeight
        })
        return this.chatEntries.map((e) => {
          return {
            name: e.Username,
            id: e.UserId,
            date: moment
              .unix(e.Time)
              .format('YYYY-MM-DD, HH:mm:ss'),
            message: e.Message
          }
        })
      }
    },
    beforeDestroy () {
      ChatService.off(this.handleMessage)
    },
    components: {
      ChatMessage
    }
  }
</script>
