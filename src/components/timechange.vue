<template>
  <div>

    <div class="bg-wrap my-animation-slide-top">
   <!-- 背景图片 -->
        <el-image class="timechange-image my-el-image"
                      
                      :src="$store.state.imgSui"
                      fit="cover"></el-image>
         
      </div>
    <!-- 内容 -->
    <div class="timechange-container">
      <div class="myCenter timechange-content">
        <!-- 时间 -->
        <div>
          <!-- 计时 -->
          <!-- <div>
            <div class="timechange-time-title1">
              博客开通
            </div>
            <div class="timechange-time1">
              第
              <span class="timechange-time1-item">{{timing.year}}</span>
              年
              <span class="timechange-time1-item">{{timing.month}}</span>
              月
              <span class="timechange-time1-item">{{timing.day}}</span>
              日
              <span class="timechange-time1-item">{{timing.hour}}</span>
              时
              <span class="timechange-time1-item">{{timing.minute}}</span>
              分
              <span class="timechange-time1-item">{{timing.second}}</span>
              秒
            </div>
          </div> -->
          <!-- 倒计时 -->
          <!-- <div class="timechange-time-title2"
               v-if="!$common.isEmpty(timechange.countdownTitle) || !$common.isEmpty(timechange.countdownTime)">
            {{timechange.countdownTitle}}: {{countdownChange}}
          </div> -->
        </div>
      </div>
      <div class="recent-posts" s>
      <div class="announcement background-opacity" >
                <i class="fa fa-volume-up" aria-hidden="true"></i>
                <div >
              <div>{{ notice }}</div>
                  
                </div>
              </div>
              </div>

      <div style="padding: 0 20px">
            <p >这里是从我的个人QQ空间通过爬虫获取的，更多技术动态请看我的QQ空间哦</p>
        <div class="card-container">
 
          <div v-show="card === 1 && !$common.isEmpty(treeHoleList)">
            <treeHole :treeHoleList="treeHoleList"
                      :avatar="$store.state.webInfo.avatar"
                      @launch="launch"
                     >
            </treeHole>
          </div>
     
         
        </div>


      </div>

 
<!-- <div style="margin-left: 3vw;">
  1232
</div> -->
      <div>
        <!-- 页脚 -->
        <myFooter></myFooter>
      </div>
    </div>
  </div>
</template>

<script>

  const treeHole = () => import( "./common/treeHole");
  const myFooter = () => import( "./common/myFooter");

  export default {
    components: {
      treeHole,
      myFooter,
    },

    data() {
      return {
        notice:"点击图片 可以直接的放大查阅哦！",
        usertimechange: {
          bgCover: "",
          manCover: "",
          womanCover: "",
          manName: "",
          womanName: "",
          countdownTitle: "",
          countdownTime: "",
          timing: "",
          familyInfo: ""
        },
        timechangeDialogVisible: false,
        addPictureDialog: false,
        pictureType: "",
        admintimechange: {},
        timechange: {
          bgCover: "https://img2.baidu.com/it/u=697366815,1791332036&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
          manCover: "",
          womanCover: "",
          manName: "",
          womanName: "",
          countdownTitle: "",
          countdownTime: "",
          timing: ""
        },
        pagination: {
          current: 1,
          size: 3,
          total: 0,
        },
        photoPagination: {
          current: 1,
          size: 10,
          total: 0,
          resourceType: "timechangePhoto",
          classify: ""
        },
        treeHoleList:  [],
        photoTitleList: [],
        photoList: [],
        randomFamily: [],
        card: 1,
        countdownChange: "",
        timing: {
          year: 0,
          month: 0,
          day: 0,
          hour: 0,
          minute: 0,
          second: 0
        }
      }
    },

    computed: {},

    watch: {},

    created() {
      this.card = 1;
      this.getRecords();
    },

    mounted() {

    },

    methods: {
      openPicture(type) {
        this.pictureType = type;
        this.addPictureDialog = true;
      },
      addPicture(res) {
        if (this.pictureType === "bgCover") {
          this.usertimechange.bgCover = res;
        } else if (this.pictureType === "manCover") {
          this.usertimechange.manCover = res;
        } else if (this.pictureType === "womanCover") {
          this.usertimechange.womanCover = res;
        }

        this.pictureType = "";
        this.addPictureDialog = false;
      },

      changeFamily(family) {
        this.timechange = family;
      },
      getPhotoTitles() {
        this.$http.get(this.$constant.baseURL + "/webInfo/listAdmintimechangePhoto")
          .then((res) => {
            if (!this.$common.isEmpty(res.data.data)) {
              this.photoTitleList = res.data.data;
              this.photoPagination = {
                current: 1,
                size: 10,
                total: 0,
                resourceType: "timechangePhoto",
                classify: this.photoTitleList[0].classify
              };
              this.changePhoto();
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      getRandomFamily() {
        this.$http.get(this.$constant.baseURL + "/family/listRandomFamily")
          .then((res) => {
            if (!this.$common.isEmpty(res.data.data)) {
              this.randomFamily = res.data.data;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      changePhotoTitle(classify) {
        if (classify !== this.photoPagination.classify) {
          this.photoPagination = {
            current: 1,
            size: 10,
            total: 0,
            resourceType: "timechangePhoto",
            classify: classify
          };
          this.photoList = [];
          this.changePhoto();
        }
      },
      pagePhotos() {
        this.photoPagination.current = this.photoPagination.current + 1;
        this.changePhoto();
      },
      changePhoto() {
        this.$http.post(this.$constant.baseURL + "/webInfo/listResourcePath", this.photoPagination)
          .then((res) => {
            if (!this.$common.isEmpty(res.data.data)) {
              this.photoList = this.photoList.concat(res.data.data.records);
              this.photoPagination.total = res.data.data.total;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      changeCard(card) {
        if (card !== 4 || this.card !== card) {
          this.card = card;
        } else {
          card = 1;
          this.card = 1;
          this.timechange = this.admintimechange;
        }

        if (card === 1) {
          if (this.$common.isEmpty(this.treeHoleList)) {
            this.getRecords();
          }
        } else if (card === 2) {
          if (this.$common.isEmpty(this.photoTitleList)) {
            this.getPhotoTitles();
          }
        } else if (card === 4) {
          if (this.$common.isEmpty(this.randomFamily)) {
            this.getRandomFamily();
          }
        }
      },
      gettimechange() {
        if (this.$common.isEmpty(this.timechange.timing)) {
          return;
        }
        let diff = this.$common.timeDiff(this.timechange.timing);
        this.timing.year = diff.diffYear;
        this.timing.month = diff.diffMonth;
        this.timing.day = diff.diffDay;
        this.timing.hour = diff.diffHour;
        this.timing.minute = diff.diffMinute;
        this.timing.second = diff.diffSecond;
      },
      countdown() {
        if (this.$common.isEmpty(this.timechange.countdownTime)) {
          return;
        }
        let countdown = this.$common.countdown(this.timechange.countdownTime);
        this.countdownChange = countdown.d + "天" + countdown.h + "时" + countdown.m + "分" + countdown.s + "秒";
      },
      launch() {
        if (this.pagination.total !== this.treeHoleList.length) {
          this.pagination.current = this.pagination.current + 1;
          this.getRecords();
        } else {
          this.$message({
            message: "~~到底啦~~",
            type: "warning"
          });
        }
      },
      getRecords() {
  this.$http.post(this.$constant.baseURL + "/record/listRecord", this.pagination)
    .then((res) => {
      if (res.data.code == 200) {

        this.treeHoleList = res.data.data.records;
        for (var i = 0; i < res.data.data.records.length; i++) {
          var picArray = this.treeHoleList[i].srcPicArray.split(",");
          for (var j = 0; j < picArray.length; j++) {
            picArray[j] = this.$store.state.houDuanURL+"/record/poFang?url=" + picArray[j];
          }
          this.treeHoleList[i].srcPicArray = picArray;
        }
        var size = res.data.data.records.length;
        for (var i = 0; i < size; i++) {
          this.treeHoleList[i].srcPicArray = JSON.parse(this.treeHoleList[i].srcPicArray);
          this.treeHoleList[i].hrefArray = JSON.parse(this.treeHoleList[i].hrefArray);
        }
        this.pagination.total = res.data.data.total;
      }
    })
    .catch((error) => {
      if(error.message.contain("'http://'")){
          return;
      }
      this.$message({
        message: error.message,
        type: "error"
      });
    });
},

 
    }
  }
</script>

<style scoped>
  .announcement {
    padding: 22px;
    border: 1px dashed var(--lightGray);
    color: var(--greyFont);
    border-radius: 10px;
    display: flex;
    margin: 40px auto 40px;
  }

  .announcement i {
    color: var(--themeBackground);
    font-size: 22px;
    margin: auto 0;
    animation: scale 0.8s ease-in-out infinite;
  }

  .announcement div div {
    margin-left: 20px;
    line-height: 30px;
  }
  .timechange-container {
    background-image: linear-gradient(to right, rgba(37, 82, 110, 0.1) 1px, var(--background) 1px), linear-gradient(to bottom, rgba(37, 82, 110, 0.1) 1px, var(--background) 1px);
    background-size: 3rem 3rem;
    /*background: var(--background);*/
  }

  .bg-wrap {
    height: 55vh;
    position: relative;
    overflow: hidden;
  }

  .timechange-image::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--miniMask);
  }

  .timechange-wrap {
    width: 90%;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    max-width: 950px;
    border-radius: 3em;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 50px 70px 30px 70px;
  }

  .timechange-avatar {
    border: rgba(255, 255, 255, 0.2) 4px solid;
    width: 180px;
    height: 180px;
  }

  .timechange-title {
    margin-top: 15px;
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    color: var(--white);
  }

  .timechange-img {
    animation: imgScale 2s linear infinite;
    width: 120px;
    height: 120px;
  }

  #bannerWave1 {
    height: 84px;
    background: var(--bannerWave1);
    position: absolute;
    width: 200%;
    bottom: 0;
    z-index: 10;
    animation: gradientBG 120s linear infinite;
  }

  #bannerWave2 {
    height: 100px;
    background: var(--bannerWave2);
    position: absolute;
    width: 400%;
    bottom: 0;
    z-index: 5;
    animation: gradientBG 120s linear infinite;
  }

  .timechange-content {
    max-width: 1200px;
    overflow: hidden;
    margin: 20px auto 0;
    user-select: none;
  }

  .timechange-time-title1 {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 0.2rem;
    line-height: 4rem;
    text-align: center;
    background-image: linear-gradient(270deg, #ff4500, #ffa500, #ffd700, #90ee90, #00ffff, #1e90ff, #9370db, #ff69b4, #ff4500);
    -webkit-background-clip: text;
    animation: jianBian 60s linear infinite;
    width: 3000px;
    color: rgba(0, 0, 0, 0);
  }

  .timechange-time-title2 {
    text-align: center;
    font-size: 1.5rem;
    line-height: 4rem;
    font-weight: 600;
    letter-spacing: 2px;
  }

  .timechange-time1 {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
  }

  .timechange-time1-item {
    font-size: 4rem;
    font-weight: 700;
  }

  .card-wrap {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

  .card-content {
    display: flex;
    padding: 25px;
    margin: 25px auto;
    border-radius: 20px;
    max-width: 780px;
    cursor: pointer;
    transition: all 0.3s;
    background: var(--background);
  }

  .card-content:hover,
  .family-button:hover,
  .family-wrap:hover {
    transform: translateY(-6px);
  }

  .card-right {
    margin-left: 20px;
  }

  .card-title {
    font-size: 1.6rem;
    letter-spacing: 0.2rem;
    line-height: 3.5rem;
    font-weight: 700;
  }

  .card-desc {
    font-size: 1.1rem;
    letter-spacing: 0.2rem;
    color: #777777;
  }

  .card-container {
    max-width: 1500px;
    margin: 20px auto 40px;
  }

  .pagination-wrap {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .pagination {
    padding: 13px 15px;
    border: 1px solid var(--lightGray);
    border-radius: 3rem;
    color: var(--greyFont);
    width: 100px;
    user-select: none;
    cursor: pointer;
    text-align: center;
  }

  .pagination:hover {
    border: 1px solid var(--themeBackground);
    color: var(--themeBackground);
    box-shadow: 0 0 5px var(--themeBackground);
  }

  .comment-content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .photo-title {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    line-height: 80px;
    letter-spacing: 2px;
  }

  .photo-title-warp {
    max-width: 1150px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .isActive {
    animation: scale 2.5s ease-in-out infinite;
  }

  .family-button {
    position: relative;
    overflow: hidden;
    height: 150px;
    color: var(--white);
    margin: 50px auto 15px;
    border-radius: 20px;
    max-width: 350px;
    cursor: pointer;
    transition: all 0.3s;
    background: var(--timechange) center center / cover no-repeat;
    user-select: none;
  }

  .family-button::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--miniMask);
  }

  .family-button-title {
    position: absolute;
    line-height: 150px;
    margin-left: 20px;
    font-size: 25px;
    font-weight: 700;
    color: var(--white);
  }

  .family-button-car {
    position: absolute;
    margin-left: 220px;
    margin-top: 55px;
    animation: passing 4s linear infinite;
  }

  .family-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .family-wrap {
    cursor: pointer;
    width: 350px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 15px 25px 5px 25px;
    margin: 20px;
    transition: all 0.3s;
    user-select: none;
  }

  .family-avatar {
    border: rgba(255, 255, 255, 0.2) 4px solid;
    width: 90px;
    height: 90px;
  }

  .family-title {
    margin-top: 15px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: var(--white);
  }

  .family-img {
    animation: imgScale 2s linear infinite;
    width: 60px;
    height: 60px;
  }

  .family-bottom-wrap {
    display: flex;
    justify-content: space-around;
    margin: 0 0 40px;
  }

  .family-bottom {
    color: var(--white);
    border-radius: 3rem;
    width: 150px;
    text-align: center;
    height: 50px;
    cursor: pointer;
    user-select: none;
  }

  .form-main {
    animation: hideToShow 2s;
    border-radius: 12px;
    overflow: hidden;
  }

  .user-content > div {
    height: 65px;
    display: flex;
    align-items: center;
  }

  .user-content >>> .el-input__inner {
    border: none;
    height: 40px;
    width: 250px;
    background: var(--whiteMask);
  }

  .user-content >>> .el-textarea__inner {
    border: none;
    width: 250px;
    background: var(--whiteMask);
  }

  .user-content >>> .el-input__count {
    background: var(--transparent);
    user-select: none;
  }

  .form-friend {
    background-color: #eeeeee;
    padding: 20px 0;
  }

  .form-title {
    margin: 10px;
    text-align: center;
  }

  @media screen and (max-width: 1200px) {
    .user-content > div {
      display: unset;
      align-items: unset;
    }
  }

  @media screen and (max-width: 800px) {
    .timechange-wrap {
      border-radius: 1.5em;
      padding: 40px 30px 10px 30px;
    }

    .timechange-avatar {
      width: 120px;
      height: 120px;
    }

    .timechange-img {
      width: 100px;
      height: 100px;
    }

    .timechange-time1 {
      font-size: 1.4rem;
    }

    .timechange-time1-item {
      font-size: 3rem;
    }
  }

  @media screen and (max-width: 600px) {
    .timechange-wrap {
      padding: 30px 20px 10px 20px;
    }

    .timechange-avatar {
      width: 100px;
      height: 100px;
    }

    .timechange-img {
      width: 80px;
      height: 80px;
    }

    .timechange-time1 {
      font-size: 1rem;
    }

    .timechange-time1-item {
      font-size: 1.8rem;
    }

    .timechange-time-title2 {
      font-size: 1.2rem;
    }

    .user-content >>> .el-textarea__inner {
      width: 100%;
    }

    .user-content >>> .el-input__inner {
      width: 190px;
    }

    .card-container .tree-hole-container {
      padding: 0;
    }
  }

  @media screen and (max-width: 1150px) {
    .card-wrap {
      display: unset;
      justify-content: unset;
    }

    .photo-title-warp {
      max-width: 780px;
    }

    .family-button {
      max-width: 780px;
    }
  }

</style>
