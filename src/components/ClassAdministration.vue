<template>
  <div>
    <div>
      <h1>班级管理</h1>
      <h1>存放班级的下拉框</h1>
      <el-dropdown>
        <el-button type="primary">
          选择班级<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu  slot="dropdown">
          <el-dropdown-item
            @click="showClassInInput(value)"
            v-for="item in classList"
            :key="item.cNo"
            :value="item.cname">
          {{item.cname}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

        <el-input v-model="quiryCname" style="width: 100px" ></el-input>


     <!-- <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="班级">
        <el-input v-model=""></el-input>
      </el-form-item>
      </el-form>-->
      <el-select  v-model="value" placeholder="请选择班期">
        <el-option
          v-for="item in classList"
          :key="item.cname"
          :label="item.cname"
          :value="item.cname">
        </el-option>
      </el-select>

      <el-button type="primary" icon="el-icon-search" @click="searchClass()">搜索</el-button>
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
            currentPage:1, //初始页
            pagesize:5,    //    每页的数据
            queryCname:'',
            classNum:'',
            className:'1',
            classList:[],
            classByNameList:[],
            studentTable:[]
          }
        },
        methods:{
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
          getStudentInOneClass:function () {

          },
          showClassInInput:function (val) {
            this.quiryCname=val;
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

</style>
