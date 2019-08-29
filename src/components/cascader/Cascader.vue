<template>
  <div v-click-outside='close'>
    <div class="trigger" @click="isVisible =!isVisible">
      {{rs}}
    </div>
    <CascaderItem v-if='isVisible' @change="change" :level='0' :value="value" :options="options"></CascaderItem>
  </div>
</template>

<script>
import CascaderItem from './CascaderItem'
export default {
  name: 'Cascader',
  data () {
    return {
      selected: [],
      isVisible: false
    }
  },
  components: {
    CascaderItem
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  directives: {
    clickOutside: {
      inserted (el, binding, vnode) {
        document.addEventListener('click', (e) => {
          if (e.target === el || el.contains(e.target)) {
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
      return this.value.map(item => item.label).join('-')
    }
  },
  methods: {
    close () {
      this.isVisible = false
    },
    change (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang='scss'>
.trigger {
  width: 150px;
  height: 25px;
  border: 1px solid #ccc;
}
.content {
  display: flex;
}
</style>