import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    alias: "/login"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
