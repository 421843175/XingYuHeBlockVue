<template>
  <div>
    <div class="handle-box">
      <!-- <el-select v-model="pagination.recommendStatus" placeholder="是否推荐" style="width: 120px" class="mrb10">
        <el-option key="1" label="是" :value="true"></el-option>
        <el-option key="2" label="否" :value="false"></el-option>
      </el-select> -->
      <el-select style="width: 140px" class="mrb10" v-model="pagination.sortId" placeholder="请选择分类">
        <el-option
          v-for="item in sorts"
          :key="item.id"
          :label="item.sortName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select style="width: 140px" class="mrb10" v-model="pagination.labelId" placeholder="请选择标签">
        <el-option
          v-for="item in labelsTemp"
          :key="item.id"
          :label="item.labelName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-input v-model="pagination.searchKey" placeholder="文章内容" class="handle-input mrb10"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchArticles()">搜索</el-button>
      <el-button type="danger" @click="clearSearch()">清除参数</el-button>
      <el-button type="primary" @click="$router.push({path: '/postEdit'})">新增文章</el-button>
    </div>
    <el-table :data="articles" border class="table" header-cell-class-name="table-header">
      <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
      <!-- <el-table-column prop="username" label="作者" align="center"></el-table-column> -->
      <el-table-column prop="articleTitle" label="文章标题" align="center"></el-table-column>
      <el-table-column prop="sortName" label="分类" align="center"></el-table-column>
      <el-table-column prop="labelName" label="标签" align="center"></el-table-column>
      <!-- <el-table-column prop="viewCount" label="浏览量" align="center"></el-table-column>
      <el-table-column prop="likeCount" label="点赞数" align="center"></el-table-column> -->
      <!-- <el-table-column label="是否可见" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.viewStatus === false ? 'danger' : 'success'"
                  disable-transitions>
            {{scope.row.viewStatus === false ? '不可见' : '可见'}}
          </el-tag>
          <el-switch @click.native="changeStatus(scope.row, 1)" v-model="scope.row.viewStatus"></el-switch>
        </template>
      </el-table-column> -->
   
   
      <!-- <el-table-column label="是否推荐" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.recommendStatus === false ? 'danger' : 'success'"
                  disable-transitions>
            {{scope.row.recommendStatus === false ? '否' : '是'}}
          </el-tag>
          <el-switch @click.native="changeStatus(scope.row, 3)" v-model="scope.row.recommendStatus"></el-switch>
        </template>
      </el-table-column> -->
      <el-table-column prop="updateTime" label="最终修改时间" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" style="color: var(--orangeRed)" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="pagination">
      <el-pagination background layout="total, prev, pager, next"
                     :current-page="pagination.current"
                     :page-size="pagination.size"
                     :total="pagination.total"
                     @current-change="handlePageChange">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>

  export default {
    data() {
      return {
        isBoss: this.$store.state.currentAdmin.isBoss,
        pagination: {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          recommendStatus: null,
          sortId: null,
          labelId: null
        },
        articles: [],
        sorts: [],
        labels: [],
        labelsTemp: []
      }
    },

    computed: {},

    watch: {
      'pagination.sortId'(newVal) {
        this.pagination.labelId = null;
        if (!this.$common.isEmpty(newVal) && !this.$common.isEmpty(this.labels)) {
          this.labelsTemp = this.labels.filter(l => l.sortId === newVal);
        }
      }
    },

    created() {
      this.getArticles();
      this.getSortAndLabel();
    },

    mounted() {
    },

    methods: {
      getSortAndLabel() {
        this.$http.get(this.$constant.baseURL + "/webInfo/listSortAndLabel")
          .then((res) => {
            if (!this.$common.isEmpty(res.data.data)) {
              this.sorts = res.data.data.sorts;
              this.labels = res.data.data.labels;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      clearSearch() {
        this.pagination = {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          recommendStatus: null,
          sortId: null,
          labelId: null
        }
        this.getArticles();
      },
      getArticles() {
        let url = "";
          url = "/admin/artilelist";

          // true 是为了传token
        this.$http.post(this.$constant.baseURL + url,this.pagination,true)
          .then((res) => {
            if (!this.$common.isEmpty(res.data.data)) {
              // this.articles = res.data.data.records;
              // this.pagination.total = res.data.data.total;
              this.articles = res.data.data;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      handlePageChange(val) {
        this.pagination.current = val;
        this.getArticles();
      },
      searchArticles() {
        this.pagination.total = 0;
        this.pagination.current = 1;
        this.getArticles();
      },
      changeStatus(article, flag) {
        // let param;
        // if (flag === 1) {
        //   param = {
        //     articleId: article.id,
        //     viewStatus: article.viewStatus
        //   }
        // } else if (flag === 2) {
        //   param = {
        //     articleId: article.id,
        //     commentStatus: article.commentStatus
        //   }
        // } else if (flag === 3) {
        //   param = {
        //     articleId: article.id,
        //     recommendStatus: article.recommendStatus
        //   }
        // }
        // this.$http.get(this.$constant.baseURL + "/admin/article/changeArticleStatus", param, true)
        //   .then((res) => {
        //     if (flag === 1) {
        //       this.$message({
        //         duration: 0,
        //         showClose: true,
        //         message: "修改成功！注意，文章不可见时必须设置密码才能访问！",
        //         type: "warning"
        //       });
        //     } else {
        //       this.$message({
        //         message: "修改成功！",
        //         type: "success"
        //       });
        //     }
        //   })
        //   .catch((error) => {
        //     this.$message({
        //       message: error.message,
        //       type: "error"
        //     });
        //   });
      },
      handleDelete(item) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          center: true
        }).then(() => {
          // 防止恶意攻击 伪删除 隐藏文件到./delete/文件.md 
          this.$http.get(this.$constant.baseURL + "/admin/deleteArticle", {id: item.id}, true)
            .then((res) => {
              this.pagination.current = 1;
              this.getArticles();
         
            })
            .catch((error) => {
              this.$message({
                message: error.message,
                type: "error"
              });
            });
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除!'
          });
        });
      },
      handleEdit(item) {
        this.$router.push({path: '/postEdit', query: {id: item.id}});
      }
    }
  }
</script>

<style scoped>

  .handle-box {
    margin-bottom: 20px;
  }

  .handle-input {
    width: 60%;
    display: inline-block;
  }

  .table {
    width: 100%;
    font-size: 14px;
  }

  .mrb10 {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }

  .pagination {
    margin: 20px 0;
    text-align: right;
  }

  .el-switch {
    margin: 5px;
  }
</style>
