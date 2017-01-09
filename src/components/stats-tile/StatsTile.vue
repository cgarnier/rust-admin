<template>
  <div class="stats-tile">
    <span class="name">{{name}}</span>
    <span class="value">{{value}}</span>
  </div>
</template>
<script type="text/babel">
  import './stats-tile.scss'
  export default {
    props: ['name', 'value']
  }
</script>
