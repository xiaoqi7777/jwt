<template>
  <div class="message">
    <div v-for="(message,index) in messages" :key="index">
        {{message.data}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messages: [],
      id: 0
    }
  },
  methods: {
    add (options) {
      let data = { ...options }
      data.id = this.id++
      this.messages.push(data)
      // 等2秒后清楚刚才的数据
      data.timer = setTimeout(() => {
          this.del(data)
      }, 2000)
    },
    del (data) {
      this.messages = this.messages.filter(item => item.id !== data.id)
    }
  }
}
</script>

<style>

</style>