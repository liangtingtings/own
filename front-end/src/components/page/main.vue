<template>
<div>
    <div class="main_content">
        <img src="../../common/image/mainImage.png" alt="" class="main_image">
        <div class="main_content_left">
            <h1>全国计算机等级考试二级Office模考中心</h1>
            <p>全国计算机等级考试二级Office模考中心-最权威的国考计算机二级Office网站，获得最新最全题</p>
            <p style="margin-top:10px">库、最精准答案以及答案解析！</p>
            <h1 class="tips">全国计算机等级考试二级Office模考中心</h1>
            <p>国二Ms Office是考查大学生关于计算机基础知识和Ms Office2010办公软件的操作能力。</p>
            <p class="types"><span class="type">考试形式：</span><span>上机考试，120分钟。</span></p>
            <p class="types"><span class="type">考试内容：</span><span class="type_con">选择题20分（包括二级基础公共知识10分、计算机基础知识4分、Word操作</span></p>
            <p class="types"><span class="type"></span><span class="type_con">2分、Excel操作2分、PPT操作2分）；</span></p>
            <p class="types"><span class="type"></span><span class="type_con">操作题80分（Word操作30分、Excel操作30分、PPT操作20分）。</span></p>
        </div>
    </div>
    <div class="line"></div>
    <openMessageBox></openMessageBox>
</div>
</template>
<script>
import openMessageBox from '../../base/messageBox/messageBox'
export default {
  data () {
    return {}
  },
  methods: {},
  components: {
    openMessageBox
  }
}
</script>
<style scoped lang='stylus'>
@import "../../common/stylus/variable.styl"
.main_content
  min-height:320px
  width:1120px
  min-width:1120px
  margin:0 auto
  padding:0 80px
  overflow:hidden
  .main_image
    float: right
  .main_content_left
    padding:30px 0
    .tips
      margin-top:30px
    p
      font-size: $font-size-medium
      color: $color-text
    h1+p
      margin-top:18px
      height:14px
    .types
      margin-top:10px
      overflow:hidden
      height:14px
    .type
      display:inline-block
      float:left
      width:70px
      height:20px
    .type_con
      display:inline-block
      width:500px
      float:left
      line-height:15px
.content_list
  cursor: pointer
  width:278px
  height:268px
  border:1px solid #ddd
  margin: 40px 0
  padding:0 30px
  margin-right:50px
  float:left
  .list_head
    height: 79px
    line-height:80px
    border-bottom:1px solid #ddd
    font-size: $font-size-large-l
    color: $color-text-ll 
    img
      vertical-align: middle
    .question_type
      margin-left:12px
  .list_body
    margin: 18px 0 14px 0
    font-size: $font-size-medium
    color: $color-text
    .types
      margin-top:6px
      &:first-child
        margin-top:0
      .type
        display:inline-block
        float:left
        width:20px
        height:12px
  &:nth-child(1)
    &:hover
      width:276px
      height:266px
      border:2px solid #0096dc
    .list_body
      font-size: $font-size-small
  &:nth-child(2)
    &:hover
      width:276px
      height:266px
      border:2px solid #f76872
  &:nth-child(3)
    .server_list
      width:128px
      height:34px
      border:1px solid #bbb
      color: $color-text-d
      text-align:center
      line-height:36px
      float:left
      border-radius:4px
      margin-right:18px
      margin-bottom:10px
      &:nth-child(even)
        margin-right:0
      &:nth-child(5)
        margin-bottom:0
      &:nth-child(6)
        margin-bottom:0
      &:hover
        color: $color-text-f
    &:hover
      width:276px
      height:266px
      border:2px solid #f59c1f
      .server_list
        width: 126px
  &:last-child
    margin-right:0
.line
  height:1px
  background: $color-line-background
</style>