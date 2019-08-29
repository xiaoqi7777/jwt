import Vue from 'vue'
import Vuex from 'vuex'
import Axios, { login, validate } from './api/index'
import { authRoutes } from './router'
Vue.use(Vuex)

const getTreeList = (menuList) => {
  let menu = []// 用来渲染菜单的
  let routeMap = {}
  let auths = []
  menuList.forEach(m => {
    auths.push(m.auth)
    m.children = []
    routeMap[m.id] = m
    if (m.pid == -1) { // 是根节点
      menu.push(m)
    } else {
      // 找父级 将值传递进去
      if (routeMap[m.pid]) {
        routeMap[m.pid].children.push(m)
      }
    }
  })
  return { auths, menu }
}
const formatList = (authRoutes, auths) => {
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
        username: '',
        hasPermission: false,
        menuList: []
    },
    mutations: {
        setUserName (state, username) {
            state.username = username
        },
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
        let needRoutes = formatList(authRoutes, auths)
        commit('setPermission')
        return needRoutes
        // console.log('list', authRoutes, auths)
      },
      async login ({ commit }, username) {
          const r = await login(username)
          if (r.code === 1) {
              return Promise.reject(r)
          }
          localStorage.setItem('token', r.token)
          commit('setUserName', r.username)
      },
      async validate ({ commit }) {
          const r = await validate()
          if (r.code === 1) {
              return false
          }
          commit('setUserName', r.username)
          localStorage.setItem('token', r.token)
          return true
      }
    }
})