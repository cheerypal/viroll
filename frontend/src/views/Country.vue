<template>
  <div>
    <NavBar />

    <NavBot />
  </div>
</template>
<script>
import NavBar from "../components/navbars/nav";
import NavBot from "../components/navbars/nav-bottom";
export default {
  name: "countryPage",
  components: {
    NavBar,
    NavBot,
  },
  data() {
    return {
      //Main data stored.
      countryName: this.$route.params.name,
      countryData: {
        currentInfected: "",
        totalInfected: "",
        totalDeaths: "",
        recovered: "",
      },
      countryChange: {
        currentInfected: "",
        totalInfected: "",
        totalDeaths: "",
        recovered: "",
      },
    };
  },
  methods: {
    //Main fetch script
    getAllDataFromCountry() {
      let url = "https://api.covid19api.com/total/country/" + this.countryName;
      fetch(url, { method: "GET" })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          //All time values
          let cData = jsonData[jsonData.length - 1];

          this.countryData.currentInfected = cData.Active;
          this.countryData.totalInfected = cData.Confirmed;
          this.countryData.totalDeaths = cData.Deaths;
          this.countryData.recovered = cData.Recovered;

          //Daily increases
          let cData2 = jsonData[jsonData.length - 2];
          this.countryChange.currentInfected = cData.Active - cData2.Active;
          this.countryChange.totalInfected = cData.Confirmed - cData2.Confirmed;
          this.countryChange.totalDeaths = cData.Deaths - cData2.Deaths;
          this.countryChange.recovered = cData.Recovered - cData2.Recovered;
        });
    },
  },
  mounted: function() {
    //Load data on page load.
    this.getAllDataFromCountry();
  },
};
</script>
