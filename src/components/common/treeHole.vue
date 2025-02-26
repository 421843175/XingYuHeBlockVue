<template>
  <div class="tree-hole-container">
    <ol class="tree-hole-list" v-if="!$common.isEmpty(treeHoleList)">
      <li class="tree-hole-li"
          v-for="(treeHole, index) in treeHoleList"
          :key="index">
        <div class="tree-hole-content"
             :class="{ leftTreeHole: index % 2 === 0 && !$common.mobile(), rightTreeHole: index % 2 !== 0 || $common.mobile() }">
          <el-avatar shape="square" class="avatar-img" :size="36" ></el-avatar>
          <div class="tree-hole-box"
               :style="{border:'1px solid  '+$constant.tree_hole_color[index % $constant.tree_hole_color.length]}">
            <div class="box-tag" v-if="index % 2 === 0 && !$common.mobile()"
                 :style="{'border-color': 'transparent transparent transparent '+$constant.tree_hole_color[index % $constant.tree_hole_color.length]}"></div>
            <div class="box-tag" v-if="index % 2 !== 0 || $common.mobile()"
                 :style="{'border-color': 'transparent '+$constant.tree_hole_color[index % $constant.tree_hole_color.length]+' transparent transparent'}"></div>
            <div class="my-content" v-html="treeHole.content"></div>
     

            <!-- <div style="margin-bottom: 2%;margin-left: 5%;">
              <span v-for="href in treeHole.hrefArray" :key="href" >
              <el-link type="primary" :href="href.url" target="_blank" >{{ href.name }}</el-link>&nbsp;&nbsp;&nbsp;&nbsp;
         
            </span>
            </div> -->

            <el-image v-for="url in treeHole.srcPicArray" :key="url" :src="url" style="display: inline-block;height: 25%;width: 25%;"  :preview-src-list="treeHole.srcPicArray" />
        

            <!-- 时间 -->
            <div style="display: flex;justify-content: space-between">
              <div> {{treeHole.createTime.slice(0, 10)}}</div>
              <span class="spangood" @click="good(treeHole.id)">👍<span>{{ treeHole.goodNum }}</span></span>
            </div>
          </div>
        </div>
      </li>
    </ol>
    <div class="tree-hole-go">
     下一页 <i class="fa fa-paper-plane" @click="launch()"></i>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      treeHoleList: {
        type: Array
      },
      avatar: {
        type: String
      }
    },

    data() {
      return {
        // srcPicArray:["https://pic1.zhimg.com/v2-85a7eb66743de46c7286a157c5540410_b.jpg","https://pic4.zhimg.com/v2-f171ed2f897f8ef4eb858e4097382803_b.jpg"],
        // hrefArray:[{name:"百度",url:"http://www.baidu.com",},{name:"知乎",url:"http://www.taobao.com",}]
        // goodNum:0,
      }
    },

    computed: {},

    watch: {},

    created() {
    

    },

    mounted() {
         
    },

    methods: {
      launch() {
        this.$emit("launch");
      },
      good(id){
        // console.log(id)
        // console.log(this.treeHoleList)
        var endid=null;
        //寻找
        for(var i=0;i<this.treeHoleList.length;i++)
        {
          if(this.treeHoleList[i].id==id)
          {
            endid=i;
            break;
          }
        }
      // this.treeHoleList[endid].goodNum++;
        this.$http.get(this.$constant.baseURL + "/record/goodNum",{id})
          .then((res) => {
            if (res.data.code==200) {
              this.treeHoleList[endid].goodNum= res.data.data;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "warning"
            });
          });
      }

    }
  }
</script>

<style scoped>

  .tree-hole-container {
    padding: 20px;
    margin: 0 auto;
  }

  .tree-hole-list {
    padding: 100px 0 20px;
    margin: 0;
    position: relative;
    list-style: none;
  }

  .tree-hole-list:before {
    content: '';
    width: 4px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--themeBackground);
  }

  .tree-hole-list:after {
    content: '';
    width: 12px;
    height: 12px;
    border: 4px solid var(--maxLightRed);
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--white);
    animation: weiYanShadowFlashing 1.5s linear infinite;
  }

  .tree-hole-li {
    margin: 5px auto;
  }

  .tree-hole-content {
    position: relative;
    width: 50%;
  }

  .leftTreeHole {
    text-align: right;
  }

  .rightTreeHole {
    margin-left: 50%;
  }

  .tree-hole-content:before {
    content: '';
    width: 12px;
    height: 12px;
    border: 4px solid var(--blue);
    border-radius: 50%;
    position: absolute;
    top: 10px;
    background-color: var(--white);
  }

  .leftTreeHole:before {
    right: 0;
    transform: translateX(10px);
  }

  .rightTreeHole:before {
    left: 0;
    transform: translateX(-10px);
  }

  .avatar-img {
    position: absolute;
    top: 0;
    transition: all 0.3s ease-in-out;
    background-image: url("../../assets/file/head.jpg");
    background-size: 100% 100%;
  }

  .leftTreeHole .avatar-img {
    right: 25px;
  }

  .rightTreeHole .avatar-img {
    left: 25px;
  }

  .tree-hole-box {
    font-size: 16px;
    padding: 10px;
    width: 360px;
    border-radius: 5px;
    position: relative;
    letter-spacing: 0.1em;
    font-weight: 400;
    transition: all 0.3s ease-in-out;
    color: var(--black);
    text-align: left;
    display: inline-block;
  }

  .leftTreeHole .tree-hole-box {
    margin-right: 90px;
  }

  .rightTreeHole .tree-hole-box {
    margin-left: 90px;
  }

  .tree-hole-box:hover, .avatar-img:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 16px 3px var(--miniMask);
  }

  .box-tag {
    content: '';
    position: absolute;
    border-style: solid;
  }

  .leftTreeHole .box-tag {
    right: -10px;
    border-width: 15px 0 5px 10px;
  }

  .rightTreeHole .box-tag {
    left: -10px;
    border-width: 15px 10px 5px 0;
  }

  .my-content {
    margin: 0 10px 10px;
    line-height: 30px;
  }

  .tree-hole-box > div:last-child {
    color: var(--greyFont);
    padding: 10px 10px 0;
    border-top: 1px dashed var(--white);
    font-size: 14px;
  }

  .tree-hole-go {
    color: var(--blue);
    font-weight: 700;
    font-size: 25px;
    margin: 20px auto;
    text-align: center;
  }

  .tree-hole-go i {
    cursor: pointer;
  }

  .tree-hole-go i:hover {
    animation: scale 1s linear infinite;
  }

  .tree-hole-delete {
    font-size: 14px;
    cursor: pointer;
  }

  @media screen and (max-width: 1000px) {
    .tree-hole-box {
      width: calc(100% - 90px);
    }
  }

  @media screen and (max-width: 600px) {
    .tree-hole-content {
      margin-bottom: 50px;
    }

    .tree-hole-list:after {
      left: 0;
    }

    .tree-hole-list:before {
      left: 0;
    }

    .rightTreeHole {
      margin-left: unset;
    }

    .tree-hole-content {
      width: 100%;
    }
  }

  .spangood{
    cursor: pointer;
  }
</style>
