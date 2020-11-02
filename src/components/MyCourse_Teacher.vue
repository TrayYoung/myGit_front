<template>
  <div>
  <div>
    <h1>我的课程——教师</h1>
  </div>
    <div>
      <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="courseid"
          label="课程号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="coursename"
          label="课程名称"
          width="180">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "MyCourse_Teacher",
      data() {
        return {
          tableData: [],
        }
      },
      methods: {
        getClassByTeacher: function () {
          var uid = this.$store.state.uid;
          axios.get("http://localhost:8080/showCourse/"+uid).then(res => {
            this.tableData=res.data;
          })
        },
      },
      mounted() {
        this.getClassByTeacher();
      }
    }
</script>

<style scoped>

</style>
