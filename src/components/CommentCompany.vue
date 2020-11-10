<template>
  <div>
  <div>
    <h1>员工公司评价</h1>
  </div>
  <div>
    <el-card class="card-gy">
    <el-row  style="height: 36px">
      <el-col :span="24" align="center" ><div class="grid-content bg-purple-dark"><h1>转正工作评价</h1></div></el-col>
    </el-row>
    <div class="div-gy">
      <el-row>
        <el-col :span="24"><div>
          <el-table

            :data="commentScoreTable"
          >
            <el-table-column
              prop="dname"
              label="员工部门"
            >
            </el-table-column>
            <el-table-column
              prop="role"
              label="员工职务"
            >
            </el-table-column>

            <el-table-column
              prop="ename"
              label="评价人"
            >
            </el-table-column>

            <el-table-column label="评价分项" align="center">
              <el-table-column
                v-for="item in commentTableData"
                :key="item.commentId"
                :label="item.commentName"

                :prop="item.commentName">
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
          <el-input type="textarea" v-model="commentScoreTable[0].content_text" readonly></el-input>
        </el-col>
      </el-row>
    </div>
    </el-card>

    <el-card class="card-gy">
    <el-row  style="height: 36px">
      <el-col :span="24" align="center" ><div class="grid-content bg-purple-dark"><h1>工作1年工作评价</h1></div></el-col>
    </el-row>
    <div class="div-gy">
      <el-row>
        <el-col :span="24"><div>
          <el-table

            :data="commentScoreTable1"
          >


            <el-table-column
              prop="dname"
              label="员工部门"
            >
            </el-table-column>
            <el-table-column
              prop="role"
              label="员工职务"
            >
            </el-table-column>
            <el-table-column

              prop="ename"
              label="评价人"
            >
            </el-table-column>

            <el-table-column label="评价分项" align="center">
              <el-table-column
                v-for="item in commentTableData"
                :key="item.commentId"
                :label="item.commentName"

                :prop="item.commentName">
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
          <el-input type="textarea" v-model="commentScoreTable1[0].content_text" readonly></el-input>
        </el-col>
      </el-row>
    </div>
    </el-card>

    <el-card class="card-gy">
    <el-row  style="height: 36px">
      <el-col :span="24" align="center" ><div class="grid-content bg-purple-dark"><h1>工作2年工作评价</h1></div></el-col>
    </el-row>
    <div class="div-gy">
      <el-row>
        <el-col :span="24"><div>
          <el-table

            :data="commentScoreTable2"
          >

            <el-table-column
              prop="dname"
              label="员工部门"
            >
            </el-table-column>
            <el-table-column
              prop="role"
              label="员工职务"
            >
            </el-table-column>
            <el-table-column

              prop="ename"
              label="评价人"
            >
            </el-table-column>

            <el-table-column label="评价分项" align="center">
              <el-table-column
                v-for="item in commentTableData"
                :key="item.commentId"
                :label="item.commentName"

                :prop="item.commentName">
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
          <el-input type="textarea" v-model="commentScoreTable2[0].content_text"></el-input>
        </el-col>
      </el-row>
    </div>
    </el-card>

    <el-card class="card-gy">
    <el-row  style="height: 36px">
      <el-col :span="24" align="center" ><div class="grid-content bg-purple-dark"><h1>工作3年工作评价</h1></div></el-col>
    </el-row>
    <div class="div-gy">
      <el-row>
        <el-col :span="24"><div>
          <el-table

            :data="commentScoreTable3"
          >

            <el-table-column
              prop="dname"
              label="员工部门"
            >
            </el-table-column>
            <el-table-column
              prop="role"
              label="员工职务"
            >
            </el-table-column>
            <el-table-column

              prop="ename"
              label="评价人"
            >
            </el-table-column>

            <el-table-column label="评价分项" align="center">
              <el-table-column
                v-for="item in commentTableData"
                :key="item.commentId"
                :label="item.commentName"

                :prop="item.commentName">
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
          <el-input type="textarea" v-model="commentScoreTable3[0].content_text"></el-input>
        </el-col>
      </el-row>
    </div>
    </el-card>
  </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "SchoolComment_Student",
    data(){
      return{
        commentTableData:[],
        commentCompanyForm:{
          year:0,
          empno:this.$store.state.uid,
          content_type:'regular'
        },
        commentCompanyForm1:{
          year:1,
          empno:this.$store.state.uid,
          content_type:'regular1'
        },
        commentCompanyForm2:{
          year:2,
          empno:this.$store.state.uid,
          content_type:'regular2'
        },
        commentCompanyForm3:{
          year:3,
          empno:this.$store.state.uid,
          content_type:'regular3'
        },
        commentScoreTable:[],
        commentScoreTable1:[],
        commentScoreTable2:[],
        commentScoreTable3:[],
      }
    },
    methods:{
      getCommentCompany:function () {
        axios({
          method: 'post',
          url: '/getOnesSumCommentCompany',
          data: this.commentCompanyForm
        }).then((res) => {
          this.commentScoreTable=res.data;
        });
        axios({
          method: 'post',
          url: '/getOnesSumCommentCompany',
          data: this.commentCompanyForm1
        }).then((res) => {
          this.commentScoreTable1=res.data;
        });
        axios({
          method: 'post',
          url: '/getOnesSumCommentCompany',
          data: this.commentCompanyForm2
        }).then((res) => {
          this.commentScoreTable2=res.data;
        });
        axios({
          method: 'post',
          url: '/getOnesSumCommentCompany',
          data: this.commentCompanyForm3
        }).then((res) => {
          this.commentScoreTable3=res.data;
        });
      },
      getCommentTableData:function () {
        axios.get("/getCommentList").then(res => {
          this.commentTableData=res.data;
        })
      },
    },
    mounted() {
      this.getCommentCompany();
      this.getCommentTableData();
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
    width: 61.8%;
    margin-left: 50%;

    transform: translate(-50%, 0%);
    /*left: 119.1%;
    top: 10%;
   !* transform: translate(-50%, -50%);*!
    width: 61.8%;*/
  }
</style>
