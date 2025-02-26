<template>
  <div class="myFooter-wrap" v-show="showFooter">
    <div class="myFooter">
      <div class="footer-title">
        <a style="font-size:16px;color:white;text-decoration: none;" href="https://beian.miit.gov.cn/">皖ICP备2022011015号</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34040302000424" style="display:inline-block;text-decoration:none;"><img src="http://www.mxweb.world:8888/mx/mx/image/b.png" style="float:left;"><e style=" color:white;">皖公网安备 34040302000424号</e></a>
<span style="display: inline-block;width: 2%;">&nbsp;</span><span style="display: inline-block;width: 2%;cursor: pointer;" @click="gologin" >&nbsp;</span>
      </div>
    
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showFooter: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {
      gologin(){ 
        this.$router.push("/welcome")
      }
    },
  }
</script>

<style scoped>
  .myFooter-wrap {
    user-select: none;
    animation: hideToShow 2s;
  }

  .myFooter {
    border-radius: 1.5rem 1.5rem 0 0;
    background: var(--gradientBG);
    text-align: center;
    color: var(--white);
    background-size: 300% 300%;
    animation: gradientBG 10s ease infinite;
  }

  .footer-title {
    padding-top: 10px;
    font-size: 16px;
  }

  .icp, .icp a {
    color: var(--maxGreyFont);
    font-size: 13px;
  }

  .icp {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .icp a {
    text-decoration: none;
    transition: all 0.3s;
  }

  .icp a:hover {
    color: var(--themeBackground);
  }

</style>
