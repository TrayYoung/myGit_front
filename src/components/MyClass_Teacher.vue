<template>
 <!-- <div>
  <div>
    <h1>我的班级</h1>
  </div>-->

<div>


  <!--<el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%">

    <el-table-column
      prop="cno"
      label="班级编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="cname"
      label="班级名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="ename"
      label="任课老师">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small" id="view">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>

  </el-table>

  </div>-->
  </div>
</template>


<script>
  /*import axios from 'axios';
    export default {
        name: "MyClass_Teacher",
      data() {
        return {
          tableData: [],
        }
      },
      methods: {
        getClassByTeacher: function () {
          var uid = 1000;
          axios.get("http://localhost:8080/showClass/"+uid).then(res => {
            this.tableData=res.data;
          })
        },
      },
      mounted() {
        this.getClassByTeacher();
      }
    };
    $(function () {
      $("#view").click(function () {;
      })
    })*/
</script>

<style scoped>

</style>
