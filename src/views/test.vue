<template>
  <div>
    ==>{{value}}
    <br/>
    <input type="text" v-model="ss">
    <button @click="btn">点击</button>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      ss: 123
    }
  },
  methods: {
    btn () {
      this.$emit('input', this.ss)
    }
  }
}
</script>

<style>

</style>