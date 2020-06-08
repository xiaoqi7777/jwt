import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector'
export function injectError () {
  // 监听全局为捕获的错误
  window.addEventListener('error', function (event) { // 错误事件对象
    let LastEvent = getLastEvent()// 最后一个交互事件
    // console.log('==>', LastEvent)
    let log = {
        kind: 'statility', // 监控指标的大类
        type: 'error', // 小类型 这是一个错误
        errorType: 'jsError', // JS执行错误
        message: event.message, // 报错信息
        filename: event.filename, // 报错信息
        position: `${event.lineno}:${event.colno}`,
        stack: getLines(event.error.stack),
        // body div# 返回选择器
        selector: LastEvent ? getSelector(LastEvent.path) : '' // 代表最后一个操作的元素
      }
    // console.log(event, log)
  }, true)
  window.addEventListener('unhandledrejection', (event) => {
    // console.log(event)
    let lastEvent = getLastEvent()// 最后一个交互事件
    let message
    let filename
    let line = 0
    let column = 0
    let stack = ''
    let reason = event.reason
    if (typeof reason === 'string') {
        message = reason
    } else if (typeof reason === 'object') { // 说明是一个错误对象
        message = reason.message
        // at http://localhost:8080/:23:38
        if (reason.stack) {
            let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
            filename = matchResult[1]
            line = matchResult[2]
            column = matchResult[3]
        }

        stack = getLines(reason.stack)
    }
    let log = {
      kind: 'stability', // 监控指标的大类
      type: 'error', // 小类型 这是一个错误
      errorType: 'promiseError', // JS执行错误
      message, // 报错信息
      filename, // 哪个文件报错了
      position: `${line}:${column}`,
      stack,
      // body div#container div.content input
      selector: lastEvent ? getSelector(lastEvent.path) : '' // 代表最后一个操作的元素
    }
    // console.log('promise', log)
  })
  function getLines (stack) {
    return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^')
  }
}