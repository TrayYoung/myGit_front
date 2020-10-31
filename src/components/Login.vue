
<template>
  <div id="page">
    <img :src="imgSrc" width="100%" height="100%">
    <div class="loginpage">
      <el-form
        ref="form"
        :model="form"
        :rules="ruleForm"
        status-icon
        label-width="80px"
        class="loginForm"
      >
        <h3 id="title">登陆</h3>
        <el-form-item
          label="账号"
          prop="uid"
        >
          <el-input
            type="text"
            v-model="form.uid"
            auto-complete="off"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model="form.password"
            auto-complete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="homeBut"
            type="primary"
            @click="submit('form')"
            :loading="logining"
          >登录</el-button>
          <el-button
            class="loginBut"
            type="primary"
            @click="resetForm('form')"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        imgSrc:require("../assets/images/bg.jpg"),
        logining: false,
        form: {
          uid: '',
          password: ''
        },
        ruleForm: {
          uid: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      submit(event){
        this.$refs.form.validate((valid) => {
          if (valid){
            //提交
            debugger
            axios.get("login/" + this.form.uid + "/" +
              this.form.password).then(res=>{
                if (res.data == null || res.data == ""){
                  this.$message("账号或者密码错误")
                } else {
                  debugger
                var role = res.data.role;
                var username = res.data.userName;
                //var password = res.data.password;
                  this.$store.dispatch("setUid",this.form.uid)
                this.$store.dispatch("setUname",username);
                //this.$store.dispatch("setUid",this.form.uid);
                  this.$store.dispatch("setRole",role);
                  this.$router.push({path:"/empMain"});

               /* switch (role) {
                  case 0:
                    //this.$router.push({path:"/homeAdmin"});
                    this.$router.push({path:"/homeAdmin"});
                    break;
                  case 1:
                    this.$router.push({path:"/homeStudent"});
                    break;
                  case 2:
                    this.$router.push({path:"/homeTeacher"});
                    break;
                  case 3:
                    this.$router.push({path:"/homeClerk"});
                    break;
                  case 4:
                    this.$router.push({path:"/homeManager"});
                    break;
                  default:
                    this.$message("登陆失败!");
                    break;
                }*/
                }
            })
          } else {
            alert('信息错误!');
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  #page{
    z-index:-1;
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%;
    margin: 0;
  }
  .loginpage{
    font-size: 20px;
    background-color: rgba(255, 255, 255, 0.4);
    color: black;
    z-index:1;
    position: absolute;
    border: 1px solid #DCDFE6;
    width: 30%;
    left: 33%;
    top: 32%;
    padding: 35px 60px 15px 0;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-box-shadow: 0 0 25px #909399;
    -moz-box-shadow: 0 0 25px #909399;
    box-shadow: 0 0 25px #909399;
  }
  #title{
    text-algin:center;
    margin: 0 auto 40px 60px;
    color:#303133;
  }
</style>
