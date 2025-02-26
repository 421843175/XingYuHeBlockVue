<template>
  <div>
    <el-tag effect="dark" class="my-tag">
      <svg viewBox="0 0 1024 1024" width="20" height="20" style="vertical-align: -3px;">
        <path d="M0 0h1024v1024H0V0z" fill="#202425" opacity=".01"></path>
        <path
          d="M682.666667 204.8h238.933333a34.133333 34.133333 0 0 1 34.133333 34.133333v648.533334a68.266667 68.266667 0 0 1-68.266666 68.266666h-204.8V204.8z"
          fill="#FFAA44"></path>
        <path
          d="M68.266667 921.6a34.133333 34.133333 0 0 0 34.133333 34.133333h785.066667a68.266667 68.266667 0 0 1-68.266667-68.266666V102.4a34.133333 34.133333 0 0 0-34.133333-34.133333H102.4a34.133333 34.133333 0 0 0-34.133333 34.133333v819.2z"
          fill="#11AA66"></path>
        <path
          d="M238.933333 307.2a34.133333 34.133333 0 0 0 0 68.266667h136.533334a34.133333 34.133333 0 1 0 0-68.266667H238.933333z m0 204.8a34.133333 34.133333 0 1 0 0 68.266667h409.6a34.133333 34.133333 0 1 0 0-68.266667H238.933333z m0 204.8a34.133333 34.133333 0 1 0 0 68.266667h204.8a34.133333 34.133333 0 1 0 0-68.266667H238.933333z"
          fill="#FFFFFF"></path>
      </svg>
      文章信息
    </el-tag>
    <el-form :model="article" :rules="rules" ref="ruleForm" label-width="150px"
             class="demo-ruleForm">
      <el-form-item label="标题" prop="articleTitle">
        <el-input maxlength="100" v-model="article.articleTitle"></el-input>
      </el-form-item>
      <el-form-item label="分类"  prop="sortId">
        <el-select v-model="article.sortId" placeholder="请选择分类" style="width: 80vw;">
          <el-option
            v-for="item in sorts"
            :key="item.id"
            :label="item.sortName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
  

      <el-form-item label="内容" prop="articleContent">
        <el-row>
          <!-- 编辑 -->
    <el-col :span="12" class="scrollable">
      <mavon-editor ref="md" @imgAdd="imgAdd" v-model="article.articleContent" :subfield="false" defaultOpen="edit"/>
    </el-col>
    <!-- 预览 -->
    <el-col :span="12" class="scrollable">
      <mavon-editor ref="md"  v-model="article.articleContent" :subfield="false" defaultOpen="preview" :editable="false"
      :toolbarsFlag="false" />
    </el-col>
  </el-row>
  </el-form-item>
      <!-- <el-form-item label="是否启用评论" prop="commentStatus">
        <el-tag :type="article.commentStatus === false ? 'danger' : 'success'"
                disable-transitions>
          {{article.commentStatus === false ? '否' : '是'}}
        </el-tag>
        <el-switch v-model="article.commentStatus"></el-switch>
      </el-form-item> -->

      <!-- <el-form-item label="是否推荐" prop="recommendStatus">
        <el-tag :type="article.recommendStatus === false ? 'danger' : 'success'"
                disable-transitions>
          {{article.recommendStatus === false ? '否' : '是'}}
        </el-tag>
        <el-switch v-model="article.recommendStatus"></el-switch>
      </el-form-item> -->
      <el-form-item label="视频链接" prop="videoUrl">
        <el-input maxlength="1000" v-model="article.videoUrl"></el-input>
      </el-form-item>
      <el-form-item label="是否可见" prop="viewStatus">
        <el-tag :type="article.viewStatus === false ? 'danger' : 'success'"
                disable-transitions>
          {{article.viewStatus === false ? '否' : '是'}}
        </el-tag>
        <el-switch v-model="article.viewStatus"></el-switch>
      </el-form-item>

      <el-form-item v-if="article.viewStatus === false" label="不可见时的访问密码" prop="password">
        <el-input maxlength="30" v-model="article.password"></el-input>
      </el-form-item>

      <el-form-item v-if="article.viewStatus === false" label="密码提示" prop="tips">
        <el-input maxlength="60" v-model="article.tips"></el-input>
      </el-form-item>

      <!-- <el-form-item label="封面" prop="articleCover">
        <div style="display: flex">
          <el-input v-model="article.articleCover"></el-input>
          <el-image class="table-td-thumb"
                    lazy
                    style="margin-left: 10px"
                    :preview-src-list="[article.articleCover]"
                    :src="article.articleCover"
                    fit="cover"></el-image>
        </div>
        <uploadPicture :isAdmin="true" :prefix="'articleCover'" style="margin-top: 10px" @addPicture="addArticleCover"
                       :maxSize="2"
                       :maxNumber="1"></uploadPicture>
      </el-form-item> -->

      <el-form-item label="标签" prop="labelId">
        <el-select v-model="article.labelId" placeholder="请选择标签">
          <el-option
            v-for="item in labelsTemp"
            :key="item.id"
            :label="item.labelName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="myCenter" style="margin-bottom: 22px">
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <!-- <el-button type="danger" @click="resetForm('ruleForm')">重置所有修改</el-button> -->
    </div>
  </div>
</template>

<script>
document.onvisibilitychange = function () {
        window.onbeforeunload = function () {
            if (confirm("确认操作吗？应用程序正在执行，如果刷新窗口执行会终止。")) {
                localStorage.setItem("onbeforeunload", Math.random());
                return true;
            }
            else {
                return false;
            }
        }
      }
  export default {
    data() {
      return {
        id: this.$route.query.id,
        article: {
          articleTitle: "",
          articleContent: "",
          commentStatus: true,
          recommendStatus: false,
          viewStatus: true,
          password: "",
          tips: "",
          articleCover: "",
          videoUrl: "",
          sortId: null,
          labelId: null
        },
        sorts: [],
        labels: [],
        labelsTemp: [],
        rules: {
          articleTitle: [
            {required: true, message: '请输入标题', trigger: 'change'}
          ],
          articleContent: [
            {required: true, message: '请输入内容', trigger: 'change'}
          ],
          commentStatus: [
            {required: true, message: '是否启用评论', trigger: 'change'}
          ],
          recommendStatus: [
            {required: true, message: '是否推荐', trigger: 'change'}
          ],
          viewStatus: [
            {required: false, message: '是否可见', trigger: 'change'}
          ],
          articleCover: [
            {required: true, message: '封面', trigger: 'change'}
          ],
          sortId: [
            {required: true, message: '分类', trigger: 'change'}
          ],
          labelId: [
            {required: false, message: '标签', trigger: 'blur'}
          ]
        }
      }
    },

    computed: {},

    watch: {
      // 'article.sortId'(newVal, oldVal) {
      //   if (oldVal !== null) {
      //     this.article.labelId = null;
      //   }
      //   if (!this.$common.isEmpty(newVal) && !this.$common.isEmpty(this.labels)) {
      //     this.labelsTemp = this.labels.filter(l => l.sortId === newVal);
      //   }
      // }
    },

    created() {
      this.getSortAndLabel();
    },

    mounted() {

    },

    methods: {
      imgAdd(pos, file) {
        let suffix = "";
        if (file.name.lastIndexOf('.') !== -1) {
          suffix = file.name.substring(file.name.lastIndexOf('.'));
        }

        //必须完善分类和标题
        if(this.article.sortId==null ||this.article.articleTitle==null )
        {
          alert("必须填写分类或标题");
          return;
        }
        let key = this.sorts[this.article.sortId-1].sortName+"/"+this.article.articleTitle+"/" +new Date().getTime() + Math.floor(Math.random() * 1000) + suffix;
        
      
        console.log("key=",key)
        let fd = new FormData();
        fd.append("file", file);
        fd.append("originalName", file.name);
        fd.append("key", key);
        fd.append("relativePath", key);
        fd.append("type", "articlePicture");
        fd.append("storeType", "local");

     
          this.saveLocal(pos, fd);
        
      },
      saveLocal(pos, fd) {
        this.$http.upload(this.$constant.baseURL + "/admin/upload", fd, true)
          .then((res) => {
          
              let url = res;
              this.$refs.md.$img2Url(pos, url);
            
          })
          .catch((error) => {
            if(!error.message.indexOf("undefined")){
                  this.$message({
                      message: error.message,
                      type: "error"
                    });
            }
          
          });

        // test 
        // this.$refs.md.$img2Url(pos, "D:\judata\notion\PYTHON 1300a844cb5a486f9df063d924082ece\python爬虫 84339b343d5f47d5b3c83c2a1de6c663\tupian.png");
      },
   
      addArticleCover(res) {
        this.article.articleCover = res;
      },
      getSortAndLabel() {
        this.$http.get(this.$constant.baseURL + "/webInfo/listSortAndLabel")
          .then((res) => {
            if (!this.$common.isEmpty(res.data.data)) {
              console.log("res=",res.data.data)
              this.sorts = res.data.data.sorts;
              this.labelsTemp = res.data.data.labels;
              if (!this.$common.isEmpty(this.id)) {
                this.getArticle();
              }
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      getArticle() {
        this.$http.get(this.$constant.baseURL + "/admin/getArticleById", {id: this.id}, true)
          .then((res) => {
            if (!this.$common.isEmpty(res.data.data)) {
              this.article = res.data.data;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      submitForm(formName) {
        if (this.article.viewStatus === false && this.$common.isEmpty(this.article.password)) {
          this.$message({
            message: "文章不可见时必须输入密码！",
            type: "error"
          });
          return;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.$common.isEmpty(this.id)) {
              this.saveArticle(this.article, "/admin/saveArticle")
            } else {
              this.article.id = this.id;
              // this.saveArticle(this.article, "/admin/updateArticle")
              this.saveArticle(this.article, "/admin/saveArticle")
            }
          } else {
            this.$message({
              message: "请完善必填项！",
              type: "error"
            });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        if (!this.$common.isEmpty(this.id)) {
          this.getArticle();
        }
      },
      saveArticle(value, url) {
        this.$confirm('确认保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          center: true
        }).then(() => {
          this.$http.post(this.$constant.baseURL + url, value, true)
            .then((res) => {
              this.$message({
                message: res.data.data,
                type: "success"
              });
              this.$router.push({path: '/postList'});
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
            message: '已取消保存!'
          });
        });
      }
    }
  }
</script>

<style scoped>

  .my-tag {
    margin-bottom: 20px;
    width: 100%;
    text-align: left;
    background: var(--lightYellow);
    border: none;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: var(--black);
  }

  .table-td-thumb {
    border-radius: 2px;
    width: 40px;
    height: 40px;
  }
  .scrollable {
  height: 500px; /* 设置展示区高度 */
  overflow-y: scroll; /* 启用垂直滚动条 */
}
  .el-switch {
    margin-left: 10px;
  }

  .el-form-item {
    margin-bottom: 40px;
  }
</style>
