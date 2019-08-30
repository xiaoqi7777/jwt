import Vue from 'vue'
import MessageComponent from './message'
let getInstance = () => {
  let vm = new Vue({
    render: (h) => h(MessageComponent)
  }).$mount('')
  document.body.appendChild(vm.$el)
  let children = vm.$children[0]
  return {
    add (options) {
      children.add(options)
    }
  }
}

// 单例
let instance
let getInit = () => {
  instance = instance || getInstance()
  return instance
}

function Message (options) {
  switch (options.type) {
    case 'info':
      getInit().add({ ...options, color: 'green' })
      break
    case 'warn':
      getInit().add({ ...options, color: 'red' })
      break
  }
}
export { Message }
