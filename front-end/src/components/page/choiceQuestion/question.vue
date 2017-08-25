<template>
  <div>
    
  </div>
</template>
<script>
import {getSelectData, getSelectAnswer} from '../../../api/getData.js'
export default {
  data () {
    return {
      hasAnswer: false,
      tableData: [{
        totalNumber: '1111',
        completeNumber: '111',
        wellNumber: '11',
        score: '20'
      }],
      selectData: [
        // {
        //   'num': '1',
        //   'ask': 'aaaaa',
        //   'answerA': '1111',
        //   'answerB': '2222',
        //   'answerC': '3333'
        // },
        // {
        //   'num': '2',
        //   'ask': 'bbbbb',
        //   'answerA': '1111',
        //   'answerB': '2222',
        //   'answerC': '3333'
        // }
      ],
      items: []
    }
  },
  created () {
    this._getSelectData()
  },
  mounted () {
  },
  methods: {
    change (index) {
      console.log(index)
    },
    _getSelectData () {
      var data = {'questionId': this.$route.query.id}
      getSelectData(data).then((res) => {
        const data = res.data
        var num = 0
        for (var i in data) {
          num++
          data[i]['num'] = num
        }
        this.selectData = data
      })
      getSelectAnswer(data).then((res) => {
        this.hasAnswer = true
      }).catch((err) => {
        if (err.response.status) {}
        this.hasAnswer = false
      })
    }
  },
  watch: {}
}
</script>
<style>

.el-table th{
  text-align: center;
  background:#f4f4f4;
}
.el-table--border td, .el-table--border th, .el-table td, .el-table th.is-leaf, .el-table td, .el-table th.is-leaf{
  border-color: #ddd
}
.el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
  background:#f4f4f4;
}
</style>
<style scoped lang='stylus'>
@import "../../../common/stylus/variable.styl"
.result_show
  margin-bottom:20px
  padding: 20px 30px
  box-sizing: border-box
.question_items
  width:800px
  height:auto
  float:left
  border:1px solid $color-line-background
  .question_item
    position:relative
    cursor:pointer
    margin: 30px 30px 0 30px
    padding-bottom:20px
    border-bottom:1px solid $color-line-background
    &:last-child
      border-bottom:0
    .choice_result
      position: absolute
      right:0
      top:0
      .get_score
        font-size: $font-size-medium-x
        color: $color-text-g
      .well_result
        font-size: $font-size-medium
        color: $color-text-b
        margin-top:20px
  .question_content
    margin-bottom: 20px
.el-radio-group
  margin-left: 20px
  .el-radio
    width:100%
    &+.el-radio
      margin-left:0
      margin-top:16px
  .el-radio
    font-size: $font-size-medium
    color: $color-text-d
.el-table
  text-align:center
  border: 1px solid #ddd
  th
    text-align:center
.el-table
  border-color: #ddd
  color: $color-text-d
  font-size:$font-size-medium
</style>

