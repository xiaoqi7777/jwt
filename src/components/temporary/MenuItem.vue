<template>
  <div>
    <el-submenu  v-if="item.children.length" :index="item.auth">
      <template slot="title">{{item.name}}</template>
          <MenuItem v-for="(m,i) in item.children" :item="m" :key="i"></MenuItem>
   </el-submenu>
    <el-menu-item :index="item.auth">
      <router-link :to="{name:item.auth}">{{item.name}}</router-link>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: ['item']
}
</script>

<style>

</style>