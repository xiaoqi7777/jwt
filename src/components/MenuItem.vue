<template>
  <div>
    <el-submenu v-if="menu.children.length" :index="menu.auth">
      <template slot="title">{{menu.name}}</template>
      <template v-for="(item,index) in menu.children">
        <MenuItem :key='index' :menu='item'></MenuItem>
      </template>
    </el-submenu>
    <el-menu-item :index="menu.auth">
      <router-link :to="{name:menu.auth}">{{menu.auth}}-{{menu.name}}</router-link>
    </el-menu-item>
</div>

</template>

<script>
export default {
  name: 'MenuItem',
  props: ['menu'],
  mounted () {
    // console.log('menu', this.menu)
  }
}
</script>

<style>

</style>