<template>
  <div>
    <div>
      <h1>我的课程——教师</h1>
    </div>
    <div>
      <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="courseid"
          label="课程号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="coursename"
          label="课程名称"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text" @click="open">点击打开 Message Box</el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="primary" @click="handleViewInfo(scope.$index,scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      <el-drawer
              title="标题"
              :visible.sync="drawer"
              :direction="direction"
              :before-close="handleClose">
              <el-table
                empty-text="当前班级无学员"
                :data="tableData2"
                height="250"
                style="width: 100%"
              >
                <el-table-column
                  prop="ename"
                  label="姓名"
                  sortable
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="成绩"
                  :formatter="formatter">
                </el-table-column>
              </el-table>
            </el-drawer>-->
      <!--表单-->
      <el-drawer
        title="我嵌套了 Form !"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
      >
        <el-table
          empty-text="当前班级无学员"
          :data="tableData2"
          height="250"
          style="width: 100%"
        >
          <el-table-column
            prop="ename"
            label="姓名"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="score"
            label="成绩"
            :formatter="formatter">
          </el-table-column>
        </el-table>
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">
              {{ loading ? '提交中 ...' : '确 定' }}
            </el-button>
          </div>
        </div>
      </el-drawer>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "MyCourse_Teacher",
    data() {
      return {
        table: false,
        dialog: false,
        loading: false,
        tableData: [],
        drawer: false,
        direction: 'rtl',
        tableData2: [],
        courseids: "",
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '80px',
        timer: null,
      }
    },
    methods: {
      getCourse: function () {
        axios.get("http://localhost:8080/showCourse").then(res => {
          this.tableData = res.data;
        })
      },
      getScore: function () {
        var empno = this.$store.state.uid;
        var courseid = 1;
        axios.get("http://localhost:8080/showScore/" + empno + "/" + courseid).then(res => {
          this.tableData2 = res.data;
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      handleViewInfo(index, row) {
        this.drawer = true;
        this.dialog = true;
        this.courseids = row.courseid;
        this.getCourse();
      },
      handleClose(done) {
        if (this.loading) {
          return;
        }
        this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
          })
          .catch(_ => {
          });
      },

      cancelForm() {
        this.loading = false;
        this.dialog = false;
        clearTimeout(this.timer);
      }
    },
    mounted() {
      this.getCourse();
      this.getScore();
    }
  }
</script>

<style scoped>

</style>
