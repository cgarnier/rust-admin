<template>
  <div class="map-page">
    <rust-map></rust-map>
  </div>
</template>

<script type="text/babel">
  import Map from '../map/Map.vue'
  export default {
    components: {
      RustMap: Map
    }
  }
</script>
