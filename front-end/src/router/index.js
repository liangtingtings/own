import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/page/main.vue'], resolve)
        },
        {
          path: '/choiceQuestion',
          component: resolve => require(['../components/page/choiceQuestion/choiceQuestion.vue'], resolve)
        },
        {
          path: '/choiceAnswer',
          component: resolve => require(['../components/page/choiceAnswer/choiceAnswer.vue'], resolve)
        },
        {
          path: '/operationQuestion',
          component: resolve => require(['../components/page/operationQuestion/operationQuestion.vue'], resolve)
        },
        {
          path: '/operationAnswer',
          component: resolve => require(['../components/page/operationAnswer/operationAnswer.vue'], resolve)
        },
        {
          path: '/loginSuccess',
          component: resolve => require(['../components/page/loginSuccess'], resolve)
        },
        {
          path: '/payment',
          component: resolve => require(['../components/page/Payment'], resolve)
        },
        {
          path: '/login',
          component: resolve => require(['../components/page/Login'], resolve)
        }
      ]
    }
  ]
})
