<template>
  <div v-click-outside="close">
    parent
    <div class="top" @click="btn">获取的值</div>
    <div v-if="isShow">
      <Cchildren :option='option'></Cchildren>
    </div>
  </div>
</template>

<script>
import Cchildren from './Cchildren'
export default {
  data () {
    return {
      isShow: true
    }
  },

  directives: {
    clickOutside: {
      inserted (el, binding, vnode) {
        document.addEventListener('click', (e) => {
          let target = e.target
          if (target === el || el.contains(target)) {
            return false
          } else {
            binding.value()
          }
        })
      }
    }
  },
  methods: {
    btn () {
      this.isShow = !this.isShow
    },
    close () {
      this.isShow = false
    }
  },
  props: {
    option: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Cchildren
  }
}
</script>

<style lang='scss'>
.top{
  border: 1px solid red;
}
</style>