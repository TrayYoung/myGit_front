<template>
  <div>
    <div>
      <h1>我的课程——教师</h1>
    </div>
    <div>
<div>
      <el-table
        :data="tableData"
        style="width: 100%;height: 510px">
        <el-table-column
          prop="courseid"
          label="课程号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="coursename"
          label="课程名称"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleGetScore(scope.$index,scope.row)">查看</el-button>
            <el-button type="primary" @click="punchScore(scope.$index,scope.row)">打分</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

      <el-dialog title="打分"
                 :visible.sync="dialogTableVisible"
                 show-close="false"
                 width="70%"
      >

        <el-table
          :data="tableData2.slice((currpage - 1) * pagesize, currpage * pagesize)"
          style="width: 100%"
          :default-sort="{prop:'score',order:'descending'}">
          <el-table-column
            prop="empno"
            label="工号"
            width="180"
            sortable>
          </el-table-column>
          <el-table-column
            prop="ename"
            label="学员姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="score"
            label="成绩"
            width="180"
            sortable>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button type="primary" @click="setScore(scope.$index,scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination align='center'
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[4,8]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableData2.length">
        </el-pagination>

        <!--内层 提交成绩-->
        <el-dialog
          :visible.sync="dialogFormVisible"
          append-to-body="true"
          width="30%">
          <el-form :model="subScore">
            <el-form-item>
              <el-input v-model="subScore.input" placeholder="请输入成绩"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-dialog>

      <el-dialog
        :visible.sync="dialogScoreVisible">
        <el-form>
          <el-table
            :data="tableData3.slice((currpage - 1) * pagesize, currpage * pagesize)">
            <el-table-column prop="courseid" label="课程号"></el-table-column>
            <el-table-column
              prop="empno_stu"
              label="工号">
            </el-table-column>
            <el-table-column prop="ename" label="姓名"></el-table-column>
            <el-table-column prop="class" label="班级"></el-table-column>
            <el-table-column>
              <template scope="scope">
                <el-form-item>
                  <el-input v-model="scope.row.score"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="成绩">
              <template slot-scope="scope">
                <el-button type="primary" @click="setScores(scope.$index,scope.row)">保存</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination align='center'
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-sizes="[4,8]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="tableData2.length">
          </el-pagination>
        </el-form>

      </el-dialog>


      <!--      <el-drawer handleSetScore(scope.$index,scope.row)
              title="标题"
              :visible.sync="drawer"
              :direction="direction"
              :before-close="handleClose">
              <el-table
                empty-text="当前班级无学员"
                :data="tableData2"
                height="250"
                style="width: 100%"
              >
                <el-table-column
                  prop="ename"
                  label="姓名"
                  sortable
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="成绩"
                  :formatter="formatter">
                </el-table-column>
              </el-table>
            </el-drawer>-->
      <!--表单-->


    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "MyCourse_Teacher",
    data() {
      return {
        table: false,
        dialog: false,
        loading: false,
        tableData: [],
        drawer: false,
        direction: 'rtl',
        tableData2: [],
        tableData3: [],

        courseid: '',

        score: '',
        empno_stu: '',
        empno_tch: this.$store.state.uid,
        subScore: {
          input: '',
        },

        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogScoreVisible: false,

        pagesize: 5,
        currpage: 1,
        data: ''

      }
    },
    methods: {
      getCourse: function () {
        axios.get("http://localhost:8080/showCourse").then(res => {
          this.tableData = res.data;
        })
      },

      getScore: function () {
        var empno = this.empno_tch;
        var courseid = this.courseid;
        axios.get("http://localhost:8080/showScore/" + empno + "/" + courseid).then(res => {
          this.tableData2 = res.data;
        })
      },
      punchScore(index, row) {
        this.dialogScoreVisible = true;
        this.courseid = row.courseid;
        this.getNoScoreStu();
      },
      getNoScoreStu: function () {
        var courseid = this.courseid;
        var empno = this.empno_tch;
        axios.get("http://localhost:8080/showNoScoreStu/" + courseid + "/" + empno).then(res => {
          this.tableData3 = res.data;
        })
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
      handleGetScore(index, row) {
        this.dialogTableVisible = true;
        this.courseid = row.courseid;
        this.getScore()
      },

      setScore(index, row) {
        this.dialogFormVisible = true;
        this.empno_stu = row.empno;
      },
      /*打分*/
      setScores(index, row) {
        this.empno_stu = row.empno_stu;
        this.score = row.score;
        this.submitScore();
      },
      submitScore: function () {
        var score = this.score;
        var empno_stu = this.empno_stu;
        var courseid = this.courseid;
        var empno_tch = this.$store.state.uid;
        alert(score + "/" + empno_stu + "/" + empno_tch + "/" + courseid);
        axios.get("http://localhost:8080/setScore/" + score + "/" + empno_stu + "/" + empno_tch + "/" + courseid).then(res => {
          alert(res.data)
        })
      },

      submitForm: function () {
        var score = this.subScore.input;
        var empno_stu = this.empno_stu;
        var courseid = this.courseid;
        var empno_tch = this.empno_tch;
        axios.get("http://localhost:8080/setScore/" + score + "/" + empno_stu + "/" + empno_tch + "/" + courseid).then(res => {
          alert(res.data)
        })
      }


    },
    mounted() {
      this.getCourse();
    }
  }
</script>

<style scoped>

</style>
