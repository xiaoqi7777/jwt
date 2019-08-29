let Vue = ''
class Router {
  constructor ({ routes }) {
    this.routeMap = routes.reduce((memo, current) => (memo[current.path] = current.component, memo), {})
    this.route = { current: '/' }
    // 触发响应式 如果current 变化的就会触发响应式
    Vue.util.defineReactive(this, 'route', { current: '/' })
    // # /h5 api
    window.addEventListener('load', () => {
      location.hash ? '' : location.hash = '/'// 默认跳转首页
    })
    window.addEventListener('hashchange', () => {
      console.log('location.hash------------------')
      this.route.current = location.hash.slice(1)
    })
  }
}

Router.install = (_Vue) => {
  // 内部会把这个对象给每个组件的属性 混合在一起
  // 他会他mixin的beforeCreate放到数组 组件自己的beforeCreate放到数组后面 依次执行
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      // 判断关系
      if (this.$options && this.$options.router) {
        this._router = this.$options.router
        } else {
          // 让所有的子组件都有_router
          this._router = this.$parent && this.$parent._router
        }
      // console.log('--', this._router.a)
      Object.defineProperty(this, '$router', {
        value: {}
      })
      Object.defineProperty(this, '$route', {
        value: {}
      })
    }
  })
  Vue.component('router-link', {
    props: {
      to: String
    },
    render () {
      return <a href={`#${this.to}`}>{this.$slots.default}</a>
    }
  })
  Vue.component('router-view', {
    render (h) {
      console.log('this._router.routeMap[this._router.current]', this._router.routeMap[this._router.route.current])
      return h(this._router.routeMap[this._router.route.current])
    }
  })
}

export default Router
