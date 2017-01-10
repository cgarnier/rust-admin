<template>
  <div class="console">
    <div class="logs-container">
      <div class="logs">
        <div class="log-entry" :class="l.type + '-log'" v-for="l in formattedLogs">
            <span class="type" v-text="'[' + l.type + ']'"></span>
            <span class="date" v-text="formatDate(l.date)"></span>
            <span class="message" v-text="l.message"></span>
        </div>
        <div ref="bottom"></div>
      </div>
    </div>
    <div class="console-input">
      <form @submit.prevent="submit">
        <input type="text" v-model="input" @keyup="handleKeyUp" @change="handleChange">
        <button class="button" type="submit">Send</button>
      </form>
    </div>
  </div>
</template>
<script type="text/babel">
  import moment from 'moment'
  import ConsoleService from '../../services/ConsoleService'
  import './console.scss'
  import Vue from 'vue'
  export default {
    data () {
      return {
        logs: [],
        commandsHistory: [],
        historyIndex: 0,
        commandList: ['', 'test1', 'test2'],
        input: ''
      }
    },
    mounted () {
      ConsoleService.tail(1024)
        .then((res) => {
          this.logs = res
        })
      ConsoleService.on(this.handleMessage)
    },
    methods: {
      submit () {
        ConsoleService.send(this.input)
        this.commandList[0] = this.input
        this.commandList.unshift('')
        this.input = ''
      },
      handleMessage (data) {
        if (!data.Time) {
          data.Time = moment()
        }
        this.logs.push(data)
      },
      handleChange () {
        console.log('change,', this.commandList)
      },
      handleKeyUp (e) {
        if (e.code === 'ArrowUp') {
          if (this.historyIndex < this.commandList.length - 1) {
            this.historyIndex++
            this.input = this.commandList[this.historyIndex]
          }
          return
        }
        if (e.code === 'ArrowDown') {
          if (this.historyIndex > 0) {
            this.historyIndex--
            this.input = this.commandList[this.historyIndex]
          }
          return
        }
        this.historyIndex = 0
      },
      formatDate (date) {
        return moment(date)
          .format('MMMM Do YYYY, HH:mm:ss')
      }
    },
    computed: {
      formattedLogs () {
        Vue.nextTick(() => {
          this.$refs.bottom.scrollIntoView()
        })
        return this.logs
          .map((l) => {
            if (l.Type === 'Chat') {
              let m = JSON.parse(l.Message)
              return {
                type: l.Type,
                date: moment.unix(m.Time),
                message: `${m.Username} (${m.UserId}): ${m.Message}`
              }
            }
            if (l.Type === 'Generic') {
              return {
                type: 'Log',
                date: moment(),
                message: l.Message
              }
            }
            return {
              type: l.Type,
              message: l.Message,
              date: moment.unix(l.Time)
            }
          })
      }
    },
    beforeDestroy () {
      ConsoleService.off(this.handleMessage)
    }
  }
</script>
