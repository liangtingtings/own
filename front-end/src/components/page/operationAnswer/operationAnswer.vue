<template>
    <div>
      <!--<div>
        <div><a href="javascript:void(0)" @click="goAnchor('#anchor-'+index)" v-for="index in 20"> {{index}} </a></div>
        <div :id="'anchor-'+index" class="item" v-for="index in 20">{{index}}</div>
    </div>!-->
    <div class="black">
      <img src="../../../common/image/main.png" alt="">
      <span class="first_class" @click="gomain">首页</span>&nbsp;&gt;
      <span class="second_class" @click="backselect">第{{questionid}}套操作题</span>&nbsp;&gt;
      <span class="third_class">第{{questionid}}套操作题解析</span>
    </div>
    <div class="question_answer">
      <nav-bar :lockstate="lockstatus"></nav-bar>
      <div class="question_items" >
        <div class="question_item d_jump"  v-for="(item,index) in operationData">
            <h4 class="question_content">
              <span>文字处理题</span>
              <a target="_black" :href="item.modelUrl">
                <span class="download">
                  <img src="../../../common/image/download.png" alt="" class="load_img"> 素材下载
                </span>
              </a>
            </h4>
            <div class="question_intro" v-html="item.ask">{{item.ask}}</div>
            <h4 class="question_content question_answera">
              <span class="answers">答案以及得分点</span>
              <a target="_black" :href="item.answerUrl">
                <span class="download">
                  <img src="../../../common/image/download.png" alt="" class="load_img"> 答案下载
                </span>
              </a>
               <img :src="item.analysisUrl" alt="">
               <img :src="item.scoringUrl" alt="">
            </h4>
        </div>
        <div class="question_item d_jump" v-for="(item,index) in operationData1">
            <h2 class="question_content">
              <span>电子表格题</span>
              <a target="_black" :href="item.modelUrl">
                <span class="download">
                  <img src="../../../common/image/download.png" alt="" class="load_img"> 素材下载
                </span>
              </a>
            </h2>
            <div class="question_intro" v-html="item.ask">{{item.ask}}</div>
            <h4 class="question_content question_answera">
              <span class="answers">答案以及得分点</span>
              <a target="_black" :href="item.answerUrl">
                <span class="download">
                  <img src="../../../common/image/download.png" alt="" class="load_img"> 答案下载
                </span>
              </a>
              <img :src="item.analysisUrl" alt="">
               <img :src="item.scoringUrl" alt="">
            </h4>
        </div>
        <div class="question_item d_jump" v-for="(item,index) in operationData2">
            <h2 class="question_content">
              <span >演示文稿题</span>
              <a target="_black" :href="item.modelUrl">
                <span class="download">
                  <img src="../../../common/image/download.png" alt="" class="load_img"> 素材下载
                </span>
              </a>
            </h2>
            <div class="question_intro" v-html="item.ask">{{item.ask}}</div>
            <h4 class="question_content question_answera">
              <span class="answers">答案以及得分点</span>
              <a target="_black" :href="item.answerUrl">
                <span class="download">
                  <img src="../../../common/image/download.png" alt="" class="load_img"> 答案下载
                </span>
              </a>
               <img :src="item.analysisUrl" alt="">
               <img :src="item.scoringUrl" alt="">
            </h4>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import navBar from './navBar'
import {getOperaAnswer} from '../../../api/getData.js'
export default {
  data () {
    return {
      aa: '<p>asdfasdf</p><img src="../../../common/image/download.png">',
      questionid: '',
      lockstatus: '',
      operationData: [],  // 操作题文字题显示数组
      operationData1: [],
      operationData2: []
    }
  },
  created () {
    this._getData()
  },
  components: {
    navBar
  },
  methods: {
    _getData () {
      var data = {}
      data['index'] = this.$route.query.id
      this.questionid = this.$route.query.id
      getOperaAnswer(data).then((res) => {
        console.log(res)
        this.operationData.push(res.word)
        this.operationData1.push(res.excel)
        this.operationData2.push(res.ppt)
        console.log(document.getElementsByTagName('img'))
        // var img = document.getElementsByTagName('img')
        // for (var i = 0; i < img.length; i++) {
        //   var imgSrc = require(img[i].src)
        //   document.replace(img[i], imgSrc)
        // }
      })
    },
    backselect () {
      this.$router.push('/operationQuestion?id=' + this.$route.query.id)
    },
    gomain () {
      this.$router.push('/home')
    }
  //  goAnchor (selector) {
  //    var anchor = this.$el.querySelector(selector)
  //    document.body.scrollTop = anchor.offsetTop
  //  }
  }
}
</script>
<style scoped lang='stylus' rel="stylesheet/stylus">
@import "../../../common/stylus/variable.styl"
.question_answera
  margin-top:15px
.black
  height: 40px
  width:1120px
  margin:0 auto
  line-height:40px
  span
   font-size:14px
   color:#353535
  .first_class, .second_class
    cursor:pointer
.question_answer
  width:1120px
  padding: 0 80px
  overflow:hidden
  margin:0 auto
  position:relative
.question_items
  width:800px
  height:auto
  float:left
  border:1px solid $color-line-background
  .question_item
    position:relative
    cursor:pointer
    margin: 30px 30px 0 30px
    padding-bottom:24px
    border-bottom:1px solid $color-line-background
    &:last-child
      border-bottom:0
      padding-bottom: 30px
  .question_number
    padding: 20px
    li
      span
        display:inline-block
        width:238px
        height:34px
        line-height:34px
        text-align:center
        border:1px solid $color-border-background
        border-radius:4px
        color: $color-text-d
        font-size: $font-size-medium
        margin-right:11px
        margin-bottom:16px
        cursor:pointer
        &:nth-child(6n)
          margin-right:0
        &:hover
          border-color: $color-backgrond-o
          color: $color-backgrond-o
  .question_content
    margin-bottom: 16px
  .question_intro
    color: $color-text
    font-size: $font-size-medium
    line-height:23px
.download
  float:right
  font-size:13px
  color:#999
.load_img
  width:12px
  height:12px
  vertical-align:middle
  margin-top:-1px
</style>