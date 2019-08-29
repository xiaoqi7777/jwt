import { Message } from './components/message'
import Cascader from './components/cascader/cascader.vue'
// 防止用户多次use
let _Vue = null
export default {
  install (Vue, options) {
    Vue.component('sg-cascader', Cascader)
    if (!_Vue) {
      _Vue = Vue
      // 把Message 挂载到vue原型上
      let $Message = {}
      Object.keys(Message).forEach(type => {
        $Message[type] = Message[type]
      })
      Vue.prototype.$Message = $Message
    }
  }
}

export { Message }