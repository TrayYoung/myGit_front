<template>
  <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="工号：">
                <el-input v-model="form.empno"></el-input>
              </el-form-item>
              <el-form-item label="姓名：">
                <el-input v-model="form.ename"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                  <el-radio disabled :label="男">男</el-radio>
                  <el-radio disabled :label="女">女</el-radio>
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
                  <el-radio disabled :label="是">是</el-radio>
                  <el-radio disabled :label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="form.tel" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input type="text" v-model="form.idnum"></el-input>
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
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "BaseInfo",
    data(){
      return{
        form:{
          empno:'',
          ename:'',
          sex:'',
          birthday:'',
          address:'',
          isMarry:'',
          tel:'',
          idnum:'',
          school:'',
          major:'',
          remarks:''
        }
      }
    },
    methods:{
      getStuMessage:function () {
        var empno = 10001;
        axios.get("http://localhost:8080/getMessage/" + empno).then(res =>{
          this.form = res.data;
        })
      }
    },
    //生命周期钩子
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
