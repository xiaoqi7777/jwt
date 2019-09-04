<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <div v-if="validateStatus == 'error'">
      {{validateContent}}
    </div>
    <!-- <div>校验文字</div> -->
  </div>
</template>
<script>
import Vue from 'vue'
Vue.prototype.$bus = new Vue()
export default {
  props: {
    label: String,
    prop: String
  },
  data () {
    return {
      /**
        *  当前表单是否通过校验
        */
      validateStatus: '',
      /**
       *  当前校验后的信息
       */
      validateContent: '',
      /**
       * 存放所有校验的信息
       * field 当前的prop项
       * type 校验的类型
       * isError 是否显示错误
       * content 错误提示
       */
      valiStatus: [],
      /**
       * 存放当前输入的内容
       */
      getinputData: '',
      /**
       * 当前是触发的事件
       */
      trigger: null
    }
  },
  methods: {
    handleAddValidate (type, content) {
      // 处理多次加入同一个
      for (let [i, k] of this.valiStatus.entries()) {
        if (k && (k.type === type)) {
          this.valiStatus[i].isError = true
          return
        }
      }
      this.valiStatus.push({
        field: this.prop,
        type,
        content,
        isError: true
      })
    },
    handleDelValidate (type) {
      for (let [i, k] of this.valiStatus.entries()) {
        if (k && (k.type === type)) {
          this.valiStatus.splice(i, 1)
        }
      }
    },
    handleStatus () {
      this.valiStatus.forEach(item => {
        // 处理有提示的情况
        if (item.isError) {
          this.validateStatus = 'error'
          this.validateContent = item.content
        }
      })

      // 要是没有提示 清除所有
      let isShow = this.valiStatus.some(data => {
        if (data.isError === true) {
          return true
        }
      })
      if (!isShow) {
        this.validateStatus = false
      }
    },
    validate (value) {
      // 通过inject 获取到的
      let rules = this.rules // 获取当前对应的规则
      // 收集错误信息
      rules.forEach(rule => {
        // 默认配置目前只写required 如果必填 并且没有值，那就出错
        if (rule.required) {
          if (!value) {
            this.handleAddValidate('required', rule.message)
          } else {
            this.handleDelValidate('required')
          }
        }
        // 如果是自定义配置 也就是传入 validator
        if (rule.validator) {
          // validator 就是用户自定义那个函数
          let { validator } = rule
          validator('rule', this.getinputData, (data) => {
            if (data && data.name === 'Error') {
              this.handleAddValidate('validator', data.message)
            } else if (data) {
              this.handleAddValidate('validator', data.toString())
            } else {
              this.handleDelValidate('validator')
            }
          })
        }
      })
      // 更新错误状态
      this.handleStatus()
    },
    getTriggerMethod () {
      this.trigger = this.rules && this.rules.map(item => {
        if (item.trigger === 'change') {
          item.trigger = 'input'
        }
        return item.trigger
      })
    },
    bindTrigger () {
      this.trigger && this.trigger.forEach(item => {
        this.$bus.$on(item, (data) => {
          if (this._uid === data.id) { // 说明更改的是当前自己的输入框
            this.getinputData = data.value
            this.validate(data.value)
          }
        })
      })
    }
  },
  inject: ['form'], // 注入父级的实例
  mounted () {
    // 获取多有的rules
    this.rules = this.form.rules[this.prop]
    // 获取触发的方式
    this.getTriggerMethod()
    // 绑定事件
    this.bindTrigger()
  }
}
</script>
