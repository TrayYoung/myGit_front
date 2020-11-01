<template>
  <div>
  <div>
    <h1>员工公司评价</h1>
  </div>
  <div>
    <h1>转正评价</h1>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="员工部门">
        <el-input v-model="commentCompanyForm.dname"></el-input>
      </el-form-item>
      <el-form-item label="评价人">
        <el-input v-model="commentCompanyForm.ename"></el-input>
      </el-form-item>
      <el-form-item label="整体评价">
        <el-input v-model="commentCompanyForm.content_score"></el-input>
      </el-form-item>
      <el-form-item label="评价（包括主要优点及缺陷）">
        <el-input v-model="commentCompanyForm.content_text"></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="commentScoreTable"
      border
      style="width: 100%">
      <el-table-column
        prop="commentId"
        label="评价id"
      >
      </el-table-column>
      <el-table-column
        prop="commentName"
        label="评价名称"
      >
      </el-table-column>
      <el-table-column
        prop="c_score"
        label="分数"
      >
      </el-table-column>
    </el-table>
  </div>

  <div>
    <h1>转正一年</h1>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="员工部门">
        <el-input v-model="commentCompanyForm_1.dname"></el-input>
      </el-form-item>
      <el-form-item label="评价人">
        <el-input v-model="commentCompanyForm_1.ename"></el-input>
      </el-form-item>
      <el-form-item label="整体评价">
        <el-input v-model="commentCompanyForm_1.content_score"></el-input>
      </el-form-item>
      <el-form-item label="评价（包括主要优点及缺陷）">
        <el-input v-model="commentCompanyForm_1.content_text"></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="commentScoreTable_1"
      border
      style="width: 100%">
      <el-table-column
        prop="commentId"
        label="评价id"
      >
      </el-table-column>
      <el-table-column
        prop="commentName"
        label="评价名称"
      >
      </el-table-column>
      <el-table-column
        prop="c_score"
        label="分数"
      >
      </el-table-column>
    </el-table>
  </div>


  <div>
    <h1>转正二年</h1>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="员工部门">
        <el-input v-model="commentCompanyForm_2.dname"></el-input>
      </el-form-item>
      <el-form-item label="评价人">
        <el-input v-model="commentCompanyForm_2.ename"></el-input>
      </el-form-item>
      <el-form-item label="整体评价">
        <el-input v-model="commentCompanyForm_2.content_score"></el-input>
      </el-form-item>
      <el-form-item label="评价（包括主要优点及缺陷）">
        <el-input v-model="commentCompanyForm_2.content_text"></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="commentScoreTable_2"
      border
      style="width: 100%">
      <el-table-column
        prop="commentId"
        label="评价id"
      >
      </el-table-column>
      <el-table-column
        prop="commentName"
        label="评价名称"
      >
      </el-table-column>
      <el-table-column
        prop="c_score"
        label="分数"
      >
      </el-table-column>
    </el-table>
  </div>
  <div>
    <h1>转正三年</h1>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="员工部门">
        <el-input v-model="commentCompanyForm_3.dname"></el-input>
      </el-form-item>
      <el-form-item label="评价人">
        <el-input v-model="commentCompanyForm_3.ename"></el-input>
      </el-form-item>
      <el-form-item label="整体评价">
        <el-input v-model="commentCompanyForm_3.content_score"></el-input>
      </el-form-item>
      <el-form-item label="评价（包括主要优点及缺陷）">
        <el-input v-model="commentCompanyForm_3.content_text"></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="commentScoreTable_3"
      border
      style="width: 100%">
      <el-table-column
        prop="commentId"
        label="评价id"
      >
      </el-table-column>
      <el-table-column
        prop="commentName"
        label="评价名称"
      >
      </el-table-column>
      <el-table-column
        prop="c_score"
        label="分数"
      >
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "SchoolComment_Student",
    data(){
      return{
        commentCompanyForm:{
          ename:'',
          content_score:'',
          content_text:'',
          dname:''
        },
        commentCompanyForm_1:{
          ename:'',
          content_score:'',
          content_text:'',
          dname:''
        },
        commentCompanyForm_2:{
          ename:'',
          content_score:'',
          content_text:'',
          dname:''
        },
        commentCompanyForm_3:{
          ename:'',
          content_score:'',
          content_text:'',
          dname:''
        },
        commentScoreTable:[],
        commentScoreTable_1:[],
        commentScoreTable_2:[],
        commentScoreTable_3:[],
      }
    },
    methods:{
      getCommentScoreByEmpnoAndYear:function () {
        debugger
        var empno=this.$store.state.uid
        axios.get("/getCommentScoreByEmpnoAndYear/"+empno+"/0").then(res => {
          this.commentScoreTable = res.data;
        });
        axios.get("/getCommentScoreByEmpnoAndYear/"+empno+"/1").then(res => {
          this.commentScoreTable_1 = res.data;
        })
        axios.get("/getCommentScoreByEmpnoAndYear/"+empno+"/2").then(res => {
          this.commentScoreTable_2 = res.data;
        })
        axios.get("/getCommentScoreByEmpnoAndYear/"+empno+"/3").then(res => {
          this.commentScoreTable_3 = res.data;
        })
      },
      getCommentCompany:function () {
        var empno=this.$store.state.uid
        axios.get("/getSumCommentCompany/"+empno+"/regular").then(res => {
          this.commentCompanyForm = res.data;
        })
        axios.get("/getSumCommentCompany/"+empno+"/regular1").then(res => {
          this.commentCompanyForm_1 = res.data;
        })
        axios.get("/getSumCommentCompany/"+empno+"/regular2").then(res => {
          this.commentCompanyForm_2 = res.data;
        })
        axios.get("/getSumCommentCompany/"+empno+"/regular3").then(res => {
          this.commentCompanyForm_3 = res.data;
        })
      }
    },
    mounted() {
      this.getCommentScoreByEmpnoAndYear();
      this.getCommentCompany();
    }
  }
</script>

<style scoped>

</style>
