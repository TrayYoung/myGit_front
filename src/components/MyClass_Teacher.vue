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
          <el-button type="primary" icon="el-icon-search" @click="onSelect">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        empty-text="当前班级无学员"
        :data="tableData"
        height="250"
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
            <!--查看详细信息-->
            <el-drawer
              title="我是标题"
              :visible.sync="drawer"
              :direction="rtl"
              :before-close="handleClose">
              <div>
                <el-form ref="form" :model="form" label-width="100px">
                  <el-form-item label="工号：">
                    <el-input readonly v-model="form.empno" style="width: 65%"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名：">
                    <el-input readonly v-model="form.ename" style="width: 65%"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                      <el-radio disabled :label="男">男</el-radio>
                      <el-radio disabled :label="女">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="班期">
                    <el-input readonly v-model="form.cname" style="width: 65%"></el-input>
                  </el-form-item>
                  <el-form-item label="出生日期">
                    <el-date-picker type="date" placeholder="选择日期" readonly style="width: 65%"
                                    v-model="form.birthday"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="籍贯">
                    <el-input readonly v-model="form.address" style="width: 65%"></el-input>
                  </el-form-item>
                  <el-form-item label="是否婚配">
                    <el-radio-group v-model="form.isMarry">
                      <el-radio disabled :label="是">是</el-radio>
                      <el-radio disabled :label="否">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="联系电话">
                    <el-input readonly v-model="form.tel" autocomplete="off" style="width: 65%"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号">
                    <el-input readonly type="text" v-model="form.idNum" style="width: 65%"></el-input>
                  </el-form-item>
                  <el-form-item label="毕业院校">
                    <el-input readonly type="text" v-model="form.school" style="width: 65%"></el-input>
                  </el-form-item>
                  <el-form-item label="专业">
                    <el-input readonly type="text" v-model="form.major" style="width: 65%"></el-input>
                  </el-form-item>
                </el-form>
              </div>


            </el-drawer>
            <!--以上为查看内容-->
          </template>
        </el-table-column>
      </el-table>


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
        drawer: false,
        direction: 'rtl',
        stuInfo: [],
        asd: 1,
        empno1: "",
        formInline: {
          empno: '',
          ename: ''
        },
        form:{
          empno:'',
          ename:'',
          sex:'',
          birthday:'',
          address:'',
          isMarry:'',
          tel:'',
          idNum:'',
          school:'',
          major:'',
          remarks:'',
          cname:''
        }


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
      },
/*个人基本信息*/
      getStuInfo: function () {
        var empno = this.empno1;
        axios.get("http://localhost:8080/showStuInfo/" + empno).then(res => {
          this.form = res.data;;
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



      /*查询*/
      onSelect: function () {

        let uid = this.$store.state.uid;
        let empno_stu = this.formInline.empno;
        let ename = this.formInline.ename;

        axios.get("http://localhost:8080/selectStu/" + uid + "/" + empno_stu + "/" + ename);
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


      },

    },
    mounted() {
      this.getStuByTeacher();
      this.getStuInfo();
    }
  };

</script>

<style scoped>

</style>
