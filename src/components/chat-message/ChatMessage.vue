<template>
  <div class="chat-message">
    <span class="message" v-html="compiledMessage"></span>
    <div class="chat-warning"><i class="warning ion-alert-circled" v-if="parseFailed" v-tooltip="'Original message: ' + escape(message)"></i></div>
  </div>
</template>
<script type="text/babel">
  import parser from 'unity-richtext-parser'
  import sanitize from 'sanitize-html'
  import escape from 'escape-html'
  import './chat-message.scss'
  export default {
    props: ['message', 'richText'],
    data () {
      return {
        parseFailed: false
      }
    },
    methods: {
      escape (s) {
        return escape(s)
      }
    },
    computed: {
      compiledMessage () {
        if (!this.richText) {
          return this.escape(this.message)
        }
        let compiled = ''
        try {
          compiled = parser.parse(this.message)
        } catch (e) {
          console.log('Cant parse message', this.message)
          this.parseFailed = true
          compiled = this.message
        }
        // this.compiledMessage = compiled

        return sanitize(compiled, {
          allowedTags: ['i', 'b', 'span'],
          allowedAttributes: {
            span: ['style']
          }
        })
      }
    },
    mounted () {

    }
  }
</script>
