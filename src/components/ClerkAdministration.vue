<template>
  <div>
    <h1>员工管理</h1>
    <el-row>
      <el-col :span="10"><div class="grid-content bg-purple">
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

        姓名：
        <el-input v-model="formForSearch.queryEname" style="width: 180px" type="text" clearable placeholder="请输入员工姓名" @clear="setQueryEname"></el-input>


        <el-button type="primary" icon="el-icon-search" @click="searchEmp">搜索</el-button>

      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">
        <span style="color: transparent">hh</span>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-button type="primary" @click="handleAddOneEmp" >新增员工<i class="el-icon-plus"></i></el-button>
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
            @click="handleEditEmp(scope.$index, scope.row)">修改信息</el-button>
         <!-- <el-button
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
      :total="totalTableData.length">
    </el-pagination>


    <div>
      <!--新增员工-->
      <el-dialog
        title="新增员工"
        :visible.sync="dialogAddOneEmp"
        width="45%"
        top="1%"
      >

        <div class="dialog-gy">
          <el-form ref="form" :rules="rulesEAdmin" :model="formAddOneEmp" label-width="100px">

            <el-form-item label="姓名：" prop="ename">
              <el-input v-model.trim="formAddOneEmp.ename" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="班期：" prop="class_num">
              <el-select  v-model="formAddOneEmp.class_num"  placeholder="请选择班级"  filterable style="width: 65%" clearable @clear="resetAddEmpCNo">
                <el-option
                  @click.native="setAddEmpCNo(item.cNo)"
                  v-for="item in classListForSelect"
                  :key="item.cNo"
                  :label="item.cname"
                  :value="item.cNo">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="部门：" prop="deptno">
              <el-select  v-model="formAddOneEmp.deptno"  placeholder="请选择部门"  filterable style="width: 65%" clearable @clear="resetDeptnoForAdd">
                <el-option
                  @click.native="setDeptNoForAdd(item.deptno,item.dname)"
                  v-for="item in deptTableForSelect"
                  :key="item.deptno"
                  :label="item.dname"
                  :value="item.deptno">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职务：">
              <el-select  v-model="formAddOneEmp.role"  placeholder="请选择职业" filterable style="width: 65%" clearable @clear="resetRoleNo">
                <el-option label="学生" value="STUDENT" @click.native="setRoleNo"></el-option>
                <el-option label="教师" value="TEACHER"  @click.native="setRoleNo1"></el-option>
                <el-option label="职员" value="CLERK" @click.native="setRoleNo2"></el-option>
                <el-option label="经理" value="MANAGER" @click.native="setRoleNo3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工类型：" prop="emptype">
              <!--<el-radio-group v-model="formAddOneEmp.emptype">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>-->
              <el-select  v-model="formAddOneEmp.emptype"  placeholder="请选择职业" filterable style="width: 65%" clearable @clear="resetEmptype">
                <el-option label="金桥毕业后入职" value="1" @click.native="setEmptype"></el-option>
                <el-option label="直接入职" value="2"  @click.native="setEmptype1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="formAddOneEmp.remarks" style="width: 65%"></el-input>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="9"><div ><span style="color: transparent">hh</span></div></el-col>
            <el-col :span="6"><div >
              <el-button type="primary" @click="addOneNewEmp">保存</el-button>
              <el-button @click="dialogAddOneEmp = false">取 消</el-button>
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
        :visible.sync="dialogEditOneEmp"
        width="50%"
        top="1%"
      >
        <div class="dialog-gy2">
          <el-form ref="form" :rules="rulesEAdmin1" :model="formEditOneEmp" label-width="100px">
            <el-form-item label="工号：">
              <el-input readonly v-model="formEditOneEmp.empno" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="ename">
              <el-input v-model.trim="formEditOneEmp.ename" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="班期：">
              <el-select  v-model="formEditOneEmp.class_num"  placeholder="请选择班级"  filterable style="width: 65%" clearable @clear="resetEditTchCNo">
                <el-option
                  @click.native="setEditTchCNo(item.cNo)"
                  v-for="item in classListForSelect"
                  :key="item.cNo"
                  :label="item.cname"
                  :value="item.cNo">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门：" prop="deptno">
              <el-select  v-model="formEditOneEmp.deptno"  placeholder="请选择部门"  filterable style="width: 65%" clearable @clear="resetDeptnoForEdit">
                <el-option
                  @click.native="setDeptNoForEdit(item.deptno,item.dname)"
                  v-for="item in deptTableForSelect"
                  :key="item.deptno"
                  :label="item.dname"
                  :value="item.deptno">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职务：">
              <el-select  v-model="formEditOneEmp.role"  placeholder="请选择职业" filterable style="width: 65%" clearable @clear="resetRoleNoForEdit">
                <el-option label="学生" value="STUDENT" @click.native="setRoleNoForEdit"></el-option>
                <el-option label="教师" value="TEACHER"  @click.native="setRoleNo1ForEdit"></el-option>
                <el-option label="职员" value="CLERK" @click.native="setRoleNo2ForEdit"></el-option>
                <el-option label="经理" value="MANAGER" @click.native="setRoleNo3ForEdit"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工类型：" prop="emptype">
              <el-select  v-model="formEditOneEmp.emptype"  placeholder="请选择职业" filterable style="width: 65%" clearable @clear="resetEmptypeForEdit">
                <el-option label="金桥毕业后入职" value="1" @click.native="setEmptypeForEdit"></el-option>
                <el-option label="直接入职" value="2"  @click.native="setEmptype1ForEdit"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别：">
              <el-radio-group v-model="formEditOneEmp.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="出生日期：" prop="birthday">
              <el-date-picker type="date" placeholder="选择日期" style="width: 65%"
                              v-model="formEditOneEmp.birthday"></el-date-picker>
            </el-form-item>
            <el-form-item label="籍贯：" prop="address">
              <el-input v-model="formEditOneEmp.address" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="是否婚配：">
              <el-radio-group v-model="formEditOneEmp.isMarry">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="联系电话：" prop="tel">
              <el-input v-model.number="formEditOneEmp.tel" autocomplete="off" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="idNum">
              <el-input type="text" v-model="formEditOneEmp.idNum" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="毕业院校：" prop="school">
              <el-input type="text" v-model="formEditOneEmp.school" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="专业：" prop="major">
              <el-input type="text" v-model="formEditOneEmp.major" style="width: 65%"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="formEditOneEmp.remarks" style="width: 65%"></el-input>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="9"><div ><span style="color: transparent">hh</span></div></el-col>
            <el-col :span="6"><div >
              <el-button type="primary" @click="onSubmit()">保存</el-button>
              <el-button @click="dialogEditOneEmp = false">取 消</el-button>
            </div></el-col>
            <el-col :span="9"><div ><span style="color: transparent">hh</span></div></el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">

        </span>
        </div>


      </el-dialog>

      <!--删除-->
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
      name: "ClerkAdministration",
      data(){
        var checkdeptno = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('部门不能为空'))
          } else {
            callback()
          }
        };
        return{

          dialogDelete:false,
          dialogAddOneEmp:false,
          dialogEditOneEmp:false,
          formForSearch:{
            currentPage:1, //初始页
            pagesize:5,    //    每页的数据
            deptNo:'',
            queryEname:'',
          },

          formDelete:{
            empno:'',
            ename:'',
          },
          formAddOneEmp:{
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
            deptno:'',
            emptype:'',
            role:''
          },

          formEditOneEmp:{
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
            cname:'',
            role:''
          },
          rulesEAdmin:{
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
            class_num:[
              { required: true, message: '请选择班期！', trigger: 'blur' },
            ],
            school:[
              { required: true,message: "请输入毕业院校", trigger: 'blur'}
            ],
            major:[
              { required: true,message:'请输入专业', trigger: 'blur'}
            ],
            deptno:[
              { required: true,message:'请选择部门', trigger: 'blur'},
              { validator: checkdeptno, trigger: 'blur' }
            ],
            emptype:[
              { required: true,message:'请选择员工类型', trigger: 'blur'}
            ]
          },

          rulesEAdmin1:{
            ename:[
              { required: true, message: "请输入姓名", trigger: 'blur'},
              { min: 2, max: 10,message: "最少两个字符", trigger: 'blur'}
            ],
            address:[
              { message: '请输入籍贯地址', trigger: 'blur' }
            ],
            tel:[
              {required:false, message: '请输入手机号', trigger: 'blur' },
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
              this.getEmpListByDeptnAndEname();
              this.getTableData();
              this.$notify({
                title: 'success',
                message: '员工删除成功！',
                type: 'success',
                position:'top-left'
              });

            } else {
              this.dialogDelete=false;
              this.getEmpListByDeptnAndEname();
              this.getTableData();
              this.$notify.error({
                title: 'error',
                message: '员工删除失败！',
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
        handleAddOneEmp:function(){
          this.dialogAddOneEmp=true;
        },
        handleEditEmp:function(index,row){
          this.dialogEditOneEmp=true;
          var empno = row.empno;
          axios.get("http://localhost:8080/getMessage/" + empno).then(res => {
            this.formEditOneEmp = res.data;
            //var classNo = res.data.class_num;
            //this.$store.dispatch("setClassNo", classNo);
          })
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
                  data:this.formEditOneEmp
                }).then(res =>{
                  this.dialogEditOneEmp=false;
                  if ("success" === res.data) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    });
                    this.getEmpListByDeptnAndEname();
                    this.getTableData();
                  }else {
                    this.$message({
                      type: 'info',
                      message: '服务器响应失败'
                    });
                  }
                });
              }).catch(() => {
                this.dialogEditOneEmp=false;
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
        searchEmp:function(){
          this.formForSearch.currentPage=1;//解决小bug
          this.getEmpListByDeptnAndEname();
          this.getTableData();
        },
        setQueryEname:function(){
          this.formForSearch.queryEname='';
          this.getEmpListByDeptnAndEname();
          this.getTableData();
        },
        resetDeptno:function(){
          this.formForSearch.deptNo='';
          this.getTableData();
          this.getEmpListByDeptnAndEname();
        },
        resetDeptnoForAdd:function(){
          this.formAddOneEmp.deptno='';
        },
        resetDeptnoForEdit:function(){
          this.formEditOneEmp.deptno='';
        },
        setDeptNo:function(val,val2){
          this.formForSearch.currentPage=1;
          this.formForSearch.deptNo=val;
          //this.dName=val2;
          this.getTableData();
          this.getEmpListByDeptnAndEname()
        },
        setDeptNoForAdd:function(val,val2){
          this.formAddOneEmp.deptno=val;
        },
        setDeptNoForEdit:function(val,val2){
          this.formEditOneEmp.deptno=val;
        },
        addOneNewEmp:function(){
          this.$refs.form.validate((valid) => {
            if (valid){
              //提交
              this.$confirm('确认新增员工吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                axios({
                  //formdata提交
                  method: 'post',
                  url: '/addOneNewEmp',
                  data: this.formAddOneEmp
                }).then(res => {
                  if (res.data=='success'){
                    this.dialogAddOneEmp=false;
                    this.getEmpListByDeptnAndEname();
                    this.getTableData();
                    this.$notify({
                      title: 'success',
                      message: '员工新增成功！',
                      type: 'success',
                      position:'top-left'
                    });

                  } else {
                    this.dialogAddOneEmp=false;
                    this.getEmpListByDeptnAndEname();
                    this.getTableData();
                    this.$notify.error({
                      title: 'error',
                      message: '员工新增失败！',
                      type: 'error',
                      position:'top-left'
                    });
                  }

                });
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
        getTableData:function () {
          axios({
            //formdata提交
            method: 'post',
            url: '/getEmpJxdTableData',
            data: this.formForSearch
          }).then((res) => {
            this.totalTableData=res.data;
          });
        },
        getEmpListByDeptnAndEname:function(){
          axios({
            //formdata提交
            method: 'post',
            url: '/getEmpListByDeptnAndEname',
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
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
          this.formForSearch.pagesize = size;
          this.getEmpListByDeptnAndEname();
          console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
          this.formForSearch.currentPage = currentPage;
          this.getEmpListByDeptnAndEname();
          console.log(this.currentPage)  //点击第几页
        },
        getClassListForFormSelect:function(){
          axios.get("/getClassListForAddFormSelect").then(res => {
            this.classListForSelect = res.data;
          });
        },
        setRoleNoForEdit:function(){
          this.formEditOneEmp.role='STUDENT';
        },
        setRoleNo1ForEdit:function(){
          this.formEditOneEmp.role='TEACHER';
        },
        setRoleNo2ForEdit:function(){
          this.formEditOneEmp.role='CLERK';
        },
        setRoleNo3ForEdit:function(){
          this.formEditOneEmp.role='MANAGER';
        },
        setRoleNo:function(){
          this.formAddOneEmp.role='STUDENT';
        },
        setRoleNo1:function(){
          this.formAddOneEmp.role='TEACHER';
        },
        setRoleNo2:function(){
          this.formAddOneEmp.role='CLERK';
        },
        setRoleNo3:function(){
          this.formAddOneEmp.role='MANAGER';
        },
        resetRoleNo:function(){
          this.formAddOneEmp.role='';
        },
        resetRoleNoForEdit:function(){
          this.formEditOneEmp.role='';
        },

        //新增员工，员工类型下拉框
        setEmptype:function () {
          this.formAddOneEmp.emptype='1'
        },
        setEmptype1:function () {
          this.formAddOneEmp.emptype='2'
        },
        resetEmptype:function () {
          this.formAddOneEmp.emptype=''
        },

        //编辑员工，员工类型下拉框
        setEmptypeForEdit:function () {
          this.formAddOneEmp.emptype='1'
        },
        setEmptype1ForEdit:function () {
          this.formAddOneEmp.emptype='2'
        },
        resetEmptypeForEdit:function () {
          this.formAddOneEmp.emptype=''
        },


        setAddEmpCNo:function(val){
          this.formAddOneEmp.class_num=val;
        },
        resetAddEmpCNo:function(){
          this.formAddOneEmp.class_num='';
        },
      },
      mounted() {
        this.getTableData();
        this.getScoreTableData();
        this.getDeptTableForSelect();
        this.getEmpListByDeptnAndEname();
        this.getClassListForFormSelect();
      },
      created() {

      }
    }
</script>

<style scoped>

</style>
