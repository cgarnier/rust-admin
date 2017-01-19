<template>
  <div class="chat-page">
    <chat class="full-height"></chat>
  </div>
</template>
<script type="text/babel">
  import './chat-page.scss'
  import Chat from '../chat/Chat.vue'
  export default {
    components: {
      Chat
    }
  }
</script>
