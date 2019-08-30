<template>
  <div>
    <button @click='btn1'>点击</button>
    <br/>
    <button @click='btn2'>点击</button>
  </div>
</template>

<script>
export default {
  methods: {
    btn1 () {
      this.$Message({
        type: 'info',
        message: 'xxx'
      })
    },
    btn2 () {
      this.$Message({
        type: 'warn',
        message: '嗯嗯嗯嗯嗯嗯嗯嗯嗯'
      })
    }
  }
}
</script>

<style>

</style>
