<template>
  <div>

  <el-table
    :data="tableData"
    border
    style="width: 100%"
  >

    <el-table-column
      label="工作2年工作评价"
      align="center">
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
        <el-table-column
          label="评价4"
          prop="">
        </el-table-column>
        <el-table-column
          label="评价5"
          prop="">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="整体评价分数"
      ></el-table-column>
      <el-table-column
        label="评价（包括主要优点及缺陷）"
      ></el-table-column>


    </el-table-column>

  </el-table>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Regular_2",
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      getRegular: function () {

      }
    }
  }
</script>

<style scoped>

</style>
