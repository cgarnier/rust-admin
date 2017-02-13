<template>
  <div class="login-form">
    <form @submit.prevent="login" class="text-center">
      <input v-model="address" type="text" name="address" placeholder="Rcon address">
      <input v-model="password" type="password" name="address" placeholder="Rcon password">
      <button class="button" type="submit">Login</button>
    </form>
    <div v-if="error" class="errors">
      <div class="callout alert">
        <h5>Login error</h5>
        <p>Something went wrong while connecting to the server. Make sure the address/password combination is correct</p>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import './login.scss'
  export default {
    props: {
      error: {
        type: Boolean,
        default: () => false
      }
    },
    data () {
      return {
        address: '',
        password: ''
      }
    },
    methods: {
      login () {
        this.$emit('login', {address: this.address, password: this.password})
      }
    }
  }
</script>
