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

        <el-input v-model="formForSearch.querySname" style="width: 230px" type="text" clearable placeholder="请输入学生姓名"
                  @clear="setQuerySname" @keyup.enter.native="searchStudent" @keyup.delete.native="searchStudent"></el-input>


        <el-button type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>

      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">
        <span style="color: transparent">hh</span>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-button type="primary" @click="handleAddOneStudent" >新增学生<i class="el-icon-plus"></i></el-button>
      <!--  <el-button type="primary" @click="handleExportTab" >导出</el-button>
        <el-button type="primary" @click="handleImportTab" >导入</el-button>-->
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
        width="356">
        <template slot-scope="scope">

          <el-button
            size="mini"
            type="warning"
            @click="handleRegularStudent(scope.$index, scope.row)">转正</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEditStudentInfo(scope.$index, scope.row)">修改信息</el-button>
         <!-- <el-button
            size="mini"
            type="primary"
            @click="handleEditStudentCmt(scope.$index, scope.row)">修改评价</el-button>-->
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

    <!--新增学生对话框-->
    <el-dialog
      title="新增学生"
      :visible.sync="dialogAddStudent"
      width="45%"
      top="1%"
    >

      <div class="dialog-gy">
        <el-form ref="form" :rules="rulesSAdmin" :model="formAddOneStudent" label-width="100px">

          <el-form-item label="姓名：" prop="ename">
            <el-input v-model.trim="formAddOneStudent.ename" style="width: 65%"></el-input>
          </el-form-item>
          <el-form-item label="班期：" prop="class_num">
            <el-select  v-model="formAddOneStudent.class_num"  placeholder="请选择班级"  filterable style="width: 65%" clearable @clear="resetAddStuCNo">
              <el-option
                @click.native="setAddStuCNo(item.cNo)"
                v-for="item in classListForSelect"
                :key="item.cNo"
                :label="item.cname"
                :value="item.cNo">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="部门：">
            <el-input type="text" v-model="DEPTNAME" style="width: 65%" readonly></el-input>
          </el-form-item>
          <el-form-item label="职务：">
            <el-input type="text" v-model="formAddOneStudent.role" style="width: 65%" readonly></el-input>
          </el-form-item>
          <el-form-item label="员工类型：">
            <el-input type="text" v-model="formAddOneStudent.emptype" style="width: 65%" readonly></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="formAddOneStudent.remarks" style="width: 65%"></el-input>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="9"><div ><span style="color: transparent">hh</span></div></el-col>
          <el-col :span="6"><div >
            <el-button type="primary" @click="addOneNewStudent">保存</el-button>
            <el-button @click="dialogAddStudent = false">取 消</el-button>
          </div></el-col>
          <el-col :span="9"><div ><span style="color: transparent">hh</span></div></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">

        </span>
      </div>
    </el-dialog>
    <!--转正对话框-->
    <el-dialog
      title="学生转正"
      :visible.sync="dialogRegular"
      width="30%"
    >
      <span>{{formStudentForRegular.ename}}同学经考核已达到毕业的标准，可进行转正</span>
      <br>
      <el-form  :model="formStudentForRegular" label-width="100px">
      <el-form-item label="部门：">
      <el-select  v-model="dName"  placeholder="请选择部门"  filterable style="width: 65%" clearable @clear="resetDeptno">
        <el-option
          @click.native="setDeptNo(item.deptno,item.dname)"
          v-for="item in deptTableForSelect"
          :key="item.deptno"
          :label="item.dname"
          :value="item.deptno">
        </el-option>
      </el-select>
      </el-form-item>
        <el-form-item label="部门编号：">
          <el-input v-model.trim="formStudentForRegular.deptno" style="width: 65%" readonly></el-input>
        </el-form-item>
      <el-form-item label="职业：">
        <el-input v-model.trim="formStudentForRegular.role" style="width: 65%" readonly></el-input>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="regularOneStudent">确 定</el-button>
        <el-button @click="dialogRegular = false">取 消</el-button>
        </span>
    </el-dialog>

    <!--转正失败-->
    <el-dialog
      title="error"
      :visible.sync="dialogRegularFailed"
      width="30%"
    >
      <span>{{formStudentForRegular.ename}}的毕业考核成绩未达标，无法转正</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogRegularFailed = false">确 定</el-button>
        </span>
    </el-dialog>

    <!--修改个人信息-->
    <el-dialog
      title="修改信息"
      :visible.sync="dialogEditBaseInfo"
      width="50%"
      top="1%"
    >
      <div class="dialog-gy2">
        <el-form ref="form" :rules="rulesSAdmin1" :model="formEditOneStudent" label-width="100px">
          <el-form-item label="工号：">
            <el-input readonly v-model="formEditOneStudent.empno" style="width: 65%"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="ename">
            <el-input v-model.trim="formEditOneStudent.ename" style="width: 65%"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="formEditOneStudent.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="出生日期：" prop="birthday">
            <el-date-picker type="date" placeholder="选择日期" style="width: 65%"
                            v-model="formEditOneStudent.birthday"></el-date-picker>
          </el-form-item>
          <el-form-item label="籍贯：" prop="address">
            <el-input v-model="formEditOneStudent.address" style="width: 65%"></el-input>
          </el-form-item>
          <el-form-item label="是否婚配：">
            <el-radio-group v-model="formEditOneStudent.isMarry">
              <el-radio label="是">是</el-radio>
              <el-radio label="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系电话：" prop="tel">
            <el-input v-model.number="formEditOneStudent.tel" autocomplete="off" style="width: 65%"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idNum">
            <el-input type="text" v-model="formEditOneStudent.idNum" style="width: 65%"></el-input>
          </el-form-item>
          <el-form-item label="毕业院校：" prop="school">
            <el-input type="text" v-model="formEditOneStudent.school" style="width: 65%"></el-input>
          </el-form-item>
          <el-form-item label="专业：" prop="major">
            <el-input type="text" v-model="formEditOneStudent.major" style="width: 65%"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="formEditOneStudent.remarks" style="width: 65%"></el-input>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="9"><div ><span style="color: transparent">hh</span></div></el-col>
          <el-col :span="6"><div >
            <el-button type="primary" @click="onSubmit()">保存</el-button>
            <el-button @click="dialogEditBaseInfo = false">取 消</el-button>
          </div></el-col>
          <el-col :span="9"><div ><span style="color: transparent">hh</span></div></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">

        </span>
      </div>


    </el-dialog>

    <!--修改个人评价-->
    <el-dialog
      title="修改评价"
      :visible.sync="dialogCmt"
      width="55%"
      top="1%"
    >

      <div class="dialog-gy">
        <el-row  style="height: 36px">
          <el-col :span="24" align="center" ><div class="grid-content bg-purple-dark"><h1>培训学校评价</h1></div></el-col>
        </el-row>
      <div class="div-gy">
        <el-row>
          <el-col :span="24"><div>
            <el-table
              :data="userSchoolData"
            >
              <el-table-column
                prop="cname"
                label="班期"
              >
              </el-table-column>
              <el-table-column

                prop="ename"
                label="评价人"
              >
              </el-table-column>

              <el-table-column label="培训期间测试成绩" align="center">
                <el-table-column
                  v-for="item in scoreTableData"
                  :key="item.courseId"
                  :label="item.courseName"

                  :prop="item.courseName">
                </el-table-column>
              </el-table-column>

              <el-table-column
                prop="school_cmt"
                label="整体评价分数"
              >
              </el-table-column>

            </el-table>

          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"  align="center"><div class="bg-gy grid-content bg-purple-gy"><span>评价（包括主要优点及缺陷）</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input type="textarea" v-model="a"></el-input>
          </el-col>
        </el-row>
      </div> <br>

        <el-card class="card-gy">
          <el-row  style="height: 36px">
            <el-col :span="24" align="center" ><div class="grid-content bg-purple-dark"><h1>转正工作评价</h1></div></el-col>
          </el-row>
          <div class="div-gy">
            <el-row>
              <el-col :span="24"><div>
                <el-table

                  :data="userSchoolData"
                >


                  <el-table-column
                    prop="cname"
                    label="班期"
                  >
                  </el-table-column>
                  <el-table-column

                    prop="ename"
                    label="评价人"
                  >
                  </el-table-column>

                  <el-table-column label="培训期间测试成绩" align="center">
                    <el-table-column
                      v-for="item in commentTableData"
                      :key="item.commentId"
                      :label="item.commentName"

                      :prop="item.commentName">
                    </el-table-column>
                  </el-table-column>

                  <el-table-column
                    prop="school_cmt"
                    label="整体评价分数"
                  >
                  </el-table-column>

                </el-table>

              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"  align="center"><div class="bg-gy grid-content bg-purple-gy"><span>评价（包括主要优点及缺陷）</span></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-input type="textarea" v-model="a"></el-input>
              </el-col>
            </el-row>
          </div>
        </el-card>

        <el-card class="card-gy">
          <el-row  style="height: 36px">
            <el-col :span="24" align="center" ><div class="grid-content bg-purple-dark"><h1>转正工作评价</h1></div></el-col>
          </el-row>
          <div class="div-gy">
            <el-row>
              <el-col :span="24"><div>
                <el-table

                  :data="userSchoolData"
                >


                  <el-table-column
                    prop="cname"
                    label="班期"
                  >
                  </el-table-column>
                  <el-table-column

                    prop="ename"
                    label="评价人"
                  >
                  </el-table-column>

                  <el-table-column label="培训期间测试成绩" align="center">
                    <el-table-column
                      v-for="item in commentTableData"
                      :key="item.commentId"
                      :label="item.commentName"

                      :prop="item.commentName">
                    </el-table-column>
                  </el-table-column>

                  <el-table-column
                    prop="school_cmt"
                    label="整体评价分数"
                  >
                  </el-table-column>

                </el-table>

              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"  align="center"><div class="bg-gy grid-content bg-purple-gy"><span>评价（包括主要优点及缺陷）</span></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-input type="textarea" v-model="a"></el-input>
              </el-col>
            </el-row>
          </div>
        </el-card>

        <el-row  style="height: 36px">
          <el-col :span="24" align="center" ><div class="grid-content bg-purple-dark"><h1>工作2年工作评价</h1></div></el-col>
        </el-row>
        <div class="div-gy">
          <el-row>
            <el-col :span="24"><div>
              <el-table

                :data="userSchoolData"
              >


                <el-table-column
                  prop="cname"
                  label="班期"
                >
                </el-table-column>
                <el-table-column

                  prop="ename"
                  label="评价人"
                >
                </el-table-column>

                <el-table-column label="培训期间测试成绩" align="center">
                  <el-table-column
                    v-for="item in commentTableData"
                    :key="item.commentId"
                    :label="item.commentName"

                    :prop="item.commentName">
                  </el-table-column>
                </el-table-column>

                <el-table-column
                  prop="school_cmt"
                  label="整体评价分数"
                >
                </el-table-column>

              </el-table>

            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"  align="center"><div class="bg-gy grid-content bg-purple-gy"><span>评价（包括主要优点及缺陷）</span></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-input type="textarea" v-model="a"></el-input>
            </el-col>
          </el-row>
        </div>

        <el-row  style="height: 36px">
          <el-col :span="24" align="center" ><div class="grid-content bg-purple-dark"><h1>工作3年工作评价</h1></div></el-col>
        </el-row>
        <div class="div-gy">
          <el-row>
            <el-col :span="24"><div>
              <el-table

                :data="userSchoolData"
              >


                <el-table-column
                  prop="cname"
                  label="班期"
                >
                </el-table-column>
                <el-table-column

                  prop="ename"
                  label="评价人"
                >
                </el-table-column>

                <el-table-column label="培训期间测试成绩" align="center">
                  <el-table-column
                    v-for="item in commentTableData"
                    :key="item.commentId"
                    :label="item.commentName"

                    :prop="item.commentName">
                  </el-table-column>
                </el-table-column>

                <el-table-column
                  prop="school_cmt"
                  label="整体评价分数"
                >
                </el-table-column>

              </el-table>

            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"  align="center"><div class="bg-gy grid-content bg-purple-gy"><span>评价（包括主要优点及缺陷）</span></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-input type="textarea" v-model="a"></el-input>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="9"><div ><span style="color: transparent">hh</span></div></el-col>
          <el-col :span="6"><div >
            <el-button type="primary" @click="">保存</el-button>
            <el-button @click="dialogCmt = false">取 消</el-button>
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
        name: "studentAdministration",
        data(){
          /*var checkIdNum = (rule, value, callback) => {
            const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
            if (!value) {
              return callback(new Error('证件号码不能为空'))
            } else if (!reg.test(value)) {
              return callback(new Error('证件号码不正确'))
            } else {
              callback()
            }
          };*/
          return{


            dialogDelete:false,//删除学生
            dName:'',
            DEPTNAME:'金桥培训',
            a:'',
            deptTableForSelect:[],
            userSchoolData:[],
            userRegularData:[],
            userRegular1Data:[],
            userRegular2Data:[],
            userRegular3Data:[],
            dialogRegularFailed:false,//转正失败
            dialogAddStudent:false,//新增学生
            dialogEditBaseInfo:false,//编辑学生
            dialogCmt:false,
            dialogRegular:false,//学生转正
            className:'',


            formAddOneStudent:{
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
              emptype:1,
              role:'STUDENT'
            },
            formEditOneStudent:{
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

            formDelete:{
              empno:'',
              ename:'',
            },

            formStudentForRegular:{
              empno:'',
              ename:'',
              school_cmt:'',
              role:'CLERK',
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
            commentTableData:[],
            classListForSelect:[],

            rulesSAdmin:{
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
              /*idNum:[
                { required: true, message: "请输入身份证号", trigger: "blur" },
                { validator: checkIdNum, trigger: 'blur' }
              ],*/
              school:[
                { required: true,message: "请输入毕业院校", trigger: 'blur'}
              ],
              major:[
                { required: true,message:'请输入专业', trigger: 'blur'}
              ]
            },

            rulesSAdmin1:{
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

          }
        },
        methods:{
         /* handleExportTab:function(){
            axios.get("/exportEmp").then(res => {

            })
          },
          handleImportTab:function(){

          },*/
          confirmDeleteOne:function(){
            axios({
              method: 'post',
              url: '/deleteThisOne',
              data: this.formDelete
            }).then(res => {
              if (res.data=='success'){
                this.dialogDelete=false;
                this.getTableData();
                this.getStudentListByClassNumAndEname();
                this.$notify({
                  title: 'success',
                  message: '学生删除成功！',
                  type: 'success',
                  position:'top-left'
                });

              } else {
                this.dialogDelete=false;
                this.getStudentListByClassNumAndEname();
                this.getTableData();
                this.$notify.error({
                  title: 'error',
                  message: '学生删除失败！',
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
          resetDeptno:function(){
            this.formStudentForRegular.deptno='';
          },
          setDeptNo:function(val,val2){
            this.formStudentForRegular.deptno=val;
            this.formStudentForRegular.dname=val2
          },

          //学生转正
          regularOneStudent:function(){
            axios({
              //formdata提交
              method: 'post',
              url: '/regularOneNewStudent',
              data: this.formStudentForRegular
            }).then(res => {
              if (res.data=='success'){
                this.dialogRegular=false;
                this.getStudentListByClassNumAndEname();
                this.getTableData();
                this.$notify({
                  title: 'success',
                  message: '学生转正成功！',
                  type: 'success',
                  position:'top-left'
                });

              } else {
                this.dialogRegular=false;
                this.getStudentListByClassNumAndEname();
                this.getTableData();
                this.$notify.error({
                  title: 'error',
                  message: '学生转正失败！',
                  type: 'error',
                  position:'top-left'
                });
              }

            });
          },
          addOneNewStudent:function(){
            this.$refs.form.validate((valid) => {
              if (valid){
                //提交
                this.$confirm('确认新增学生吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  axios({
                    //formdata提交
                    method: 'post',
                    url: '/addOneNewStudent',
                    data: this.formAddOneStudent
                  }).then(res => {
                    if (res.data=='success'){
                      this.dialogAddStudent=false;
                      this.getTableData();
                      this.$notify({
                        title: 'success',
                        message: '学生新增成功！',
                        type: 'success',
                        position:'top-left'
                      });

                    } else {
                      this.dialogAddStudent=false;
                      this.getTableData();
                      this.$notify.error({
                        title: 'error',
                        message: '学生新增失败！',
                        type: 'error',
                        position:'top-left'
                      });
                    }

                  });
                  this.getTableData();
                  this.getStudentListByClassNumAndEname();
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
          setAddStuCNo:function(val){
            this.formAddOneStudent.class_num=val;
          },
          resetAddStuCNo:function(){
            this.formAddOneStudent.class_num='';
          },

          handleAddOneStudent:function(){
            this.dialogAddStudent=true;
          },

          /*得到待修改的学生的信息*/
          handleEditStudentInfo:function(index,row){
            this.dialogEditBaseInfo=true;
            var empno = row.empno;
            axios.get("http://localhost:8080/getMessage/" + empno).then(res => {
              this.formEditOneStudent = res.data;
              //var classNo = res.data.class_num;
              //this.$store.dispatch("setClassNo", classNo);
            })
          },
          handleEditStudentCmt:function(index,row){
            this.dialogCmt=true;
          },
          setQuerySname:function(){
            this.formForSearch.querySname='';
            this.getStudentListByClassNumAndEname();
            this.getTableData();
          },
          setClassName:function(val){
            this.formForSearch.classNumForSelect='';
            this.getStudentListByClassNumAndEname();
            this.getTableData();
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
            this.getTableData();
          },
          searchStudent:function(){
            this.formForSearch.currentPage=1;//每次点查询，结果从第一页开始，防止小bug
            this.getStudentListByClassNumAndEname();
            this.getTableData();
          },
          handleRegularStudent:function(index,row){
            this.formStudentForRegular.empno=row.empno;
            this.formStudentForRegular.ename=row.ename;
            this.formStudentForRegular.school_cmt=row.school_cmt;
            var score=row.school_cmt;
            if (score<60){
              this.dialogRegularFailed=true;
            }else {
              this.dialogRegular=true;
            }

          },
          getTableData:function () {
            axios({
              //formdata提交
              method: 'post',
              url: '/getStudentTableData',
              data: this.formForSearch
            }).then((res) => {
              this.totalTableData=res.data;
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
                    data:this.formEditOneStudent
                  }).then(res =>{
                    this.dialogEditBaseInfo=false;
                    if ("success" === res.data) {
                      this.$message({
                        type: 'success',
                        message: '修改成功'
                      });
                      this.getStudentListByClassNumAndEname();
                      this.getTableData();
                    }else {
                      this.$message({
                        type: 'info',
                        message: '服务器响应失败'
                      });
                    }
                  });
                }).catch(() => {
                  this.dialogEditBaseInfo=false;
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
          getClassListForAddFormSelect:function(){
            axios.get("/getClassListForAddFormSelect").then(res => {
              this.classListForSelect = res.data;
            });
          },
          getCommentTableData:function () {
            axios.get("/getCommentListGY").then(res => {
              this.commentTableData=res.data;
            })
          },
          getClassListForSelect:function(){
            axios.get("/getClassListForSelect").then(res => {
              this.classListForSelect= res.data;
            });
          },
          getDeptTableForSelect:function () {
            axios.get("/getDeptTableForSelect").then(res => {
              this.deptTableForSelect=res.data;
            })
          },

        },
        mounted() {
          this.getTableData();
          this.getScoreTableData();
          this.getCommentTableData();
          this.getClassListForSelect();
          this.getStudentListByClassNumAndEname();
          this. getClassListForAddFormSelect();
          this.getDeptTableForSelect();
        },
        created() {

        },
    }
</script>

<style scoped>

  .dialog-gy{
    height: 80vh;
    overflow: auto;

  }
  .dialog-gy2{
    height: 81vh;
    overflow: auto;

  }
  .div-gy{
    border: solid 1px #909399;
  }
  .bg-gy {
    color: #909399;
    font-weight: bold;
  }
  .bg-purple-gy {
    background: #F5F7FA;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .grid-content {
    min-height: 36px;
  }
</style>
