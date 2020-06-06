<template>
  <div>
    <NavBar />
    <div id="NotFound">
      <div class="container custom-container">
        <div class="titleSection">
          <h1>404</h1>
          <h3>Unfortunately {{ format(search) }} was not found</h3>
        </div>
        <hr />
        <div class="dataSection">
          <h2>Unfortunately we don't have data for {{ format(search) }}</h2>
          <p class="err">
            Please visit the
            <router-link class="nav-links" :to="{ name: 'allCountries' }">
              countries
            </router-link>
            page for the full list of
            <router-link class="nav-links" :to="{ name: 'allCountries' }">
              countries
            </router-link>
            or search for another one using the search bar
          </p>
        </div>
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

.dataSection {
  padding-top: 20px;
  padding-bottom: 20px;
}

.custom-container {
  padding-right: 5%;
}
</style>
