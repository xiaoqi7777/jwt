<template>
  <div>
    <sg-catePicker v-model="now" @input='btn'></sg-catePicker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      now: new Date()
    }
  },
  methods: {
    btn (value) {
      console.log('value', value)
    }
  }
}
</script>

<style>

</style>