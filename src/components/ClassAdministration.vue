<template>
  <div>
    <div>
      <h1>班级管理</h1>
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
            :visible.sync="dialog"
            direction="ltr"
            custom-class="demo-drawer"
            ref="drawer"
          >
            <div class="demo-drawer__content">
              <el-form :model="form">
                <el-form-item
                  label="班级名称"
                  :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off" style="width: 230px"></el-input>
                </el-form-item>
                <el-form-item label="教师" :label-width="formLabelWidth">
                  <el-select  v-model="form.teacherId"  placeholder="请选择教师" clearable filterable><!--@click.native="showClassInInput(item.cname)"-->
                    <el-option
                      @click="setTeacherId(item.empno)"
                      v-for="item in teacherList"
                      :key="item.empno"
                      :label="item.ename"
                      :value="item.empno">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="教师id"
                  :label-width="formLabelWidth">
                  <el-input v-model="form.teacherId" style="width: 230px" readonly></el-input>
                </el-form-item>
              </el-form>
              <div class="demo-drawer__footer">

                <el-button type="primary" @click="addClass">确 定</el-button>
                <el-button @click="cancelForm">取 消</el-button>

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
              @click="handleEditClass(scope.$index, scope.row)">编辑</el-button>
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
    </div>


    <el-drawer
      title="修改班级"
      :visible.sync="drawerEdit"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item
            label="班级id"
            :label-width="formLabelWidth">
            <el-input v-model="formEditClass.class_num" autocomplete="off" style="width: 230px" readonly></el-input>
          </el-form-item>
          <el-form-item
            label="班级名称"
            :label-width="formLabelWidth">
            <el-input v-model="formEditClass.cname" autocomplete="off" style="width: 230px"></el-input>
          </el-form-item>
          <el-form-item label="教师" :label-width="formLabelWidth">
            <el-select  v-model="formEditClass.tName"  placeholder="请选择教师" clearable filterable readonly><!--@click.native="showClassInInput(item.cname)"-->
              <el-option
                @click.native="setTeacherId1(item.empno)"
                v-for="item in teacherList"
                :key="item.empno"
                :label="item.ename"
                :value="item.empno">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="教师id"
            :label-width="formLabelWidth">
            <el-input v-model="formEditClass.teacherId" style="width: 230px" readonly></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">

          <el-button type="primary" @click="dialogEdit=true">确 定</el-button>
          <el-button @click="cancelForm">取 消</el-button>

        </div>
      </div>
    </el-drawer>

    <h1>修改班级教师</h1>
    <el-row>
      <el-col :span="11"><div class="grid-content bg-purple">
        <el-dropdown>
          <el-button type="primary">
            选择教师<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu  slot="dropdown" class="project-dropdown">
            <el-dropdown-item
              @click.native="showTeacherInInput(item.ename,item.empno)"
              v-for="item in teacherList"
              :key="item.empno"
              :value="item.ename">
              {{item.ename}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-input v-model="teacherId" style="width: 200px" readonly></el-input>
        <el-input v-model="queryTname" style="width: 200px" readonly></el-input>
        <el-button type="primary" @click="dialog1 = true">修改教师</el-button>
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple-light">
        <span style="color: transparent">hh</span>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-button type="primary" @click="handleAddStudent">新增学生</el-button>
      </div></el-col>
    </el-row>


    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialog1"
        width="30%"
        >
        <span>确认要将{{className}}的主管教师修改为{{queryTname}}吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleChangeTeacher">确 定</el-button>
        <el-button @click="dialog1 = false">取 消</el-button>
        </span>
      </el-dialog>
       <el-dialog
         title="修改"
         :visible.sync="dialogEdit"
         width="30%"
         >
        <span>确认要将{{this.formEditClass.cname}}的信息进行修改吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmEditClass">确 定</el-button>
        <el-button @click="dialogEdit = false">取 消</el-button>
        </span>
       </el-dialog>
      <el-dialog
        title="修改"
        :visible.sync="dialogEditStudent"
        width="30%"
      >
        <span>确认要将{{this.formEditStudent.ename}}的信息进行修改吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmEditStudent">确 定</el-button>
        <el-button @click="dialogEditStudent = false">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="新增"
        :visible.sync="dialogAddStudent"
        width="30%"
      >
        <span>确认要将{{this.formAddStudent.ename}}添加进{{this.formAddStudent.cname}}吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAddStudent">确 定</el-button>
        <el-button @click="dialogAddStudent = false">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="删除"
        :visible.sync="dialogDeleteStudent"
        width="30%"
      >
        <span>确认要将{{this.formDeleteStudent.ename}}从{{this.formDeleteStudent.cname}}删除吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDeleteStudent">确 定</el-button>
        <el-button @click="dialogDeleteStudent = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>


    <el-drawer
      title="新增班级成员"
      :visible.sync="drawerAddStudent"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item
            label="班级id"
            :label-width="formLabelWidth">
            <el-input v-model="formAddStudent.class_num" autocomplete="off" style="width: 230px" readonly></el-input>
          </el-form-item>
          <el-form-item
            label="班级"
            :label-width="formLabelWidth">
            <el-input v-model="formAddStudent.cname" autocomplete="off" style="width: 230px" readonly></el-input>
          </el-form-item>
          <el-form-item label="学生" :label-width="formLabelWidth">
            <el-select  v-model="formAddStudent.empno"  placeholder="请选择学生" clearable filterable><!--@click.native="showClassInInput(item.cname)"-->
              <el-option
                @click.native="setStudentId(item.ename,item.empno)"
                v-for="item in studentsToAddList"
                :key="item.empno"
                :label="item.ename"
                :value="item.empno">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="学生id"
            :label-width="formLabelWidth">
            <el-input v-model="formAddStudent.empno" style="width: 230px" readonly></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">

          <el-button type="primary" @click="dialogAddStudent=true">确 定</el-button>
          <el-button @click="cancelForm">取 消</el-button>

        </div>
      </div>
    </el-drawer>
    <el-drawer
      title="修改班级学生"
      :visible.sync="drawerStudent"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item
            label="学生id"
            :label-width="formLabelWidth">
            <el-input v-model="formEditStudent.empno" style="width: 230px" readonly></el-input>
          </el-form-item>
          <el-form-item
            label="学生姓名"
            :label-width="formLabelWidth">
            <el-input v-model="formEditStudent.ename" autocomplete="off" style="width: 230px" readonly></el-input>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-select  v-model="formEditStudent.class_num"  placeholder="请选择班级" clearable filterable readonly><!--@click.native="showClassInInput(item.cname)"-->
              <el-option
                @click.native="setTeacherId1(item.empno)"
                v-for="item in classList"
                :key="item.cNo"
                :label="item.cname"
                :value="item.cNo">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="班级id"
            :label-width="formLabelWidth">
            <el-input v-model="formEditStudent.class_num" autocomplete="off" style="width: 230px" readonly></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">

          <el-button type="primary" @click="dialogEditStudent=true">确 定</el-button>
          <el-button @click="cancelForm">取 消</el-button>

        </div>
      </div>
    </el-drawer>
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
              @click="handleEditStudent(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteStudent(scope.$index, scope.row)">删除</el-button>
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
            dialogDeleteStudent:false,
            dialogAddStudent:false,
            drawerAddStudent:false,
            dialogEditStudent:false,//
            dialogEdit:false,//
            drawerEdit:false,//编辑班级
            drawerStudent:false,
            dialog: false,
            dialog1: false,
            loading: false,
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: '',
              teacher:'',
              teacherId:''
            },
            formEditClass:{
              class_num:'',
              cname:'',
              teacherId:'',
              tName:''
            },
            formEditStudent:{
              empno:'',
              ename:'',
              cname:'',
              class_num:'',
            },
            formAddStudent:{
              class_num:'',
              cname:'',
              empno:'',
              ename:'',
            },
            formDeleteStudent:{
              class_num:'',
              cname:'',
              empno:'',
              ename:'',
            },
            formLabelWidth: '90px',
            timer: null,



            currentPage:1, //初始页
            pagesize:5,    //    每页的数据
            queryCname:'',
            queryTname:'',
            classNum:'',//班期
            teacherId:'',//班级教师工号
            className:'',

            classList:[],
            teacherList:[],
            studentsToAddList:[],//未分配班级的学生列表
            classByNameList:[],
            studentTable:[]
          }
        },
        methods:{
          handleDeleteStudent:function(index,row){
            this.dialogDeleteStudent=true;
            this.formDeleteStudent.empno=row.empno;
            this.formDeleteStudent.ename=row.ename;
            this.formDeleteStudent.cname=this.className;

          },
          handleAddStudent:function(index,row){
            this.drawerAddStudent=true;
            this.formAddStudent.class_num=this.classNum;
            this.formAddStudent.cname=this.className;

          },
          handleEditStudent:function(index,row){
            this.drawerStudent=true;
            this.formEditStudent.empno=row.empno;
            this.formEditStudent.ename=row.ename;
            this.formEditStudent.class_num=this.classNum;
            this.formEditStudent.cname=row.cname;

          },
          handleEditClass:function(index,row){
            this.drawerEdit=true;
            this.formEditClass.class_num=row.cNo;
            this.formEditClass.cname=row.cname;
            this.formEditClass.tName=row.ename;
            this.formEditClass.teacherId=row.empno;
            /*this.classByNameList[index].editeFlag=true;*/
          },
          //修改班级信息
          confirmEditClass:function(){
            axios({
              //formdata提交
              method: 'post',
              url: '/editClass',
              data: this.formEditClass
            }).then((res) => {
              if (res.data=='班级更新成功'){
                this.drawerEdit=false;
                this.dialogEdit=false;
                this.getClassListByName();
                this.$notify({
                  title: 'success',
                  message: '班级修改成功！',
                  type: 'success',
                  position:'top-left'
                });

              } else {
                this.$notify.error({
                  title: 'error',
                  message: '修改失败！',
                  type: 'error',
                  position:'top-left'
                });
              }
            });
          },
          confirmEditStudent:function(){
            axios({
              //formdata提交
              method: 'post',
              url: '/editStudent',
              data: this.formEditStudent
            }).then((res) => {
                if (res.data=='学生更新成功'){
                  this.drawerStudent=false;
                  this.dialogEditStudent=false;
                  this.getClassMemberByCNo(this.classNum);
                  this.getClassListByName();
                  this.$notify({
                    title: 'success',
                    message: '学生修改成功！',
                    type: 'success',
                    position:'top-left'
                  });

                } else {
                  this.$notify.error({
                    title: 'error',
                    message: '修改失败！',
                    type: 'error',
                    position:'top-left'
                  });
                }
            });
          },
          confirmAddStudent:function(){
            axios({
              //formdata提交
              method: 'post',
              url: '/addStudentToOneClass',
              data: this.formAddStudent
            }).then((res) => {
              if (res.data=='新增成员成功'){
                this.drawerAddStudent=false;
                this.dialogAddStudent=false;
                this.getClassMemberByCNo(this.classNum);
                this.getClassListByName();
                this.getStudentsToAddListForSelect();
                this.formAddStudent.ename='';
                this.formAddStudent.empno='';
                this.$notify({
                  title: 'success',
                  message: '新增成员成功！',
                  type: 'success',
                  position:'top-left'
                });

              } else {
                this.$notify.error({
                  title: 'error',
                  message: '修改失败！',
                  type: 'error',
                  position:'top-left'
                });
              }
            });
          },
          confirmDeleteStudent:function(){
            axios.get("/deleteStudentFromOneClass/"+this.formDeleteStudent.empno).then(res => {
              if (res.data=='删除成员成功'){
                this.dialogDeleteStudent=false;
                this.getClassMemberByCNo(this.classNum);
                this.getClassListByName();
                this.getStudentsToAddListForSelect();
                this.$notify({
                  title: 'success',
                  message: '已将'+this.formDeleteStudent.ename+'从'+this.formDeleteStudent.cname+'删除',
                  type: 'success',
                  position:'top-left'
                });

              } else {
                this.$notify.error({
                  title: 'error',
                  message: '删除失败！',
                  type: 'error',
                  position:'top-left'
                });
              }

            });
          },

    /* handleClose(done) {
       this.$confirm('确认关闭？')
         .then(_ => {
           done();
         })
         .catch(_ => {});
     },*/
          setTeacherId:function(val){
            this.form.teacherId=val;
          },
          setTeacherId1:function(val){
            this.formEditClass.teacherId=val;
          },
          setStudentId:function(val,val2){
            this.formAddStudent.ename=val;
            this.formAddStudent.empno=val2;
          },
          addClass:function(){
            axios.get("/addClass/"+this.form.name+"/"+this.form.teacherId).then(res => {
              if (res.data=='班级新增成功'){
                this.dialog1=false;
                this.dialog=false;
                this.getClassMemberByCNo();
                this.$notify({
                  title: 'success',
                  message: '班级新增成功！',
                  type: 'success',
                  position:'top-left'
                });

              } else {
                this.$notify.error({
                  title: 'error',
                  message: '新增失败！',
                  type: 'error',
                  position:'top-left'
                });
              }

            });
          },
          cancelForm() {
            //this.loading = false;
            this.dialog = false;
          },
          handleChangeTeacher:function(){
            axios.get("/changeTeacherInOneClass/"+this.classNum+"/"+this.teacherId).then(res => {
              if (res.data=='老师修改成功'){
                this.dialog1=false;
                this.getClassListByName();
                this.$notify({
                  title: '更新成功',
                  message: this.className+'的主管教师修改为'+this.queryTname,
                  type: 'success',
                  position:'top-left'
                });

              } else {
                this.$notify.error({
                  title: 'error',
                  message: '修改失败！',
                  type: 'error',
                  position:'top-left'
                });
              }

            });

          },


          handleDetail:function(index,data){
            var cNo=data.cNo;
            var tName=data.ename;
            this.queryTname=tName;
            this.className=data.cname;
            this.classNum=data.cNo;
            this.teacherId=data.empno;
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
              this.teacherList = res.data;
            });
          },
          getStudentsToAddListForSelect:function(){
            axios.get("/getStudentsToAddListForSelect").then(res => {
              this.studentsToAddList = res.data;
            });
          },
          getStudentInOneClass:function () {

          },
          showClassInInput:function (val) {
            this.queryCname=val;
          },
          showTeacherInInput:function (val,val2) {
            this.queryTname=val;
            this.teacherId=val2;

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
            axios.get("/getStudentByCno/"+cNo).then(res => {
              this.studentTable=res.data;
            });

          }
        },
        mounted() {
          this.getClassListForSelect();
          this.getTeacherListForSelect();
          this.getClassListByName();
          this.getStudentsToAddListForSelect();
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
