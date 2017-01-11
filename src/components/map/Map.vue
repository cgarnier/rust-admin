<template>
  <div class="map">
    <div v-if="!loading" class="map-wrapper">
      <div class="map-bg">
        <img :src="mapUri">
      </div>
    </div>
    <p v-if="seed && size">Seed: {{seed}}, size: {{size}}</p>
    <div v-if="loading" class="map-loading">Loading ...</div>
    <div v-if="error" class="map-error">
      <span>Something goes wrong. Make sure the map has already been generated on playrust.io and retry later.</span>
      <br/>
      <span><a :href="rustioUri" v-text="rustioUri" target="_blank"></a></span>
    </div>
  </div>
</template>
<script type="text/babel">
  import MapService from '../../services/MapService'
  import ImagePreloader from '../../services/ImagePreloader'
  export default {
    data () {
      return {
        size: null,
        seed: null,
        mapUri: null,
        loading: true,
        error: null
      }
    },
    computed: {
      rustioUri () {
        return `http://playrust.io/map/?Procedural%20Map_${this.size}_${this.seed}`
      }
    },
    mounted () {
      MapService.getMapInfo()
        .then(info => {
          this.size = info.size
          this.seed = info.seed
          return ImagePreloader.load(info.uri)
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
