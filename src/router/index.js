import { createRouter, createWebHashHistory } from "vue-router";
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";
import Home from "@/views/Home";
import store from "@/store";
import BookDetail from "@/views/components/BookDetail";
import Chapter from "@/views/components/Chapter";
import Main from "@/views/Main";
import PersonalPage from "@/views/PersonalPage";

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
    name: "Main",
    component: Main,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
        children: [
          {
            path: "/home/detail",
            name: "BookDetail",
            component: BookDetail,
            children: [
              {
                path: "/home/detail/chapter",
                name: "Chapter",
                component: Chapter
              }
            ]
          }
        ]
      },
      {
        path: "/personal",
        name: "PersonalPage",
        component: PersonalPage
      }
    ]
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
