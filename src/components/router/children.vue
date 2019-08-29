<template>
  <div>
    children
    <button @click="btn">parent</button>
  </div>
</template>

<script>
export default {
  methods: {
    btn () {
      this.$router.push({
        path: '/parent'
      })
    }
  }
}
</script>

<style>

</style>