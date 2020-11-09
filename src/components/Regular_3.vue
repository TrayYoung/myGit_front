<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >

      <el-table-column
        label="工作3年工作评价"
        align="center">
        <el-table-column
          prop="empno"
          label="员工编号"
          sortable>
        </el-table-column>
        <el-table-column
          prop="ename"
          label="姓名">
        </el-table-column>
        <el-table-column
          label="员工部门"
          prop="dname">
        </el-table-column>

        <el-table-column
          label="员工职务"
          prop="role">
        </el-table-column>

        <el-table-column
          label="评价人"
          prop="mname">
        </el-table-column>

        <el-table-column
          label="评价分项">
          <el-table-column
            v-for="item in commentTableData"
            :key="item.commentId"
            :label="item.commentName"
            :prop="item.commentName">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="整体评价分数"
          prop="content_score"
        ></el-table-column>
        <el-table-column
          label="评价（包括主要优点及缺陷）"
          width="220px"
          prop="content_text"
        ></el-table-column>
        <el-table-column
          align="center"
          width="180">
          <template slot="header" slot-scope="scope">
            操作
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="testEmp(scope.row)">考核
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="showInfo(scope.row)">详细信息
            </el-button>
          </template>
        </el-table-column>


      </el-table-column>

    </el-table>


    <el-dialog title="打分" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form" :model="form" status-icon :rules="rules" class="demo-ruleForm">
        <el-form-item label="员工编号" :label-width="formLabelWidth">
          <el-input v-model="form.empno" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" :label-width="formLabelWidth">
          <el-input v-model="form.ename" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item v-for="(item,index) in commentTableData"
                      :key="item.commentId"
                      :label="item.commentName"
                      :prop="item.commentName"
                      :label-width="formLabelWidth"


        >
          <el-input placeholder="评分标准为100分制" v-model="form.data[index]"></el-input>
        </el-form-item>
        <el-form-item label="整体分数" :label-width="formLabelWidth" prop="content_score">
          <el-input v-model.number="form.content_score" autocomplete="off" placeholder="评分标准为100分制"></el-input>
        </el-form-item>
        <el-form-item label="评价（包括主要优点及缺陷）" :label-width="formLabelWidth" prop="content_score">
          <el-input type="textarea" v-model="form.content_text" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="详细信息" :visible.sync="showInfoVisible" width="90%">


      <el-table
        :data="empInfo"
        border
        style="width: 100%">
        <el-table-column
          prop="empno"
          label="员工编号">
        </el-table-column>
        <el-table-column
          prop="ename"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日">
        </el-table-column>
        <el-table-column
          prop="address"
          label="籍贯">
        </el-table-column>
        <el-table-column
          prop="isMarry"
          label="婚否">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="idNum"
          label="身份证号"
          width="170px">
        </el-table-column>
        <el-table-column
          prop="dname"
          label="所在部门"
          width="100">
        </el-table-column>
      </el-table>
      <!--转正评价-->
      <el-table
        :data="regular"
        border
        style="width: 100%">
        <el-table-column
          label="转正工作评价"
          align="center">
          <el-table-column
            prop="empno"
            label="员工编号"
            sortable>
          </el-table-column>
          <el-table-column
            prop="ename"
            label="姓名">
          </el-table-column>
          <el-table-column
            label="员工部门"
            prop="dname">
          </el-table-column>

          <el-table-column
            label="员工职务"
            prop="role">
          </el-table-column>

          <el-table-column
            label="评价人"
            prop="mname">
          </el-table-column>

          <el-table-column
            label="评价分项">
            <el-table-column
              v-for="item in commentTableData"
              :key="item.commentId"
              :label="item.commentName"
              :prop="item.commentName">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="整体评价分数"
            prop="content_score"
          ></el-table-column>
          <el-table-column
            label="评价（包括主要优点及缺陷）"
            width="220px"
            prop="content_text"
          ></el-table-column>
        </el-table-column>
      </el-table>
      <!--1年评价-->
      <el-table
        :data="regular1"
        border
        style="width: 100%">
        <el-table-column
          label="工作1年工作评价"
          align="center">
          <el-table-column
            prop="empno"
            label="员工编号"
            sortable>
          </el-table-column>
          <el-table-column
            prop="ename"
            label="姓名">
          </el-table-column>
          <el-table-column
            label="员工部门"
            prop="dname">
          </el-table-column>

          <el-table-column
            label="员工职务"
            prop="role">
          </el-table-column>

          <el-table-column
            label="评价人"
            prop="mname">
          </el-table-column>

          <el-table-column
            label="评价分项">
            <el-table-column
              v-for="item in commentTableData"
              :key="item.commentId"
              :label="item.commentName"
              :prop="item.commentName">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="整体评价分数"
            prop="content_score"
          ></el-table-column>
          <el-table-column
            label="评价（包括主要优点及缺陷）"
            width="220px"
            prop="content_text"
          ></el-table-column>
        </el-table-column>
      </el-table>
      <!--2年评价-->
      <el-table
        :data="regular2"
        border
        style="width: 100%">
        <el-table-column
          label="工作2年工作评价"
          align="center">
          <el-table-column
            prop="empno"
            label="员工编号"
            sortable>
          </el-table-column>
          <el-table-column
            prop="ename"
            label="姓名">
          </el-table-column>
          <el-table-column
            label="员工部门"
            prop="dname">
          </el-table-column>

          <el-table-column
            label="员工职务"
            prop="role">
          </el-table-column>

          <el-table-column
            label="评价人"
            prop="mname">
          </el-table-column>

          <el-table-column
            label="评价分项">
            <el-table-column
              v-for="item in commentTableData"
              :key="item.commentId"
              :label="item.commentName"
              :prop="item.commentName">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="整体评价分数"
            prop="content_score"
          ></el-table-column>
          <el-table-column
            label="评价（包括主要优点及缺陷）"
            width="220px"
            prop="content_text"
          ></el-table-column>
        </el-table-column>
      </el-table>

      <!--3年评价-->
      <el-table
        :data="regular3"
        border
        style="width: 100%">
        <el-table-column
          label="工作3年工作评价"
          align="center">
          <el-table-column
            prop="empno"
            label="员工编号"
            sortable>
          </el-table-column>
          <el-table-column
            prop="ename"
            label="姓名">
          </el-table-column>
          <el-table-column
            label="员工部门"
            prop="dname">
          </el-table-column>

          <el-table-column
            label="员工职务"
            prop="role">
          </el-table-column>

          <el-table-column
            label="评价人"
            prop="mname">
          </el-table-column>

          <el-table-column
            label="评价分项">
            <el-table-column
              v-for="item in commentTableData"
              :key="item.commentId"
              :label="item.commentName"
              :prop="item.commentName">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="整体评价分数"
            prop="content_score"
          ></el-table-column>
          <el-table-column
            label="评价（包括主要优点及缺陷）"
            width="220px"
            prop="content_text"
          ></el-table-column>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showInfoVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Regular",
    data() {
      return {
        ruleForm: {
          number: ''
        },
        rules: {
          content_score: [
            {required: true, message: '', trigger: 'blur'},
          ]
        },
        dialogFormVisible: false,
        showInfoVisible: false,
        tableData: [],
        empInfo: [],
        regular:[],
        regular1:[],
        regular2:[],
        regular3:[],
        dialog: false,
        formLabelWidth: '100px',
        form: {
          empno: '',
          ename: '',
          content_score: '',
          content_text: '',
          data: {},
          score1: '',
          score2: '',
          score3: '',
          score4: '',
          score5: '',
          year: 3,
        },
        commentTableData: [],
      }
    },
    methods: {
      getRegular: function () {
        axios.get("getAllSumCommentCompany/" + this.$store.state.uid + "/regular3/" + this.form.year).then(res => {
          this.tableData = res.data;
        })

      },
      //员工考核
      testEmp: function (row) {
        this.form.empno = row.empno;
        this.form.ename = row.ename;
        this.form.data = [];
        this.form.content_text = '';
        this.form.content_score = '';
        this.dialogFormVisible = true;

      },
      //获取评价分项
      getCommentTableData: function () {
        axios.get("/getCommentList").then(res => {
          this.commentTableData = res.data;
        })
      },
      submit: function () {
        var reg = /^([1-9]?\d|100)$/;
        for (var i = 0; i < 5; i++) {
          if (!reg.test(this.form.data[i])) {
            this.$message("分数必须介于0-100之间");
            return;
          }
        }
        if (!(reg.test(this.form.content_score))) {
          this.$message("分数必须介于0-100之间");
          return;
        }
        if (!(this.form.content_text != null && this.form.content_text != '')) {
          this.$message("评价信息不能为空");
          return;
        }
        //拆分数组
        this.form.score1 = this.form.data[0];
        this.form.score2 = this.form.data[1];
        this.form.score3 = this.form.data[2];
        this.form.score4 = this.form.data[3];
        this.form.score5 = this.form.data[4];
        // alert(this.form.data[0] + "" + this.form.data[1] + "");
        axios({
          method: 'post',
          url: '/commentRegular',
          data: this.form
        }).then(res => {
          this.$message(res.data);
          this.getRegular();
          this.dialogFormVisible = false;
          this.$refs['form'].resetFields();
        })
      },
      showInfo: function (row) {
        this.showInfoVisible = true;
        axios.get("getOne/" + row.empno).then(res => {
          this.empInfo = res.data;
        });
        axios.get("getComment/" + row.empno + "/regular/0").then(res => {
          this.regular = res.data;
        });
        axios.get("getComment/" + row.empno + "/regular1/1").then(res => {
          this.regular1 = res.data;
        })
        axios.get("getComment/" + row.empno + "/regular2/2").then(res => {
          this.regular2 = res.data;
        })
        axios.get("getComment/" + row.empno + "/regular3/3").then(res => {
          this.regular3 = res.data;
        })
      }

    },
    mounted() {
      this.getRegular();
      this.getCommentTableData();
    }
  }
</script>

<style scoped>
  .dialog-gy {
    height: 80vh;
    overflow: auto;

  }

  .div-gy {
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
