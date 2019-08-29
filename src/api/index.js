import axios from './AjaxRequest'

export const getTest = () => axios.request({ method: 'get', url: '/test' })
    // export const getTest = () => axios.request({ methods: 'get' ,url:'/test'})
export const login = (username) => axios.request({ method: 'POST', url: '/login', data: { username } })
export const validate = () => axios.request({ method: 'get', url: '/validate' })
export default axios