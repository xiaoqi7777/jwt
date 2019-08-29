<template>
  <div>
    <div class="parent">
      <div class="left" v-for="(item,index) in option" :key="index+10">
          <div @click="click(item)">
            {{item.label}}
          </div>
      </div>
      <div class="right" v-if='lists&&lists.length'>
        <Cchildren :option="lists"></Cchildren>
      </div>
    </div>
  </div>
</template>

<script>
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
      return this.currentSelect && this.currentSelect.children
    }
  },
  methods: {
    click (item) {
      this.currentSelect = item
    }
  },
  props: {
    option: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>