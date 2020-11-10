<template>
  <div>
    <h1>教师管理</h1>

    <el-row>
      <el-col :span="10"><div class="grid-content bg-purple">

        <el-input v-model="formForSearch.queryTname" style="width: 230px" type="text" clearable placeholder="请输入教师姓名" @clear="setQueryTname"></el-input>


        <el-button type="primary" icon="el-icon-search" @click="searchTeacher" >搜索</el-button>

      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">
        <span style="color: transparent">hh</span>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-button type="primary" @click="handleAddOneTeacher" >新增教师<i class="el-icon-plus"></i></el-button>
      </div></el-col>
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
        width="80"
        v-for="item in scoreTableData"
        :key="item.courseId"
        :label="item.courseName"
        :prop="item.courseName">
      </el-table-column>
    </el-table-column>
    <el-table-column
      prop="school_cmt"
      label="学校评价"
      width="60">
    </el-table-column>
    <el-table-column
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
    </el-table-column>
    <el-table-column
      label="操作"
      width="306">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEditTeacher(scope.$index, scope.row)">修改信息</el-button>
      <!--  <el-button
          size="mini"
          type="primary"
          @click="handleEditStudent(scope.$index, scope.row)">修改评价</el-button>-->
        <el-button
          size="mini"
          type="danger"
          @click="handleDeleteOne(scope.$index, scope.row)">删除</el-button>
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
      :total="totalTableData.length"><!--这里有个小bug，现已解决-->
    </el-pagination>


    <div>
      <!--新增教师-->
      <el-dialog
        title="新增教师"
        :visible.sync="dialogAddOneTeacher"
        width="45%"
        top="1%"
      >

        <div class="dialog-gy">
          <el-form ref="form" :rules="rulesTAdmin" :model="formAddOneTeacher" label-width="100px">

            <el-form-item label="姓名：" prop="ename">
              <el-input v-model.trim="formAddOneTeacher.ename" style="width: 65%"></el-input>
            </el-form-item>


            <el-form-item label="部门：">
              <el-input type="text" v-model="DEPTNAME" style="width: 65%" readonly></el-input>
            </el-form-item>
            <el-form-item label="职务：">
              <el-input type="text" v-model="formAddOneTeacher.role" style="width: 65%" readonly></el-input>
            </el-form-item>
            <el-form-item label="员工类型：">
              <el-input type="text" v-model="formAddOneTeacher.emptype" style="width: 65%" readonly></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="formAddOneTeacher.remarks" style="width: 65%"></el-input>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="9"><div ><span style="color: transparent">hh</span></div></el-col>
            <el-col :span="6"><div >
              <el-button type="primary" @click="addOneNewTeacher">保存</el-button>
              <el-button @click="dialogAddOneTeacher = false">取 消</el-button>
            </div></el-col>
            <el-col :span="9"><div ><span style="color: transparent">hh</span></div></el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">

        </span>
        </div>
      </el-dialog>

      <!--修改个人信息-->
      <el-dialog
        title="修改信息"
        :visible.sync="dialogEditOneTeacher"
        width="50%"
        top="1%"
      >
        <div class="dialog-gy2">
          <el-form ref="form" :rules="rulesTAdmin1" :model="formEditOneTeacher" label-width="100px">
            <el-form-item label="工号：">
              <el-input readonly v-model="formEditOneTeacher.empno" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="ename">
              <el-input v-model.trim="formEditOneTeacher.ename" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="班期：">
              <el-select  v-model="formEditOneTeacher.class_num"  placeholder="请选择班级"  filterable style="width: 65%" clearable @clear="resetEditTchCNo">
                <el-option
                  @click.native="setEditTchCNo(item.cNo)"
                  v-for="item in classListForSelect"
                  :key="item.cNo"
                  :label="item.cname"
                  :value="item.cNo">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别：">
              <el-radio-group v-model="formEditOneTeacher.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="出生日期：" prop="birthday">
              <el-date-picker type="date" placeholder="选择日期" style="width: 65%"
                              v-model="formEditOneTeacher.birthday"></el-date-picker>
            </el-form-item>
            <el-form-item label="籍贯：" prop="address">
              <el-input v-model="formEditOneTeacher.address" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="是否婚配：">
              <el-radio-group v-model="formEditOneTeacher.isMarry">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="联系电话：" prop="tel">
              <el-input v-model.number="formEditOneTeacher.tel" autocomplete="off" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="idNum">
              <el-input type="text" v-model="formEditOneTeacher.idNum" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="毕业院校：" prop="school">
              <el-input type="text" v-model="formEditOneTeacher.school" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="专业：" prop="major">
              <el-input type="text" v-model="formEditOneTeacher.major" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="formEditOneTeacher.remarks" style="width: 65%"></el-input>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="9"><div ><span style="color: transparent">hh</span></div></el-col>
            <el-col :span="6"><div >
              <el-button type="primary" @click="onSubmit()">保存</el-button>
              <el-button @click="dialogEditOneTeacher = false">取 消</el-button>
            </div></el-col>
            <el-col :span="9"><div ><span style="color: transparent">hh</span></div></el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">

        </span>
        </div>

      </el-dialog>

      <el-dialog
        title="删除"
        :visible.sync="dialogDelete"
        width="30%"
      >
        <span>确认要将用户{{this.formDelete.empno}},{{this.formDelete.ename}}删除吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDeleteOne">确 定</el-button>
        <el-button @click="dialogDelete = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "TeacherAdministration",
      data(){
        return{

          dialogDelete:false,
          dialogAddOneTeacher:false,
          dialogEditOneTeacher:false,
          DEPTNAME:'金桥培训',
          formForSearch:{
            currentPage:1, //初始页
            pagesize:5,    //    每页的数据
            queryTname:'',
          },

          formDelete:{
            empno:'',
            ename:'',
          },

          formAddOneTeacher:{
            empno:'',
            ename:'',
            sex:'',
            birthday:'',
            address:'',
            isMarry:'',
            tel:'',
            img:'',
            idNum:'',
            class_num:'',
            school:'',
            major:'',
            remarks:'',
            deptno:1,
            emptype:2,
            role:'TEACHER'
          },

          formEditOneTeacher:{
            empno:'',
            ename:'',
            sex:'',
            birthday:'',
            address:'',
            isMarry:'',
            tel:'',
            img:'',
            idNum:'',
            class_num:'',
            school:'',
            major:'',
            remarks:'',
            cname:''
          },
          rulesTAdmin:{
            ename:[
              { required: true, message: "请输入姓名", trigger: 'blur'},
              { min: 2, max: 10,message: "最少两个字符", trigger: 'blur'}
            ],
            address:[
              { required: true, message: '请输入籍贯地址', trigger: 'blur' }
            ],
            tel:[
              { required: true, message: '请输入手机号', trigger: 'blur' },
              {
                pattern: /^1[345789]\d{9}$/,//验证手机号的正则表达式
                message: '目前只支持中国大陆的手机号码，请输入正确的数字号码',
                trigger: 'blur'
              },
            ],
            school:[
              { required: true,message: "请输入毕业院校", trigger: 'blur'}
            ],
            major:[
              { required: true,message:'请输入专业', trigger: 'blur'}
            ]
          },

          rulesTAdmin1:{
            ename:[
              { required: true, message: "请输入姓名", trigger: 'blur'},
              { min: 2, max: 10,message: "最少两个字符", trigger: 'blur'}
            ],
            address:[
              { message: '请输入籍贯地址', trigger: 'blur' }
            ],
            tel:[
              { message: '请输入手机号', trigger: 'blur' },
              {
                pattern: /^1[345789]\d{9}$/,//验证手机号的正则表达式
                message: '目前只支持中国大陆的手机号码，请输入正确的数字号码',
                trigger: 'blur'
              },
            ],
            /*idNum:[
              { message: "请输入身份证号", trigger: "blur" },
              { validator: checkIdNum, trigger: 'blur' }
            ],*/
            school:[
              { message: "请输入毕业院校", trigger: 'blur'}
            ],
            major:[
              {message:'请输入专业', trigger: 'blur'}
            ]
          },

          tableData:[],
          totalTableData:[],
          scoreTableData:[],
          classListForSelect:[],

        }
      },
      methods:{
        confirmDeleteOne:function(){
          axios({
            method: 'post',
            url: '/deleteThisOne',
            data: this.formDelete
          }).then(res => {
            if (res.data=='success'){
              this.dialogDelete=false;
              this.getTeacherListByTname();
              this.$notify({
                title: 'success',
                message: '教师删除成功！',
                type: 'success',
                position:'top-left'
              });

            } else {
              this.dialogDelete=false;
              this.getTeacherListByTname();
              this.$notify.error({
                title: 'error',
                message: '教师删除失败！',
                type: 'error',
                position:'top-left'
              });
            }

          });
        },
        handleDeleteOne:function(index,row){
          this.formDelete.empno=row.empno;
          this.formDelete.ename=row.ename;
          this.dialogDelete=true;
        },
        resetEditTchCNo:function(){
          this.formEditOneEmp.class_num='';
        },
        setEditTchCNo:function(val){
          this.formEditOneEmp.class_num=val;
        },
        handleEditTeacher:function(index,row){
          this.dialogEditOneTeacher=true;
          var empno = row.empno;
          axios.get("http://localhost:8080/getMessage/" + empno).then(res => {
            this.formEditOneTeacher = res.data;
            //var classNo = res.data.class_num;
            //this.$store.dispatch("setClassNo", classNo);
          })
        },
        handleAddOneTeacher:function(){
          this.dialogAddOneTeacher=true;
        },
        addOneNewTeacher:function(){
          this.$refs.form.validate((valid) => {
            if (valid){
              //提交
              this.$confirm('确认新增教师吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                axios({
                  //formdata提交
                  method: 'post',
                  url: '/addOneNewTeacher',
                  data: this.formAddOneTeacher
                }).then(res => {
                  if (res.data=='success'){
                    this.dialogAddOneTeacher=false;
                    this.getTableData();
                    this.getTeacherListByTname();
                    this.$notify({
                      title: 'success',
                      message: '教师新增成功！',
                      type: 'success',
                      position:'top-left'
                    });

                  } else {
                    this.dialogAddOneTeacher=false;
                    this.getTableData();
                    this.getTeacherListByTname()
                    this.$notify.error({
                      title: 'error',
                      message: '教师新增失败！',
                      type: 'error',
                      position:'top-left'
                    });
                  }

                });
                this.getTableData();
                this.getTeacherListByTname();
                this.formAddOneTeacher.ename='';
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
              });
            } else {
              this.$message({
                type: 'info',
                message: '请正确填写'
              });
              return false;
            }
          })

        },
        searchTeacher:function(){
          this.formForSearch.currentPage=1;//防止第二页后搜索无数据
          this.getTeacherListByTname();
          this.getTableData();
        },
        setQueryTname:function(){
          this.formForSearch.queryTname='';
          this.getTeacherListByTname();

        },
        getTeacherListByTname:function(){
          axios({
            //formdata提交
            method: 'post',
            url: '/getTeacherListByTname',
            data: this.formForSearch
          }).then((res) => {
            this.tableData=res.data;
          });
        },
        onSubmit() {
          this.$refs.form.validate((valid) => {
            if (valid){
              //提交
              this.$confirm('确认修改信息吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                axios({
                  method:"post",
                  url:"/editEmpMessage",
                  data:this.formEditOneTeacher
                }).then(res =>{
                  this.dialogEditOneTeacher=false;
                  if ("success" === res.data) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    });
                    this.getTeacherListByTname();
                  }else {
                    this.$message({
                      type: 'info',
                      message: '服务器响应失败'
                    });
                  }
                });
              }).catch(() => {
                this.dialogEditOneTeacher=false;
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
              });
            } else {
              this.$message({
                type: 'info',
                message: '请正确填写'
              });
              return false;
            }
          })
        },
        handleSizeChange: function (size) {
          this.formForSearch.pagesize = size;
          this.getTeacherListByTname();
          console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
          this.formForSearch.currentPage = currentPage;
          this.getTeacherListByTname();
          console.log(this.currentPage)  //点击第几页
        },
        getTableData:function () {
          axios({
            //formdata提交
            method: 'post',
            url: '/getTeacherTableData',
            data: this.formForSearch
          }).then((res) => {
            this.totalTableData=res.data;
          });
        },
        getScoreTableData:function () {
          axios.get("/getCourseList").then(res => {
            this.scoreTableData=res.data;
          })
        },
        getClassListForFormSelect:function(){
          axios.get("/getClassListForAddFormSelect").then(res => {
            this.classListForSelect = res.data;
          });
        },

      },
      mounted() {
        this.getTableData();
        this.getTeacherListByTname();
        this.getScoreTableData();
        this.getClassListForFormSelect();
      },
      created() {

      }
    }
</script>

<style scoped>

</style>
