import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import vueaxios from "vue-axios";
import filter from "./Filter";

Vue.config.productionTip = false;

axios.defaults.baseURL = /* "http://localhost:5000/*/ "/api/";

axios.defaults.headers.post["Content-type"] = "application/json";
axios.defaults.headers.put["Content-type"] = "application/json";

Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.use(filter);
Vue.use(axios, vueaxios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
