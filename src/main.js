import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

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