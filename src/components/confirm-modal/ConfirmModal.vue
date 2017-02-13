<template>
  <div class="reveal-overlay" style="display: block">
    <div class="reveal" style="display: block">
      <slot></slot>
      <button class="close-button" type="button" @click="cancel">
        X
      </button>
      <div class="control text-center">
        <button class="button success" @click="confirm">Confirm</button>
        <button class="button" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    props: {
      payload: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      confirm () {
        this.$emit('confirm', this.payload)
      },
      cancel () {
        this.$emit('cancel', this.payload)
      }
    }
  }
</script>
