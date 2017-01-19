<template>
  <div class="stats-tile">
    <div class="inner">
      <h3 class="value">{{value}}</h3>
      <p class="name">{{name}}</p>
    </div>
    <div class="icon">
      <i v-if="icon" :class="icon"></i>
    </div>
  </div>
</template>
<script type="text/babel">
  import './stats-tile.scss'
  export default {
    props: ['name', 'value', 'icon']
  }
</script>
