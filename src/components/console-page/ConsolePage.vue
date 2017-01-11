<template>
  <div class="console-page">
    <console :logs="logs"></console>
  </div>
</template>

<script type="text/babel">
  import Console from '../console/Console.vue'
  import moment from 'moment'
  import ConsoleService from '../../services/ConsoleService'
  export default {
    data () {
      return {
        logs: []
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
      handleMessage (data) {
        if (!data.Time) {
          data.Time = moment()
        }
        this.logs.push(data)
      }
    },
    components: {
      Console
    }
  }
</script>
