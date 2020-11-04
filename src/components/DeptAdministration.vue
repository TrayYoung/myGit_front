<template>
  <div>
    <h1>经理管理</h1>
    <el-input v-model="tableDataName" placeholder="请输入部门名称" style="width:240px"></el-input>
    <el-button type="primary" @click="getEmpByDeptno">搜索</el-button>
    <el-button type="primary" @click="handleInsert" style="float: right;">新增部门<i class="el-icon-plus"></i></el-button>
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
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.dname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
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
        currpage: 1,
        tableDataName: "",
        dialogFormVisible:false,
        form: {
          dname: ''
        },


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

      handleCurrentChange(cpage) {
        this.currpage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      handleSelectionChange(val) {
        console.log(val)
      },
      handleShowInfo(row) {
        var deptno = row.deptno;
        axios.get("getEmpByDeptno/"+deptno).then(res => {

        })
      },
      handleInsert(){

      }


    },
    mounted() {
      this.getEmpByDeptno();
    }
  }
</script>

<style scoped>

</style>
