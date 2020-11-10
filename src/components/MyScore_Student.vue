<template>
  <div>
    <h1>评价区</h1>
    <el-card class="card-gy">
      <el-row  style="height: 36px">
        <el-col :span="24" align="center" ><div class="grid-content bg-purple-dark"><h1>培训学校评价</h1></div></el-col>
      </el-row>
      <div class="div-gy">
        <el-row>
          <el-col :span="24"><div>
            <el-table
              :data="courseScoreTable"
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
                prop="content_score"
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
            <el-input type="textarea" v-model="courseScoreTable[0].content_text" readonly></el-input>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>

</template>

<script>
  import axios from 'axios';
  export default {
    name: "SchoolComment_Student",
    data(){
      return{

        commentSchoolForm:{

          empno:this.$store.state.uid,
          content_type:'school_cmt'
        },

        courseScoreTable:[],
        scoreTableData:[],
        commentTableData:[],
      }
    },
    methods:{
      getCourseScoreByEmpno:function () {
        debugger
        var empno=this.$store.state.uid
        axios.get("/getCourseScoreByEmpno/"+empno).then(res => {
          this.courseScoreTable = res.data;
        })
      },
      getCommentSchool:function () {
        var empno=this.$store.state.uid
        axios.get("/getSumCommentSchool/"+empno).then(res => {
          this.commentSchoolForm = res.data;
        })
      },
      getScoreTableData:function () {
        axios.get("/getCourseList").then(res => {
          this.scoreTableData=res.data;
        })
      },
      getCommentTableData:function () {
        axios({
          method: 'post',
          url: '/getOnesSumCommentSchool',
          data: this.commentSchoolForm
        }).then((res) => {
          this.courseScoreTable=res.data;
        });
      },
    },
    mounted() {
      this.getCourseScoreByEmpno();
      this.getCommentSchool();
      this.getCommentTableData();
      this.getScoreTableData();

    }
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
  .card-gy{
    width: 61.8%;/*黄金比例*/
    margin-left: 50%;

    transform: translate(-50%, 0%);
    /*left: 119.1%;
    top: 10%;
   !* transform: translate(-50%, -50%);*!
    width: 61.8%;*/
  }
</style>
