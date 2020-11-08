<template>
    <div>
      <h1>评价项管理</h1>
      <div>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
                   @click="addComment()">添加</el-button>
        <div style="float: right">
          <el-input v-model="commentName" style="width: 230px" placeholder="请输入课程名"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="searchComment()">搜索</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top: 3%;">
        <el-table-column
          prop="commentId"
          label="评价项ID">
        </el-table-column>
        <el-table-column
          prop="commentName"
          label="评价项名">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditComment(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="padding-left: 25%"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allComment.length">
      </el-pagination>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "CommentAdministration",
      data() {
        return{
          currentPage: 1, //初始页
          pagesize: 5,    //每页的数据
          commentName:'',

          tableData:[],
          allComment:[]
        }
      },
      methods:{
        getComment: function () {
          axios.get("http://localhost:8080/getCommentList/").then(res => {
            this.allComment = res.data;
          });
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
          this.pagesize = size;
          this.searchComment();
          console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          this.searchComment();
          console.log(this.currentPage)  //点击第几页
        },
        searchComment:function () {
          if (this.commentName === ""){
            this.commentName = 'isNull'
          }
          axios.get("/getCommentByName/" + this.currentPage + "/"+ this.pagesize +
            "/"+ this.commentName).then(res => {
            this.tableData = res.data;
          });
          if (this.commentName === "isNull"){
            this.commentName =''
          }
        },
        handleEditComment(index,row) {
          this.$prompt('请修改评价项名', '提示', {
            inputValue: row.commentName,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /[\u4E00-\u9FA5A-Za-z0-9]{2,20}/,
            inputErrorMessage: '请输入正确的评价项名，不能包含特殊符号'
          }).then(({ value }) => {
            axios.get("editComment/" + row.commentId + "/" + value).then(res => {
              if (res.data === "success") {
                this.$message({
                  type: 'success',
                  message: '修改后的评价名是: ' + value
                });
                this.searchComment();
              }else {
                this.$message({
                  type: 'info',
                  message: '服务器响应失败'
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        },
        handleDelete(index,row) {
          this.$confirm('确认删除该评价项吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.get("delComment/" + row.commentId).then(res =>{
              if ("success" === res.data) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                });
                this.searchComment();
              }else {
                this.$message({
                  type: 'info',
                  message: '服务器响应失败'
                });
              }
            });
          }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
          });
        },
        addComment() {
          this.$prompt('请输入评价项名', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /[\u4E00-\u9FA5A-Za-z0-9]{2,20}/,
            inputErrorMessage: '请输入正确的评价项名，不能包含特殊符号'
          }).then(({ value }) => {
            axios.get("addComment/" + value).then(res => {
              if (res.data === "success") {
                this.$message({
                  type: 'success',
                  message: '新增的评价名是: ' + value
                });
                this.searchComment();
              }else {
                this.$message({
                  type: 'info',
                  message: '服务器响应失败'
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        }
      },
      mounted() {
          this.searchComment();
          this.getComment();
      }
    }
</script>

<style scoped>

</style>
