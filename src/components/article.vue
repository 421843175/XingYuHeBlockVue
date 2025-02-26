<template>
  <div>
    <div v-if="!$common.isEmpty(article)">
      <!-- 封面 -->
      <div class="article-head my-animation-slide-top">
        <!-- 背景图片 -->
        <el-image class="article-image my-el-image"
                  v-once
                  lazy
                  :src="$store.state.imgSui2"
                  fit="cover">
          <div slot="error" class="image-slot">
            <div class="article-image"></div>
          </div>
        </el-image>
        <!-- 文章信息 -->
        <div class="article-info-container">
          <div class="article-title">{{ article.articleTitle }}</div>
        </div>


      </div>
      <!-- 文章 -->
      <div style="background: var(--background);">
        <div class="article-container my-animation-slide-bottom">
          <div v-if="!$common.isEmpty(article.videoUrl)" style="margin-bottom: 20px">
            <videoPlayer :url="{src: $common.decrypt(article.videoUrl)}"
                         :cover="!$common.isEmpty(article.articleCover)?article.articleCover:$constant.random_image+new Date()+Math.floor(Math.random()*10)">
            </videoPlayer>
          </div>

          <!-- 最新进展 -->
          <!-- <div v-if="!$common.isEmpty(treeHoleList)" class="process-wrap">
            <el-collapse accordion value="1">
              <el-collapse-item title="最新进展" name="1">
                <process :treeHoleList="treeHoleList" @deleteTreeHole="deleteTreeHole"></process>
              </el-collapse-item>
            </el-collapse>

            <hr>
          </div> -->

          <!-- 文章内容 -->
          <div v-html="articleContentHtml" class="entry-content"></div>
          <!-- 最后更新时间 -->
          <div v-show="article.updateTime!=null" class="article-update-time">
            <span >文章最后更新于 {{ article.updateTime }}</span>
          </div>
          <!-- 分类 -->
          <div class="article-sort">
            <span @click="$router.push({path: '/sort', query: {labelId: article.labelId}})">{{" ▶ "+ article.labelName}}</span>
          </div>
          <!-- 作者信息 -->
          <blockquote>
            <div>
              作者：木星
            </div>
            <div>
              版权声明：转载请注明文章出处
            </div>
          </blockquote>
     

     
        </div>

        <div id="toc" class="toc"></div>
      </div>

      <div style="background: var(--background)">
        <myFooter></myFooter>
      </div>

      <div id="toc-button" @click="clickTocButton()">
        <i class="fa fa-align-justify" aria-hidden="true"></i>
      </div>

  
    </div>

    <!-- 微信 -->
    <el-dialog title="密码"
               :modal="false"
               :visible.sync="showPasswordDialog"
               width="25%"
               :append-to-body="true"
               destroy-on-close
               center>
      <div>
        <div>
          <div class="password-content">{{tips}}</div>
        </div>
        <div style="margin: 20px auto">
          <el-input maxlength="30" v-model="password"></el-input>
        </div>
        <div style="display: flex;justify-content: center">
          <proButton :info="'提交'"
                     @click.native="submitPassword()"
                     :before="$constant.before_color_2"
                     :after="$constant.after_color_2">
          </proButton>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  const myFooter = () => import( "./common/myFooter");
  // const comment = () => import( "./comment/comment");
  // const process = () => import( "./common/process");
  const proButton = () => import( "./common/proButton");
  const videoPlayer = () => import( "./common/videoPlayer");
  import MarkdownIt from 'markdown-it';

  export default {
    components: {
      myFooter,
      // comment,
      proButton,
      // process,
      videoPlayer
    },

    data() {
      return {
        id: 1,
        subscribe: false,
        article: {},
        articleContentHtml: "",
        treeHoleList: [],
        newsTime: "",
        // 密码 
        showPasswordDialog: false,
        password: "",
        tips: "",
        scrollTop: 0
      };
    },
    created() {
        this.id=parseInt(this.$route.query.id)
        this.getArticle(this.password)
    },
    mounted() {
      window.addEventListener("scroll", this.onScrollPage);
    },
    destroyed() {
      window.removeEventListener("scroll", this.onScrollPage);
    },
    watch: {
      scrollTop(scrollTop, oldScrollTop) {
        let isShow = scrollTop - window.innerHeight > 30;
        if (isShow) {
          $("#toc-button").css("bottom", "15vh");
        } else {
          $("#toc-button").css("bottom", "8vh");
        }
      },
    },
    methods: {
      clickTocButton() {
        let display = $(".toc");
        if ("none" === display.css("display")) {
          display.css("display", "unset");
        } else {
          display.css("display", "none");
        }
      },
      subscribeLabel() {
     
    
      },

      // 输入密码
      submitPassword() {
        if (this.$common.isEmpty(this.password)) {
          this.$message({
            message: "请先输入密码！",
            type: "error"
          });
          return;
        }

        this.getArticle(this.password);
      },
      
   
      getNews() {
        // this.$http.post(this.$constant.baseURL + "/weiYan/listNews", {
        //   current: 1,
        //   size: 9999,
        //   source: this.article.id
        // })
        //   .then((res) => {
        //     if (!this.$common.isEmpty(res.data.data)) {
        //       res.data.data.records.forEach(c => {
        //         c.content = c.content.replace(/\n{2,}/g, '<div style="height: 12px"></div>');
        //         c.content = c.content.replace(/\n/g, '<br/>');
        //         c.content = this.$common.faceReg(c.content);
        //         c.content = this.$common.pictureReg(c.content);
        //       });
        //       this.treeHoleList = res.data.data.records;
        //     }
        //   })
        //   .catch((error) => {
        //     this.$message({
        //       message: error.message,
        //       type: "error"
        //     });
        //   });
      },
      onScrollPage() {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (this.scrollTop < (window.innerHeight / 4)) {
          $(".toc").css("top", window.innerHeight / 4);
        } else {
          $(".toc").css("top", "90px");
        }
      },
      getTocbot() {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.$constant.tocbot;
        document.getElementsByTagName('head')[0].appendChild(script);

        // 引入成功
        script.onload = function () {
          tocbot.init({
            tocSelector: '#toc',
            contentSelector: '.entry-content',
            headingSelector: 'h1, h2, h3, h4, h5',
            scrollSmooth: true,
            fixedSidebarOffset: 'auto',
            scrollSmoothOffset: -100,
            hasInnerContainers: false
          });
        }
      },
      addId() {
        let headings = $(".entry-content").find("h1, h2, h3, h4, h5, h6");
        headings.attr('id', (i, id) => id || 'toc-' + i);
      },
      getArticle(password) {
         this.$http.get(this.$constant.baseURL + "/article/getArticleById", {id: this.id, password: password})
           .then((res) => {
             if (res.data.code==200) {
               this.article = res.data.data;
            // TODO:返回md文件结果读取的所有内容
            if (this.article && this.article.articleTitle && typeof this.article.articleTitle === 'string') {
          const titleEnd = this.article.articleTitle.slice(-32);
      if (/^[0-9a-fA-F]{32}$/.test(titleEnd)) {
    this.article.articleTitle = this.article.articleTitle.slice(0, -33);
        }
      }
              this.getNews();
              const md = new MarkdownIt({breaks: true}).use(require('markdown-it-multimd-table'));

              this.articleContentHtml = md.render(this.article.articleContent);
              this.$nextTick(() => {
                this.highlight();
                this.addId();
                this.getTocbot();
              });
              if (!this.$common.isEmpty(password)) {
                localStorage.setItem("article_password_" + this.id, password);
              }
              this.showPasswordDialog = false;
              if (!this.$common.isEmpty(this.$store.state.currentUser) && !this.$common.isEmpty(this.$store.state.currentUser.subscribe)) {
                this.subscribe = JSON.parse(this.$store.state.currentUser.subscribe).includes(this.article.labelId);
              }
             }
           })
           .catch((error) => {
          if ("密码错误" === error.message.substr(0, 4)) {
              if (!this.$common.isEmpty(password)) {
                this.$message({
                  message: "密码错误，请重新输入！",
                  type: "error"
                });
              }
              this.tips = error.message.substr(4);
              this.showPasswordDialog = true;
            } else {
              this.$message({
                message: error.message,
                type: "error"
              });
            }
          });
      },
      highlight() {
        let attributes = {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          spellcheck: "false",
          contenteditable: "false"
        };

        $("pre").each(function (i, item) {
          let preCode = $(item).children("code");
          let classNameStr = preCode[0].className;
          let classNameArr = classNameStr.split(" ");

          let lang = "";
          classNameArr.some(function (className) {
            if (className.indexOf("language-") > -1) {
              lang = className.substring(className.indexOf("-") + 1, className.length);
              return true;
            }
          });

          // 检测语言是否存在，不存在则自动检测
          let language = hljs.getLanguage(lang.toLowerCase());
          if (language === undefined) {
            // 启用自动检测
            let autoLanguage = hljs.highlightAuto(preCode.text());
            preCode.removeClass("language-" + lang);
            lang = autoLanguage.language;
            if (lang === undefined) {
              lang = "java";
            }
            preCode.addClass("language-" + lang);
          } else {
            lang = language.name;
          }

          $(item).addClass("highlight-wrap");
          $(item).attr(attributes);
          preCode.attr("data-rel", lang.toUpperCase()).addClass(lang.toLowerCase());
          // 启用代码高亮
          hljs.highlightBlock(preCode[0]);
          // 启用代码行号
          hljs.lineNumbersBlock(preCode[0]);
        });

        $("pre code").each(function (i, block) {
          $(block).attr({
            id: "hljs-" + i,
          });

          $(block).after(
            '<a class="copy-code" href="javascript:" data-clipboard-target="#hljs-' +
            i +
            '"><i class="fa fa-clipboard" aria-hidden="true"></i></a>'
          );
          new ClipboardJS(".copy-code");
        });

        if ($(".entry-content").children("table").length > 0) {
          $(".entry-content")
            .children("table")
            .wrap("<div class='table-wrapper'></div>");
        }
      },
      // getRandomImage(){
      //     // return;
      //   // console.log("111,",Math.floor(Math.random() * 10000000) + 1)
      //   return this.$store.state.imgChang+"?id="+Math.floor(Math.random() * 100) + 1;
      // }
    }
  }
</script>

<style scoped>

  .article-head {
    height: 40vh;
    position: relative;
  }

  .article-image::before {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--miniMask);
    content: "";
  }

  .article-info-container {
    position: absolute;
    bottom: 15px;
    left: 20%;
    color: var(--white);
  }

  .article-info-news {
    position: absolute;
    bottom: 10px;
    right: 20%;
    cursor: pointer;
    animation: scale 1s ease-in-out infinite;
  }

  .article-title {
    font-size: 28px;
    margin-bottom: 15px;
  }

  .article-info {
    font-size: 14px;
    user-select: none;
  }

  .article-info i {
    margin-right: 6px;
  }

  .article-info span:not(:last-child) {
    margin-right: 5px;
  }

  .article-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .article-update-time {
    color: var(--greyFont);
    font-size: 12px;
    margin: 20px 0;
    user-select: none;
  }

  blockquote {
    line-height: 2;
    border-left: 0.2rem solid var(--blue);
    padding: 10px 1rem;
    background-color: var(--azure);
    border-radius: 4px;
    margin: 0 0 40px 0;
    user-select: none;
    color: var(--black);
  }

  .article-sort {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .article-sort span {
    padding: 3px 10px;
    background-color: var(--themeBackground);
    border-radius: 5px;
    font-size: 14px;
    color: var(--white);
    transition: all 0.3s;
    margin-right: 25px;
    cursor: pointer;
    user-select: none;
  }

  .article-sort span:hover {
    background-color: var(--red);
  }

  .article-like {
    color: var(--red) !important;
  }

  .article-like-icon {
    font-size: 60px;
    cursor: pointer;
    color: var(--greyFont);
    transition: all 0.5s;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  .article-like-icon:hover {
    transform: rotate(360deg);
  }

  .process-wrap {
    margin: 0 0 40px;
  }

  .process-wrap hr {
    position: relative;
    margin: 10px auto 60px;
    border: 2px dashed var(--lightGreen);
    overflow: visible;
  }

  .process-wrap hr:before {
    position: absolute;
    top: -14px;
    left: 5%;
    color: var(--lightGreen);
    content: '❄';
    font-size: 30px;
    line-height: 1;
    transition: all 1s ease-in-out;
  }

  .process-wrap hr:hover:before {
    left: calc(95% - 20px);
  }

  .process-wrap >>> .el-collapse-item__header {
    border-bottom: unset;
    font-size: 20px;
    background-color: var(--background);
    color: var(--lightGreen);
  }

  .process-wrap >>> .el-collapse-item__wrap {
    background-color: var(--background);
  }

  .process-wrap .el-collapse {
    border-top: unset;
    border-bottom: unset;
  }

  .process-wrap >>> .el-collapse-item__wrap {
    border-bottom: unset;
  }

  .password-content {
    font-size: 13px;
    color: var(--maxGreyFont);
    line-height: 1.5;
  }

  #toc-button {
    position: fixed;
    right: 3vh;
    bottom: 8vh;
    animation: slide-bottom 0.5s ease-in-out both;
    z-index: 100;
    cursor: pointer;
    font-size: 23px;
    width: 30px;
  }

  #toc-button:hover {
    color: var(--themeBackground);
  }

  @media screen and (max-width: 700px) {
    .article-info-container {
      left: 20px;
      max-width: 320px;
    }

    .article-info-news {
      right: 20px;
    }
  }

  @media screen and (max-width: 400px) {
    #toc-button {
      right: 0.5vh;
    }
  }
</style>
