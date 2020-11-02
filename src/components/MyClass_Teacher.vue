<template>
  <div>
  <div>
    <h1>我的班级</h1>
  </div>

<div>


  <el-table
    :data="tableData"
    height="600"
    border
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="学生姓名">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="成绩1">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="成绩2">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      prop="cno"
      label="班级编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="cname"
      label="班级名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="ename"
      label="任课老师">
    </el-table-column>

<!--    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
      <el-button @click="watch(scope.row)" type="text" size="small" id="view">查看</el-button>
      <el-button type="text" size="small">编辑</el-button>
    </template>
    </el-table-column>-->

  </el-table>

  </div>
  </div>
</template>


<script>
  import axios from 'axios';
    export default {
        name: "MyClass_Teacher",
      data() {
        return {
          tableData: [],
        }
      },
      methods: {

        getClassByTeacher: function () {
          var uid = this.$store.state.uid;
          axios.get("http://localhost:8080/showClass/"+uid).then(res => {
            this.tableData=res.data;
          })
        },
      },
      mounted() {
        this.getClassByTeacher();

      }
    };

</script>

<style scoped>

</style>
