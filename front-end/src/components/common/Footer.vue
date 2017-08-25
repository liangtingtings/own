<template>
    <div class="footer">
        <div class="line"></div>
        <div class="mFooter">
    		<div class="content">
    			<img src="../../common/image/logo2.png">
    			<div class="content_cons">
    				<p>
              <span class="m_right">企业合作咨询：400-088-1945</span>
              <span>企业合作邮箱：biz@zhiyuanzhuanjia.cn</span>
            </p>
    				<p><span>Copyright @ 2015-2017 上海知分技术有限公司 版权所有 沪ICP备15037769号-1 沪ICP备15037769号-2</span></p>
    			</div>
    		</div>
    	</div>
    </div>
</template>
<script></script>
<style scoped lang='stylus' rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
.mFooter
  background: $color-background-d
  .content
    width:1120px
    min-width:1120px
    margin:0 auto
    height: 100px
    padding:0 80px
    img
      display:inline-block
      vertical-align:middle
      float:left
      margin-top: 20px
    .content_cons
      height:50px
      float:left
      padding:30px 0 20px 30px
      p
        font-size: $font-size-small-l
        color: $color-text
        .m_right
          margin-right:30px
        &:last-child
          margin-top:20px
.line
  height:1px
  background: $color-line-background
.footer
  margin-top:50px
</style>