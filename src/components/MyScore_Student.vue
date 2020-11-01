<template>
  <div>
    <h1>我的考试成绩——学生</h1>
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
</template>

<script>
    export default {
        name: "MyScore_Student",
      data(){
        return{
          commentSchoolForm:{
            ename:'',
            content_score:'',
            content_text:'',
            class_num:''
          },
        }
      },
      methods:{
        getCourseScoreByEmpno:function () {
          debugger
          var empno=this.$store.state.uid
          axios.get("/getCourseScoreByEmpno/"+empno).then(res => {
            this.courseScoreTable = res.data;
          })
        }
      },
      mounted() {
        this.getCourseScoreByEmpno();
      }
    }
</script>

<style scoped>

</style>

