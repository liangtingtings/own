<template>
<div>
    <div class="payment-bg">
        <div class="pay-form">
            <h2 class="title">购买操作题解析劵</h2>
            <p class="shop_intro">
              <h5>商品描述<span class="describe">用于激活操作题详细步骤以及得分点分析</span></h5>
            </p>
            <div class="shop_webpack">
                <h5>购买套餐：</h5>
                <ul>
                  <li>
                    <el-radio-group v-model="priceType" @change="change">
                      <el-radio-button label="1">1套</el-radio-button>
                      <el-radio-button label="5">5套</el-radio-button>
                      <el-radio-button label="10">10套</el-radio-button>
                    </el-radio-group>
                  </li>
                </ul>
                <!--<ul>
                    <li v-for="item in payType">
                        {{item.type}}套
                    </li>
                </ul>!-->
                <h5>支付方式：
                <el-radio-group v-model="payTypes">
                    <el-radio label="ALIPAY">支付宝</el-radio>
                    <el-radio label="WXPAY">微信</el-radio>
                  </el-radio-group>
                </h5>
                <div>
                  <h5 class="marginTop">原价：<span class="origin_price">¥ {{originPrice}}元<span class="cut_line"></span></span></h5>
                  <h5 class="marginTop">支付金额
                  <span class="now_price">¥ {{discountPrice}}元</span></h5>
                </div>
            </div>
            <div class="button_modal pay_button" @click="buy">立即购买</div>
        </div>
        <p class="tips" style="text-align:left">
          <span style="width:100%;margin-bottom:8px;display:block">说明：</span><br>
          <span style="width:100%;margin-bottom:5px;display:block">1.一张激活券可以激活一套操作题的详细操作步骤、标注答案以及得分点剖析</span><br>
          <span style="width:100%;margin-bottom:5px;display:block">2.一套操作题包括一道文字处理题、一套电子表格题、一套演示文稿题</span>
        </p>
        <div class="black"></div>
        <el-dialog
            :visible.sync="codeVisiable"
            size="tiny"
            custom-class="active_dialog"
            >
            <span class="active_content"><img :src="fluidCode" alt=""></span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="codeVisiable = false">取 消</el-button>
              <el-button type="primary" @click="codeVisiable = false">确 认</el-button>
            </span>
          </el-dialog>
    </div>
     
</div>
</template>
<script>
  import {paysubmit} from '../../api/getData.js'
  import {getCookie} from '../../common/js/mUtils.js'
  import {loginUrl} from '../../common/js/env.js'
  export default {
    data () {
      return {
        codeVisiable: false,
        payTypes: 'ALIPAY',
        priceType: '1',
        selectPrice: '',
        originPrice: '',
        discountPrice: '',
        fluidCode: '',
        payType: {
          '1': {
            money: '5',
            discount: '3'
          },
          '5': {
            money: '25',
            discount: '14.5'
          },
          '10': {
            money: '50',
            discount: '28'
          }
        }
      }
    },
    created () {
      const payType = this.payType
      this.originPrice = payType['1'].money
      this.discountPrice = payType['1'].discount
    },
    methods: {
      change (index) {
        this.selectPrice = index
        const payType = this.payType
        this.originPrice = payType[index].money
        this.discountPrice = payType[index].discount
      },
      buy () {
        if (!getCookie('token')) {
          location.href = loginUrl + '&state=message'
          return
        }
        var data = {}
        data['num'] = this.priceType
        data['payType'] = this.payTypes
        if (this.payTypes === 'ALIPAY') {
          window.open('/pay?payType=ALIPAY&num=' + this.priceType)
        } else {
          paysubmit(data).then((res) => {
            this.codeVisiable = true
            this.fluidCode = res
          })
        }
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
  .shop_webpack
    margin-top:20px
    margin-bottom:30px
    li
      margin-top:12px
      margin-bottom:20px
.origin_price
  font-size: $font-size-large
  color: $color-text-d
  position:relative
  display: inline-block
  text-align: center
.marginTop
  margin-top:20px
.cut_line
  width:60px
  height:1px
  background:#666
  position:absolute
  left:0
  right:0
  top:0
  bottom:0
  margin:auto
.now_price
  margin-left:16px
  font-size:18px
  color: #f76837
.button_modal
  width:108px
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
  cursor:pointer
.tips
  width:438px
  position:absolute
  left:0
  right:0
  margin:auto
  top:450px
  font-size: $font-size-small-l
  color: $color-text
  text-align:center
</style>
<style>
.el-radio-button__inner{
  width:48px;
  height:48px;
  line-height:48px;
  border:1px solid #bbb;
  border-radius:4px;
  padding:0;
  margin-right:12px;
  background:#fff;
}
.el-radio-button:last-child .el-radio-button__inner{
  margin-right:0
}
.el-radio-button:first-child .el-radio-button__inner, .el-radio-button:last-child .el-radio-button__inner{
  border:1px solid #bbb;
  border-radius: 4px;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner{
  border:1px solid #f76837;
  box-shadow: none;
  background-color:#fff;
  color:#f76837;
}
.el-radio-button__inner:hover{
  color:#666
}

</style>