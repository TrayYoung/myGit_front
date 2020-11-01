<template>
  <div>
    <div>
      <h1>头像区</h1>
    </div>
    <div>
      <h1>评价区</h1>
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="班期">
          <el-input v-model="commentSchoolForm.class_num"></el-input>
        </el-form-item>
        <el-form-item label="评价人">
          <el-input v-model="commentSchoolForm.ename"></el-input>
        </el-form-item>
        <el-form-item label="整体评价">
          <el-input v-model="commentSchoolForm.content_score"></el-input>
        </el-form-item>
        <el-form-item label="评价（包括主要优点及缺陷）">
          <el-input v-model="commentSchoolForm.content_text"></el-input>
        </el-form-item>
      </el-form>
      <el-table
        :data="courseScoreTable"
        border
        style="width: 100%">
        <el-table-column
          prop="courseId"
          label="课程id"
        >
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
        >
        </el-table-column>
        <el-table-column
          prop="score"
          label="分数"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
    import axios from 'axios';
    export default {
        name: "SchoolComment_Student",
        data(){
          return{
            commentSchoolForm:{
              ename:'',
              content_score:'',
              content_text:'',
              class_num:''
            },
            courseScoreTable:[]
          }
        },
      methods:{
        getCourseScoreByEmpno:function () {
          debugger
          var empno=this.$store.state.uid
          axios.get("/getCourseScoreByEmpno/"+empno).then(res => {
            this.courseScoreTable = res.data;
          })
        },
        getCommentSchool:function () {
          var empno=this.$store.state.uid
          axios.get("/getSumCommentSchool/"+empno).then(res => {
            this.commentSchoolForm = res.data;
          })
        }
      },
      mounted() {
        this.getCourseScoreByEmpno();
        this.getCommentSchool();
      }
    }
</script>

<style scoped>

</style>
