<template>
  <div>
    <div style="padding-left: 65%">
      <el-input v-model="formForSearch.queryEname" style="width: 230px" placeholder="请输入姓名"clearable @clear="resetEname"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
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
        label="职位"
        prop="role">
      </el-table-column>
      <el-table-column
        label="部门"
        prop="dname">
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
      :current-page="formForSearch.currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="formForSearch.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalTableData.length">
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "MyDept_Clerk",
    data() {
      return {
        deptno:"",
        allEmp:[],
        tableData: [],
        totalTableData:[],
        currentPage: 1, //初始页
        pagesize: 5,    //每页的数据
        ename: "",

        formForSearch:{
          currentPage:1, //初始页
          pagesize:5,    //    每页的数据
          queryEname:'',
          empno:this.$store.state.uid
        },
      }
    },
    methods: {
      search:function(){
        this.formForSearch.currentPage=1;
        this.getStudent();
        this.searchStudent();
      },
      resetEname:function(){
        this.formForSearch.queryEname='';
        this.getStudent();
        this.searchStudent();
      },
      getOnesDeptno:function(){
        axios.get("http://localhost:8080/getOnesDeptno/" + this.$store.state.uid).then(res => {
          this.deptno = res.data;
        });
      },
      getStudent: function () {
        axios({
          //formdata提交
          method: 'post',
          url: '/getEmpListByDeptnoAndEnameWithoutPage',
          data: this.formForSearch
        }).then((res) => {
          this.totalTableData=res.data;
        });
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.formForSearch.pagesize = size;
        this.searchStudent();
        console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.formForSearch.currentPage = currentPage;
        this.searchStudent();
        this.getStudent();
        console.log(this.currentPage)  //点击第几页
      },
      searchStudent:function () {
        axios({
          //formdata提交
          method: 'post',
          url: '/getEmpListByDeptnoAndEname',
          data: this.formForSearch
        }).then((res) => {
          this.tableData=res.data;
        });
      },
    },
    mounted() {
      this.getOnesDeptno();
      this.searchStudent();
      this.getStudent();
    }
  }
</script>

<style scoped>

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

