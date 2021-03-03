import { createRouter, createWebHashHistory } from "vue-router";
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";

const routes = [
  {
    path: "/",
    name: "SignIn",
    component: SignIn,
    alias: "/signIn"
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
