<template>
  <div>
    <h1>重置密码</h1>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">
        部门：
        <el-select  v-model="dName"  placeholder="请选择部门"  filterable style="width: 170px" clearable @clear="resetDeptno">
          <el-option
            @click.native="setDeptNo(item.deptno,item.dname)"
            v-for="item in deptTableForSelect"
            :key="item.deptno"
            :label="item.dname"
            :value="item.deptno">
          </el-option>
        </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        职业：
        <el-select  v-model="role_num"  placeholder="请选择职业" filterable style="width: 170px" clearable @clear="resetRoleNo">
          <el-option label="学生" value="STUDENT" @click.native="setRoleNo"></el-option>
          <el-option label="教师" value="TEACHER"  @click.native="setRoleNo1"></el-option>
          <el-option label="职员" value="CLERK" @click.native="setRoleNo2"></el-option>
          <el-option label="经理" value="MANAGER" @click.native="setRoleNo3"></el-option>
        </el-select>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"><span style="color: transparent">hh</span></div></el-col>

      <el-col :span="8"><div class="grid-content bg-purple">
        <el-input v-model="formForSearch.queryEmpno"style="width: 230px" type="text" clearable @clear="resetEmpno"
                  placeholder="请输入员工工号" ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchEmp">搜索</el-button>
      </div></el-col>
    </el-row>

    <br>
    <el-table
      :data="tableData"
    >
      <el-table-column
        prop="empno"
        label="工号">
      </el-table-column>
      <el-table-column
        prop="ename"
        label="姓名">
      </el-table-column>

      <el-table-column
        prop="deptno"
        label="部门号">
      </el-table-column>
      <el-table-column
        prop="dname"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="role"
        label="职业">
      </el-table-column>


      <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleResetPwd(scope.$index, scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="7" align="center"><span style="color: transparent">hh</span></el-col>
      <el-col :span="8" align="center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formForSearch.currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="formForSearch.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalTableData.length">
        </el-pagination>
      </el-col>
      <el-col :span="9" align="center"><span style="color: transparent">hh</span></el-col>
    </el-row>


    <el-dialog
      title="提示"
      :visible.sync="dialogReset"
      width="30%"
    >
      <span>确认要将{{this.empnoForReset}},{{this.enameForReset}}的密码进行重置吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleChangePwd">确 定</el-button>
        <el-button @click="dialogReset = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "ResetPassword",
    data(){
      return{
        dialogReset:false,
        role_num:'',
        dName:'',
        empnoForReset:'',
        enameForReset:'',

        formForSearch:{
          currentPage:1, //初始页
          pagesize:5,    //    每页的数据
          deptNo:'',
          roleNo:'',
          queryEmpno:'',
        },
        tableData:[],
        deptTableForSelect:[],
        classForSelect:[],
        totalTableData:[],
        scoreTableData:[]


      }
    },
    methods:{

      handleResetPwd:function(index,row){
        this.dialogReset=true;
        this.empnoForReset=row.empno;
        this.enameForReset=row.ename;
      },
      handleChangePwd:function(){
        axios.get("/resetEmpsPwd/"+this.empnoForReset).then(res => {
          if (res.data=='success'){
            this.dialogReset=false;
            this.$notify({
              title: 'success',
              message: '密码重置成功！',
              type: 'success',
              position:'top-left'
            });

          } else {
            this.dialogReset=false;
            this.$notify.error({
              title: 'error',
              message: '密码重置失败！',
              type: 'error',
              position:'top-left'
            });
          }
        })
      },
      resetEmpno:function(){
        this.formForSearch.queryEmpno='';
        this.getTableData();
        this.getTotalTableData();
      },
      searchEmp:function(){
        this.getTableData();
        this.getTotalTableData();
      },
      resetDeptno:function(){
        this.formForSearch.deptNo='';
        this.getTableData();
        this.getTotalTableData();
      },
      resetRoleNo:function(){
        this.formForSearch.roleNo='';
        this.getTableData();
        this.getTotalTableData();
      },
      setDeptNo:function(val,val2){
        this.formForSearch.deptNo=val;
        this.dName=val2;
        this.getTableData();
        this.getTotalTableData()
      },

      handleSizeChange: function (size) {
        this.formForSearch.pagesize = size;
        this.getTableData();
        console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.formForSearch.currentPage = currentPage;
        this.getTableData();
        console.log(this.currentPage)  //点击第几页
      },
      getTableData:function () {
        axios({
          //formdata提交
          method: 'post',
          url: '/getEmpJxdTotalTableDataByThree',
          data: this.formForSearch
        }).then((res) => {
          this.tableData=res.data;
        });

      },
      getScoreTableData:function () {
        axios.get("/getCourseList").then(res => {
          this.scoreTableData=res.data;
        })
      },
      getDeptTableForSelect:function () {
        axios.get("/getDeptTableForSelect").then(res => {
          this.deptTableForSelect=res.data;
        })
      },
      getTotalTableData:function () {
        axios({
          //formdata提交
          method: 'post',
          url: '/getTotalTableData',
          data: this.formForSearch
        }).then((res) => {
          this.totalTableData=res.data;
        });
      },
      setRoleNo:function(){
        this.formForSearch.roleNo='STUDENT';
        this.getTableData();
        this.getTotalTableData();
      },
      setRoleNo1:function(){
        this.formForSearch.roleNo='TEACHER';
        this.getTableData();
        this.getTotalTableData();
      },
      setRoleNo2:function(){
        this.formForSearch.roleNo='CLERK';
        this.getTableData();
        this.getTotalTableData();
      },
      setRoleNo3:function(){
        this.formForSearch.roleNo='MANAGER';
        this.getTableData();
        this.getTotalTableData();
      },

    },
    mounted() {
      this.getTableData();
      this.getTotalTableData();
      this.getDeptTableForSelect();
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
