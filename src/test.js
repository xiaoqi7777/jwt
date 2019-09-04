class ShareData {

}

ShareData.install = (_Vue) => {
  _Vue.mixin({
    beforeCreate () {
      if (this.$options && this.$options.dataInfo) {
        this.$dataInfo = this.$options.dataInfo
      } else {
        this.$dataInfo = this.$parent && this.$parent.$dataInfo
      }
    }
  })
}

export default ShareData