<template>
  <div>
    <div style="padding-left: 65%">
      <el-input v-model="ename" style="width: 230px" placeholder="请输入姓名"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchStudent()">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 3%;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名">
              <span>{{props.row.ename }}</span>
            </el-form-item>
            <el-form-item label="工号">
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
    <el-pagination
      style="padding-left: 25%"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="allStudent.length">
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "myClassMember",
      data() {
        return {
          allStudent:[],
          tableData: [],
          currentPage: 1, //初始页
          pagesize: 5,    //每页的数据
          ename: "",
        }
      },
      methods: {
        getStudent: function () {
          var class_num = this.$store.state.classNo;
          axios.get("http://localhost:8080/getStudentByCno/" + class_num).then(res => {
            this.allStudent = res.data;
          });
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
          this.pagesize = size;
          this.searchStudent();
          console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.searchStudent();
          console.log(this.currentPage)  //点击第几页
        },
        searchStudent:function () {
          if (this.ename === ""){
            this.ename='isNull'
          }
          axios.get("/getStudentByName/" + this.currentPage + "/"+ this.pagesize +
            "/"+ this.ename + "/" + this.$store.state.classNo).then(res => {
            this.tableData = res.data;
          });
          if (this.ename === "isNull"){
            this.ename =''
          }
        },
      },
      mounted() {
        this.searchStudent();
        this.getStudent()
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
