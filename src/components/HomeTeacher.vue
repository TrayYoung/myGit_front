<template>
  <div>
    <el-container class="container">
      <el-header class="header">
        <el-row>
          <el-col :span="16" class="headerlogo">
            <div class="grid-content bg-purple">
              <!--<img
                style="width:400px;height: 30px"
                src="../../assets/img/top.png"
                alt="无法显示图片"
              />-->
              教师
            </div>
          </el-col>
          <el-col :span="8" class="rightsection">
            <div class="grid-content bg-purple-light">
              <span class="el-dropdown-link userinfo-inner">欢迎您，{{$store.state.username}}</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <!-- 侧边栏导航  -->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>班级管理</span>
              </template>
              <!--   <el-menu-item-group>
                   <template slot="title">分组一</template>
                   <el-menu-item index="1-1">选项1</el-menu-item>
                   <el-menu-item index="1-2">选项2</el-menu-item>
                 </el-menu-item-group>
                 <el-menu-item-group title="分组2">
                   <el-menu-item index="1-3">选项3</el-menu-item>
                 </el-menu-item-group>-->
              <!--  <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>-->
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-setting"></i>
              <span slot="title">学生管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">教师管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">员工管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title">经理管理</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-setting"></i>
              <span slot="title">重置用户密码</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-setting"></i>
              <span slot="title">修改管理员密码</span>
            </el-menu-item>
            <el-menu-item index="8">
              <i class="el-icon-setting"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">Main
          <el-table
            :data="tableData"
            style="width: 100%">

            <el-table-column type="expand">

            </el-table-column>

            <el-table-column
              label="班级编号"
              prop="cno">
            </el-table-column>
            <el-table-column
              label="班级名称"
              prop="cname">
            </el-table-column>
            <el-table-column
              label="任课教师"
              prop="ename">
            </el-table-column>
          </el-table>



        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "HomeTeacher",
    data() {
      return {
        tableData: [],
      }
    },
    methods: {
      getClassByTeacher: function () {
        debugger
        var uid = $store.state.uid;
        axios.get("http://localhost:8080/showClass/"+uid).then(res => {
          this.tableData=res.data;
        })
      }
    },
    mounted() {
      this.getClassByTeacher();
    }
  };
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .container {
    height: 100vh;
    font-size: 15px;
  }
  .header {
    background: #212121;
    color: #fff;
  }
  .aside {
    background: #3a3a3a;
    color: #fff;
    /* height: 100%; */
  }
  .main {
    /* height: 100%; */
    color: #212121;
  }</style>
