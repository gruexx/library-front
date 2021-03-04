import { createRouter, createWebHashHistory } from "vue-router";
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";
import Home from "@/views/Home";
import store from "@/store";

const routes = [
  {
    path: "/signIn",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    alias: "/home",
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user = store.getters.userInfo;
    if (user !== null && user !== undefined) {
      next();
    } else {
      next({
        path: "/signIn",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
