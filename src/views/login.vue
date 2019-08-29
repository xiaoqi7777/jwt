<template>
  <div class="home">
    login
    <input v-model="user">
    <button @click='btn'>登录</button>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      user: ''
    }
  },
  methods: {
    btn () {
      this.$store.dispatch('login', this.user).then(() => {
        this.$router.push('/profile')
      })
    }
  }
}
</script>
