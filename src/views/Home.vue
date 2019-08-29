<template>
  <div class="home">
    首页111111111
    <button @click="btn">提示(message用法)</button>
    <button @click="btn1">警告(message用法)</button>
  </div>
</template>

<script>

export default {
  name: 'home',
  methods: {
    btn () {
      this.$Message.info({
        data: 1
      })
    },
    btn1 () {
      this.$Message.warn({
        data: 1
      })
    }
  }
}
</script>
