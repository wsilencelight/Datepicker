<template>
  <div>
    <input type="text" class="datepicker-input"
    v-model="inputDate"
    @click="handleDateClick" ref="input"/>
    <div class="ui-datepicker-wrapper" v-show="datePickerShow" ref="wrapper">
      <div class="ui-datepicker-header">
        <a href="#" class="ui-datepicker-btn ui-datepicker-pre-btn"
        @click="handlePreClick">&lt;</a>
        <a href="#" class="ui-datepicker-btn ui-datepicker-next-btn"
        @click="handleNextClick">&gt;</a>
        <span class="ui-datepicker-curr-month">{{date.getYear}} - {{date.getMonth}} </span>
      </div>
      <div class="ui-datepicker-body">
        <table>
          <thead>
            <tr>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
              <th>日</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) of date.getMonthDate" :key="index">
              <td v-for="(childItem, index) of item" :key="index"
              @click="handleTdClick(childItem.date)">{{childItem.showDate}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  data () {
    return {
      date: {},
      // input框中的日期
      inputDate: '',
      datePickerShow: false
    }
  },
  created () {
    this.datePickerCircle()
  },
  mounted () {
    // 因为datepicker组件要用绝对定位以免影响到别的元素，所以要根据input的位置来计算位置
    let inputLeft = this.$refs['input'].offsetLeft
    let inputTop = this.$refs['input'].offsetTop
    let inputHeight = this.$refs['input'].offsetHeight
    this.$refs['wrapper'].style.left = inputLeft + 'px'
    this.$refs['wrapper'].style.top = inputTop + inputHeight + 'px'
  },
  methods: {
    // 将年月日显示在输入框中
    handleTdClick (date) {
      // 让Date()对象去判断日期越界,别忘了month传入也要减1
      let realdate = new Date(this.date.getYear, this.date.getMonth - 1, date)
      // 显示到输入框中
      this.inputDate = realdate.getFullYear() + '-' + (realdate.getMonth() + 1) + '-' + realdate.getDate()
    },
    // 向左切换月份
    handlePreClick () {
      // 获取未变化之前的年月
      let year = this.date.getYear
      let month = this.date.getMonth
      if (month === 1) {
        year -= 1
        month = 12
      } else {
        month -= 1
      }
      // 把之前的数据清空
      this.date = {}
      this.datePickerCircle(year, month)
    },
    // 向右切换月份
    handleNextClick () {
      // 获取未变化之前的年月
      let year = this.date.getYear
      let month = this.date.getMonth
      if (month === 12) {
        year += 1
        month = 1
      } else {
        month += 1
      }
      // 把之前的数据清空
      this.date = {}
      this.datePickerCircle(year, month)
    },
    // 点击出现datepicker
    handleDateClick () {
      this.datePickerShow = !this.datePickerShow
    },
    datePickerCircle (year, month) {
      let ret = {}
      if (!year || !month) {
        // 若是没有传参则用当日信息
        let todayFull = new Date()
        year = todayFull.getFullYear()
        // 注意月份是0-11，所以要自己+1
        month = todayFull.getMonth() + 1
      }
      // -----------------------------------------------------------------
      // 本月第一天完整数据
      let firstDateFull = new Date(year, month - 1, 1)
      // 本月第一天星期几
      let firstDay = firstDateFull.getDay()
      // 注意周日是0所以要改成7
      firstDay = firstDay === 0 ? 7 : firstDay
      // -----------------------------------------------------------------
      // 取出年月
      year = firstDateFull.getFullYear()
      month = firstDateFull.getMonth() + 1
      // -----------------------------------------------------------------
      // 上一个月最后一天完整数据,因为Date()会自动进位退位，所以0就是上月最后一天
      let lastDate0fLastMonthFull = new Date(year, month - 1, 0)
      // 上一个月最后一天日期
      let lastDateOfLastMonth = lastDate0fLastMonthFull.getDate()
      // 上一个月在这个月的占了多少位置
      let preMonthCount = firstDay - 1
      // -----------------------------------------------------------------
      // 本月最后一天完整数据,利用下个月退位完成
      let lastDateFull = new Date(year, month, 0)
      // 本月最后一天日期
      let lastDate = lastDateFull.getDate()
      // -----------------------------------------------------------------
      // 循环获取当月每一天,因为4，5，6周都有可能，暂时直接获取六周
      for (let i = 0; i < 6 * 7; i++) {
        // 因为上个月会占位置，所以需要知道当前到底是哪一天
        let currDate = i + 1 - preMonthCount
        // currDate可能为负值即上个月的日期，showDate为实际要展现的日期
        let showDate = currDate
        let thisMonth = month
        // 日期是上一个月
        if (currDate <= 0) {
          thisMonth -= 1
          showDate = lastDateOfLastMonth + currDate
        } else if (currDate > lastDate) {
          // 下一个月
          thisMonth = month + 1
          showDate = currDate - lastDate
        }
        if (thisMonth === 0) {
          // 说明是上个月12月份
          thisMonth = 12
        }
        if (thisMonth === 13) {
          // 说明是下个月一月份
          thisMonth = 1
        }
        // 为了v-for好渲染，每行都单独分开
        let num = Math.floor(i / 7)
        if (!ret[num]) {
          ret[num] = []
        }
        ret[num].push({
          month: thisMonth,
          date: currDate,
          showDate: showDate
        })
      }
      this.date.getMonthDate = ret
      this.date.getYear = year
      this.date.getMonth = month
    }
  }
}
</script>

<style lang="stylus" scoped>
  .datepicker-input
    width 230px
    padding 5px
    height 40px
    line-height 40px
    border 1px solid #cccccc
    border-radius 10px
  .datepicker-input:focus
    border 1px solid #1abc9c
    box-shadow 0 0 8px 1px #1abc9c
    outline 0 none
  .ui-datepicker-wrapper
    position absolute
    width 240px
    font-size 14px
    color #666
    z-index 2
    // box-shadow (x轴向右，y轴向下，原点在左上角) (x轴偏移值，y轴偏移值，模糊程度，阴影扩展半径，颜色，内外(inset))
    box-shadow 2px 2px 8px 2px rgba(128, 128, 128, .3)
    .ui-datepicker-header
      padding 0 20px
      height 50px
      line-height 50px
      text-align center
      background-color #f0f0f0
      border-bottom 1px solid #ccc
      font-weight bold
      .ui-datepicker-btn
        font-family serif
        font-size 20px
        height 50px
        line-height 50px
        color #1abc9c
        text-align center
        cursor pointer
        text-decoration none
      .ui-datepicker-pre-btn
        float left
      .ui-datepicker-next-btn
        float right
    .ui-datepicker-body
      table
        width 100%
        border-collapse collapse
      th,td
        height 30px
        text-align center
      th
        height 40px
        font-size 12px
        line-height 40px
      td
        border 1px solid #f0f0f0
        font-size 10px
        cursor pointer
      td:hover
        background #1abc9c
</style>
