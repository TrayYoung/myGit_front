<template>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="empno"
          label="员工编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="ename"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="100">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="籍贯"
          width="100">
        </el-table-column>
        <el-table-column
          prop="ismarry"
          label="婚否"
          width="100">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="idnum"
          label="身份证号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dname"
          label="所在部门"
          width="100">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "DeptList",
    data() {
      return {
        tableData: [],

      }
    },
    methods: {
      getEmpByDeptno: function () {
        axios.get("http://localhost:8080/getEmpByDeptno/1").then(res => {
          this.tableData = res.data;
        })
      }
    },
    mounted() {
      this.getEmpByDeptno();
    }
  }
</script>

<style scoped>

</style>
