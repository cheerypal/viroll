<template>
  <div>
    <NavBar />
    <div id="country">
      <div class="container custom-container">
        <div class="titleSection">
          <h1>{{ format(countryName) }}</h1>
          <h3>{{ issueName }} Statistics</h3>
        </div>
        <hr />
        <div class="dataSection">
          <Today
            :infected="countryChange.currentInfected"
            :recovered="countryChange.recovered"
            :deaths="countryChange.totalDeaths"
          />
        </div>
        <div class="dataSection">
          <Total
            :cases="countryData.totalInfected"
            :recovered="countryData.recovered"
            :deaths="countryData.totalDeaths"
          />
        </div>
        <hr />
        <div class="newsSection">
          <h1>News</h1>
          <h3>Today</h3>
        </div>
      </div>
    </div>
    <NavBot />
  </div>
</template>
<script>
//Navbars
import NavBar from "../components/navbars/nav";
import NavBot from "../components/navbars/nav-bottom";

//data components
import Today from "../components/data-templates/today.vue";
import Total from "../components/data-templates/total.vue";

export default {
  name: "countryPage",
  components: {
    NavBar,
    NavBot,
    Today,
    Total,
  },
  data() {
    return {
      //Main data stored.
      countryName: this.$route.params.name,
      issueName: "Coronavirus",
      countryData: {
        currentInfected: "",
        totalInfected: "",
        totalDeaths: "",
        recovered: "",
      },
      countryChange: {
        currentInfected: "",
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
          this.countryChange.totalDeaths = cData.Deaths - cData2.Deaths;
          this.countryChange.recovered = cData.Recovered - cData2.Recovered;
        });
    },

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
  mounted: function() {
    //Load data on page load.
    this.getAllDataFromCountry();
  },
};
</script>

<style scoped>
#country {
  padding-top: 150px;
}

.custom-container {
  padding-right: 20%;
}

.titleSection {
  padding-bottom: 20px;
}

.dataSection {
  padding-top: 40px;
  padding-bottom: 40px;
}

.newsSection {
  padding-top: 40px;
  padding-bottom: 40px;
}

@media screen and (max-width: 710px) {
  #country {
    padding-top: 15%;
  }
  .titleSection {
    padding-bottom: 5%;
  }
  .dataSection {
    padding-top: 10%;
    padding-bottom: 5%;
  }
  .newsSection {
    padding-top: 10%;
    padding-bottom: 5%;
  }
}

@media screen and (max-width: 610px) {
  #country {
    padding-top: 25%;
  }
  .custom-container {
    padding-right: 4%;
  }
}
</style>
