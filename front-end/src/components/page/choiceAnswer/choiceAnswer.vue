<template>
  <div>
    <div class="black">
      <img src="../../../common/image/main.png" alt="">
      <span class="first_class" @click="gomain">首页</span>&nbsp;&gt;
      <span class="second_class" @click="goBackchoice">第{{questionid}}套选择题</span>&nbsp;&gt;
      <span class="third_class">第{{questionid}}套选择题解析</span>
    </div>
    <div class="question_answer">
      <nav-bar :message="selectData"></nav-bar>
      <div class="question_items result_show" v-if="hasAnswer">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="totalNum"
            label="总体数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="answeredNum"
            label="已答数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="bestNum"
            label="最佳答案数">
          </el-table-column>
          <el-table-column
            prop="totalScore"
            label="得分">
          </el-table-column>
        </el-table>
      </div>
      <div class="question_items d_jump" :model="selectData" v-for="(item,index) in selectData">
          <div class="question_item">
              <h4 class="question_content"><span class="questionNum">{{index+1}}</span>.&nbsp;&nbsp;【<span class="question_score">1</span>分】&nbsp;&nbsp;<span class="title">{{item.ask}}</span></h4>
              <div class="choice_result">
                <p class="get_score">得分：<span>{{item.score}}</span>分</p>
                <p class="well_result">最优答案：<span>{{item.bestOption}}</span></p>
              </div>
              <el-radio-group v-model="item.check" @change = 'change(index)'>
                <el-radio class="radio" label="A">A.{{item.answerA}}</el-radio>
                <el-radio class="radio" label="B">B.{{item.answerB}}</el-radio>
                <el-radio class="radio" label="C">C.{{item.answerC}}</el-radio>
                <el-radio class="radio" label="D">D.{{item.answerD}}</el-radio>
              </el-radio-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from './navBar'
import {getSelectAnswer} from '../../../api/getData.js'
export default {
  data () {
    return {
      hasAnswer: false,
      questionid: '',  // 面包屑导航的题数
      tableData: [],
      selectData: [
        // {
        //   'num': '1',
        //   'check': '',
        //   'ask': 'aaaaa',
        //   'answerA': '1111',
        //   'answerB': '2222',
        //   'answerC': '3333'
        // },
        // {
        //   'num': '2',
        //   'check': '',
        //   'ask': 'bbbbb',
        //   'answerA': '1111',
        //   'answerB': '2222',
        //   'answerC': '3333'
        // }
      ],
      items: [],
      questionNum: '',
      step: [
        {title: '', active: '1'},
        {title: '', active: '2'},
        {title: '', active: '3'},
        {title: '', active: '3'},
        {title: '', active: '3'},
        {title: '', active: '3'},
        {title: '', active: '1'},
        {title: '', active: '2'},
        {title: '', active: '3'},
        {title: '', active: '3'},
        {title: '', active: '3'},
        {title: '', active: '3'}
      ],
      totalScore: '',
      totalNum: '',
      bestNum: '',
      answeredNum: ''
    }
  },
  components: {
    navBar
  },
  created () {
    this._getSelectData()
  },
  methods: {
    change (index) {
      console.log(index)
    },
    gomain () {
      this.$router.push('/home')
    },
    goBackchoice () {
      this.$router.push('/choiceQuestion?id=' + this.$route.query.id)
    },
    _getSelectData () {
      var data = {'questionId': this.$route.query.id}
      this.questionid = this.$route.query.id
      getSelectAnswer(data).then((res) => {
        for (var i in res.data) {
          res.data[i]['check'] = res.data[i].option
          if (!res.data[i].score) {
            res.data[i].score = 0
          } else {
            res.data[i].score = res.data[i].score / 10
          }
        }
        this.selectData = res.data
        var obj = {}
        obj['answeredNum'] = res.answeredNum
        obj['bestNum'] = res.bestNum
        obj['totalNum'] = res.totalNum
        obj['totalScore'] = res.totalScore / 10
        this.tableData.push(obj)
        this.hasAnswer = true
      }).catch((err) => {
        if (err.response.status) {}
        this.hasAnswer = false
      })
    }
  }
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
<style scoped lang='stylus' rel="stylesheet/stylus">
@import "../../../common/stylus/variable.styl"
.black
  height: 40px
  width:1120px
  margin:0 auto
  line-height:40px
  span
   font-size:14px
   color:#353535
  .second_class, .first_class
    cursor:pointer
.question_answer
  width:1120px
  padding: 0 80px
  margin:0 auto
  position:relative
  overflow:hidden
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
    width:650px
    line-height:23px
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