<template>
 <el-menu default-active="2" class="el-menu-vertical-demo">
  <template v-for="(item,index) in $store.state.menuList" >
    <MenuItem :key='index' :menu='item'></MenuItem>
  </template>
</el-menu>
</template>

<script>
import MenuItem from './MenuItem'
export default {
  components: {
    MenuItem
  },
  mounted () {
    setTimeout(() => {
      console.log('==', this.$store.state.menuList)
    }, 2000)
  }
}
</script>

<style>

</style>