import Vue from "vue";
import VueRouter from "vue-router";
import Search from "../views/Search.vue";
import Detail from "../views/Detail.vue";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "Search",
    component: Search
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
