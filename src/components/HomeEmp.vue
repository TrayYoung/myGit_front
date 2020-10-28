<template>
  <div>
    <el-container class="container">
      <el-header class="header">

        <!--<el-row>
          <el-col :span="16" class="headerlogo">
            <div class="grid-content bg-purple">
              &lt;!&ndash;<img
                style="width:400px;height: 30px"
                src="../../assets/img/top.png"
                alt="无法显示图片"
              />&ndash;&gt;
              员工
            </div>
          </el-col>
          <el-col :span="8" class="rightsection">
            <div class="grid-content bg-purple-light">
              <span class="el-dropdown-link userinfo-inner">欢迎您，{{$store.state.uid}}</span>
            </div>
          </el-col>
        </el-row>-->
      </el-header>
      <el-container>
        <el-aside class="aside">
          <!-- 侧边栏导航  -->
         <!-- aside-->

        </el-aside>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "HomeEmp"
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
