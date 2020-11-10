<template>
  <div>
        <el-card style="width:100%;height: 100%">
          <div class="teaMessage" style="padding-top: 2%">
              <el-form ref="form" :model="form" label-position="left"
                       inline class="demo-table-expand">
                <el-form-item label="工号">
                  <span>{{ this.form.empno }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                  <span>{{this.form.ename}}</span>
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
          <div style="width: 120px;height: 120px;padding-top: 1%">
            <img v-if="imageUrl" :src="imageUrl" style="width: 60vh;height: 40vh;">
          </div>
          <div class="bottom clearfix" style="padding-left: 80%">
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
          imageUrl:'',
          form:{
            empno:'',
            ename:'',
            sex:'',
            nation:'',
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
          var class_num = sessionStorage.getItem("classNo");
          axios.get("http://localhost:8080/getTeacherMessage/" + class_num).then(res =>{
            this.form = res.data;
            this.imageUrl = this.form.img;
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

