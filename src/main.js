import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import message from './plugins'
import Test from './test'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// console.log('process.env.NODE_ENV', process.env.NODE_ENV)
// console.log('process.env.VUE_APP_SECRET', process.env.VUE_APP_TITLE)

// Vue.use(message)
Vue.config.productionTip = false
// Vue.use(Test)
Vue.use(ElementUI)

let dataInfo = {
  a: 1,
  b: 2
}


new Vue({
  dataInfo,
  router,
  render: h => h(App)
}).$mount('#app')