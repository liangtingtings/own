<template>
<div>
    <div class="payment-bg">
        <div class="pay-form">
            <h2 class="title">注册／登录成功</h2>
            <p class="shop_intro">
                <h4>输入同学分享给您的邀请码，可以免费获得一套真</h4>
                <h4 class="manTop">题及解析</h4>
            </p>
            <input type="text" class="invite_code" v-model="inviteCode">
            <div class="button_action">
                <a class="jump button_modal button_box" @click="jump">跳过</a>
                <a class="submitBtn button_modal button_box" @click="submitForm">提交</a>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {inviteCodeSubmit} from '../../api/getData.js'
export default {
  data () {
    return {
      inviteCode: ''
    }
  },
  methods: {
    submitForm () {
      if (this.inviteCode === '') {
        alert('邀请码不能为空')
      }
      var data = {'code': this.inviteCode}
      inviteCodeSubmit(data).then((res) => {
        if (res.status === 200) {
          this.$router.push('/home')
        }
      })
    },
    jump () {
      this.$router.push('/home')
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

.payment-bg
  bg-image('~common/image/bg')
  background-size:cover
  min-height:700px
  width:100%
  position:relative
  .pay-form
    width:438px
    border:1px solid $color-borders-background
    background:$color-background
    position:absolute
    left:0
    right:0
    margin:auto
    top: 30px
    padding: 0 40px 24px 40px
    box-sizing: border-box
    .title
      text-align:center
      border-bottom:1px solid #ddd
      height:60px
      line-height:60px
    .describe
      font-size: $font-size-medium
      color:$color-text-d
      margin-left:16px
  .shop_intro
    margin-top:24px
  .manTop
    margin-top:10px
.button_modal
  width:158px
  height:34px
  border:1px solid transport
  text-align:center
  line-height:34px
  font-size: $font-size-medium
  border-radius:4px
  color: $color-text-d
.pay_button
  background: $color-highlight-border
  color:$color-text-f
  margin:0 auto
.invite_code
  width:333px
  height:48px
  margin-top:16px
  border:1px solid #bbb
  padding-left: 20px
  margin-bottom:30px
.button_action
.button_box
  float:left
  margin-right:20px
  &:last-child
    margin-right:0
.jump
  border:1px solid #bbb
  border-radius:4px
  cursor: pointer
  background: $color-background 
.submitBtn
  background: $color-highlight-border
  color: $color-text-f
  cursor: pointer
</style>