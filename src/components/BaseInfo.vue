<template>
  <div id="infoBg">
    <div style="width: 18%;height: 45%;
              float: right;position: absolute;left: 78%">
      <el-upload
        style="padding-left: 12%;padding-top: 10%;"
        class="avatar-uploader"
        action="http://localhost:8080/uploadFile/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span style="padding-left: 25%">1寸照片(点击上传)</span>
    </div>
    <div hidden>
      <el-input type="text" v-model="photo" style="width: 65%"></el-input>
    </div>
      <div>
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
              <div>
                <el-row style="width: 75%;">
                    <el-col :span="8">
                      <el-form-item label="工号：" label-width="60px" class="formitem">
                        <el-input readonly v-model="form.empno"></el-input>
                      </el-form-item>
                    </el-col>
                  <el-col :span="8">
                    <el-form-item label="姓名：" prop="ename" label-width="70px" class="formitem">
                      <el-input v-model.trim="form.ename"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别：" prop="sex" label-width="80px" class="formitem">
                      <el-radio-group v-model="form.sex">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
              </el-row>
            </div>
              <el-row style="width: 75%;">
                <el-col :span="11">
                  <el-form-item label="班期：" class="formitem" label-width="70px">
                    <el-input readonly v-model="form.cname"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-form-item label="出生日期：" prop="birthday"
                                label-width="90px" class="formitem">
                    <el-date-picker type="date" placeholder="选择日期"
                                    v-model="form.birthday"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="width: 75%;">
                <el-col :span="11">
                  <el-form-item label="联系电话：" prop="tel" class="formitem">
                    <el-input v-model.number="form.tel" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-form-item label="是否婚配：" label-width="130px" class="formitem">
                    <el-radio-group v-model="form.isMarry">
                      <el-radio label="是">是</el-radio>
                      <el-radio label="否">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="籍贯：" prop="address" class="formitem">
                    <el-input v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="毕业院校：" prop="school" class="formitem">
                    <el-input type="text" v-model="form.school"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="专业：" prop="major" class="formitem">
                    <el-input type="text" v-model="form.major"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item label="身份证号：" prop="idNum" class="formitem">
                    <el-input type="text" v-model="form.idNum"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注：" class="formitem">
                    <el-input type="textarea" v-model="form.remarks"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <el-button type="primary"
                           @click="onSubmit()"
                           style="margin-left: 36%;margin-top: 3%">保存修改</el-button>
              </el-form-item>
            </el-form>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "BaseInfo",
    data(){
      var checkIdNum = (rule, value, callback) => {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!value) {
          return callback(new Error('证件号码不能为空'))
        } else if (!reg.test(value)) {
          return callback(new Error('证件号码不正确'))
        } else {
          callback()
        }
      };
      return{
        imageUrl:'',
        photo:'',
        form:{
          empno:'',
          ename:'',
          sex:'',
          birthday:'',
          address:'',
          isMarry:'',
          tel:'',
          img:'',
          idNum:'',
          class_num:'',
          school:'',
          major:'',
          remarks:'',
          cname:''
        },
        rules:{
          ename:[
            { required: true, message: "请输入姓名", trigger: 'blur'},
            { min: 2, max: 4,message: "最少两个字符，最多四个", trigger: 'blur'}
          ],
          address:[
            { required: true, message: '请输入籍贯地址', trigger: 'blur' }
          ],
          tel:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {
              pattern: /^1[345789]\d{9}$/,//验证手机号的正则表达式
              message: '目前只支持中国大陆的手机号码，请输入正确的数字号码',
              trigger: 'blur'
            },
          ],
          idNum:[
            { required: true, message: "请输入身份证号", trigger: "blur" },
            { validator: checkIdNum, trigger: 'blur' }
          ],
          school:[
            { required: true,message: "请输入毕业院校", trigger: 'blur'}
          ],
          major:[
            { required: true,message:'请输入专业', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getStuMessage: function () {
        var empno = this.$store.state.uid;
        axios.get("http://localhost:8080/getMessage/" + empno).then(res => {
          this.form = res.data;
          this.imageUrl = this.form.img;
          var classNo = res.data.class_num;
          this.$store.dispatch("setClassNo", classNo);
        })
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid){
            //提交
            this.$confirm('确认修改信息吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              axios({
                method:"post",
                url:"/editEmpMessage",
                data:this.form
              }).then(res =>{
                  if ("success" === res.data) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    });
                  }else {
                    this.$message({
                      type: 'info',
                      message: '服务器响应失败'
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
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.img = "http://localhost:8080/" + res;
        this.photo = res;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    },
    mounted(){
      //编译后获取数据
      this.getStuMessage();
    },
    destroyed: function () {
      if (this.imageUrl !== this.form.img){
      this.$confirm('确认保存信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          method:"post",
          url:"/editEmpMessage",
          data:this.form
        }).then(res =>{
          if ("success" === res.data) {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
          }else {
            this.$message({
              type: 'info',
              message: '服务器响应失败'
            });
          }
        });
      }).catch(() => {
        var imgName = this.photo;
        axios('/delImg/' + imgName).then(res => {
          if ('success' === res.data){
            this.$message({
              type: 'info',
              message: '已取消'
            });
          } else {
            this.$message({
              type: 'info',
              message: '服务器响应失败'
            });
          }
        })
      });
      }
    },
  }
</script>
<style scoped>
  .container {
    height: 100vh;
    font-size: 15px;
  }
  .header {
    background: #212121;
    color: #fff;
  }
  .aside {
    background: #3a3a3a;
    color: #fff;
    /* height: 100%; */
  }
  .main {
    /* height: 100%; */
    color: #212121;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    height: 95%;
  }
</style>
<style>
  #infoBg{
    border: 20px solid rgba(100,139,185,0.64);
  }
  .formitem{
    margin: 10px;
    padding: 8px;
  }
  .el-col{
    border-bottom: 7px solid rgba(76, 76, 76, 0.68);
    border-top: 5px solid #00b9b7;
    border-left: 3px solid rgba(76, 76, 76, 0.66);
    border-right: 2px solid #00b9b7;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
