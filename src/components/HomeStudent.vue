<template>
  <div>
    <el-container class="container">
      <el-header class="header">
        <el-row>
          <el-col :span="16" class="headerlogo">
            <div class="grid-content bg-purple" style="font-size: 20px;margin-top: 20px">
              学生信息
            </div>
          </el-col>
          <el-col :span="8" class="rightsection">
            <div class="grid-content bg-purple-light">
              <span class="el-dropdown-link userinfo-inner"
                    style="font-size: 25px;position: absolute;left: 1050px;margin-top: 10px">欢迎您，
                {{$store.state.username}}</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <!-- 侧边栏导航  -->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span style="font-size: 30px">学生信息</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-setting"></i>
              <span slot="title">本人信息</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-setting"></i>
              <span slot="title">修改密码</span>
            </el-menu-item>
            <el-menu-item index="8">
              <i class="el-icon-setting"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <!--<img
                style="width:400px;height: 30px"
                src="../../assets/img/top.png"
                alt="无法显示图片"
              />-->
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>本人信息</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="工号：">
                <el-input readonly v-model="form.empno"></el-input>
              </el-form-item>
              <el-form-item label="姓名：">
                <el-input readonly v-model="form.ename"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                  <el-radio disabled label="男">男</el-radio>
                  <el-radio disabled label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="出生日期">
                  <el-date-picker type="date" placeholder="选择日期" disabled
                                  v-model="form.birthday" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="籍贯">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
              <el-form-item label="是否婚配">
                <el-radio-group v-model="form.isMarry">
                  <el-radio disabled label="是">是</el-radio>
                  <el-radio disabled label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="联系电话"
                prop="tel"
                :rules="[
                  { required: true, message: '联系电话不能为空'},
                  { type: 'number', message: '联系电话必须为数字值'}
                ]">
                <el-input v-model.number="form.tel" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input type="text" v-model="form.idNum"></el-input>
              </el-form-item>
              <el-form-item label="毕业院校">
                <el-input type="text" v-model="form.school"></el-input>
              </el-form-item>
              <el-form-item label="专业">
                <el-input type="text" v-model="form.major"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="text" v-model="form.remarks" style="width: 100%"></el-input>
              </el-form-item>
              <!--<el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>-->
            </el-form>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "HomeStudent",
    data:function(){
      return{
        form:{
          empno:'',
        }
      }
    },
    methods:{
      getStuMessage:function () {
        var empno = this.$store.state.uid;
        axios.get("getStudent/" + empno).then(res =>{
          this.$refs[formName].data = res.data;
        })
      }
    },
    //生命周期钩子
    mounted(){
      //编译后获取数据
      this.getStuMessage();
    }
  }
  ;
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
