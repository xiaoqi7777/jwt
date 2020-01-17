
<template>
<div>
  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  
  <div class="block sg">
    <span class="demonstration">默认</span>
    <el-date-picker
      ref='dom'
      v-model="value1"
      type="daterange"
      @focus="handleChangeProvince1"
      @change="handleChangeProvince2"
      @blur="handleChangeProvince3"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
  </div>
   <br/>  
  <br/>  
  <br/>  
 
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: ''
      };
    },
    methods:{
      handleChangeProvince1(e){
          let dom = document.querySelector('.el-picker-panel')
        if(dom){
        //  el-date-range-picker el-popper
        let top = e.$refs.reference.offsetTop
          dom.style.top = top+50+'px'
        }console.log(1)
      },
      handleChangeProvince2(e){
         let dom = document.querySelector('.el-picker-panel')
        if(dom){
        //  el-date-range-picker el-popper
        let top = e.$refs.reference.offsetTop
          dom.style.top = top+50+'px'
        } console.log(2)
      },
      handleChangeProvince3(e){
        let dom = document.querySelector('.el-picker-panel')
        if(dom){
        //  el-date-range-picker el-popper
        let top = e.$refs.reference.offsetTop
          dom.style.top = top+50+'px'
        }  console.log(3)
      }
      // handleChangeProvince(e){
        // let dom = document.querySelector('.el-picker-panel')
        // if(dom){
        // //  el-date-range-picker el-popper
        // let top = e.$refs.reference.offsetTop
        //   dom.style.top = top+50+'px'
        // }
      // }
    }
  };
</script>
<style >
</style>