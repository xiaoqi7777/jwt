<template>
  <input type="text" :value="inputValue" @input="handleInput" @change="handleChange" @blur="handleBlur" @focus="bandleFocus" >
</template>
<script>
export default {
  props: {
    value: String
  },
  data () {
    return { inputValue: this.value }
  },
  methods: {
    handleInput (e) {
      // 更新数据
      this.inputValue = e.target.value
      this.$bus.$emit('input', {
        id: this.$parent && this.$parent._uid, // 为了标识是哪个输入框
        value: this.inputValue
      }) // 发射输入事件
    },
    handleChange (e) {
      this.inputValue = e.target.value
      this.$bus.$emit('change', {
        id: this.$parent && this.$parent._uid,
        value: this.inputValue
      })
    },
    bandleFocus (e) {
      this.inputValue = e.target.value
      this.$bus.$emit('focus', {
        id: this.$parent && this.$parent._uid,
        value: this.inputValue
      })
    },
    handleBlur (e) {
      this.inputValue = e.target.value
      this.$bus.$emit('blur', {
        id: this.$parent && this.$parent._uid,
        value: this.inputValue
      })
    }

  }
}
</script>
