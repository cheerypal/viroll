<template>
  <div>
    <NavBar />
    <div id="compare">
      <div class="container custom-container">
        <div class="titleSection">
          <h1>Compare Countries</h1>
          <h3>{{ issueName }} Statistics</h3>
        </div>
        <hr />
        <div class="dataSection">
          <h2>Compare any two countries of your liking below</h2>
          <form class="form-inline">
            <select
              class="form-control"
              required="required"
              v-model="form.country1"
            >
              <option disabled value>Country 1</option>
              <option v-for="country in countries" :key="country.countryName">{{
                country.countryName
              }}</option>
            </select>
            <h3>and</h3>
            <select
              class="form-control"
              required="required"
              v-model="form.country2"
            >
              <option disabled value>Country 2</option>
              <option v-for="country in countries" :key="country.countryName">{{
                country.countryName
              }}</option>
            </select>
          </form>
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
  name: "Compare",
  components: {
    NavBar,
    NavBot
  },
  data() {
    return {
      form: {
        country1: "",
        country2: ""
      },
      issueName: "Coronavirus",
      countries: []
    };
  },
  methods: {
    getAllCountries() {
      let url = "https://api.covid19api.com/countries";
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          for (let i in jsonData) {
            this.getConfirmedAllCountries(jsonData[i].Slug);
          }
        });
    },

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
              confirmed: jsonData[jsonData.length - 1].Confirmed
            });
          }
          this.countries.sort((a, b) => {
            return b.confirmed - a.confirmed;
          });
        })
        .catch(() => {});
    }
  },
  mounted: function() {
    this.getAllCountries();
  }
};
</script>
<style scoped>
#compare {
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
