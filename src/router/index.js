import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HomeStudent from "@/components/HomeStudent";
import HomeTeacher from "@/components/HomeTeacher";
import HomeEmp from "@/components/HomeEmp";
import HomeManager from "@/components/HomeManager";
import HomeAdmin from "@/components/HomeAdmin";
import DeptList from "@/components/DeptList";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path:'/homeStudent',
      name:'HomeStudent',
      component:HomeStudent
    },{
      path:'/homeTeacher',
      name:'HomeTeacher',
      component:HomeTeacher
    },{
      path:'/homeEmp',
      name:'HomeEmp',
      component:HomeEmp
    },{
      path:'/homeManager',
      name:'HomeManager',
      component:HomeManager
    },{
      path:'/homeAdmin',
      name:'HomeAdmin',
      component:HomeAdmin
    },{
      path:'/deptList',
      name:'DeptList',
      component:DeptList
    }
  ]
})
