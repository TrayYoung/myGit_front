<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >

      <el-table-column
        label="转正工作评价"
        align="center">
        <el-table-column
          prop="empno"
          label="员工编号"
          sortable>
        </el-table-column>
        <el-table-column
          prop="ename"
          label="姓名">
        </el-table-column>
        <el-table-column
          label="员工部门"
          prop="dname">
        </el-table-column>

        <el-table-column
          label="员工职务"
          prop="role">
        </el-table-column>

        <el-table-column
          label="评价人"
          prop="ename">
        </el-table-column>

        <el-table-column
          label="评价分项">
          <el-table-column
            label="评价1"
            prop="">
          </el-table-column>
          <el-table-column
            label="评价2"
            prop="">
          </el-table-column>
          <el-table-column
            label="评价3"
            prop="">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="整体评价分数"
          prop="content_score"
        ></el-table-column>
        <el-table-column
          label="评价（包括主要优点及缺陷）"
          width="220px"
          prop="content_text"
        ></el-table-column>
        <el-table-column
          align="center"
          width="120">
          <template slot="header" slot-scope="scope">
            操作
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="dialogFormVisible = true">考核
            </el-button>
          </template>
        </el-table-column>


      </el-table-column>

    </el-table>


    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="评价1" :label-width="formLabelWidth" prop="score">
          <el-input v-model="form.score1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评价2" :label-width="formLabelWidth" prop="score">
          <el-input v-model="form.score2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评价3" :label-width="formLabelWidth" prop="score">
          <el-input v-model="form.score3" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Regular",
    data() {
      // var validatepass = (rule, value, callback) => {
      //   var reg = /^[0-5]\.?\d{0,3}$/;
      //
      //   if (!value) {
      //     return callback(new Error('分数不能为空'));
      //   }
      //   if (reg.test(this.form.score1)) {
      //     callback(new Error('分数格式不正确'))
      //   } else {
      //     callback();
      //   }
      //
      // };
      return {
        dialogFormVisible: false,
        tableData: [],
        dialog: false,
        formLabelWidth: '120px',
        form: {
          score1: '',
          score2: '',
          score3: '',
          score4: '',
          score5: '',
        },
        // rules: {
        //   score: [
        //     {validator: validatepass, trigger: 'blur'}
        //   ]
        // },
        // timer: null,
      }
    },
    methods: {
      getRegular: function () {
        axios.get("http://localhost:8080/getAllSumCommentCompany/1/regular").then(res => {
          this.tableData = res.data;
        })
      },
      submit(form){
        this.$refs[form].validate((valid)=>{
          if (valid){

          }
        })
      }

      // submitForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      // },
      // handleClose(done) {
      //   this.submitForm('ruleForm');
      //   if (this.loading) {
      //     return;
      //   }
      //   this.$confirm('确定要提交表单吗？')
      //     .then(_ => {
      //       this.loading = true;
      //       this.timer = setTimeout(() => {
      //         done();
      //         // 动画关闭需要一定的时间
      //         setTimeout(() => {
      //           this.loading = false;
      //         }, 400);
      //       }, 2000);
      //     })
      //     .catch(_ => {
      //     });
      // },
      // cancelForm() {
      //   this.dialog = false;
      // }
    },
    mounted() {
      this.getRegular();
    }
  }
</script>

<style scoped>

</style>
