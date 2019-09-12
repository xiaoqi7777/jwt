import axios from 'axios'

class AjaxRequest {
  constructor () {
    this.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/'
    // this.baseURL = 'http://localhost:3000'
    this.timeout = 2000
  }

  request (config) { // 设置请求的方法
    const instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout
    })
    // 设置拦截
    instance.interceptors.request.use(config => {
      config.headers.Authorization = `${localStorage.getItem('token')}`
      return config
    }, (err) => {
      Promise.reject(err)
    })
    // 设置响应拦截
    instance.interceptors.response.use(res => res.data, err => Promise.reject(err))
    return instance(config)
  }
}

export default new AjaxRequest()