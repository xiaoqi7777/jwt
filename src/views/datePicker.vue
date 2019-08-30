<template>
  <div>
    <sg-catePicker v-model="now"></sg-catePicker>
  </div>
</template>

<script>
export default {
data () {
  return {
    now: new Date()
  }
}
}
</script>

<style>

</style>