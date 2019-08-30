import Vue from 'vue'
import Router from 'vue-router'
import Message from './views/message.vue'
import Home from './views/home.vue'
import Form from './views/form.vue'
import Cascader from './views/cascader.vue'

Vue.use(Router)

export default new Router({ // 默认导出 首页和404页面
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    },
    {
      path: '/cascader',
      name: 'cascader',
      component: Cascader
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '*',
      component: {
        render: h => h('h1', {}, 'Not Found')
      }
    }
  ]
})
