import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../components/home'),
    children: [{
      path: "/",
      name: "index",
      component: () => import('../components/index')
    }, {
      path: "/sort",
      name: "sort",
      component: () => import('../components/sort')
    }, {
      path: "/article",
      name: "article",
      component: () => import('../components/article')
    }, {
      path: "/timechange",
      name: "timechange",
      component: () => import('../components/timechange')
    }, {
      path: "/coderecord",
      name: "coderecord",
      component: () => import('../components/coderecord')
    }, {
      path: "/share",
      name: "share",
      component: () => import('../components/share')
    }, {
      path: "/about",
      name: "about",
      component: () => import('../components/about')
    }]
  },
  {
    path: '/admin',
    redirect: '/welcome',
    meta: {requiresAuth: true},
    component: () => import('../components/admin/admin'),
    children: [{
      path: '/welcome',
      name: 'welcome',
      component: () => import('../components/admin/welcome')
    }, {
      path: '/postList',
      name: 'postList',
      component: () => import('../components/admin/postList')
    }, {
      path: '/postEdit',
      name: 'postEdit',
      component: () => import('../components/admin/postEdit')
    }, {
      path: '/sortList',
      name: 'sortList',
      component: () => import('../components/admin/sortList')
    }, {
      path: '/fourspace',
      name: 'fourspace',
      component: () => import('../components/admin/fourspace')
    }, {
      path: '/codelist',
      name: 'codelist',
      component: () => import('../components/admin/codelist')
    }]
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('../components/admin/verify')
  }
]

const router = new VueRouter({
  mode: "history",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Boolean(localStorage.getItem("adminToken"))) {
      next({
        path: '/verify',
        query: {redirect: to.fullPath}
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
