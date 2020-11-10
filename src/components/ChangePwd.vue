<template>
  <div>
    <h1>修改密码（公用）</h1>
    <div style="margin-left: 20%">
      <el-form ref="form"
               :rules="rules"
               :model="form"
               label-width="120px"
               status-icon
               class="form">
          <el-card shadow="always" style="width: 70%">
            <el-form-item label="旧密码：" prop="o_password">
              <el-input type="password" v-model.trim="form.o_password" placeholder="请输入旧密码"
                        show-password="true"></el-input>
            </el-form-item>
          </el-card>

          <el-card shadow="hover" style="width: 70%">
            <el-form-item label="新密码：" prop="n_password">
              <el-input type="password" v-model.trim="form.n_password"
                        show-password="true" placeholder="请输入新密码"></el-input>
            </el-form-item>
          </el-card>

        <el-card shadow="hover" style="width: 70%">
          <el-form-item label="重复新密码：" prop="r_password">
            <el-input type="password" v-model.trim="form.r_password"
                      show-password="true" placeholder="请再次输入新密码"></el-input>
          </el-form-item>
        </el-card>

        <div style="margin-left: 20%;padding-top: 20px">
          <el-button type="danger" @click="submitForm('form')">确认修改</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </div>

      </el-form>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "ChangePwd",
      data(){
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入新密码'))
          } else if (value !== this.form.n_password) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        };
        var validatePass3 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入新密码'))
          } else if (value === this.form.o_password) {
            callback(new Error('密码没有变化，请重新输入!'))
          } else {
            callback()
          }
        };
          return{
            form:{
              o_password:'',
              n_password:'',
              r_password:''
            },
            rules:{
              o_password:[
                {required: true, message: '请输入旧密码', trigger: 'blur'},
                {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
              ],
              n_password:[
                { required: true, validator: validatePass3, trigger: 'blur' },
                {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
              ],
              r_password:[
                { required: true, validator: validatePass2, trigger: 'blur' }
              ]
            }
          }
      },
      methods:{
        submitForm() {
          this.$refs.form.validate((valid) => {
            if (valid){
              //提交
              this.$confirm('确认修改密码吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                var uid = sessionStorage.getItem("uid");
                var o_pwd = this.form.o_password;
                var n_pwd = this.form.n_password;
                    axios.get("http://localhost:8080/resetPassword/" + o_pwd +
                      "/" + n_pwd + "/" + uid).then(res =>{
                      if (res.data === "success"){
                        this.$notify({
                          title: '成功',
                          message: '修改密码成功！',
                          type: 'success'
                        });
                        /*this.$store.dispatch('setUname', null);
                        this.$store.dispatch('setUid', null);
                        this.$store.dispatch('setUpwd', null);
                        this.$store.dispatch('setUrole', null);
                        this.$store.dispatch("setClassNo",null);*/
                        sessionStorage.clear();
                        this.$router.push({path: '/'})
                      } else if (res.data === "different") {
                        this.$notify.error({
                          title: '错误',
                          message: '密码错误！',
                          type: 'error'
                        });
                      }else {
                        this.$notify({
                          title: '警告',
                          message: '服务器响应失败！',
                          type: 'warning'
                        });
                      }
                    });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
              });
            } else {
              this.$message({
                type: 'info',
                message: '请正确填写'
              });
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

</style>
