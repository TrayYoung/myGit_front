import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HomeStudent from "@/components/HomeStudent";
import HomeTeacher from "@/components/HomeTeacher";
import HomeEmp from "@/components/HomeEmp";
import HomeManager from "@/components/HomeManager";
import HomeAdmin from "@/components/HomeAdmin";//所有的组件都一一对应，否则空白页面
import EmpMain from "@/components/EmpMain"
/*import Navigation from "@/components/Navigation"*/

import ClassAdministration from "@/components/ClassAdministration";
import StudentAdministration from "@/components/StudentAdministration";
import TeacherAdministration from "@/components/TeacherAdministration";
import ClerkAdministration from "@/components/ClerkAdministration";
import ManagerAdministration from "@/components/ManagerAdministration";
import ResetPassword from "@/components/ResetPassword";

import ChangePwd from "@/components/ChangePwd";
import CommentCompany from "@/components/CommentCompany";
import CommentSchool from "@/components/CommentSchool";
import MyClass_Teacher from "@/components/MyClass_Teacher";
import MyClassMember from "@/components/MyClassMember";
import MyCourse_Teacher from "@/components/MyCourse_Teacher";
import MyDept_Clerk from "@/components/MyDept_Clerk";
import MyDept_Manager from "@/components/MyDept_Manager";
import MyScore_Student from "@/components/MyScore_Student";
import Regular from "@/components/Regular";
import Regular_1 from "@/components/Regular_1";
import Regular_2 from "@/components/Regular_2";
import Regular_3 from "@/components/Regular_3";
import SchoolComment from "@/components/SchoolComment";
import TeachersStyle from "@/components/TeachersStyle";






import BaseInfo from "@/components/BaseInfo";
import Comment from "@/components/Comment";

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
          path:'/classAdministration',
          name:'ClassAdministration',
          component:ClassAdministration
        }, {
          path:'/studentAdministration',
          name:'StudentAdministration',
          component:StudentAdministration
        }, {
          path:'/teacherAdministration',
          name:'TeacherAdministration',
          component:TeacherAdministration
        }, {
          path:'/clerkAdministration',
          name:'ClerkAdministration',
          component:ClerkAdministration
        }, {
          path:'/managerAdministration',
          name:'ManagerAdministration',
          component:ManagerAdministration
        }, {
          path:'/resetPassword',
          name:'ResetPassword',
          component:ResetPassword
        },{
          path:'/baseInfo',
          name:'BaseInfo',
          component:BaseInfo
        },{
          path:'/comment',
          name:'Comment',
          component:Comment
        },{
          path:'/changePwd',
          name:'ChangePwd',
          component:ChangePwd
        },{
          path:'/commentCompany',
          name:'CommentCompany',
          component:CommentCompany
        },{
          path:'/commentSchool',
          name:'CommentSchool',
          component:CommentSchool
        },{
          path:'/myClassTeacher',
          name:'MyClass_Teacher',
          component:MyClass_Teacher
        },{
          path:'/myClassMember/:cno',
          name:'MyClassMember',
          component:MyClassMember
        },{
          path:'/myCourseTeacher',
          name:'MyCourse_Teacher',
          component:MyCourse_Teacher
        },{
          path:'/myDeptClerk',
          name:'MyDept_Clerk',
          component:MyDept_Clerk
        },{
          path:'/myDeptManager',
          name:'MyDept_Manager',
          component:MyDept_Manager
        },{
          path:'/myScoreStudent',
          name:'MyScore_Student',
          component:MyScore_Student
        },{
          path:'/regular',
          name:'Regular',
          component:Regular
        },{
          path:'/regular1',
          name:'Regular_1',
          component:Regular_1
        },{
          path:'/regular2',
          name:'Regular_2',
          component:Regular_2
        },{
          path:'/regular3',
          name:'Regular_3',
          component:Regular_3
        },{
          path:'/schoolComment',
          name:'SchoolComment',
          component:SchoolComment
        },{
          path:'/teachersStyle',
          name:'TeachersStyle',
          component:TeachersStyle
        }
      ]
    }
    ]





})
