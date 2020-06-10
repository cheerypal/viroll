<template>
  <div>
    <NavBar />
    <div id="compare">
      <div class="container">
        <h1>Compare Countries</h1>
        <h3>{{ issueName }} Statistics</h3>
        <hr />
        <div class="titleSection">
          <h1>
            {{ format(country1) }}
          </h1>
          <h3>vs</h3>
          <h1>{{ format(country2) }}</h1>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
//Navbar
import NavBar from "../components/navbars/nav";

export default {
  name: "Comparing_Countries",
  components: {
    NavBar,
  },

  data() {
    return {
      country1: this.$route.params.country1,
      country2: this.$route.params.country2,
      issueName: "Coronavirus",
    };
  },
  methods: {
    //Formatting methods:
    remover(text) {
      return text.replace(/-/g, " ");
    },
    format(text) {
      let country = text.replace(/(\b[a-z](?!\s))/g, function(x) {
        return x.toUpperCase();
      });

      return this.remover(country);
    },
  },
};
</script>
<style scoped>
#compare {
  min-height: 100vh;
  padding-top: 150px;
}

.titleSection {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
}

@media screen and (max-width: 990px) {
  #compare {
    padding-top: 15%;
  }
}

@media screen and (max-width: 610px) {
  #compare {
    padding-top: 20%;
  }
}
</style>
