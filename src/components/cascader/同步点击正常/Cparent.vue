<template>
  <div v-click-outside="close">
    parent
    <div class="top" @click="btn">
      {{rs}}
    </div>
    <div v-if="isShow">
      <Cchildren :option='option' :level='0' :value='value' @change="change" ></Cchildren>
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
  computed: {
    rs () {
      // console.log('this.value', this.value)
      return this.value.map(item => item.label).join('/')
    }
  },
  methods: {
    btn () {
      this.isShow = !this.isShow
    },
    close () {
      this.isShow = false
    },
    change (item) {
      console.log(item)
      this.$emit('input', item)
    }
  },
  props: {
    option: {
      type: Array,
      default: () => []
    },
    value: {
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
  height: 2rem;
  line-height: 2;
  padding-left: 5px;
}
</style>