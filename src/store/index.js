import { createStore } from "vuex";

const store = createStore({
  state: {
    userInfo: null //用户信息
  },
  getters: {
    userInfo: state => {
      if (state.userInfo == null) {
        let sessionUser = sessionStorage.getItem("user");
        if (sessionUser != null) {
          state.userInfo = JSON.parse(sessionUser);
          return sessionUser;
        } else {
          let localeUser = localStorage.getItem("user");
          if (localeUser != null) {
            state.userInfo = JSON.parse(localeUser);
          }
          return localeUser;
        }
      }
      return state.userInfo;
    },
    getRecommends: () => {
      return function(queryStr) {
        return JSON.parse(sessionStorage.getItem(queryStr));
      };
    }
  },
  mutations: {
    setUserInfo(state, userInfo, local = true) {
      state.userInfo = userInfo;
      if (local) {
        localStorage.setItem("user", JSON.stringify(userInfo));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userInfo));
      }
    },
    signOut(state) {
      state.userInfo = null;
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      this.$router.push({ name: "SignIn" });
    },
    setRecommend(state, data) {
      if (sessionStorage.getItem(data.queryStr) === null) {
        sessionStorage.setItem(data.queryStr, JSON.stringify(data.results));
      }
    }
  },
  actions: {},
  modules: {}
});

export default store;
