<template>
  <div>
  <div>
    <h1>我的班级</h1>
  </div>

<div>


  <el-table
    :data="tableData"
    height="600"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-table
          empty-text="当前班级无学员"
          :data="studentTable"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            prop="empno"
            label="学员编号"
          >
          </el-table-column>
          <el-table-column
            prop="ename"
            label="学员姓名"
          >
          </el-table-column>



          <!-- <el-table-column
          prop="post_time"
          label="新闻源">
          </el-table-column>
          <el-table-column
          prop="post_time"
          label="媒体类型">
          </el-table-column>
          <el-table-column
          prop="post_time"
          label="操作">
          </el-table-column> -->
        </el-table>

      </template>
    </el-table-column>

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

<!--    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
      <el-button @click="watch(scope.row)" type="text" size="small" id="view">查看</el-button>
      <el-button type="text" size="small">编辑</el-button>
    </template>
    </el-table-column>-->

  </el-table>

  </div>
  </div>
</template>


<script>
  import axios from 'axios';
    export default {
        name: "MyClass_Teacher",
      data() {
        return {
          tableData: [],
          studentTable:[]
        }
      },
      methods: {

        getClassByTeacher: function () {
          var uid = this.$store.state.uid;
          axios.get("http://localhost:8080/showClass/"+uid).then(res => {
            this.tableData=res.data;
          })
        },
        getStudentByClass:function () {
          var cls = 1;
          axios.get("http://localhost:8080/showStudent/"+cls).then(res =>{
            this.studentTable=res.data;
          })
        }

      },
      mounted() {
        this.getClassByTeacher();
        this.getStudentByClass();
      }
    };

</script>

<style scoped>

</style>
