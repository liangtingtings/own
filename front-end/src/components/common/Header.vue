<template>
    <div>
    	<div class="mHeader mHeader_f4">
    		<div class="mHeader_top">
    			<span class="server_tel">全国服务热线：400-088-1945</span>
    		</div>
    	</div>
    	<div class="line"></div>
    	<div class="mHeader">
    		<div class="mHeader_bottom">
    			<img src="../../common/image/logo.png" class="logo" @click="goBack()">
    			<div class="untoken">
    				<img src="../../common/image/weixin.png" class="weixin">
    				<a href="javascript:;" target='_black' class="login" @click="login">登陆/注册</a>
    			</div>
          <div class="token_exit" v-if="isToken">
             <ul>
                <li>
                   <span class="weixin_names">欢迎您，<span class="weixin_name">{{nickName}}</span></span>
                </li>
                <li>
                   <span class="invite_code" @click="dialogVisible = true">我的邀请码</span>
                </li>
                <li>
                    <img src="../../common/image/card.png" alt="" class="invite_img" @click="goPay()">
                    <span  @click="goPay">激活券&nbsp;✖️&nbsp;<span>{{ticketNum}}</span></span>
                </li>
                <li>
                    <img src="../../common/image/exit.png" alt="" class="exit">
                    <span class="exit_action" @click="exitActive">退出</span>
                </li>
             </ul>
          </div>
    		</div>
    	</div>
    	<div class="line"></div>
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="handleClose">
        <span class="invite_title">您的邀请码是：<span class="invite_codes">{{inviteCode}}</span></span>
        <p class="invite_intro">新用户通过邀请码注册，邀请人和被邀请人均可免费获得一套真题及解析。<br>网址：www.msoffice100.com</p>
        <div class="invite_button" @click="dialogVisible = false">确 定</div>
        </el-dialog>
    </div>
</template>
<script>
import {getCookie, deleteCookie, setStore} from '../../common/js/mUtils.js'
import axios from 'axios'
import {loginUrl} from '../../common/js/env.js'
import {getProvinceData} from '../../api/getData.js'
export default {
  data () {
    return {
      isToken: false,
      nickName: '',
      ticketNum: '',
      dialogVisible: false,
      inviteCode: ''
    }
  },
  created () {
    this._getToken()
    console.log(this.getStatus(this.$route.path))
  },
  methods: {
    handleClose (done) {
      done()
    },
    getStatus (urlStr) {
      var urlStrArr = urlStr.split('/')
      return urlStrArr[urlStrArr.length - 1]
    },
    goBack () {
      this.$router.push('/home')
    },
    _getToken () {
      if (getCookie('token')) {
        this.isToken = true
        // 获取用户信息
        if (getCookie('token')) {
          const instance = axios.create()
          instance.defaults.headers.common['token'] = getCookie('token')
        }
        getProvinceData().then((res) => {
          setStore('userinfo', res)
          this.nickName = res.nickName
          this.ticketNum = res.ticketNum
          this.inviteCode = res.inviteCode
        })
      }
    },
    login () {
      location.href = loginUrl + '&state=message'
    },
    exitActive () {
      deleteCookie('token')
      this.isToken = false
      this.$router.push({path: '/home'})
      location.reload()
    },
    goPay () {
      this.$router.push('/payment')
    }
  },
  watch: {
    '$route': '_getToken'
  }
}
</script>
<style>
.invite_button{
  background:#0096dc;
  color:#fff;
  border-radius:4px;
  margin:0 auto;
  padding:0;
  width:140px;
  height:36px;
  text-align:center;
  line-height:36px;
  margin-top:30px;
  cursor:pointer;
}
.el-dialog--tiny {
    width: 25%;
}
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

.mHeader_f4
  background: $color-background-d
.mHeader
  width:100%
  .mHeader_top
    width:1120px
    min-width: 1120px
    height:36px
    line-height:36px
    margin: 0 auto
    text-align: right
    padding:0 80px
    .server_tel
      font-size: $font-size-small-l
      color: $color-text
  .mHeader_bottom
    width: 1120px
    min-width: 1120px
    height:80px
    line-height:80px
    background: $color-background
    margin: 0 auto
    padding:0 80px
    position: relative
    .logo, .weixin
      display:inline-block
      vertical-align:middle
      cursor:pointer
    .weixin
      margin-right:4px
    .untoken
      float:right
      position: absolute
      right:80px
      top:0
      .login
        color: $color-text-l
        cursor: pointer
        font-size: $font-size-medium
        &:hover
          text-decoration:underline
          background: #fff
    .token_exit
      background:#fff
      position:absolute
      top:0
      right:80px
      ul
        float:right
        li
          float:left
          cursor:pointer
          margin-left:20px
          font-size: $font-size-medium
          .invite_img, .exit
            vertical-align:middle
          .invite_code, .exit_action
            color: $color-text-l
            &:hover
              text-decoration:underline
.line
  height:1px
  background: $color-lined-background

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
