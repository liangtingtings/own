<template scoped="scoped">
<div>
<div class="main_content">
  <div class="content_list"  @click="questionShow('select')">
      <div class="list_head">
            <img src="../../common/image/choice.png" alt="">
            <span class="question_type">选择题题库</span>
      </div>
      <div class="list_body">
        <p class="types"><span class="type_con">1套选择题20分具体内容包括：</span></p>
        <p class="types"><span class="type">一、</span><span>公共基础知识：10道题10分</span></p>
        <p class="types"><span class="type"></span><span>数据结构：4道题4分；程序设计软件工程：3道</span></p>
        <p class="types"><span class="type"></span><span>题3分；数据库：3道题3分</span></p>
        <p class="types"><span class="type">二、</span><span>计算机基础知识：3道题3分</span></p>
        <p class="types"><span class="type">三、</span><span>Office操作选择题：6道题6分</span></p>
        <p class="types"><span class="type"></span><span>Word操作选择题：2道题2分</span></p>
        <p class="types"><span class="type"></span><span>Excel操作选择题：2道题2分</span></p>
        <p class="types"><span class="type"></span><span>PPT操作选择题：2道题2分</span></p>
      </div>
  </div>
  <div class="content_list"  @click="questionShow('action')">
      <div class="list_head">
          <img src="../../common/image/actionQuestion.png" alt="">
          <span class="question_type">操作题题库</span>
      </div>
      <div class="list_body">
          <p class="types"><span class="type_con">1套操作题在二级Office考试中为3道大题，</span></p>
          <p class="types"><span class="type_con">占80分。具体内容包括：</span></p>
          <p class="types"><span class="type">一、</span><span>字处理器（Word操作题）：1道题30分</span></p>
          <p class="types"><span class="type">二、</span><span>电子表格题（Word操作题）：1道题30</span></p>
          <p class="types"><span class="type"></span><span>分</span></p>
          <p class="types"><span class="type">三、</span><span>演示文稿题（PPT操作题）：1道题20分</span></p>
      </div>
  </div>
  <div class="content_list">
      <div class="list_head">
          <img src="../../common/image/server.png" alt="">
          <span class="question_type">考生服务</span>
      </div>
      <div class="list_body">
          <a v-for="item in serverList" target="_black" :href="item.link" class="server_list">{{item.title}}</a>
      </div>
  </div>
</div>
<el-dialog title="" :visible.sync="dialogTableVisible" customClass = 'question_cate'>
    <el-tabs type="border-card" :active-name="activeName">
      <el-tab-pane label="选择题" name="select">
        <ul class="question_list">
          <li v-for="(item, index) in selectList">
              <span :class="[item.state=='DOWN'? 'downquestion' : '', 'question']">第<span>{{index+1}}</span>套选择题</span>
              <span class="free">免费</span>
              <a href="javascript:;" class="start_question select_start" :id="index+1" @click="startQuestion(index+1,item.state)">开始做题</a>
              
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="操作题" name="operation">
        <div class="new_tips">
          <span class="new_tips_title">(新用户注册时候输入您分享的邀请码，可各自免费激活一套操作题答案)</span><span class="inviteCodes" v-show="hasToken" @click="inviteVisiable = true">我的邀请码</span>
        </div>
        <ul class="question_list">
          <li v-for="(item,index) in operationList">
              <span :class="[item.status=='DOWN'? 'downquestion' : '', 'question']" >第<span>{{index+1}}</span>套操作题</span>
              <span  v-show="hasToken" class="free">{{item.comment}}</span>
              <a href="javascript:;" v-show="hasToken" :class="[item.state === '激活答案'? 'buttonState' : '', 'start_question']" :id="index+1" @click="operate((index+1),(item.state))">{{item.state}}<img v-if="item.status=='UNLOCK'" src="../../common/image/new.png" class="new" style=""></img></a>
              <a href="javascript:;" class="start_question" :id="index+1" v-if="hasToken==false && index <= 1" @click="startQuestion1(index+1)">开始做题</a>
              <a href="javascript:;" class="start_question" :id="index+1" v-if="hasToken==false && index > 1" @click="startQuestion1(index+1)">登录并查看</a>
              <a href="javascript:;" class="start_question" :id="index+1" v-if="hasToken==true" @click="startQuestion1(index+1)">开始做题</a>
          </li>
        </ul>
      </el-tab-pane>
  </el-tabs>
</el-dialog>
<el-dialog
    :visible.sync="yhVisiable"
    size="tiny"
    custom-class="active_dialog"
    >
    <span class="active_content">{{discountInfo}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="yhVisiable = false">取 消</el-button>
      <el-button type="primary" @click="yh_btn" :id="index">确 认</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title=""
    :visible.sync="inviteVisiable"
    size="tiny"
    >
    <span class="invite_title">您的邀请码是：<span class="invite_codes">{{inviteCode}}</span></span>
    <p class="invite_intro">新用户通过邀请码注册，邀请人和被邀请人均可免费获得一套真题及解析。<br>网址：www.msoffice100.com</p>
    <div class="invite_button" @click="inviteVisiable = false">确 定</div>
    </el-dialog>
</div>
</template>
<script>
import {getAction, getSelect, unlock} from '../../api/getData.js'
import {getCookie, getStore} from '../../common/js/mUtils.js'
import {loginUrl} from '../../common/js/env.js'
export default {
  data () {
    return {
      activeName: 'operation',
      startAction: '',
      start: '',
      inviteVisiable: false,
      index: '',
      discountInfo: '',
      yhVisiable: false,
      serverList: [
        {
          title: '证书查询',
          link: 'http://zscx.neea.edu.cn/html1/folder/1508/211-1.htm?sid=300'
        },
        {
          title: '补办合格证明',
          link: 'http://bbhgzm.neea.edu.cn'
        },
        {
          title: '成绩查询',
          link: 'http://cjcx.neea.edu.cn/html1/folder/1508/206-1.htm?sid=300'
        },
        {
          title: '承办机构',
          link: 'http://www.ncre.cn/html1/folder/1511/435-1.htm'
        },
        {
          title: '成绩分析报告',
          link: 'http://www.ncre.cn/html1/folder/1509/36-1.htm'
        },
        {
          title: '证书直邮',
          link: 'http://zszy.neea.edu.cn'
        }
      ],
      dialogTableVisible: false,
      operationList: [],
      selectList: [],
      hasToken: false,
      status: false,
      inviteCode: ''
    }
  },
  mounted () {
    this._getOperationList()
    this.inviteCode = JSON.parse(getStore('userinfo')).inviteCode
  },
  methods: {
    questionShow (type) {
      this.dialogTableVisible = true
      if (type === 'select') {
        this.activeName = 'select'
      } else {
        this.activeName = 'operation'
      }
    },
    _getOperationList () {
      if (getCookie('token')) {
        this.hasToken = true
      } else {
        this.hasToken = false
      }
      getAction().then((res) => {
        var arr = []
        var data = res.data
        for (var i in data) {
          if (data[i].status === 'LOCK') {
            data[i]['state'] = '激活答案'
          } else if (data[i].status === 'UNLOCK') {
            data[i]['state'] = '查看答案'
          } else if (data[i].status === 'DOWN') {
            data[i]['state'] = '查看答案'
          }
          arr.push({
            status: data[i].status,
            state: data[i].state,
            comment: data[i].comment
          })
        }
        this.operationList = arr
      })
      getSelect().then((res) => {
        var arr = []
        var data = res.data
        for (var i in data) {
          arr.push({
            state: data[i]
          })
        }
        this.selectList = arr
        console.log(this.selectList)
      })
    },
    operate (id, ele) {
      if (ele === '激活答案') {
        this.yhVisiable = true
        this.index = id
        if (JSON.parse(getStore('userinfo')).ticketNum > 0) {
          this.discountInfo = '您有' + JSON.parse(getStore('userinfo')).ticketNum + '张激活券，确认要激活该套题目的详细解析么？'
        } else {
          this.discountInfo = '您目前没有激活券，立即充值购买么?'
        }
      } else if (ele === '查看答案') {
        this.$router.push('/operationAnswer?id=' + id)
      }
    },
    yh_btn () {
      if (JSON.parse(getStore('userinfo')).ticketNum > 0) {
        var data = {}
        data['index'] = this.index
        console.log(data)
        unlock(data).then((res) => {
          this.yhVisiable = false
          this._getOperationList()
        })
      } else {
        this.$router.push('/payment')
      }
    },
    startQuestion (id, status) {
      if (status === 'DOWN') {    // 判断选择题是down 跳至选择题结果页
        this.$router.push('/choiceAnswer?id=' + id)
      } else {
        this.$router.push('/choiceQuestion?id=' + id)
      }
    },
    startQuestion1 (id) {
      if (!getCookie('token')) {
        if (id > 2) {
          location.href = loginUrl + '&state=mainQuestion'
          return
        } else {
          this.$router.push('/operationQuestion?id=' + id)
        }
      } else {
        this.$router.push('/operationQuestion?id=' + id)
      }
    }
  }
}
</script>
<style scoped lang='stylus'>
@import "../../common/stylus/variable.styl"
.new_tips
  height: 40px
  line-height:40px
  padding: 0 20px
  .new_tips_title 
    font-size:$font-size-small-l
    color: $color-text-h
  .inviteCodes
    float:right
    font-size:$font-size-small-l
    color: #03468c
    cursor:pointer
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
.question_list
  padding:0 20px
  height:360px
  overflow:scroll
  li
    overflow:hidden
    height:48px
    line-height:48px
    border-bottom:1px solid #ddd
    .question
      color: $color-text-d
      font-size: $font-size-medium-x
    .downquestion
      color:#ccc
    .free
      display:block
      font-size: $font-size-medium
      color: $color-text-r
      float:right
      margin-left:10px
      min-width:70px
      width:70px
      height:48px
      text-align:right
.new
  position:absolute
  top:-10px
  right:-10px
.start_question
  width:80px
  height:22px
  text-align:center
  line-height:24px
  border:1px solid $color-border-background
  float:right
  margin-top:12px
  border-radius:4px
  font-size: $font-size-medium
  color: $color-text-d
  margin-left:20px
  position:relative
  &:hover
    color:$color-text-f
    background: $color-highlight-background
.buttonState
  border-color: #f23a2f
  color: #f23a2f
  &:hover
    background: #fff 
    color:#f23a2f
.active_content
  font-size:18px
  color:#000
  display:inline-block
  padding: 0 10px
  line-height:23px
.active_dialog
  position:relative
.invite_title
  padding:0 0 16px 0
  color: $color-text-ll
  font-size: $font-size-large
  display:block
  border-bottom:1px solid #ddd
  margin: 0 auto
  margin: 0 10px
.invite_intro
  padding: 16px 10px 0 10px
  font-size: $font-size-medium-x
  color: $color-text
  line-height:25px
</style>
<style>

.el-tabs__nav{
  width:100%;
}
.question_cate {
  width:600px;
  height:530px;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item{
  width:51%;
  text-align:center;
  font-size:18px
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  background:#0dace6;
  color:#fff;
  border-left-color: #0dace6;
}
.el-tabs__item{
  height:60px;
  line-height:60px
}
.el-tabs--border-card>.el-tabs__content{
  padding:0
}
.el-dialog__footer {
  text-align:center;
  padding: 30px 0 30px
}
.el-button {
  width:140px;
}
.el-dialog__headerbtn {
    float: right;
    background: 0 0;
    border: none;
    outline: 0;
    padding: 0;
    cursor: pointer;
    position: absolute;
    top: -26px;
    right: -26px;
    border: 1px solid #ddd;
    border-radius: 50%;
    padding: 5px;
    width: 25px;
    height: 25px;
}
</style>