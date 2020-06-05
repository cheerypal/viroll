import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Country from "../views/Country.vue";
import AllCountries from "../views/Countries.vue";
import NotFound from "../views/NotFound.vue";
import NotFound404 from "../views/NotFound404.vue";
import Compare from "../views/Compare.vue";

Vue.use(VueRouter);
//Main pages that are accessed via the navigation bar or search bar
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/countries",
    name: "allCountries",
    component: AllCountries,
  },
  {
    path: "/country/:name",
    name: "country",
    component: Country,
  },
  {
    path: "/compare",
    name: "compare",
    component: Compare,
  },
  {
    name: "NotFound",
    path: "/country_not_found/:name",
    component: NotFound,
  },
  {
    path: "*",
    name: "NotFound404",
    component: NotFound404,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
