<template>
  <div>
    <h1>学生管理</h1>
    <el-table
      :data="tableData"
      >
      <el-table-column
        prop="empno"
        label="工号"
        width="70">
      </el-table-column>
      <el-table-column
        prop="ename"
        label="姓名"
        width="90">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="50">
      </el-table-column>
      <el-table-column
        prop="school"
        label="学校"
        width="110">
      </el-table-column>
      <el-table-column
        prop="address"
        label="籍贯"
        width="150">
      </el-table-column>
      <el-table-column label="培训期间测试成绩">
        <el-table-column
          v-for="item in scoreTableData"
          :key="item.courseId"
          :label="item.courseName"
          :prop="item.courseName">
        </el-table-column>
        </el-table-column>
      <el-table-column
        prop="school_cmt"
        label="学校评价"
        width="60">
      </el-table-column>
      <el-table-column
        prop="regular"
        label="转正评价"
        width="60">
      </el-table-column>
      <el-table-column
        prop="regular1"
        label="一年评价"
        width="60">
      </el-table-column>
      <el-table-column
        prop="regular2"
        label="二年评价"
        width="60">
      </el-table-column>
      <el-table-column
        prop="regular3"
        label="三年评价"
        width="60">
      </el-table-column>
      <el-table-column
        label="操作"
        width="166">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEditStudent(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteStudent(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
    import axios from 'axios';
    export default {
        name: "studentAdministration",
        data(){
          return{
            tableData:[],
            scoreTableData:[]


          }
        },
        methods:{
          getTableData:function () {
            axios.get("/getStudentTableData").then(res => {
              this.tableData=res.data;
            });
          },
          getScoreTableData:function () {
            axios.get("/getCourseList").then(res => {
              this.scoreTableData=res.data;
            })
          }

        },
        mounted() {
          this.getTableData();
          this.getScoreTableData();
        },
        created() {

        }
    }
</script>

<style scoped>

</style>
