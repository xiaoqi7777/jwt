<template>
 <div v-click-outside>
   <input type="text" :value="formatDate" >
   <div  class="pannel" v-if="isVisible">
       <div class="pannel-nav">
           <span>&lt;</span>
           <span @click='prevMonth'>&lt;&lt;</span>
           <span>{{time.year}}年</span>
           <span>{{time.month}}月</span>
           <span  @click='nextMont'>&gt;&gt;</span>
           <span>&gt;</span>

       </div>
       <div class="pannel-content">
         <div class='days'>
          <!-- 把周日到周五 -->
           <span
             v-for="j in 7" :key='`_i`+j'
             class="cell"
           >
             {{weekDays[j-1]}}
           </span>
           <!-- 直接列出一个 6 * 7 一个列表 -->
           <!-- 判断是不是当月 不是当月就变灰色 -->
           <div v-for='i in 6' :key="'_a'+i">
             <span
               class="cell"
               :class="[
                 {notCuurentMonth:!isCurrentMoth(visibeDays[(i-1)*7+(j-1)])},
                 {today:isToday(visibeDays[(i-1)*7+(j-1)])},
                 {select:isSelect(visibeDays[(i-1)*7+(j-1)])}
               ]"
               v-for="j in 7"
               :key="'_b'+j"
               @click="chooseDate(visibeDays[(i-1)*7+(j-1)])"
               >
               {{visibeDays[(i-1)*7+(j-1)].getDate()}}
             </span>
           </div>
         </div>
       </div>
       <div class="pannel-footer">
         今天
       </div>
   </div>
 </div>
</template>

<script>
import { getYearMonthDay, getDate } from './utils'
export default {
 directives: {
   clickOutside: {// 指令的生命周期
     bind (el, bindings, vnode) {
       // 把事件绑定给document上 看一下点击的是否是当前这个元素
        let handler = (e) => {
         if (el.contains(e.target)) {
           // 判断一下是否当前面板已经显示出来了
           if (!vnode.context.isVisible) {
             vnode.context.focus()
           }
         } else {
           if (vnode.context.isVisible) {
             vnode.context.blur()
           } 
         }
       }
       el.handler = handler
       document.addEventListener('click', handler)
     }
    //  unbind () {
    //    document.removeEventListener('click', handler)
    //  }
   }
 },
 data () {
   let { year, month } = getYearMonthDay(this.value)
   return {
     weekDays: ['日', '一', '二', '三', '四', '五', '六' ],
     time: { year, month },
     isVisible: true // 这个变量是用来控制这个面板是否可见
   }
 },
 props: {
   value: {
     type: Date,
     default: () => new Date()
   }
 },
 methods: {
   focus () {
     this.isVisible = true
   },
   blur () {
     this.isVisible = false
   },
   isCurrentMoth (date) {
     // 他是不是当月 比较this.value和date 年月是否相等
     let { year, month } = getYearMonthDay(getDate(this.time.year, this.time.month, 1))
     let { year: y, month: m } = getYearMonthDay(date)
     return year === y && month === m
   },
   isToday (date) {
     let { year, month, day } = getYearMonthDay(new Date())
     let { year: y, month: m, day: d } = getYearMonthDay(date)
     return year === y && month === m && day === d
   },
   chooseDate (date) {
     this.time = getYearMonthDay(date)
     this.$emit('input', date)
     this.blur()
   },
   isSelect (date) {
     let { year, month, day } = getYearMonthDay(getDate(this.time.year, this.time.month, 1))
     let { year: y, month: m, day: d } = getYearMonthDay(date)
     return year === y && month === m && day === d
   },
   prevMonth () {
     let d = getDate(this.time.year, this.time.month, 1)
     d.setMonth(d.getMonth() - 1)
     this.time = getYearMonthDay(d)
   },
   nextMont () {
     let d = getDate(this.time.year, this.time.month, 1)
     d.setMonth(d.getMonth() + 1)
     this.time = getYearMonthDay(d)
   }
 },
 computed: {
   visibeDays () {
     // 先获取当前是周几
     console.log('=======>', this.time.month)
     let { year, month, day } = getYearMonthDay(getDate(this.time.year, this.time.month, 1))
     // 获取当前月份的第一天
     let currentFirstDay = getDate(year, month, 1)
     console.log('currentFirstDay', currentFirstDay, month)
     // 生成一个 当前 2019 8 30
     // 获取当前是周几  把天数往前移动 几天
     let week = currentFirstDay.getDay()
     // 当前开始的天数, 日期格式 和 和 数字相减得到一个毫秒戳
     let startDay = currentFirstDay - week * 60 * 60 * 1000 * 24
    console.log('week', currentFirstDay, week)
     // 循环42天
     let arr = []
     for (let i = 0; i < 42; i++) {
       // 依次循环出42天
       arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
     }
     return arr
   },
   formatDate () {
     let { year, month, day } = getYearMonthDay(this.value)
    //  console.log(year, month, day)
    //  this.visibeDays
     // getFullYear getMonth getDate
     return `${year}-${month}-${day}`
   }
 }
}
</script>
<style lang='scss'>
.pannel{
 position: absolute;
 background: #fff;
 box-shadow: 2px 2px 2px pink, -2px -2px 2px pink;
 .pannel-nav{
     height: 30px;
     display: flex;
     justify-content: space-around;
     span {
       cursor: pointer;
       user-select: none;
     }
 }
 .pannel-content{
     box-sizing: border-box;
   .cell{
     display:  inline-block;
     justify-content: center;
     align-items: center;
     width:50px;
     height: 50px;
     font-weight: bold;
     text-align: center;
     border: 2px solid #fff;
     box-sizing: border-box;
   }
   .cell:hover{
       border: 1px solid pink;
       background: pink;
     }
   .notCuurentMonth{
     color:gray
   }
   .today{
     color: #fff;
     background: red;
     border-radius: 4px;
   }
   .select{
     color: #fff;
     background: red;
     border-radius: 4px;
   }
 }
 .pannel-footer{
   height: 30px;
   text-align: center
 }

}
</style>