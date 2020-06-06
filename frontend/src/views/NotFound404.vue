<template>
  <div>
    <NavBar />
    <div id="NotFound">
      <div class="container custom-container">
        <div class="titleSection">
          <h1>404 Page Not Found</h1>
          <h3>Unfortunately the page you were looking for was not found</h3>
        </div>
        <hr />
      </div>
    </div>
    <NavBot />
  </div>
</template>
<script>
import NavBar from "../components/navbars/nav";
import NavBot from "../components/navbars/nav-bottom";
export default {
  name: "404",
  components: {
    NavBar,
    NavBot
  },
  data() {
    return {
      search: this.$route.params.name
    };
  },
  methods: {
    format(text) {
      return "'" + text + "'";
    }
  }
};
</script>
<style scoped>
#NotFound {
  min-height: 100vh;
  padding-top: 150px;
}

.custom-container {
  padding-right: 5%;
}
</style>
