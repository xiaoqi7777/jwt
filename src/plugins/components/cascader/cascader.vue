<template>
  <div v-click-outside="close">
    parent
    <div class="top" @click="btn">
      {{rs}}
    </div>
    <div v-if="isShow">
      <CascaderItem :option='option' :level='0' :value='value' @change="change" ></CascaderItem>
    </div>
  </div>
</template>

<script>
import CascaderItem from './cascaderItem'
import cloneDeep from 'lodash/cloneDeep'
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
    handle (id, children) {
      let cloneValue = cloneDeep(this.option)
      // 这里考虑多层的情况 广度便利
      let stack = [...cloneValue]
      let current = null
      let index = 0
      while (current = stack[index++]) {
        if (current.id === id) {
          break
        } else {
          if (current.children) {
            stack = stack.concat(current.children)
          }
        }
      }
      // if (current) {
          current.children = children
          this.$emit('update:option', cloneValue)
        // }
    },
    change (item) {
      let { id } = item[item.length - 1]
      this.lazyload && this.lazyload(id, (data) => {
        this.handle(id, data)
      })
      this.$emit('input', item)
    }
  },
  props: {
    lazyload: {
      type: Function
    },
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
    CascaderItem
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