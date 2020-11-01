<template>
  <div>
    <div>
      <h1>头像区</h1>
    </div>
    <div>
      <h1>评价区</h1>
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="班期">
          <el-input v-model="commentSchoolForm.class_num"></el-input>
        </el-form-item>
        <el-form-item label="评价人">
          <el-input v-model="commentSchoolForm.empno_M_OR_T"></el-input>
        </el-form-item>
        <el-form-item label="整体评价">
          <el-input v-model="commentSchoolForm.content_score"></el-input>
        </el-form-item>
        <el-form-item label="评价（包括主要优点及缺陷）">
          <el-input v-model="commentSchoolForm.content_text"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  export default {
    name: "SchoolComment",
    data(){
      return{
         commentSchoolForm:{
           empno_M_OR_T:'',
           content_score:'',
           content_text:'',
           class_num:''
         },
      }
    },
    methods:{
      getCommentSchool:function () {
        var empno=this.$store.state.uid
        axios.get("/getSumCommentSchool/"+empno).then(res => {
          this.commentSchoolForm = res.data;
        })
      }
    },
    mounted() {
      this.getCommentSchool();
    }
  }
</script>

<style scoped>

</style>
