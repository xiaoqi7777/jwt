import Vue from 'vue'
import MessageComponent from './message'
let getInstance = () => {
  let vm = new Vue({
    render: (h) => h(MessageComponent)
  }).$mount('')
  document.body.appendChild(vm.$el)
  let children = vm.$children[0]
  console.log('========', children)
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

const Message = {
  info (options) {
    getInit().add(options)
  },
  wran (options) {
    getInit().add(options)
  }
}

export { Message }
