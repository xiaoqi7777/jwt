<template>
  <div class="children">
    <div class="parent">
      <div class="left" v-for="(item,index) in option" :key="index+10">
          <div @click="click(item)">
            {{item.label}}
          </div>
      </div>
    </div>
      <div class="right" v-if='lists&&lists.length'>
        <Cchildren :option="lists" @change="change" :value="value" :level='level+1'></Cchildren>
      </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Cchildren',
  data () {
    return {
      // lists: [],
      currentSelect: []
    }
  },
  computed: {
    lists () {
      // 处理点击左边的时候 把右边一个往后都干掉
      // return this.currentSelect && this.currentSelect.children
      // console.log('-------------option', this.option)
     if (this.value[this.level] && this.value[this.level].id) {
        let o = this.option.find(item => item.id === this.value[this.level].id)
        return o.children
    }
      // let rs = this.value[this.level] && this.value[this.level].children
      // console.log('rs', rs)
      // console.log('value', this.value)
      // return rs
    }
  },
  methods: {
    click (item) {
      this.currentSelect = item
      let newValue = cloneDeep(this.value)
      newValue[this.level] = item
      // 处理点击左边的时候 把右边一个往后都干掉
      newValue.splice(this.level + 1)
      this.$emit('change', newValue)
    },
    change (item) {
      this.$emit('change', item)
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
    },
    level: {
      type: Number
    }
  }
}
</script>

<style lang='scss'>
.children{
  display: flex
}
</style>