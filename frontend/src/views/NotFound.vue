<template>
  <div>
    <NavBar />
    <div
      id="NotFound"
      v-bind:style="{
        backgroundColor: cookie ? 'black' : 'white',
        color: cookie ? 'white' : 'black'
      }"
    >
      <div class="container">
        <div class="titleSection">
          <h1>404</h1>
          <h3
            v-bind:style="{
              color: cookie ? 'white' : 'black'
            }"
          >
            Unfortunately {{ format(search) }} was not found
          </h3>
        </div>
        <hr
          v-bind:style="{
            backgroundColor: cookie ? '#2D2D2D' : '#F6F6F6'
          }"
        />
        <div class="dataSection">
          <h2
            v-bind:style="{
              color: cookie ? 'white' : 'black'
            }"
          >
            Unfortunately we don't have data for {{ format(search) }}
          </h2>
          <p class="err">
            Please visit the
            <router-link
              v-bind:style="{
                color: cookie ? 'white' : 'black'
              }"
              class="nav-links bold-link"
              :to="{ name: 'home' }"
            >
              countries
            </router-link>
            page for the full list of
            <router-link
              v-bind:style="{
                color: cookie ? 'white' : 'black'
              }"
              class="nav-links bold-link"
              :to="{ name: 'home' }"
            >
              countries
            </router-link>
            or search for another one using the search bar
          </p>
        </div>
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
    CustomFooter
  },
  data() {
    return {
      search: this.$route.params.name,
      cookie: ""
    };
  },
  methods: {
    format(text) {
      return "'" + text + "'";
    },
    checkCookie() {
      if (this.$cookies.get("dark-mode") === null) {
        this.cookie = false;
      } else {
        this.cookie = true;
      }
    }
  },
  mounted: function() {
    this.checkCookie();
  }
};
</script>
<style scoped>
#NotFound {
  min-height: 75vh;
  padding-top: 150px;
}

.dataSection {
  padding-top: 20px;
  padding-bottom: 20px;
}

.bold-link {
  font-family: "Roboto-Black";
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
