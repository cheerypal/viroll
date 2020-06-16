<template>
  <div>
    <NavBar />
    <div id="NotFound">
      <div class="container">
        <div class="titleSection">
          <h1>404 Page Not Found</h1>
          <h3>Unfortunately the page you were looking for was not found</h3>
        </div>
        <hr />
      </div>
    </div>
    <CustomFooter />
  </div>
</template>
<script>
import NavBar from "../components/navbars/nav";
import CustomFooter from "../components/navbars/custom-footer";
export default {
  name: "NotFound",
  components: {
    NavBar,
    CustomFooter,
  },
  data() {
    return {
      search: this.$route.params.name,
    };
  },
  methods: {
    format(text) {
      return "'" + text + "'";
    },
  },
};
</script>
<style scoped>
#NotFound {
  min-height: 75vh;
  padding-top: 150px;
}

@media screen and (max-width: 990px) {
  #NotFound {
    padding-top: 15%;
  }
}

@media screen and (max-width: 610px) {
  #NotFound {
    padding-top: 20%;
  }
}
</style>
