<template>
  <div>
    <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px"></el-input>
    <el-button type="primary" @click="getEmpByDeptno">搜索</el-button>
    <!--表格-->
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      @selection-change="handleSelectionChange"
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
        width="200px">
      </el-table-column>
      <el-table-column
        prop="dname"
        label="所在部门"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        width="150">
        <template slot="header" slot-scope="scope">
          操作
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleShowInfo(scope.$index, scope.row)">查看详细信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination align='center'
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5,10,20]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="tableData.length">
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "DeptList",
    data() {
      return {
        tableData: [],
        pagesize: 10,
        currpage: 1,
        tableDataName:""



      }
    },
    methods: {
      getEmpByDeptno: function () {
        if (this.tableDataName != ""){
          axios.get("http://localhost:8080/getEmpByDeptnoAndName/1/"+this.tableDataName).then(res => {
            this.tableData = res.data;
          })
        } else {
          axios.get("http://localhost:8080/getEmpByDeptno/1").then(res => {
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
      handleShowInfo(index,row){

      }

    },
    mounted() {
      this.getEmpByDeptno();
    }
  }
</script>

<style scoped>

</style>
