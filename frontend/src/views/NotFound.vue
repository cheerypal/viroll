<template>
  <div>
    <NavBar />
    <div id="NotFound">
      <div class="container">
        <div class="titleSection">
          <h1>404</h1>
          <h3>Unfortunately {{ format(search) }} was not found</h3>
        </div>
        <hr />
        <div class="dataSection">
          <h2>Unfortunately we don't have data for {{ format(search) }}</h2>
          <p class="err">
            Please visit the
            <router-link class="nav-links" :to="{ name: 'home' }">
              countries
            </router-link>
            page for the full list of
            <router-link class="nav-links" :to="{ name: 'home' }">
              countries
            </router-link>
            or search for another one using the search bar
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/navbars/nav";

export default {
  name: "NotFound",
  components: {
    NavBar
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

.dataSection {
  padding-top: 20px;
  padding-bottom: 20px;
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
