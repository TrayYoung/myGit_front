<template>
    <div>
      <h1>课程管理</h1>
      <div>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
                   @click="addCourse()">添加</el-button>
        <div style="float: right">
          <el-input v-model="courseName" style="width: 230px" clearable
                    @clear="clearCourse()" placeholder="请输入课程名"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="searchCourse()">搜索</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        border
        stripe
        style="margin-top: 3%;">
        <el-table-column
          prop="courseId"
          label="课程ID">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditCourse(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="padding-left: 25%"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allCourse.length">
      </el-pagination>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "CourseAdministration",
      data() {
          return{
            currentPage: 1, //初始页
            pagesize: 5,    //每页的数据
            courseName:'',
            tableData:[],
            allCourse:[]
          }
      },
      methods:{
        clearCourse() {
          this.searchCourse();
        },
        getCourse: function () {
          if (this.courseName === ""){
            this.courseName = 'isNull'
          }
          axios.get("http://localhost:8080/getCourse/" + this.courseName).then(res => {
            this.allCourse = res.data;
          });
          if (this.courseName === "isNull"){
            this.courseName = ''
          }
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
          this.pagesize = size;
          this.searchCourse();
          console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.searchCourse();
          console.log(this.currentPage)  //点击第几页
        },
        searchCourse:function () {
          if (this.courseName === ""){
            this.courseName = 'isNull'
          }
          axios.get("/getCourseByName/" + this.currentPage + "/"+ this.pagesize +
            "/"+ this.courseName).then(res => {
            this.tableData = res.data;
          });
          this.currentPage = 1;
          this.getCourse();
          if (this.courseName === "isNull"){
            this.courseName = ''
          }
        },
        handleDelete(index,row) {
          this.$confirm('确认删除该课程吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.get("delCourse/" + row.courseId).then(res =>{
              if ("success" === res.data) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                });
                this.searchCourse();
              }else if ("cantdel" === res.data) {
                this.$message({
                  type: 'error',
                  message: '课程有学生成绩，删除失败'
                });
              }else {
                this.$message({
                  type: 'info',
                  message: '服务器响应失败'
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        },
        handleEditCourse(index,row) {
          this.$prompt('请修改课程名', '提示', {
            inputValue: row.courseName,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /[\u4E00-\u9FA5A-Za-z0-9]{2,20}/,
            inputErrorMessage: '请输入正确的课程名，不能包含特殊符号'
          }).then(({ value }) => {
            axios.get("editCourse/" + row.courseId + "/" + value).then(res => {
              if (res.data === "success") {
                this.$message({
                  type: 'success',
                  message: '修改后的课程名是: ' + value
                });
                this.searchCourse();
              }else {
                this.$message({
                  type: 'info',
                  message: '服务器响应失败'
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        },
        addCourse() {
          this.$prompt('请输入课程名', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /[\u4E00-\u9FA5A-Za-z0-9]{2,20}/,
            inputErrorMessage: '请输入正确的课程名，不能包含特殊符号'
          }).then(({ value }) => {
            axios.get("addCourse/" + value).then(res => {
              if (res.data === "success") {
                this.$message({
                  type: 'success',
                  message: '新增的课程名是: ' + value
                });
                this.searchCourse();
              }else {
                this.$message({
                  type: 'info',
                  message: '服务器响应失败'
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        }
      },
      mounted() {
          this.searchCourse();
        this.getCourse();
      }
    }
</script>

<style scoped>

</style>
