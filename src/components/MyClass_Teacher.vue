<template>
  <div>
    <div>
      <h1>我的班级</h1>
    </div>

    <!--查询-->
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="工号">
          <el-input v-model="formInline.empno" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formInline.ename" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.cno" placeholder="班级"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSelect">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        empty-text="当前班级无学员"
        :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
        @selection-change="handleSelectionChange"
        height="450"
        style="width: 100%">
        <el-table-column
          prop="empno"
          label="学员编号"
        >
        </el-table-column>
        <el-table-column
          prop="ename"
          label="学员姓名"
        >
        </el-table-column>
        <el-table-column
          prop="cname"
          label="班级"
        >
        </el-table-column>
        <el-table-column
          prop="dname"
          label="部门"
        >
        </el-table-column>
        <el-table-column label="操作">d
          <template slot-scope="scope">
            <el-button
              @click="handleViewInfo(scope.$index,scope.row)" type="primary" style="margin-left: 16px;">查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination align='center'
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[4,8]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="tableData.length">
      </el-pagination>


      <!--查看详细信息-->
      <el-drawer
        title="个人信息"
        :visible.sync="drawer"
        :direction="rtl"
        :size="size"
        :before-close="handleClose">
        <div>

          <table>
            <!--第一行-->
            <tr>
              <td>
                <el-table
                  :data="tableData2">
                  <el-table-column
                    prop="empno"
                  label="工号">
                  </el-table-column>
                </el-table>
              </td>
              <td>
                <el-table
                :data="tableData2">
                  <el-table-column
                  prop="ename"
                  label="姓名">
                  </el-table-column>
                </el-table>
              </td>
              <td>
                <el-table
                  :data="tableData2">
                  <el-table-column
                    prop="sex"
                    label="性别">
                  </el-table-column>
                </el-table>
              </td>
              <td width="180">
                <el-table
                  :data="tableData2">
                  <el-table-column
                    prop="birthday"
                    label="生日">
                  </el-table-column>
                </el-table>
              </td>
            </tr>
            <!--第二行-->
            <tr>
              <td>
                <el-table
                  :data="tableData2">
                  <el-table-column
                    prop="address"
                    label="地址">
                  </el-table-column>
                </el-table>
              </td>
              <td>
                <el-table
                  :data="tableData2">
                  <el-table-column
                    prop="isMarry"
                    label="是否已婚">
                  </el-table-column>
                </el-table>
              </td>
              <td>
                <el-table
                  :data="tableData2">
                  <el-table-column
                    prop="school"
                    label="学校">
                  </el-table-column>
                </el-table>
              </td>
              <td>
                <el-table
                  :data="tableData2">
                  <el-table-column
                    prop="major"
                    label="专业">
                  </el-table-column>
                </el-table>
              </td>
            </tr>
            <tr>
              <td>
                <el-table
                  :data="tableData2">
                  <el-table-column
                    prop="tel"
                    label="电话">
                  </el-table-column>
                </el-table>
              </td>
              <td width="150">
                <el-table
                  :data="tableData2">
                  <el-table-column
                    prop="idNum"
                    label="身份证">
                  </el-table-column>
                </el-table>
              </td>
              <td>
                <el-table
                  :data="tableData2">
                  <el-table-column
                    prop="remarks"
                    label="是否已婚">
                  </el-table-column>
                </el-table>
              </td>
              <td>
                <el-table
                  :data="tableData2">
                  <el-table-column
                    prop="dname"
                    label="部门">
                  </el-table-column>
                </el-table>
              </td>
            </tr>
          </table>
            <table>
            <!--第三行-->
            <tr>
              <td>
                <el-table
                :data="score1">
                  <el-table-column
                  prop="score"
                  label="html"
                  width="60">
                  </el-table-column>
                </el-table>
              </td>
              <td>
                <el-table
                  :data="score2">
                  <el-table-column
                    prop="score"
                    label="oracle"
                    width="65">
                  </el-table-column>
                </el-table>
              </td>
              <td>
                <el-table
                  :data="score3">
                  <el-table-column
                    prop="score"
                    label="JS笔试"
                    width="65">
                  </el-table-column>
                </el-table>
              </td>
              <td>
                <el-table
                  :data="score4">
                  <el-table-column
                    prop="score"
                    label="java基础笔试"
                  width="110">
                  </el-table-column>
                </el-table>
              </td>
              <td>
                <el-table
                  :data="score5">
                  <el-table-column
                    prop="score"
                    label="java高级笔试"
                  width="110">
                  </el-table-column>
                </el-table>
              </td>
              <td>
                <el-table
                  :data="score6">
                  <el-table-column
                    prop="score"
                    label="L1面试"
                    width="65">
                  </el-table-column>
                </el-table>
              </td>
            </tr>
          </table>
<!--          <el-row style="height: 36px">
            <el-col :span="24" align="center">
              <div class="grid-content bg-purple-dark"><h1>培训学校评价</h1></div>
            </el-col>
          </el-row>
          <div class="div-gy">
            <el-row>
              <el-col :span="24">
                <div>
                  <el-table
                    :data="tableData2"
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
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" align="center">
                <div class="bg-gy grid-content bg-purple-gy"><span>评价（包括主要优点及缺陷）</span></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-input type="textarea" v-model="a"></el-input>
              </el-col>
            </el-row>
          </div>
          <br>-->

        </div>
      </el-drawer>
      <!--以上为查看内容-->

      <!--外层主表-->
      <!--    <el-table-column
            prop="cno"
            label="班级编号"
            width="180"
            v-model="asd"
          >
          </el-table-column>
          <el-table-column
            prop="cname"
            label="班级名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ename"
            label="任课老师">
          </el-table-column>-->

      <!--    <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
            <el-button @click="watch(scope.row)" type="text" size="small" id="view">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
          </el-table-column>-->


    </div>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    name: "MyClass_Teacher",
    data() {
      return {
        tableData: [],
        tableData2: [],
        drawer: false,
        direction: 'rtl',
        size: '550px',
        stuInfo: [],
        asd: 1,
        empno1: "",


        pagesize: 4,
        currpage: 1,
        formInline: {
          empno: '',
          ename: '',
          cno: ''
        },
        form: {
          empno: '',
          ename: '',
          sex: '',
          birthday: '',
          address: '',
          isMarry: '',
          tel: '',
          idNum: '',
          school: '',
          major: '',
          remarks: '',
          cname: ''
        },
        score1:'',
        score2:'',
        score3:'',
        score4:'',score5:'',score6:'',score7:'',



      }
    },
    watch: {},
    methods: {

      /*获取所有的class*/
      getStuByTeacher: function () {
        var uid = this.$store.state.uid;
        axios.get("http://localhost:8080/showStu/" + uid).then(res => {
          this.tableData = res.data;
        })
      },
      handleViewInfo(index, row) {
        this.drawer = true;
        this.empno1 = row.empno;
        this.getStuInfo();
        this.getScore1();this.getScore2();this.getScore3();this.getScore4();this.getScore5();this.getScore6();
      },
      /*个人基本信息*/
      getStuInfo: function () {
        var empno = this.empno1;
        axios.get("http://localhost:8080/showStuInfo/" + empno).then(res => {
          this.tableData2 = res.data;
          ;
        })
      },
      getScore1:function(){
        var empno = this.empno1;
        var courseid1 = 1;
        axios.get("http://localhost:8080/getScoreByEmpno/"+empno+"/"+courseid1).then(res =>{
          this.score1 = res.data;
        })
      },
      getScore2:function(){
        var empno = this.empno1;
        var courseid2 = 2;
        axios.get("http://localhost:8080/getScoreByEmpno/"+empno+"/"+courseid2).then(res =>{
          this.score2 = res.data;
        })
      },
      getScore3:function(){
        var empno = this.empno1;
        var courseid3 = 3;
        axios.get("http://localhost:8080/getScoreByEmpno/"+empno+"/"+courseid3).then(res =>{
          this.score3 = res.data;
        })
      },
      getScore4:function(){
        var empno = this.empno1;
        var courseid4 = 4;
        axios.get("http://localhost:8080/getScoreByEmpno/"+empno+"/"+courseid4).then(res =>{
          this.score4 = res.data;
        })
      },
      getScore5:function(){
        var empno = this.empno1;
        var courseid5 = 5;
        axios.get("http://localhost:8080/getScoreByEmpno/"+empno+"/"+courseid5).then(res =>{
          this.score5 = res.data;
        })
      },
      getScore6:function(){
        var empno = this.empno1;
        var courseid6 = 6;
        axios.get("http://localhost:8080/getScoreByEmpno/"+empno+"/"+courseid6).then(res =>{
          this.score6 = res.data;
        })
      },


      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      handleCurrentChange(cpage) {
        this.currpage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      handleSelectionChange(val) {
        console.log(val)
      },


      /*查询*/
      onSelect: function () {

        let uid = this.$store.state.uid;
        let empno_stu = this.formInline.empno;
        let ename = this.formInline.ename;
        let cno = this.formInline.cno;

        axios.get("http://localhost:8080/selectStu/" + uid + "/" + empno_stu + "/" + ename);
        if (cno != "") {
          let url = "getStuByClass";
          axios.get("http://localhost:8080/" + url + "/" + uid + "/" + cno).then(res => {
            this.tableData = res.data;
          })
        } else {

          if (empno_stu == "" && ename == "") {
            let url = "showStu";
            axios.get("http://localhost:8080/" + url + "/" + uid).then(res => {
              this.tableData = res.data;
            })
          }
          if (empno_stu != "" && ename == "") {
            let url = "selectStuByEmpno";
            axios.get("http://localhost:8080/" + url + "/" + uid + "/" + empno_stu).then(res => {
              this.tableData = res.data
            })
          }
          if (empno_stu == "" && ename != "") {
            let url = "selectStuByEname";
            axios.get("http://localhost:8080/" + url + "/" + uid + "/" + ename).then(res => {
              this.tableData = res.data
            })
          }

        }


      },

    },
    mounted() {
      this.getStuByTeacher();
      this.getStuInfo();
    }
  };

</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
