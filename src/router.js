import Vue from 'vue'
import Router from 'vue-router'
import Message from './views/message.vue'
import Home from './views/Home.vue'
import Form from './views/form.vue'
import Cascader from './views/cascader.vue'
import DatePicker from './views/datePicker.vue'

import h1 from './router/h1.vue'
import h2 from './router/h2.vue'
import h3 from './router/h3.vue'
import h4 from './router/h4.vue'
import h5 from './router/h5.vue'

Vue.use(Router)

export default new Router({ // 默认导出 首页和404页面
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'h1',
      component: h1
    },
    {
      path: '/h2',
      name: 'h2',
      component: h2,
      children: [
        {
          path: 'h3',
          name: 'h3',
          component: h3,
          children: [
            {
              path: 'h4',
              name: 'h4',
              component: h4

            }
          ]
        }
      ]
    }
  ]
})

// export default new Router({ // 默认导出 首页和404页面
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/form',
//       name: 'form',
//       component: Form
//     },
//     {
//       path: '/cascader',
//       name: 'cascader',
//       component: Cascader
//     },
//     {
//       path: '/message',
//       name: 'message',
//       component: Message
//     },
//     {
//       path: '/datePicker',
//       name: 'datePicker',
//       component: DatePicker
//     },
//     {
//       path: '*',
//       component: {
//         render: h => h('h1', {}, 'Not Found')
//       }
//     }
//   ]
// })