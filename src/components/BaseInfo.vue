<template>
  <div>
    <div style="width: 20%;height: 30%;
              border: black;float: right;position: absolute;left: 80%">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8080/uploadFile/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span style="padding-left: 24%">1寸照片</span>
    </div>
      <div>
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="工号：">
                <el-input readonly v-model="form.empno" style="width: 65%"></el-input>
              </el-form-item>
              <el-form-item label="姓名：">
                <el-input readonly v-model="form.ename" style="width: 65%"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                  <el-radio disabled :label="男">男</el-radio>
                  <el-radio disabled :label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="班期">
                <el-input readonly v-model="form.cname" style="width: 65%"></el-input>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker type="date" placeholder="选择日期" readonly style="width: 65%"
                                v-model="form.birthday"></el-date-picker>
              </el-form-item>
              <el-form-item label="籍贯">
                <el-input readonly v-model="form.address" style="width: 65%"></el-input>
              </el-form-item>
              <el-form-item label="是否婚配">
                <el-radio-group v-model="form.isMarry">
                  <el-radio disabled :label="是">是</el-radio>
                  <el-radio disabled :label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input readonly v-model="form.tel" autocomplete="off" style="width: 65%"></el-input>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input readonly type="text" v-model="form.idNum" style="width: 65%"></el-input>
              </el-form-item>
              <el-form-item label="毕业院校">
                <el-input readonly type="text" v-model="form.school" style="width: 65%"></el-input>
              </el-form-item>
              <el-form-item label="专业">
                <el-input readonly type="text" v-model="form.major" style="width: 65%"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input readonly type="textarea" v-model="form.remarks" style="width: 65%"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" style="margin-left: 23%">保存修改</el-button>
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
      return{
        imageUrl:'',
        form:{
          empno:'',
          ename:'',
          sex:'',
          birthday:'',
          address:'',
          isMarry:'',
          tel:'',
          idNum:'',
          school:'',
          major:'',
          class_num:'',
          remarks:'',
          cname:''
        },
        rules:{

        }
      }
    },
    methods: {
      getStuMessage: function () {
        var empno = this.$store.state.uid;
        axios.get("http://localhost:8080/getMessage/" + empno).then(res => {
          this.form = res.data;
          var class_num = res.data.class_num;
          this.$store.dispatch("setClassNo", class_num);
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid){
            //提交
            this.$confirm('确认修改信息吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var img = this.imageUrl;
              axios.get("http://localhost:8080/updateEmpMessage/" + this.form +
                "/" + img).then(res =>{
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
      }
    },

    mounted(){
      //编译后获取数据
      this.getStuMessage();
    }
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
