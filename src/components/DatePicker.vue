<template>
  <div>
    <div class="ui-datepicker-warpper">
      <div class="ui-datepicker-header">
        <a href="#" class="ui-datepicker-btn ui-datepicker-pre-btn">&lt;</a>
        <a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>
        <span class="ui-datepicker-curr-month">2016-12</span>
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
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
            <tr>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
            </tr>
            <tr>
              <td>15</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
              <td>20</td>
              <td>21</td>
            </tr>
            <tr>
              <td>22</td>
              <td>23</td>
              <td>24</td>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
            </tr>
            <tr>
              <td>29</td>
              <td>30</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatePicker'
}
</script>

<style lang="stylus" scoped>
  .ui-datepicker-warpper
    width 240px
    font-size 14px
    color #666
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
</style>
