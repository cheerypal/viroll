<template>
  <div
    v-bind:style="{
      backgroundColor: cookie ? 'black' : 'white',
      color: cookie ? 'white' : 'black'
    }"
  >
    <NavBar />
    <div id="allCountries" class="container">
      <div class="titleSection">
        <h1>All Countries</h1>
        <h3>Coronavirus Statistics</h3>
      </div>
      <hr
        v-bind:style="{
          backgroundColor: cookie ? '#2D2D2D' : '#F6F6F6'
        }"
      />
      <div class="dataSection">
        <Summary
          title="World Total"
          :infected="global.confirmed"
          :recovered="global.recovered"
          :deaths="global.deaths"
        />
      </div>
      <hr
        v-bind:style="{
          backgroundColor: cookie ? '#2D2D2D' : '#F6F6F6'
        }"
      />
      <div class="dataSection">
        <h1 class="newSection">Countries</h1>
        <div class="flex-form">
          <div class="form-title">
            <h3>Sort countries</h3>
          </div>
          <form class="custom-form-filter form-inline" @submit="sortCountries">
            <div>
              <select
                class="form-control custom-select"
                v-model="form.choice"
                v-bind:style="{
                  backgroundColor: cookie ? 'rgba(14, 14, 14, 0.9)' : 'white',
                  color: cookie ? 'white' : 'black',
                  borderColor: cookie ? '#8E8E8E' : 'black'
                }"
              >
                <option
                  v-bind:style="{
                    backgroundColor: cookie ? 'black' : 'white',
                    color: cookie ? 'white' : 'black'
                  }"
                  value="cases_high_to_low"
                >
                  Cases (Highest to Lowest)
                </option>
                <option
                  v-bind:style="{
                    backgroundColor: cookie ? 'black' : 'white',
                    color: cookie ? 'white' : 'black'
                  }"
                  value="cases_low_to_high"
                >
                  Cases (Lowest to Highest)
                </option>
                <option
                  v-bind:style="{
                    backgroundColor: cookie ? 'black' : 'white',
                    color: cookie ? 'white' : 'black'
                  }"
                  value="recov_high_to_low"
                >
                  Recoveries (Highest to Lowest)
                </option>
                <option
                  v-bind:style="{
                    backgroundColor: cookie ? 'black' : 'white',
                    color: cookie ? 'white' : 'black'
                  }"
                  value="recov_low_to_high"
                >
                  Recoveries (Lowest to Highest)
                </option>
                <option
                  v-bind:style="{
                    backgroundColor: cookie ? 'black' : 'white',
                    color: cookie ? 'white' : 'black'
                  }"
                  value="deaths_high_to_low"
                >
                  Deaths (Highest to Lowest)
                </option>
                <option
                  v-bind:style="{
                    backgroundColor: cookie ? 'black' : 'white',
                    color: cookie ? 'white' : 'black'
                  }"
                  value="deaths_low_to_high"
                >
                  Deaths (Lowest to Highest)
                </option>
                <option
                  v-bind:style="{
                    backgroundColor: cookie ? 'black' : 'white',
                    color: cookie ? 'white' : 'black'
                  }"
                  value="alpha"
                >
                  Alphabetical
                </option>
              </select>
            </div>
            <div>
              <button
                class="custom-button"
                type="submit"
                v-bind:style="{
                  backgroundColor: cookie ? 'rgba(14, 14, 14, 0.9)' : 'white',
                  color: cookie ? 'white' : 'black',
                  borderColor: cookie ? '#8E8E8E' : 'black'
                }"
              >
                Sort
              </button>
            </div>
          </form>
        </div>
        <hr
          v-bind:style="{
            backgroundColor: cookie ? '#2D2D2D' : '#F6F6F6'
          }"
        />
        <div class="countryFlex">
          <Country
            v-for="country in countries"
            :key="country.countryName"
            :countryName="country.countryName"
            :cases="country.confirmed"
            :recoveries="country.recoveries"
            :deaths="country.deaths"
          />
        </div>
      </div>
    </div>
    <CustomFooter />
  </div>
</template>
<script>
//Navbar comps
import NavBar from "../components/navbars/nav";
import CustomFooter from "../components/navbars/custom-footer";
//Data comps
import Country from "../components/data-templates/country-card";
import Summary from "../components/data-templates/summary";

export default {
  name: "AllCountries",
  components: {
    NavBar,
    Country,
    Summary,
    CustomFooter
  },
  data() {
    return {
      global: {
        confirmed: "",
        deaths: "",
        recovered: ""
      },
      countries: [],
      form: {
        choice: "cases_high_to_low"
      },
      cookie: ""
    };
  },

  methods: {
    //gets the global total for the coronavirus
    getGlobalTotal() {
      let url = "https://api.covid19api.com/world/total";
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.global.confirmed = jsonData.TotalConfirmed;
          this.global.deaths = jsonData.TotalDeaths;
          this.global.recovered = jsonData.TotalRecovered;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //gets all the countries with data from the api.
    //This method was changed due to a change to the way the API deals with requests
    //This new way is more effective than the last as it as O(1) requests and an O(n) loop to go through them all
    getAllCountries() {
      let url = "https://api.covid19api.com/summary";
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          for (let i in jsonData.Countries) {
            this.countries.push({
              countryName: jsonData.Countries[i].Country,
              confirmed: jsonData.Countries[i].TotalConfirmed,
              recovered: jsonData.Countries[i].TotalRecovered,
              deaths: jsonData.Countries[i].TotalDeaths
            });
          }
          this.countries.sort((a, b) => {
            return b.confirmed - a.confirmed;
          });
        })
        .catch(() => {});
    },

    //Dead Method. Will Keep for just in case use
    //Get all countries case numbers and place in json with countries name
    getConfirmedAllCountries(country) {
      let url = "https://api.covid19api.com/total/country/" + country;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          if (jsonData[jsonData.length - 1].Confirmed >= 0) {
            this.countries.push({
              countryName: country,
              confirmed: jsonData[jsonData.length - 1].Confirmed,
              recoveries: jsonData[jsonData.length - 1].Recovered,
              deaths: jsonData[jsonData.length - 1].Deaths
            });
          }
          this.countries.sort((a, b) => {
            return b.confirmed - a.confirmed;
          });
        })
        .catch(() => {});
    },

    //sort countries - triggered when the form is submitted
    sortCountries(evt) {
      evt.preventDefault();
      switch (this.form.choice) {
        case "cases_high_to_low":
          this.countries.sort((a, b) => {
            return b.confirmed - a.confirmed;
          });
          break;
        case "cases_low_to_high":
          this.countries.sort((a, b) => {
            return a.confirmed - b.confirmed;
          });
          break;
        case "recov_high_to_low":
          this.countries.sort((a, b) => {
            return b.recoveries - a.recoveries;
          });
          break;
        case "recov_low_to_high":
          this.countries.sort((a, b) => {
            return a.recoveries - b.recoveries;
          });
          break;
        case "deaths_high_to_low":
          this.countries.sort((a, b) => {
            return b.deaths - a.deaths;
          });
          break;
        case "deaths_low_to_high":
          this.countries.sort((a, b) => {
            return a.deaths - b.deaths;
          });
          break;
        case "alpha":
          this.countries.sort((a, b) => {
            return this.compareStrings(a.countryName, b.countryName);
          });
          break;

        default:
          this.countries.sort((a, b) => {
            return b.confirmed - a.confirmed;
          });
          break;
      }
    },

    //Function orders countries by alphabetical order.
    compareStrings(a, b) {
      a = a.toLowerCase();
      b = b.toLowerCase();

      return a < b ? -1 : a > b ? 1 : 0;
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
    //functions that are called on page load.
    this.getAllCountries();
    this.getGlobalTotal();
    this.checkCookie();
  }
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

.flex-form {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
}

.form-title {
  margin-bottom: 10px;
  font-size: 1.1em;
  font-family: "Roboto-Black";
}

.custom-form-filter {
  margin-bottom: 10px;
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
  }
  .dataSection {
    padding-top: 10%;
    padding-bottom: 2%;
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
