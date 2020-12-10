import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

//Sets the cookie destroy in 1 year
Vue.$cookies.config("365d");
