<template>
  <div class="login-form">
    <form @submit.prevent="login" class="text-center">
      <input v-model="address" type="text" name="address" placeholder="Rcon address">
      <input v-model="password" type="password" name="address" placeholder="Rcon password">
      <button class="button" type="submit">Login</button>
    </form>
  </div>
</template>

<script type="text/babel">
  import './login.scss'
  export default {
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
