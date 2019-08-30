import Vue from 'vue'
import Vuex from 'vuex'
import Axios, { login, validate } from './api/index'
import { authRoutes } from './router'
Vue.use(Vuex)

const getTreeList = (menuList) => {
  let routeMap = []
  let menu = []
  let auths = []
  // 确保pid顺序是从小到大 方便下面的数据映射
  menuList.sort((a, b) => a.pid - b.pid)
  menuList.forEach(item => {
    auths.push(item.auth)
    item.children = []
    routeMap[item.id] = item
    if (item.pid === -1) { // 是根节点
      menu.push(item)
    } else {
      if (routeMap[item.pid]) {
      routeMap[item.pid].children.push(item)
      }
    }
  })
  return { auths, menu }
}
const formatList = (authRoutes, auths) => {
  // console.log('authRoutes', authRoutes)
  return authRoutes.filter(route => {
    if (auths.includes(route.name)) {
      if (route.children) {
        route.children = formatList(route.children, auths)
      }
      return true
    }
  })
}
// hasPermission 权限相关的
export default new Vuex.Store({
    state: {
        hasPermission: false,
        menuList: []
    },
    mutations: {
        setMenuList (state, menu) {
          state.menuList = menu
        },
        setPermission (state) {
          state.hasPermission = true
        }
    },
    actions: {
      // 发起请求,请求后端数据
      async getNewRoute ({ commit, dispatch }) {
        // 获取权限
        let { menuList } = await Axios.request('/roleAuth')
        // 需要把后端的数据扁平化
        let { auths, menu } = getTreeList(menuList)
        commit('setMenuList', menu)
        let registerRoutes = formatList(authRoutes, auths)
        console.log('needRoutes', registerRoutes, menu)
        commit('setPermission')
        return registerRoutes
      }
    }
})