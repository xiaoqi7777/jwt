import { Message } from './components/message'
import Cascader from './components/cascader/cascader.vue'
import DatePicker from './components/DatePicker/DatePicker.vue'
import { form, formItem, input } from './components/form'
// 防止用户多次use
let _Vue = null
export default {
  install (Vue, options) {
    Vue.component('sg-cascader', Cascader)
    Vue.component('sg-catePicker', DatePicker)
    Vue.component('sg-cascader', Cascader)
    Vue.component('sg-input', input)
    Vue.component('sg-form', form)
    Vue.component('sg-formItem', formItem)

    if (!_Vue) {
      _Vue = Vue
      Vue.prototype.$Message = Message
    }
  }
}

export { Message }
