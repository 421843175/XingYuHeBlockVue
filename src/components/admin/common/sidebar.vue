<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             background-color="#ebf1f6"
             text-color="#606266"
             active-text-color="#20a0ff"
             unique-opened
             router>
      <template v-for="item in items">
        <template v-if="isBoss || item.isBoss">
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <!-- <template v-for="subItem in item.subs">
                <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                  <template slot="title">
                    {{ subItem.title }}
                  </template>
                  <el-menu-item v-for="threeItem in subItem.subs" :key="threeItem.index" :index="threeItem.index">
                    {{ threeItem.title }}
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                  {{ subItem.title }}
                </el-menu-item>
              </template> -->
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i>
              {{ item.title }}
            </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isBoss: this.$store.state.currentAdmin.isBoss,
        items: [{
          icon: "el-icon-s-home",
          index: "/main",
          title: "系统首页",
          isBoss: false
        }, {
          icon: "el-icon-s-tools",
          index: "/webEdit",
          title: "网站设置",
          isBoss: false
        }, {
          icon: "el-icon-postcard",
          index: "/postList",
          title: "文章管理",
          isBoss: true
        }, {
          icon: "el-icon-notebook-2",
          index: "/sortList",
          title: "分类管理",
          isBoss: true
        }, {
          icon: "el-icon-edit-outline",
          index: "/fourspace",
          title: "四维空间管理",
          isBoss: true
        }, {
          icon: "el-icon-postcard",
          index: "/codelist",
          title: "CODE飞翼管理",
          isBoss: true
        }]
      }
    },

    computed: {},

    watch: {},

    created() {

    },

    mounted() {

    },

    methods: {}
  }
</script>

<style scoped>

  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu {
    width: 200px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
