import Vue from "vue";
import VueRouter from "vue-router";
import loading from "element-ui/packages/loading/src/loading.vue";

Vue.use(VueRouter);

// 异步加载组件
const AsyncLoad = component => {
  const handle = () => ({
    component: component,
    loading: loading, // 指定加载的组件
    error: loading, // 指定错误的组件
    delay: 200,
    timeout: 3000
  });
  return Promise.resolve({
    render(h) {
      return h(handle);
    }
  });
};
window.$AsyncLoad = AsyncLoad;

const routes = [
  {
    path: "/",
    meta: {
      requireAuth: false,
      title: "登陆"
    },
    component: () =>
      AsyncLoad(import(/* webpackChunkName:"home" */ "@/views/login.vue"))
  },
  {
    path: "/admin",
    redirect: "/admin/manage",
    meta: {
      requireAuth: true,
      title: "管理端"
    },
    component: () =>
      AsyncLoad(
        import(/* webpackChunkName:"admin" */ "@/views/admin/index.vue")
      ),
    children: [
      {
        path: "manage",
        components: {
          default: () =>
            import(
              /* webpackChunkName:"admin" */ "@/views/admin/accommodation.vue"
            ),
          category: () =>
            import(/* webpackChunkName:"admin" */ "@/views/admin/category.vue"),
          room: () =>
            import(/* webpackChunkName:"admin" */ "@/views/admin/room.vue"),
          order: () =>
            import(/* webpackChunkName:"admin" */ "@/views/admin/order.vue"),
          vip: () =>
            import(/* webpackChunkName:"admin" */ "@/views/admin/vip.vue")
        }
      }
    ]
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.title)) {
    document.title = "HotelManage-" + to.meta.title;
    next();
  }
});

export default router;
