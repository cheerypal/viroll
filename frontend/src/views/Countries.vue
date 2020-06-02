<template>
  <div>
    <NavBar />
    <div id="allCountries" class="container custom-container">
      <div class="titleSection">
        <h1>All Countries</h1>
        <h3>Coronavirus Statistics</h3>
      </div>
      <hr />
      <div class="dataSection">
        <Total
          type="World"
          :cases="global.confirmed"
          :recovered="global.recovered"
          :deaths="global.deaths"
        />
      </div>
      <hr />
      <div class="dataSection">
        <div class="countryFlex">
          <Country countryName="united-kingdom" />
        </div>
      </div>
    </div>
    <NavBot />
  </div>
</template>
<script>
//Navbar comps
import NavBar from "../components/navbars/nav";
import NavBot from "../components/navbars/nav-bottom";

//Data comps
import Country from "../components/data-templates/country-card";
import Total from "../components/data-templates/total";

export default {
  name: "AllCountries",
  components: {
    NavBar,
    NavBot,
    Country,
    Total,
  },
  data() {
    return {
      global: {
        confirmed: "",
        deaths: "",
        recovered: "",
      },
    };
  },

  methods: {
    getGlobalTotal() {
      let url = "https://api.covid19api.com/world/total";
      fetch(url, { method: "GET" })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          this.global.confirmed = jsonData.TotalConfirmed;
          this.global.deaths = jsonData.TotalDeaths;
          this.global.recovered = jsonData.TotalRecovered;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted: function() {
    this.getGlobalTotal();
  },
};
</script>
<style scoped>
#allCountries {
  padding-top: 150px;
}

.custom-container {
  padding-right: 10%;
}

.dataSection {
  padding-top: 20px;
  padding-bottom: 20px;
}

.countryFlex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap;
  justify-content: space-between;
}
</style>
