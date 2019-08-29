<template>
  <div>
    <div class="content" v-if="isVisible">
      <div class="content-left">
        <div class="label"  v-for="(item,index) in options" :key="index">
            <div @click="select(item)">{{item.label }}</div>
        </div>
      </div>
      <div class="content-right" v-if="lists && lists.length ">
          <CascaderItem :options="lists" @change="change" :level='level+1' :value='value'></CascaderItem>
      </div>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'CascaderItem',
  data () {
    return {
      // currentSelect: null,
      isVisible: true
    }
  },
  computed: {
    lists () {
      return this.value[this.level] && this.value[this.level].children
    }
  },
  props: {
    level: {
      type: Number
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    select (item) {
      let cloneValue = cloneDeep(this.value)
      cloneValue[this.level] = item
      cloneValue.splice(this.level + 1)
      console.log('select', cloneValue, this.level)
      this.$emit('change', cloneValue)
      // this.currentSelect = item
    },
    change (item) {
      console.log('1111')
      this.$emit('change', item)
    }
  }
}
</script>

<style>

</style>