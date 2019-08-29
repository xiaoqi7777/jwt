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
    // id 是当前点击的dom
    // 在option 里面去找匹配的值,然后获取的children赋值进去
    handle (id, children) {
      let cloneOptions = cloneDeep(this.option)
            // 遍历 树可以采用深度 或者广度
            // 去树中如何找到当前id 为这一项的那个人
            let stack = [...cloneOptions]
            let index = 0
            let current
            while (current = stack[index++]) { // 广度遍历
                if (current.id !== id) {
                    if (current.children) {
                        stack = stack.concat(current.children)
                    }
                } else {
                    break
                }
            }
            if (current) { // 动态的数据加载好后 传递给父亲
                current.children = children // 动态的添加儿子节点
                this.$emit('update:options', cloneOptions)
            }
      // let cloneValue = cloneDeep(this.option)
      // console.log('cloneValue', cloneValue, id, children)
      // cloneValue = cloneValue.map(item => {
      //   if (item.id === id) {
      //     item['childer'] = children
      //   }
      //   return item
      // })
      // // console.log('cloneValue', cloneValue)
      // this.$emit('update:option', cloneValue)
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