<template>
  <div>
    <el-container class="container">
      <el-header class="header">
        经理
      </el-header>
      <el-container>
        <el-aside class="aside" width="100px">
          <!-- 侧边栏导航  -->
          aside
        </el-aside>
        <el-main class="main">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="empno"
              label="员工编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="ename"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              width="180">
            </el-table-column>
            <el-table-column
              prop="tel"
              label="電話"
              width="180">
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="生日"
              width="180">
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
    name: "HomeManager",
    data(){
      return{
        tableData: [],

      }
    },
    methods:{
      getInfo: function () { //获取经理个人信息
        axios.get("http://localhost:8081/showInfo/1").then(res => {
          this.tableData = res.data;
        })
      }
    },
    mounted() {
      this.getInfo();
    }

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

