<template>
  <div>
    <sg-form :model="form" :rules="rules" ref="form">
      <sg-formItem label='测试' prop='username'>
        <sg-input type="text" value=""></sg-input>
      </sg-formItem>
      <sg-formItem label='test' prop='password'>
        <sg-input type="text" value=""></sg-input>
      </sg-formItem>
      <button @click="validate">确认提交</button>
    </sg-form>
  </div>
</template>

<script>
export default {
  data () {
    const a = (rule, value, cb) => {
      // console.log('value', value)
      if (value.length === 2) {
        cb('123')
      } else {
        cb()
      }
    }
    const b = (rule, value, cb) => {
      // console.log('value', value)
      if (value.length === 2) {
        cb('嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻')
      } else {
        cb()
      }
    }
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { validator: b, trigger: 'change' }
        ],
        password: [
          { validator: a, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    validate () {
      this.$refs.form.validator((valid, data) => {
        if (valid) {
          console.log('yes', data)
        } else {
          console.log('no', data)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
