import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Country from "../views/Country.vue";
import AllCountries from "../views/Countries.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/countries",
    name: "allCountries",
    component: AllCountries
  },
  {
    path: "/country/:name",
    name: "country",
    component: Country
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
