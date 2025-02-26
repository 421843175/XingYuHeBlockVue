import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toolbar: JSON.parse(localStorage.getItem("toolbar") || '{"visible": false, "enter": true}'),
    sortInfo: JSON.parse(localStorage.getItem("sortInfo") || '[]'),
    currentUser: JSON.parse(localStorage.getItem("currentUser") || '{}'),
    currentAdmin: JSON.parse(localStorage.getItem("currentAdmin") || '{}'),
    webInfo: JSON.parse('{"webName": "木星「星雨盒」", "webTitle": ["木星「星雨盒」"], "notices": ["承载 星空 承载 梦想"], "footer": "", "backgroundImage": "", "avatar": "../assets/file/bg1.jpg"}'),
    imgSui:"https://t.mwm.moe/pc/",
    imgSui2:"https://www.loliapi.com/bg/",
    imgSui3:"https://api.anosu.top/img/",
    imgSui4:"https://api.oick.cn/random/api.php?type=pe&",
    imgChang:"https://api.oick.cn/random/api.php?type=pc&",
    houDuanURL: 'http://www.mxweb.world:10000'
  },
  getters: {
    articleTotal: state => {
      if (state.sortInfo !== null && state.sortInfo.length !== 0) {
        if (state.sortInfo.length === 1) {
          return state.sortInfo[0].countOfSort;
        } else {
          return state.sortInfo.reduce((prev, curr) => {
            if (typeof prev === "number") {
              return prev + curr.countOfSort;
            } else {
              return prev.countOfSort + curr.countOfSort;
            }
          });
        }
      } else {
        return 0;
      }
    },
    navigationBar: state => {
      if (state.sortInfo !== null && state.sortInfo.length !== 0) {
        return state.sortInfo.filter(f => f.sortType === 0);
      } else {
        return [];
      }
    }
  },
  mutations: {
    changeToolbarStatus(state, toolbarState) {
      state.toolbar = toolbarState;
      localStorage.setItem("toolbar", JSON.stringify(toolbarState));
    },
    loadSortInfo(state, sortInfo) {
      var sortInfoarr=JSON.parse(sortInfo)
      if (sortInfoarr !== null && sortInfoarr.length !== 0) {
        // console.log("sortInfo=",sortInfoarr)
        state.sortInfo = sortInfoarr.sort((s1, s2) => s1.priority - s2.priority);
       
        localStorage.setItem("sortInfo", sortInfo);
      }
    },
    loadCurrentUser(state, user) {
      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
    },
    loadCurrentAdmin(state, user) {
      state.currentAdmin = user;
      localStorage.setItem("currentAdmin", JSON.stringify(user));
    },
    loadWebInfo(state, webInfo) {
      webInfo.webTitle = webInfo.webTitle.split('');
      webInfo.notices = JSON.parse(webInfo.notices);
      state.webInfo = webInfo;
      localStorage.setItem("webInfo", JSON.stringify(webInfo));
    }
  },
  actions: {},
  modules: {},
  plugins: []
})
