import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = sessionStorage.getItem("state")
  ? JSON.parse(sessionStorage.getItem("state"))
  : { saveUserName: "", isShow: true, MusicUrl: "" };

export default new Vuex.Store({
  state,
  mutations: {
    saveUserName(state, data) {
      state.saveUserName = data;
    },
    saveIsShow(state, data) {
      state.isShow = data;
    },
    saveMusicUrl(state, data) {
      state.MusicUrl = data;
    },
    setRouterList(state, data) {
      state.routerList = data;
    }
  },
  modules: {}
});
