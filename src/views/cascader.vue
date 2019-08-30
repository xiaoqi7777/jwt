<template>
  <div>
    <sg-cascader :option.sync="options" v-model="value"  :lazyload="lazyload"></sg-cascader>
  </div>
</template>

<script>
import cityList from '../data.json'
const fetchData = (pid) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cityList.filter(item => item.pid == pid))
    }, 100)
  })
}

export default {
  async  mounted () {
    this.options = await fetchData(0)
  },
  methods: {
    btn () {
      this.$Message.info({
        data: 1
      })
    },
    async lazyload (id, cb) {
      let rs = await fetchData(id)
      cb(rs)
    },
    async input (value) {
      // 这里没有给options重新赋值 而他能更新数据 因为这里的current拿到的是对象的引用地址
      let current = value[value.length - 1]
      let children = await fetchData(current.id)
      // current.children = children
      // this.options['children'] = current

      // 对象下 新的数据 实现响应式
      this.$set(current, 'children', children)
    }
  },
  data () {
    return {
      value: [],
      options: []
    }
  }

}
</script>

<style>

</style>