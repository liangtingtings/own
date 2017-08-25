<template>
<div>success</div>
</template>
<script>
import {setCookie, getStore} from '../../common/js/mUtils.js'
import {Selectsubmit} from '../../api/getData.js'
export default {
  data () {
    return {}
  },
  methods: {},
  created () {
    const isNew = this.$route.query.new
    const type = this.$route.query.state
    const token = this.$route.query.token
    setCookie('token', token, 0.1)
    if (isNew === 'true') {
      this.$router.push('/Login')
    } else if (type.indexOf('select') >= 0) {
      const index = type.indexOf('_')
      const id = type.substring(index + 1)
      var data = {}
      var questionListArr = JSON.parse(getStore('select')).answers
      console.log(questionListArr)
      data['questionId'] = id
      data['answers'] = questionListArr
      Selectsubmit(data).then((res) => {
        this.$router.push('/choiceAnswer?id=' + id)
      })
    } else if (type.indexOf('opera') >= 0) {
      const index1 = type.indexOf('_')
      const id1 = type.substring(index1 + 1)
      this.$router.push('/operationAnswer?id=' + id1)
    } else {
      this.$router.push('/home')
    }
  }
}
</script>
