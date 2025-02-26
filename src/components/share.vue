<template>
  <div>
    <div class="share-container">
      <!-- 封面 -->
      <div class="share-header my-animation-slide-top">
        <!-- 背景视频 -->
        <!-- <video class="index-video" autoplay="autoplay" muted="muted" loop="loop"
               :src="$store.state.imgSui">
        </video> -->
        <el-image class="index-video" :src="$store.state.imgSui" flt="cover">
        </el-image>
        <div style="position: absolute;left: 20px;top: 20px">
          <!-- 标题 -->
          <div style="margin: 10px">
            <div>
              分享集
            </div>
            <div style="font-size: 36px;font-weight: bold;line-height: 1.5;margin-top: 20px">
              技术分享>
            </div>
          </div>
        </div>
        <div style="position: absolute;left: 20px;bottom: 40px;margin: 10px">
          编程创造世界！
        </div>

      </div>
    </div>
      <div class="share-content my-animation-slide-bottom" >
    <el-row>
        <span v-for="share in shareList" :key="share.id" style="margin-left: 2%;margin-top: 2%;margin-bottom: 5%;">
          <el-col :lg="6" :sm="11" :xs="22" >
          <el-card :body-style="{ padding: '0px' }" style="margin-left: 10%;" shadow="hover">
            <a :href="share.href" style="color:black;text-decoration: none;" target="_blank">
              <div style="height: 50vh;"><el-image style="animation: header-effect 2s;width: 100%;height: 100%;"
                
                v-once
                lazy
                :src="getRandomImage()"
                fit="cover"></el-image></div>

              
        <div style="padding: 14px">
          <h2>{{share.title}}</h2>
          <span>{{share.content}}</span>
          <div class="bottom">
            <time v-if="share.time==null">{{ share.time }}</time>
            <time v-else class="time">{{share.time.slice(0, 10)}}</time>
          </div>
        </div>
        </a>
      </el-card>
    </el-col>
        </span>
      </el-row>

         <!-- 页脚 -->
   
  
      </div>
      
 <div style="background: var(--coderecordBg);display: block;width: 100%;margin-top: 10%;">
      <myFooter></myFooter>
    </div>
 
 

  </div>
  
</template>

<script>

  const myFooter = () => import( "./common/myFooter");

  export default {
    components: {

      myFooter
    },

    data() {
      return {
        shareList: [],
      }
    },

    computed: {},

    watch: {},

    created() {
      // console.log("sui:",this.$store.state)
      this.getShare();
    },

    mounted() {

    },

    methods: {
      getShare() {
        this.$http.get(this.$constant.baseURL + "/webInfo/listShare")
          .then((res) => {
            if (res.data.code==200) {
              // console.log(res.data.data)
              this.shareList=res.data.data;
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
      getRandomImage(){
          // return;
        // console.log("111,",Math.floor(Math.random() * 10000000) + 1)
        return this.$store.state.imgSui4+"?id="+Math.floor(Math.random() * 100) + 1;
      }
    }
  }
</script>

<style scoped>

  .share-container {
    padding: 25px;
    background: var(--coderecordBg);
    
  }

  .share-header {
    margin: 60px auto 30px;
    height: 300px;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    max-width: 1200px;
    color: var(--white);
    user-select: none;
    
  }

  .index-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: var(--lightGreen);
  }

  .share-content {
    margin: 0 auto;
    max-width: 1200px;
    
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

  .photo-title {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    line-height: 80px;
    letter-spacing: 2px;
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

  @media screen and (max-width: 1150px) {
    .photo-title-warp {
      max-width: 780px;
    }
  }

</style>
