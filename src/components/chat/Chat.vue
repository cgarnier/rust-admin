<template>
  <div class="chat">
    <div class="chat-wrapper">
      <div class="chat-content">
        <div class="chat-entry" v-for="entry in formattedChatEntries">
          <span class="date">
            {{entry.date}}
          </span>
          <span class="name">
            <a href="#">{{entry.name}}</a>
          </span>
          <span class="message">{{entry.message}}</span>
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
  import './chat.scss'
  export default {
    data () {
      return {
        chatEntries: [],
        input: ''
      }
    },
    mounted () {
      ChatService.tail()
        .then((res) => {
          this.chatEntries = res
          console.log('chat', res)
        })
      ChatService.on(this.handleMessage)
    },
    methods: {
      submit () {
        ChatService.send(this.input)
        this.input = ''
      },
      handleMessage (data) {
        this.chatEntries.push(data)
        console.log('new message', data)
      }
    },
    computed: {
      formattedChatEntries () {
        Vue.nextTick(() => {
          this.$refs.bottom.scrollIntoView()
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
    }
  }
</script>
