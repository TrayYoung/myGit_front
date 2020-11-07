<template>
  <div>
    <h1>经理管理</h1>
    <el-input v-model="tableDataName" placeholder="请输入部门名称" style="width:240px"></el-input>
    <el-button type="primary" @click="getEmpByDeptno">搜索</el-button>
    <el-button type="primary" @click="insertFormVisible = true" style="float: right;">新增部门<i class="el-icon-plus"></i>
    </el-button>
    <!--表格-->
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%;margin-top: 20px">
      <el-table-column
        prop="deptno"
        label="部门标号"
        sortable>
      </el-table-column>
      <el-table-column
        prop="dname"
        label="部门名称">
      </el-table-column>
      <el-table-column
        prop="count"
        label="部门人数">
      </el-table-column>
      <el-table-column
        align="center">
        <template slot="header" slot-scope="scope">
          操作
        </template>
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleShowInfo(scope.row)">查看详细信息
          </el-button>
          <el-button
            type="warning"
            size="mini"
            @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination align='center'
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[4,8]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="tableData.length">
    </el-pagination>

    <!--新增-->
    <el-dialog title="新增部门" :visible.sync="insertFormVisible">
      <el-form :model="insertForm" ref="form">
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="dname">
          <el-input v-model="insertForm.dname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="insertFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitInsert">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改部门信息-->
    <el-dialog title="修改部门信息" :visible.sync="editFormVisible">
      <el-form :model="editForm">
        <el-form-item label="部门编号" :label-width="formLabelWidth">
          <el-input v-model="editForm.deptno" readonly autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.dname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!--查看部门详细信息-->
    <el-dialog title="部门详细信息"
               :visible.sync="showInfoVisible"
                width="70%">
      <el-table
        :data="deptData.slice((currpage1 - 1) * pagesize1, currpage1 * pagesize1)"
        @selection-change="handleSelectionChange1"
        border
        style="width: 100%">
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
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日">
        </el-table-column>
        <el-table-column
          prop="address"
          label="籍贯">
        </el-table-column>
        <el-table-column
          prop="ismarry"
          label="婚否">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="idnum"
          label="身份证号"
          width="170px">
        </el-table-column>
        <el-table-column
          prop="dname"
          label="所在部门"
          width="100">
        </el-table-column>
        <el-table-column
          prop="role"
          label="职位"
          width="100">
        </el-table-column>

      </el-table>
      <!--分页器-->
      <el-pagination align='center'
                     @size-change="handleSizeChange1"
                     @current-change="handleCurrentChange1"
                     :current-page="currpage1"
                     :page-sizes="[4,8]"
                     :page-size="pageSize1"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="deptData.length">
      </el-pagination>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "ManagerAdministration",
    data() {
      return {
        tableData: [],
        pagesize: 4,
        pagesize1: 4,
        currpage: 1,
        currpage1: 1,
        tableDataName: "",
        insertFormVisible: false,
        editFormVisible: false,
        showInfoVisible: false,
        deptData: [],
        insertForm: {
          dname: ''
        },
        editForm: {
          deptno: '',
          dname: ''
        }


      }
    },
    methods: {
      getEmpByDeptno: function () {

        if (this.tableDataName != "") {
          axios.get("getAllDeptByName/" + this.tableDataName).then(res => {
            this.tableData = res.data;
          })
        } else {
          axios.get("getAllDept").then(res => {
            this.tableData = res.data;
          })
        }
      },
      getAllEmpByDeptno: function () {

      },

      handleCurrentChange(cpage) {
        this.currpage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      handleCurrentChange1(cpage) {
        this.currpage1 = cpage;
      },
      handleSizeChange1(psize) {
        this.pagesize1 = psize;
      },
      handleSelectionChange(val) {
        console.log(val)
      },
      handleSelectionChange1(val) {
        console.log(val)
      },
      //查看部门详细信息
      handleShowInfo(row) {
        axios.get("getAllEmpByDeptno/" + row.deptno).then(res => {
          this.deptData = res.data;
        })
        this.showInfoVisible = true;
      },
      //编辑部门信息
      handleEdit(row) {
        this.editForm.deptno = row.deptno;
        this.editForm.dname = row.dname;
        this.editFormVisible = true;
      },
      //删除部门
      handleDelete(row) {
        if (row.count > 0) {
          this.$message("不能删除员工人数大于0的部门")
          return;
        }
        axios.get("deleteDept/" + row.deptno).then(res => {
          this.$message(res.data);
          this.getEmpByDeptno();
        })
      },

      //提交新增
      submitInsert() {
        axios.get("addDept/" + this.insertForm.dname).then(res => {
          this.$message(res.data);
        })
        this.insertFormVisible = false;
        this.getEmpByDeptno();
        //表单置空
        this.$refs.form.resetFields();
      },
      //提交修改
      submitEdit() {
        axios.get("updateDept/" + this.editForm.dname + "/" + this.editForm.deptno).then(res => {
          this.$message(res.data);
        })
        this.editFormVisible = false;
        this.getEmpByDeptno();
      }


    },
    mounted() {
      this.getEmpByDeptno();
    }
  }
</script>

<style scoped>

</style>
