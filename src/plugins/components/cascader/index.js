import Vue from 'vue'
import Cascader from './cascader'

let vm = new Vue({
  render: (h) => h(Cascader)
})
document.body.appendChild(vm.$el)
