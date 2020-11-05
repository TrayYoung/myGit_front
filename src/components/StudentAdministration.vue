<template>
  <div>
    <h1>学生管理</h1>
    <el-row>
      <el-col :span="10"><div class="grid-content bg-purple">
        <el-select  v-model="formForSearch.classNumForSelect"  placeholder="请选择班级"  filterable style="width: 200px" clearable @clear="setClassName">
          <el-option
            @click.native="setClassNo(item.cNo)"
            v-for="item in classListForSelect"
            :key="item.cNo"
            :label="item.cname"
            :value="item.cNo">
          </el-option>
        </el-select>

        <el-input v-model="formForSearch.querySname" style="width: 230px" type="text" clearable placeholder="请输入学生姓名" @clear="setQuerySname"></el-input>


        <el-button type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>

      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <br>

    <el-table

      :data="tableData"
      >
      <el-table-column
        prop="empno"
        label="工号"
        width="70">
      </el-table-column>
      <el-table-column
        prop="ename"
        label="姓名"
        width="90">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="50">
      </el-table-column>
      <el-table-column
        prop="school"
        label="学校"
        width="110">
      </el-table-column>
      <el-table-column
        prop="address"
        label="籍贯"
        width="150">
      </el-table-column>
      <el-table-column label="培训期间测试成绩">
        <el-table-column
          v-for="item in scoreTableData"
          :key="item.courseId"
          :label="item.courseName"
          width="80"
          :prop="item.courseName">
        </el-table-column>
        </el-table-column>
      <el-table-column
        prop="school_cmt"
        label="学校评价"
        width="60">
      </el-table-column>
     <!-- <el-table-column
        prop="regular"
        label="转正评价"
        width="60">
      </el-table-column>
      <el-table-column
        prop="regular1"
        label="一年评价"
        width="60">
      </el-table-column>
      <el-table-column
        prop="regular2"
        label="二年评价"
        width="60">
      </el-table-column>
      <el-table-column
        prop="regular3"
        label="三年评价"
        width="60">
      </el-table-column>-->
      <el-table-column
        label="操作"
        width="246">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleRegularStudent(scope.$index, scope.row)">转正</el-button>
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="formForSearch.currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="formForSearch.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalTableData.length">
    </el-pagination>


  <div><!--转正对话框-->
    <el-dialog
      title="学生转正"
      :visible.sync="dialogRegular"
      width="30%"
    >
      <!--<el-form :model="formForRegular">
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
          <el-select  v-model="formEditClass.tName"  placeholder="请选择教师" clearable filterable readonly>&lt;!&ndash;@click.native="showClassInInput(item.cname)"&ndash;&gt;
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
      </el-form-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="">确 定</el-button>
        <el-button @click="dialogRegular = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>


  </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "studentAdministration",
        data(){
          return{

            dialogRegular:false,
            className:'',




            formStudent:{
              empno:'',
              ename:'',
              school_cmt:'',
              role:'',
              deptno:''
            },
            formForSearch:{
              currentPage:1, //初始页
              pagesize:5,    //    每页的数据
              classNumForSelect:'',
              querySname:'',
            },


            tableData:[],
            totalTableData:[],
            scoreTableData:[],
            classListForSelect:[]



          }
        },
        methods:{
          setQuerySname:function(){
            this.formForSearch.querySname='';
            this.getStudentListByClassNumAndEname();
          },
          setClassName:function(val){
            this.formForSearch.classNumForSelect='';
            this.getStudentListByClassNumAndEname();
          },
          // 初始页currentPage、初始每页数据数pagesize和数据data
          handleSizeChange: function (size) {
            this.formForSearch.pagesize = size;
            this.getStudentListByClassNumAndEname();
            console.log(this.pagesize)  //每页下拉显示数据
          },
          handleCurrentChange: function(currentPage){
            this.formForSearch.currentPage = currentPage;
            this.getStudentListByClassNumAndEname();
            console.log(this.currentPage)  //点击第几页
          },
          setClassNo:function(val){
            this.formForSearch.classNumForSelect=val;
            this.getStudentListByClassNumAndEname();
          },
          searchStudent:function(){
            this.getStudentListByClassNumAndEname();
          },
          handleRegularStudent:function(index,row){
            this.formStudent.empno=row.empno;
            this.formStudent.ename=row.ename;
            this.formStudent.school_cmt=row.school_cmt;

          },
          getTableData:function () {
            axios.get("/getStudentTableData").then(res => {
              //this.tableData=res.data;
              this.totalTableData=res.data;
            });
          },
          getStudentListByClassNumAndEname:function(){

              axios({
                //formdata提交
                method: 'post',
                url: '/getStudentListByClassNumAndEname',
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
          getClassListForSelect:function(){
            axios.get("/getClassListForSelect").then(res => {
              this.classListForSelect= res.data;
            });
          },

        },
        mounted() {
          this.getTableData();
          this.getScoreTableData();
          this.getClassListForSelect();
          this.getStudentListByClassNumAndEname();
        },
        created() {

        }
    }
</script>

<style scoped>

</style>
