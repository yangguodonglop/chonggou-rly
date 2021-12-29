import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

Vue.use(ElementUI);

const Base64 = require('js-base64').Base64

new Vue({
  router,
  store,
  Base64,
  render: h => h(App)
}).$mount("#app");
