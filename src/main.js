import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import message from './plugins'
import Test from './test'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(message)
Vue.config.productionTip = false
Vue.use(Test)
Vue.use(ElementUI)

// 权限校验
// router.beforeEach(async (to, from, next) => {
//   console.log('11111111111')
//   if (!store.state.hasPermission) { // 如果没有权限
//     // 获取需要添加的路由
//     let newRoutes = await store.dispatch('getNewRoute')
//     // 动态添加路由
//     router.addRoutes(newRoutes)
//     next({ ...to, replace: true })// 保证一定会跳过去
//   } else {
//     next()
//   }
// })

// 登录验证
router.beforeEach(async (to, from, next) => {
    if (to.path === '/') {
        next()
    }
    const flag = await store.dispatch('validate')
    // 首次没有登陆
    if (flag) {
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else {
      let flag = to.matched.some(item => item.meta.needLogin)
      console.log('========', flag)
      if (flag) {
        next('/login')
      } else {
        next()
      }
    }
})
let dataInfo = {
  a: 1,
  b: 2
}

new Vue({
  dataInfo,
    router,
    store,
    render: h => h(App)
}).$mount('#app')