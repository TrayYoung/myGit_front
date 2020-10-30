<template>
  <div>
    <el-container class="container">
      <el-header class="header">
        经理
      </el-header>
      <el-container>
        <el-aside class="aside" width="150px">
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1" @click=""><i class="el-icon-s-order"></i>个人信息</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-s-tools"></i>员工管理</el-menu-item>
            <el-menu-item index="3" @click="exit"><i class="el-icon-delete-solid"></i>退出系统</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <el-row>
            <el-button type="primary">查看详细信息</el-button>
            <el-button type="success">编辑</el-button>
          </el-row>
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
              label="电话"
              width="180">
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="生日"
              width="180">
            </el-table-column>
            <el-table-column
              prop="dname"
              label="所在部门"
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
    data() {
      return {
        tableData: [],

      }
    },
    methods: {
      getInfo: function () { //获取经理个人信息
        axios.get("http://localhost:8080/showInfo/1").then(res => {
          this.tableData = res.data;
        })
      },
      exit: function () {
        this.$router.push({path: "/"});
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

