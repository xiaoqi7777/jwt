<template>
  <div id="app">
    <!-- <router-link to="/">跳转Home</router-link> -->

    <!-- <input type="text" v-model="ts"> -->
    <!-- <Test :ts.sync='ts'></Test> -->
    <!-- <Test v-model='ts'></Test> -->
    <Cparent :option="option" v-model="value"></Cparent>
    <div>
      {{value}}
    </div>
    <!-- <Cascader :options="options" v-model="value" @input="input"></Cascader> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/profile">Profile</router-link>
    </div>-->
    <!-- <router-view/> -->
    <!-- <div> -->
      <!-- {{value}} -->
    <!-- </div> -->
  </div>
</template>

<script>
import cityList from './data.json'
import Test from './views/test'
import Cascader from './components/cascader/Cascader'
import Cparent from './components/cascader/Cparent'
const fetchData = (pid) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cityList.filter(item => item.pid == pid))
    }, 1000)
  })
}
fetchData(0).then(data => {
  console.log(data)
})
export default {
  async  mounted () {
    this.options = await fetchData(0)
  },
  methods: {
    async input (value) {
      // 这里没有给options重新赋值 而他能更新数据 因为这里的current拿到的是对象的引用地址
      let current = value[value.length - 1]
      let children = await fetchData(current.id)
      // current.children = children
      // 对象下 新的数据 实现响应式
      this.$set(current, 'children', children)
    }
  },
  data () {
    return {
      ts: 123,
      value: [],
      options: [],
      option: [
          {
              'label': '肉类',
              'children': [
                  {
                      'label': '猪肉',
                      'children': [
                          {
                              'label': '五花肉'
                          },
                          {
                              'label': '里脊肉'
                          }
                      ]
                  },
                  {
                      'label': '鸡肉',
                      'children': [
                          {
                              'label': '鸡腿'
                          },
                          {
                              'label': '鸡翅'
                          }
                      ]
                  }
              ]
          },
          {
              'label': '蔬菜',
              'children': [
                  {
                      'label': '叶菜类',
                      'children': [
                          {
                              'label': '大白菜'
                          },
                          {
                              'label': '小白菜'
                          }
                      ]
                  },
                  {
                      'label': '根茎类',
                      'children': [
                          {
                              'label': '萝卜'
                          },
                          {
                              'label': '土豆'
                          }
                      ]
                  }
              ]
          }
      ]
    }
  },
  components: {
    Cascader,
    Test,
    Cparent
  }
}
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
