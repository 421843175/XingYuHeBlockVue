<template>
  <div>
    <!-- 两句诗 -->
    <div class="my-animation-slide-top">
      <twoPoem :isHitokoto="false"></twoPoem>
    </div>

    <div style="background: var(--background)" class="my-animation-slide-bottom">
    
      <div class="about-wrap">  
        <h3>基于VUE3+SPRINGBOOT</h3>
        <h2>关于我</h2>
        <h3>QQ:  <el-link type="primary"  href="https://qm.qq.com/q/m3n00VH7F0" target="_blank" ><p style="font-size: 22px;">421843175</p></el-link></h3>
        <h3>微信: a421843175</h3>
        <h3>微信公众号: 木星创新库</h3>
        <h1 style="font-size: 40px;font-weight: 500;letter-spacing: 5px;">心声</h1>
        <!-- 对话框 -->
        <div class="about-box">
          <h4>与 木星 对话中...</h4>
          <div v-if="sayShow" id="say-container"></div>
        </div>
        <h2>欢迎 喜爱编程的朋友 或 对项目有好的改进建议的朋友 联系</h2>
      </div>

      <!-- 页脚 -->
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
console.log("后端开发:木星(前端基于开源博客框架魔改)")
  const twoPoem = () => import( "./common/twoPoem");
  const myFooter = () => import( "./common/myFooter");

  export default {
    components: {
      twoPoem,
      myFooter
    },
    data() {
      return {
        sayShow: false,
        sayContent: [
          {
            "talk": ["你好 陌生人", "我(木星)想在这里倾诉些什么"],
            "reply": ["说吧 😃", "少废话！ 🙄"]
          }, {
            "talk": ["想记录一些自己的编程生活 是的 在我看来 编程就是一种生活方式",
              "我想通过编程去创造属于自己的 天地",
              "因此我不断的 去 学习 和 了解 编程的各种思想 底层逻辑 实现方式 以编程为乐"],
            "reply": ["那你有没有想要做什么呢"]
          }, {
            "talk": ["我想要去做……那太多了 我也在一点点的去实现",
              "自己想要做的 也都一点点通过了解到的技术 去展示 和完善",
              "主攻的是软件编程 开发软件 将自己的想法不断实现 在我看来很快乐",
              "除了软件 对于其他方面 只能说精力有限 但在不断学习",
          ],
            "reply": ["这样真的有意义吗？"]
          }, {
            "talk": ["意义？可能把一个新奇的想法 用代码实现 便是 我所认为的最大的意义吧",
              "所以当我产生了一个想法 只要有一丝的可能性 我就会研究 如何实现  如何攻破其中的难题",
              "如何让程序更高效 怎么设计产生更大的效能",
              "不知不觉的 也就增长了 我对于某项 编程的知识 ",
              "其次 这个意义 也就体现了 ———— 因为 我认为 编程是相通的 "
             ],
            "reply": ["学编程是为了什么"]
          },{
            "talk": ["写代码的时候就是一种快乐",
              "但快乐 不能解决 现实问题 ，所以 我也希望 这种劳动 产生价值的同时 也能灵活 ‘变现’",
              "哪怕有一天 真的无法从事 编程相关的行业 我开发程序也不会停止",
              "我还有太多太多要做的，正如上面所说 这是我的一种生活方式",
              "仅仅为了一份工作 那么绝对无法理解 为什么我想要去了解 操作系统开发 编译器开发 等 这种苦涩难懂的课题",
              "因为热爱",
              "我坚信着 编程可以 创造世界 ，可以 改变未来"
             ],

          }
        ],
        sayIndex: 0
      }
    },

    computed: {},

    watch: {},

    created() {
      setTimeout(() => {
        this.sayShow = true;
        this.say();
      }, 2000);
    },

    mounted() {

    },

    methods: {
      answer(index, value) {
        $(".say-select").remove();

        let htmlStr = `<div class="say-right my-animation-slide-bottom"><span class="say-item-right">${value}</span></div>`;
        let frag = document.createRange().createContextualFragment(htmlStr);
        document.getElementById("say-container").appendChild(frag);
        if (index === 0) {
          setTimeout(() => {
            this.say();
          }, 500);
        } else {
          let htmlStr = `<div class="say-left my-animation-slide-bottom"><span class="say-item-left">好的</span></div>`;
          let frag = document.createRange().createContextualFragment(htmlStr);
          document.getElementById("say-container").appendChild(frag);
        }
      },
      say() {
        if (!this.$common.isEmpty(this.sayContent[this.sayIndex]) && !this.$common.isEmpty(this.sayContent[this.sayIndex].talk)) {
          this.sayContent[this.sayIndex].talk.forEach((value, index, talk) => {
            setTimeout(() => {
              let htmlStr = `<div class="say-left my-animation-slide-bottom"><span class="say-item-left">${value}</span></div>`;
              let frag = document.createRange().createContextualFragment(htmlStr);
              document.getElementById("say-container").appendChild(frag);
              if (talk.length === index + 1) {
                if (!this.$common.isEmpty(this.sayContent[this.sayIndex].reply)) {
                  setTimeout(() => {
                    if (this.sayContent[this.sayIndex].reply.length === 2) {
                      let reply0 = this.sayContent[this.sayIndex].reply[0];
                      let reply1 = this.sayContent[this.sayIndex].reply[1];
                      let htmlStr = `<div class="say-left my-animation-slide-bottom"><span class="say-select">${reply0}</span><span class="say-select">${reply1}</span></div>`;
                      let frag = document.createRange().createContextualFragment(htmlStr);
                      document.getElementById("say-container").appendChild(frag);
                      document.getElementsByClassName("say-select")[0].onclick = () => {
                        this.answer(0, reply0);
                      }
                      document.getElementsByClassName("say-select")[1].onclick = () => {
                        this.answer(1, reply1);
                      }
                    } else if (this.sayContent[this.sayIndex].reply.length === 1) {
                      let reply0 = this.sayContent[this.sayIndex].reply[0];
                      let htmlStr = `<div class="say-left my-animation-slide-bottom"><span class="say-select">${reply0}</span></div>`;
                      let frag = document.createRange().createContextualFragment(htmlStr);
                      document.getElementById("say-container").appendChild(frag);
                      document.getElementsByClassName("say-select")[0].onclick = () => {
                        this.answer(0, reply0);
                      }
                    }
                    this.sayIndex += 1;
                  }, 500);
                }
              }
            }, index * 1500);
          });
        }
      }
    }
  }
</script>

<style>

  .about-wrap {
    text-align: center;
    width: 95%;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px 80px;
  }

  .about-box {
    min-height: 450px;
    padding: 5px;
    background-color: var(--maxMaxLightGray);
    border-radius: 10px;
  }

  .say-item-left {
    padding: 5px 12px;
    border-radius: 1rem;
    color: var(--maxGreyFont);
    background-color: var(--lightGray);
  }

  .say-item-right {
    padding: 5px 12px;
    border-radius: 1rem;
    color: var(--white);
    background-color: var(--translucent);
  }

  .say-left {
    display: flex;
    justify-content: left;
    margin: 15px;
  }

  .say-right {
    display: flex;
    justify-content: right;
    margin: 15px;
  }

  .say-select {
    cursor: pointer;
    background: var(--black);
    border-radius: 5px;
    padding: 5px 10px;
    margin-right: 12px;
    margin-top: 20px;
    color: var(--white);
    border: 1px solid var(--black);
  }

  .say-select:hover {
    border: 1px solid var(--themeBackground);
    color: var(--themeBackground);
    box-shadow: 0 0 5px var(--themeBackground);
  }
</style>
