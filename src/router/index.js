import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HomeStudent from "@/components/HomeStudent";
import HomeTeacher from "@/components/HomeTeacher";
import HomeEmp from "@/components/HomeEmp";
import HomeManager from "@/components/HomeManager";
import HomeAdmin from "@/components/HomeAdmin";//所有的组件都一一对应，否则空白页面
import EmpMain from "@/components/EmpMain"
import DeptList from "@/components/DeptList"
/*import Navigation from "@/components/Navigation"*/

import StudentAdministration from "@/components/StudentAdministration";
import TeacherAdministration from "@/components/TeacherAdministration";
/*import ClassAdministration from "@/components/ClassAdministration";

import ClerkAdministration from "@/components/ClerkAdministration";
import ManagerAdministration from "@/components/ManagerAdministration";
import ResetPassword from "@/components/ResetPassword";*/

/*import BaseInfo from "@/components/BaseInfo";
import Comment from "@/components/Comment";*/

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
    }, {
      path: '/empMain',
      name: 'EmpMain',
      component: EmpMain,
      children:[
        {
          path:'/studentAdministration',
          name:'StudentAdministration',
          component:StudentAdministration
        },
        {
          path:'/teacherAdministration',
          name:'TeacherAdministration',
          component:TeacherAdministration
        }
      ]
    },{
      path:'/deptList',
      name:'DeptList',
      component:DeptList
    },
     /* children:[
        {
          path:'/classAdministration',
          name:'ClassAdministration',
          component:ClassAdministration
        },{
          path:'/studentAdministration',
          name:'StudentAdministration',
          component:StudentAdministration
        },{
          path:'/teacherAdminitration',
          name:'TeacherAdministration',
          component:TeacherAdministration
        },{
          path:'/clerkAdmintration',
          name:'ClerkAdministration',
          component:ClerkAdministration
        },{
          path:'/managerAdminitration',
          name:'ManagerAdministration',
          component:ManagerAdministration
        },{
          path:'/resetPassword',
          name:'ResetPassword',
          component:ResetPassword
        }
      ]*/
    ]



    /*{
      path:'/navigationItem',
      name:'NavigationItem',
      component:NavigationItem,
      /!*children:[
        {
          path:'/baseInfo',
          name:'BaseInfo',
          component:BaseInfo
        },{
          path:'/comment',
          name:'Comment',
          component:Comment
        }
      ]*!/
    }*/

})
