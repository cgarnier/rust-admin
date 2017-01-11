<template>
  <div class="map">
    <div v-if="!loading" class="map-wrapper">
      <div class="map-bg">
        <img :src="mapUri">
      </div>
    </div>
    <div v-if="loading" class="map-loading">Loading ...</div>
    <div v-if="error" class="map-error">Something goes wrong. Make sure the map is generated on playrust.io</div>
  </div>
</template>
<script type="text/babel">
  import MapService from '../../services/MapService'
  import ImagePreloader from '../../services/ImagePreloader'
  export default {
    data () {
      return {
        mapUri: null,
        loading: true,
        error: null
      }
    },
    mounted () {
      MapService.getMapUri()
        .then(uri => {
          return ImagePreloader.load(uri)
        })
        .then(uri => {
          this.loading = false
          this.mapUri = uri
        })
        .catch(err => {
          this.loading = false
          this.error = true
          console.err(err)
        })
    }
  }
</script>
