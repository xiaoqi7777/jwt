<template>
  <div :class="$style.messages">
    <div :class="$style.layout">
      <div v-for="(data,index) in messages" :key="index" :class="[$style[data.color],$style.message]">
          {{data.message}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messages: [],
      id: 0,
      isRed: null,
      isGreen: null
    }
  },
  computed: {
  },
  methods: {
    add (options) {
      let data = { ...options, id: this.id++ }
      this.messages.push(data)
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

<style module lang='scss'>
.messages{
  .layout{
    position: fixed;
    left: 50%;
    top: 50px;
    transform: translateX(-50%);
    .message{
      border: 1px solid black;
      width: 300px;
      height: 150px;
      line-height: 150px;
      text-align: center;
      margin: 10px;
    }
    .red{
      color:red
    }
    .green{
      color:green
    }
  }
}
</style>
<style  scoped>

</style>