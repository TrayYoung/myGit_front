<template>
  <div class="page">
    <img :src="imgSrc" width="100%" height="100%" alt="" />
    <div class="loginpage">
    <div id="title">欢迎登陆</div>
    <el-form :model="LoginForm" status-icon :rules="rules" ref="LoginForm" label-width="100px"
             class="demo-LoginForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.number="LoginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="LoginForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('LoginForm')">提交</el-button>
        <el-button @click="resetForm('LoginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
  export default {
    name:"Login",
    data() {
      var checkUsername= (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        imgSrc:require('../assets/images/bg.jpg'),
        LoginForm: {
          password: '',
          userName: ''
        },
        rules: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm() {
        //提交
        axios.get("/login/" + this.form.username + "/" +
          this.form.pwd).then(res=>{
          if ("sucess" == res.data){
            //将用户名存储到store仓库中
            //调用actions的方法
            this.$store.dispatch("setUser",this.form.username);
            //页面跳转
            this.$router.push({path:"empList"})
          } else {
            this.$message("用户名或密码错误!")
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
  .page{
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
