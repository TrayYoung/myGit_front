<template>
  <div>
    <div>
      <h1>班级管理</h1>
      <h1>存放班级的下拉框</h1>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">
          <el-dropdown>
            <el-button type="primary">
              选择班级<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu  slot="dropdown" class="project-dropdown">
              <el-dropdown-item
                @click.native="showClassInInput(item.cname)"
                v-for="item in classList"
                :key="item.cNo"
                :value="item.cname">
                {{item.cname}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-input v-model="queryCname" style="width: 230px" ></el-input>


<!--
           <el-form ref="form" :model="form" label-width="80px">
           <el-form-item label="班级">
             <el-input v-model=""></el-input>
           </el-form-item>
           </el-form>-->


          <el-button type="primary" icon="el-icon-search" @click="searchClass()">搜索</el-button>

        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light">
          <span style="color: transparent">hh</span><!--占位-->
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">
          <el-button type="primary" @click="dialog = true">新增班级</el-button>
        </div></el-col>
      </el-row>

       <el-drawer
            title="新建班级"
            :before-close="handleClose"
            :visible.sync="dialog"
            direction="ltr"
            custom-class="demo-drawer"
            ref="drawer"
          >
            <div class="demo-drawer__content">
              <el-form :model="form">
                <el-form-item label="班级名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="教师" :label-width="formLabelWidth">
                  <el-select  placeholder="请选择教师" clearable filterable><!--@click.native="showClassInInput(item.cname)"-->
                    <el-option
                      v-for="item in TeacherList"
                      :key="item.cname"
                      :label="item.cname"
                      :value="item.cname">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
              </div>
            </div>
          </el-drawer>


      <h1>班级列表</h1>
      <el-table
        :data="classByNameList"
        border
        style="width: 100%">
        <el-table-column
          prop="cNo"
          label="id"
        >
        </el-table-column>
        <el-table-column
          prop="cname"
          label="班级"
        >
        </el-table-column>
        <el-table-column
          prop="empno"
          label="教师id"
        >
        </el-table-column>
        <el-table-column
          prop="ename"
          label="任课教师"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="classList.length">
      </el-pagination>
      <h1>新增班级</h1>
      <h1>删除班级</h1>
    </div>

    <div>
      <h1>此班级的任课教师</h1>
    </div>

    <div>
      <h1>此班级的学生列表</h1>
      <el-table
        :data="studentTable"
        border
        style="width: 100%">
        <el-table-column
          prop="empno"
          label="学生id"
        >
        </el-table-column>
        <el-table-column
          prop="ename"
          label="学生姓名"
        >
        </el-table-column>
        <el-table-column
          prop="cname"
          label="班期"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
    import axios from 'axios';
    export default {
        name: "ClassAdministration",
        data(){
          return{
            dialog: false,
            loading: false,
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            formLabelWidth: '80px',
            timer: null,



            currentPage:1, //初始页
            pagesize:5,    //    每页的数据
            queryCname:'',
            classNum:'',
            className:'1',
            classList:[],
            TeacherList:[],
            classByNameList:[],
            studentTable:[]
          }
        },
        methods:{
          handleClose(done) {
            if (this.loading) {
              return;
            }
            this.$confirm('确定要提交表单吗？')
              .then(_ => {
                this.loading = true;
                this.timer = setTimeout(() => {
                  done();
                  // 动画关闭需要一定的时间
                  setTimeout(() => {
                    this.loading = false;
                  }, 400);
                }, 2000);
              })
              .catch(_ => {});
          },
          cancelForm() {
            this.loading = false;
            this.dialog = false;
            clearTimeout(this.timer);
          },



          handleDetail:function(index,data){
            var cNo=data.cNo;

            this.getClassMemberByCNo(cNo);
          },
          searchClass:function(){
            this.getClassListByName();
          },
          // 初始页currentPage、初始每页数据数pagesize和数据data
          handleSizeChange: function (size) {
            this.pagesize = size;
            this.getClassListByName();
            console.log(this.pagesize)  //每页下拉显示数据
          },
          handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            this.getClassListByName();
            console.log(this.currentPage)  //点击第几页
          },
          getClassListForSelect:function(){
            axios.get("/getClassListForSelect").then(res => {
              this.classList = res.data;
            });
          },
          getTeacherListForSelect:function(){
            axios.get("/getTeacherListForSelect").then(res => {
              this.classList = res.data;
            });
          },
          getStudentInOneClass:function () {

          },
          showClassInInput:function (val) {
            this.queryCname=val;
          },
          getClassListByName:function () {
            if (this.queryCname==""){
              this.queryCname='isNull'
            }
            axios.get("/getClassListByName/"+this.currentPage+"/"+this.pagesize+"/"+this.queryCname).then(res => {
              this.classByNameList = res.data;
            });
            if (this.queryCname=="isNull"){
              this.queryCname=''
            }
          },
          getClassMemberByCNo:function (cNo) {

            /**/
            axios.get("/getClassMemberByCNo/"+cNo).then(res => {
              this.studentTable=res.data;
            });

          }
        },
        mounted() {
          this.getClassListForSelect();
          this.getClassListByName();
        }
    }
</script>

<style scoped>
  .project-dropdown{
    width: 100px;
    height:200px;
    overflow: auto;
  }
</style>
