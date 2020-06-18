import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.$cookies.config("30d");

Vue.$cookies.set("theme", "default");
Vue.$cookies.set("hover-time", "1s");
