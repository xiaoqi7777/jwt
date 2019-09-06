<template>
  <div>
    h21111111111
    <div>
      <router-link :to="{path:'h2/h3'}">h3</router-link>
    </div>
    :===================>h2
    <button @click="btn">点击跳转</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    btn () {
      this.$router.push('/h2/h3/h4')
    }
  }
}
</script>

<style>

</style>