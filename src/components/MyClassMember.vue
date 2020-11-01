<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="empno"
        label="工号">
      </el-table-column>
      <el-table-column
        fixed
        prop="ename"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="address"
        label="籍贯">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="nation"
        label="民族">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="生日">
      </el-table-column>
      <el-table-column
        prop="isMarry"
        label="是否婚配">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="idNum"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="school"
        label="毕业院校">
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="dname"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="cname"
        label="班期">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "MyClass_Student",
      methods: {
        handleClick(row) {
          this.$message("this.tableData");
        },
        getStudent:function () {
          var class_num = 1;
          axios.get("http://localhost:8080/getStudentByCno/" + class_num).then(res =>{
            this.tableData = res.data;
          })
        }
      },
      data() {
        return {
          tableData: []
        }
      },
      mounted() {
        this.getStudent();
      }
    }
</script>

<style scoped>

</style>
