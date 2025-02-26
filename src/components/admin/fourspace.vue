<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="sortDialog = true">新增记录</el-button>
    </div>
    <el-table :data="recordInfo" border class="table" header-cell-class-name="table-header">
      <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
      <el-table-column prop="content" label="说说内容" align="center"></el-table-column>
      <el-table-column prop="createTime" label="时间" align="center"></el-table-column>
      <el-table-column prop="srcPicArray" label="图片链接" align="center"></el-table-column>
   
      <el-table-column prop="hrefArray" label="网站链接" align="center"></el-table-column>
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
     
       载入空间: <el-input v-model="space.content" :rows="6" type="textarea" placeholder="记录吧"/>
      <div class="block">
      <div class="demonstration">选择时间</div>
      <el-date-picker
     
        type="datetime"
        placeholder="Select date and createTime"

        v-model="space.createTime"
      />
    </div>
       <el-input placeholder="输入链接名"  v-model="space.hrefname">
          <template slot="prepend">链接名</template>
        </el-input> 
        <el-input placeholder="输入链接地址" v-model="space.hreflink" >
          <template slot="prepend">链接地址</template>
        </el-input> 
        <el-input placeholder="输入图片链接" v-model="space.srcPicArray">
          <template slot="prepend">图片链接</template>
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
        space:{
          content:"",
          createTime:null,
          hrefname:"",
          hreflink:"",
          srcPicArray:[],
          id:null,
          hrefArray:""
        },
        recordInfo:[],
      }
    },

    computed: {},

    watch: {},

    created() {
      this.getRecord();
    },

    mounted() {

    },

    methods: {
      deleteHandle(space) {
        var id=space.id;
        let url;
        url = "/admin/deleteRecord";
      
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
              this.getRecord();
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
        if (this.$common.isEmpty(this.space.content)) {
          this.$message({
            message: "请完善所有分类信息！",
            type: "error"
          });
          return;
        }

        let url;
        if(this.space.hrefname!="" && this.space.hreflink!="")
          this.space.hrefArray="[{name:"+this.space.hrefname+",url:"+this.space.hreflink+"}]"
        if (this.$common.isEmpty(this.space.id)) {
          url = "/admin/saveSpace";
        } else {
          url = "/admin/updateSpace";
        }
        this.$http.post(this.$constant.baseURL + url, this.space, true)
          .then((res) => {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.getRecord();
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
      //       this.getRecord();
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
        this.space.id = sort.id;
        this.space.content = sort.content;
        this.space.createTime = sort.createTime;
      this.space.hrefArray=sort.hrefArray;
        this.space.srcPicArray = sort.srcPicArray;
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
      getRecord() {
        this.$http.post(this.$constant.baseURL + "/record/listRecord")
          .then((res) => {
            console.log("resdata:",res.data.data.records)
            if (res.data.code==200) {
              this.recordInfo = res.data.data.records;
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
