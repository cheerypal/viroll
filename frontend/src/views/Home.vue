<template>
  <div>
    <NavBar />
    <div id="allCountries" class="container">
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
        <h1 class="newSection">Countries</h1>
        <hr />
        <div class="countryFlex">
          <Country
            v-for="country in countries"
            :key="country.countryName"
            :countryName="country.countryName"
            :cases="country.confirmed"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//Navbar comps
import NavBar from "../components/navbars/nav";

//Data comps
import Country from "../components/data-templates/country-card";
import Total from "../components/data-templates/total";

export default {
  name: "AllCountries",
  components: {
    NavBar,
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
      countries: [],
    };
  },

  methods: {
    //gets the global total for the coronavirus
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

    //gets all the countries with data from the api.
    getAllCountries() {
      let url = "https://api.covid19api.com/countries";
      fetch(url, { method: "GET" })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          for (let i in jsonData) {
            this.getConfirmedAllCountries(jsonData[i].Slug);
          }
        });
    },

    //Get all countries case numbers and place in json with countries name
    getConfirmedAllCountries(country) {
      let url = "https://api.covid19api.com/total/country/" + country;
      fetch(url, { method: "GET" })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          if (jsonData[jsonData.length - 1].Confirmed >= 0) {
            this.countries.push({
              countryName: country,
              confirmed: jsonData[jsonData.length - 1].Confirmed,
            });
          }
          this.countries.sort((a, b) => {
            return b.confirmed - a.confirmed;
          });
        })
        .catch(() => {});
    },
  },
  mounted: function() {
    //functions that are called on page load.
    this.getAllCountries();
    this.getGlobalTotal();
  },
};
</script>
<style scoped>
#allCountries {
  padding-top: 150px;
  padding-bottom: 50px;
}

.dataSection {
  padding-top: 20px;
  padding-bottom: 20px;
}

.newSection {
  padding-top: 20px;
}

.countryFlex {
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap;
  justify-content: space-between;
}

@media screen and (max-width: 990px) {
  #allCountries {
    padding-top: 15%;
    padding-bottom: 20%;
  }
  .dataSection {
    padding-top: 10%;
    padding-bottom: 10%;
  }
}

@media screen and (max-width: 610px) {
  #allCountries {
    padding-top: 20%;
  }
  .dataSection {
    padding-top: 2%;
    padding-bottom: 2%;
  }
}
</style>
