<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名">
              <span>{{props.row.ename }}</span>
            </el-form-item>
            <el-form-item label="工号：">
              <span>{{props.row.empno }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="班期">
              <span>{{props.row.cname }}</span>
            </el-form-item>
            <el-form-item label="出生日期">
              <span>{{props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="籍贯">
              <span>{{props.row.address }}</span>
            </el-form-item>
            <el-form-item label="是否婚配">
              <span>{{props.row.isMarry }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{props.row.tel }}</span>
            </el-form-item>
            <!--<el-form-item label="身份证号">
              <span>{{this.form.idNum}}</span>
            </el-form-item>-->
            <el-form-item label="毕业院校">
              <span>{{props.row.school }}</span>
            </el-form-item>
            <el-form-item label="专业">
              <span>{{props.row.major }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{props.row.remarks }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="ename">
      </el-table-column>
      <el-table-column
        label="工号"
        prop="empno">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="sex">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "myClassMember",
      data() {
        return {
          tableData: []
        }
      },
      methods: {
        getStudent:function () {
          var class_num = this.$store.state.classNo;
          axios.get("http://localhost:8080/getStudentByCno/" + class_num).then(res =>{
            this.tableData = res.data;
          });
        }
      },
      mounted() {
        this.getStudent();
      }
    }
</script>

<style scoped>

</style>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
