import Vue from 'vue'
import DatePicker from './DatePicker'

let vm = new Vue({
  render: (h) => h(DatePicker)
})

document.body.appendChild(vm.$el)
