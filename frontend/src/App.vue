<template>
  <div id="app">
    <router-view />
    <cookie-law theme="dark-lime"></cookie-law>
  </div>
</template>
<script>
import CookieLaw from "vue-cookie-law";
export default {
  name: "app",
  components: {
    CookieLaw
  },
  methods: {
    setUpCookie() {
      let token = this.$cookies.get("dark-mode");
      if (token === null) {
        this.$cookies.set("dark-mode", "");
      }
    }
  },
  mounted: function() {
    this.setUpCookie();
  }
};
</script>
