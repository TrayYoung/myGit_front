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
              @click="handleShowInfo(scope.$index, scope.row)">考核
            </el-button>
          </template>
        </el-table-column>


      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Regular",
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      getRegular: function () {
        axios.get("http://localhost:8080/getAllSumCommentCompany/1/regular").then(res => {
          this.tableData = res.data;
        })
      }
    },
    mounted() {
      this.getRegular();
    }
  }
</script>

<style scoped>

</style>
