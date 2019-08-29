import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

// 权限校验
router.beforeEach(async (to, from, next) => {
  if (!store.state.hasPermission) { // 如果没有权限
    // 获取需要添加的路由
    let newRoutes = await store.dispatch('getNewRoute')
    // 动态添加路由
    router.addRoutes(newRoutes)
    next({ ...to, replace: true })// 保证一定会跳过去
  } else {
    next()
  }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')