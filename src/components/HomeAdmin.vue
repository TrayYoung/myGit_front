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
              管理员
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
            :unique-opened="true"
            :router="true"
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="/classAdministration">
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
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "HomeAdmin"
  };
</script>
<style scoped>
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
