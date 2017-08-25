<template>
<div>
  <div class="question_mount">
    <div class="question_type">
      <img src="../../../common/image/choice.png" alt="" class="question_choice">
      <span class="question_type_mount">第{{questionNum}}套选择题</span>
    </div>
    <div class="question_number">
       <ul>
          <li>
              <span v-for="(item,index) in message" @click.(item.native)="jump(index)" :class="[item.bestOption !== item.option? 'bestchoice':'']">{{index+1}}</span>
          </li>
       </ul>
    </div>
    <div class="button_action" style="width:110px;overflow: hidden;margin: 0 auto;">
      <router-link tag="div" class="backIndex button_modal button_box" to="/home">返回首页</router-link>
    </div>
  </div>
</div>
</template>
<script>
    import {getCookie, setStore} from '../../../common/js/mUtils.js'
    import {Selectsubmit} from '../../../api/getData.js'
    import {loginUrl} from '../../../common/js/env.js'
    export default {
      props: ['message'],
      data () {
        return {
          questionNum: '',
          questionList: [],
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
          ]
        }
      },
      created () {
        console.log(this.$route.query.id)
        this.questionNum = this.$route.query.id
      },
      methods: {
        submit () {
          var questionListArr = ''
          var questionId = ''
          console.log(this.message)  // 可以拿到提交的答卷
          const questionList = this.message
          console.log(this.message)
          for (let [index, ele] of questionList.entries()) {
            console.log(index, ele.check)
            questionId = ele.questionId
            questionListArr += (index + 1) + ':' + ele.check + ','
          }
          console.log(questionListArr)  // 提交答卷
          // 提交接口调用
          var data = {}
          data['questionId'] = questionId
          data['answers'] = questionListArr
          if (!getCookie('token')) {
            setStore('select', data)
            location.href = loginUrl + '&state=select_' + questionId
            return
          }
          Selectsubmit(data).then((res) => {
            console.log(res)
            // this.$router.push('/choiceQuestion?id=' + questionId)
            location.reload()
          })
        },
        jump (index) {
        // 用 class="d_jump" 添加锚点
          let jump = document.querySelectorAll('.d_jump')
          let total = jump[index].offsetTop
          let distance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
          // 平滑滚动，时长500ms，每10ms一跳，共50跳
          let step = total / 50
          if (total > distance) {
            smoothDown()
          } else {
            let newTotal = distance - total
            step = newTotal / 50
            smoothUp()
          }
          function smoothDown () {
            if (distance < total) {
              distance += step
              document.body.scrollTop = distance
              document.documentElement.scrollTop = distance
              window.pageYOffset = distance
              setTimeout(smoothDown, 10)
            } else {
              document.body.scrollTop = total
              document.documentElement.scrollTop = total
              window.pageYOffset = total
            }
          }
          function smoothUp () {
            if (distance > total) {
              distance -= step
              document.body.scrollTop = distance
              document.documentElement.scrollTop = distance
              window.pageYOffset = distance
              setTimeout(smoothUp, 10)
            } else {
              document.body.scrollTop = total
              document.documentElement.scrollTop = total
              window.pageYOffset = total
            }
          }
        },
        Scrollon () {
          let scrollend = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
           // 586、1063分别为第二个和第三个锚点对应的距离
          if (scrollend >= 1063) {
            this.step.active = 2
          } else if (scrollend < 1063 && scrollend >= 586) {
            this.step.active = 1
          } else {
            this.step.active = 0
          }
        }
      },
      mounted: function () {
        this.$nextTick(function () {
          window.addEventListener('scroll', this.Scrollon)
        })
        console.log(this.message)
        this.questionList = this.message
      }
    }
</script>
<style>
@media (max-width: 1970px) {
  .question_mount{
    position: fixed;
    right:20%;
  }
}
@media (max-width: 1870px) {
  .question_mount{
    position: fixed;
    right:18%;
  }
}
@media (max-width: 1770px) {
  .question_mount{
    position: fixed;
    right:16%;
  }
}
@media (max-width: 1670px) {
  .question_mount{
    position: fixed;
    right:13%;
  }
}
@media (max-width: 1570px) {
  .question_mount{
    position: fixed;
    right:12%;
  }
}
@media (max-width: 1470px) {
  .question_mount{
    position: fixed;
    right:10%
  }
}
@media (max-width: 1420px) {
  .question_mount{
    position: fixed;
    right:9%
  }
}
@media (max-width: 1400px) {
  .question_mount{
    position: fixed;
    right:8%
  }
}
@media (max-width: 1370px) {
  .question_mount{
    position: fixed;
    right:7%
  }
}
@media (max-width: 1350px) {
  .question_mount{
    position: fixed;
    right:13%
  }
}
@media (max-width: 1340px) {
  .question_mount{
    position: fixed;
    right:12%
  }
}
@media (max-width: 1330px) {
  .question_mount{
    position: fixed;
    right:11%
  }
}
@media (max-width: 1320px) {
  .question_mount{
    position: fixed;
    right:10%
  }
}
@media (max-width: 1280px) {
  .question_mount{
    position: fixed;
    right:80px
  }
}
</style>
<style scoped lang='stylus' rel="stylesheet/stylus">
@import "../../../common/stylus/variable.styl"
.question_answer
  width:1120px
  padding: 0 80px
  min-height: 500px
  margin:0 auto
  position:relative
.question_mount
  width: 278px
  min-height: 200px
  border:1px solid $color-borders-background
  border-top:3px solid $color-highlight-border
  padding-bottom:24px
  .question_type
    height: 64px
    line-height:64px
    margin: 0 20px
    border-bottom: 1px solid $color-borders-background
  .question_number
    padding: 20px 20px 28px 20px
    li
      span
        display:inline-block
        width:28px
        height:28px
        line-height:30px
        text-align:center
        border:1px solid $color-border-background
        border-radius:4px
        color: $color-text-d
        font-size: $font-size-medium
        margin-right:11px
        margin-bottom:12px
        cursor:pointer
        &:nth-child(6n)
          margin-right:0
        &:hover
          border-color:$color-text-b
      .bestchoice
        background: #f23a2f
        color:#fff
  .question_choice
    width:24px
    height:24px
    vertical-align:middle
    margin-top: -1px
  .question_type_mount
    font-size: $font-size-large
    color: $color-text-m
.button_modal
  cursor:pointer
  width:108px
  height:28px
  border:1px solid transport
  text-align:center
  line-height:30px
  font-size: $font-size-medium
  border-radius:4px
  color: $color-text-d
.question_submit
  background: $color-highlight-border
  color: $color-text-f
.backIndex
  border:1px solid $color-border-background
.button_action
  padding:0 20px
.button_box
  float:left
  margin-right:20px
  &:last-child
    margin-right:0
.el-step__icon div
  width:30px
  height:30px
  border:1px solid #ddd
  margin-top:20px

</style>
