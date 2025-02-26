<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="sortDialog = true">新增记录</el-button>
    </div>
    <el-table :data="codeinfo" border style="margin-top: 3%;" class="table" header-cell-class-name="table-header">
      <el-table-column  prop="id" label="ID" width="55" align="center"></el-table-column>
      <el-table-column prop="title" label="标题(含时间)" align="center"></el-table-column>
      <el-table-column prop="introduction" label="作品介绍" align="center"></el-table-column>
   
      <el-table-column prop="url" label="网站链接" align="center"></el-table-column>
      <el-table-column prop="category" label="分类" align="center"></el-table-column>
      <el-table-column label="操作" width="380" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="editSort(scope.row)">
            编辑
          </el-button>
          <el-button type="text" icon="el-icon-edit" @click="deleteHandle(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  

    <el-dialog title="新增"
               :visible.sync="sortDialog"
               width="30%"
               :before-close="handleClose"
               :append-to-body="true"
               destroy-on-close
               center>
      <div class="my-dialog">

        <el-input placeholder="输入标题" v-model="codelist.title" >
          <template slot="prepend">标题</template>
        </el-input> 
        <el-input placeholder="输入内容" v-model="codelist.introduction" >
          <template slot="prepend">内容</template>
        </el-input> 
     
   
        <el-input placeholder="输入链接地址" v-model="codelist.url" >
          <template slot="prepend">链接地址</template>
        </el-input> 
        <el-input placeholder="语言分类" v-model="codelist.category">
          <template slot="prepend">分类</template>
        </el-input> 
     
      </div>


      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="saveSortEdit()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        sortDialog: false,
        labelDialog: false,
        codelist:{
          id:null,
          title:"",
          introduction:"",
          url:"",
          category:""
        },
        codeinfo:[],
      }
    },

    computed: {},

    watch: {},

    created() {
      this.getCode();
    },

    mounted() {

    },

    methods: {
      deleteHandle(codelist) {
        var id=codelist.id;
        let url;
        url = "/admin/deleteColi";
      
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          center: true
        }).then(() => {
          this.$http.get(this.$constant.baseURL + url, {id: id}, true)
            .then((res) => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getCode();
              this.sort = {};
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
      saveSortEdit() {
        if (this.$common.isEmpty(this.codelist.introduction)) {
          this.$message({
            message: "请完善所有分类信息！",
            type: "error"
          });
          return;
        }

        let url;
        if (this.$common.isEmpty(this.codelist.id)) {
          url = "/admin/saveColi";
        } else {
          url = "/admin/updateColi";
        }
        this.$http.post(this.$constant.baseURL + url, this.codelist, true)
          .then((res) => {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.getCode();
            this.handleClose();
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      // saveLabelEdit() {
      //   if (this.$common.isEmpty(this.labelForHttp.labelName) ||
      //     this.$common.isEmpty(this.labelForHttp.labelDescription)) {
      //     this.$message({
      //       message: "请完善所有标签信息！",
      //       type: "error"
      //     });
      //     return;
      //   }

      //   let url;
      //   if (this.$common.isEmpty(this.labelForHttp.id)) {
      //     url = "/webInfo/saveLabel";
      //   } else {
      //     url = "/webInfo/updateLabel";
      //   }
      //   this.$http.post(this.$constant.baseURL + url, this.labelForHttp, true)
      //     .then((res) => {
      //       this.$message({
      //         message: "保存成功！",
      //         type: "success"
      //       });
      //       this.getCode();
      //       this.handleClose();
      //       this.sort = {};
      //     })
      //     .catch((error) => {
      //       this.$message({
      //         message: error.message,
      //         type: "error"
      //       });
      //     });
      // },
      editSort(sort) {
        this.sortDialog = true;
        this.codelist.id = sort.id;
        this.codelist.title = sort.title;
        this.codelist.introduction = sort.introduction;
      this.codelist.url=sort.url;
        this.codelist.category = sort.category;
      },
      handleClose() {
        this.labelForHttp = {
          id: null,
          sortId: null,
          labelName: "",
          labelDescription: ""
        };
        this.sortForHttp = {
          id: null,
          sortName: "",
          sortDescription: "",
          sortType: null,
          priority: null
        };
        this.sortDialog = false;
        this.labelDialog = false;
      },
      sayLabel(sort) {
        this.sort = sort;
      },
      getCode() {
        this.$http.get(this.$constant.baseURL + "/webInfo/listMyCode")
          .then((res) => {
            if (res.data.code==200) {
              console.log("listcode=",res.data.data)
              const mergedArray = [].concat(...Object.values(res.data.data));
              console.log("mererarry:",mergedArray)
              this.codeinfo = mergedArray;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      }
    }
  }
</script>

<style scoped>

  .my-dialog > div {
    margin: 12px;
  }

  .my-dialog >>> input::-webkit-inner-spin-button {
    appearance: none;
  }
</style>
