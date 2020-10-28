import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import lead from '@/components/lead'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'/lead',
      component:lead
    }
  ]
})
