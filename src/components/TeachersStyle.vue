<template>
  <div>
        <el-card style="width:100%;height: 100%;padding-top: 3%;margin-top: 2%">
          <div class="teaMessage">
              <el-form ref="form" :model="form" label-position="left"
                       inline class="demo-table-expand">
                <el-form-item label="工号">
                  <span>{{ this.form.empno }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                  {{this.form.ename}}
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ this.form.sex }}</span>
                </el-form-item>
                <el-form-item label="民族">
                  <span>{{ this.form.nation }}</span>
                </el-form-item>
                <el-form-item label="生日">
                  <span>{{ this.form.birthday }}</span>
                </el-form-item>
                <el-form-item label="籍贯">
                  <span>{{ this.form.address }}</span>
                </el-form-item>
                <el-form-item label="是否婚配">
                  <span>{{ this.form.isMarry }}</span>
                </el-form-item>
                <el-form-item label="联系电话">
                  <span>{{ this.form.tel }}</span>
                </el-form-item>
                <el-form-item label="毕业院校">
                  <span>{{ this.form.school }}</span>
                </el-form-item>
                <el-form-item label="专业">
                  <span>{{ this.form.major }}</span>
                </el-form-item>
              </el-form>
          </div>
          <img src="../assets/logo.png" class="image">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="giveup()">点赞</el-button>
          </div>
        </el-card>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "TeachersStyle",
      data() {
        return {
          form:{
            empno:'',
            ename:'',
            sex:'',
            birthday:'',
            address:'',
            isMarry:'',
            tel:'',
            school:'',
            major:'',
            remarks:'',
          }
        };
      },
      methods:{
          giveup:function (){
            this.$message('点个赞了')
          },
        getTeaMessage:function () {
            debugger
          var class_num = this.$store.state.classNo;
          axios.get("http://localhost:8080/getTeacherMessage/" + class_num).then(res =>{
            this.form = res.data;
          });
        },
      },
      //生命周期钩子
      mounted(){
        //编译后获取数据
        this.getTeaMessage();
      }
    }
</script>

<style scoped>

</style>
<style>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 30%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .teaMessage {
    padding-top: 5%;
    float: right;
    width: 60%;
    height: 100%;
  }

</style>

