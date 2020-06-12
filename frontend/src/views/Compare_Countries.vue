<template>
  <div>
    <NavBar />
    <div id="compare">
      <div class="container">
        <h1>Compare Countries</h1>
        <h3>{{ issueName }} Statistics</h3>
        <hr />
        <div class="titleSection">
          <h1 class="countryTitles">
            {{ format(country1.name) }}
          </h1>
          <h3>
            vs
          </h3>
          <h1 class="countryTitles">
            {{ format(country2.name) }}
          </h1>
        </div>
        <hr />
        <div class="dataSection">
          <h2>Yesterday</h2>
          <CompareData
            :countryO="country1.changeData"
            :countryT="country2.changeData"
          />
        </div>
        <div class="dataSection">
          <h2>Total</h2>
          <CompareData :countryO="country1" :countryT="country2" />
        </div>
        <hr />
        <div class="chartSection">
          <h1>Charts</h1>

          <div class="flex-form">
            <div class="form-title">
              <h3>Filter Charts</h3>
            </div>
            <form class="custom-form-filter form-inline" @submit="updateCharts">
              <div>
                <select class="form-control custom-select" v-model="form.daily">
                  <option v-bind:value="true">Change Data</option>
                  <option v-bind:value="false">All Time Data</option>
                </select>
              </div>
              <div>
                <select
                  class="form-control custom-select"
                  v-model="form.increments"
                >
                  <option value="1">Every Recorded Day</option>
                  <option value="7">Weekly Data</option>
                  <option value="14">2 Week Data</option>
                  <option value="30">Monthly Data (30 Days)</option>
                </select>
              </div>
              <div>
                <button class="custom-button" type="submit">
                  Filter
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <div class="dataSection">
          <h2>Confirmed Cases</h2>
          <div class="chart-container">
            <canvas id="chart" class="charts" />
          </div>
        </div>
        <hr />
        <div class="dataSection">
          <h2>Recoveries</h2>
          <div class="chart-container">
            <canvas id="chartRecoveries" class="charts" />
          </div>
        </div>
        <hr />
        <div class="dataSection">
          <h2>Deaths</h2>
          <div class="chart-container">
            <canvas id="chartDeaths" class="charts" />
          </div>
        </div>
        <hr />
      </div>
      <!--Error with finding data chunk-->
      <div v-show="country1.confirmed == ''">
        <div class="dataSection">
          <h2>
            Unfortunately we don't have data for this country
          </h2>
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
//Navbar
import NavBar from "../components/navbars/nav";
import CompareData from "../components/data-templates/compare-data.vue";
import Chart from "chart.js";

export default {
  name: "Comparing_Countries",
  components: {
    NavBar,
    CompareData,
  },

  data() {
    return {
      country1: {
        name: this.$route.params.country1,
        confirmed: "",
        recovered: "",
        dead: "",
        changeData: {
          confirmed: "",
          recovered: "",
          dead: "",
        },
      },
      country2: {
        name: this.$route.params.country2,
        confirmed: "",
        recovered: "",
        dead: "",
        changeData: {
          confirmed: "",
          recovered: "",
          dead: "",
        },
      },
      issueName: "Coronavirus",
      charts: {
        chart: "",
        chart1: "",
        chart2: "",
      },

      form: {
        daily: true,
        increments: 1,
      },

      //Case chart data.
      chartData: {
        data: {
          labels: [],
          datasets: [
            {
              type: "line",
              label: this.format(this.$route.params.country1) + " Cases",
              fill: true,
              backgroundColor: "rgba(26, 137, 60, 0.2)",
              borderColor: "rgba(26, 137, 60, 1)",
              borderWidth: 3,
              pointRadius: 6,
              data: [],
            },
            {
              type: "line",
              label: this.format(this.$route.params.country2) + " Cases",
              fill: true,
              backgroundColor: "rgba(255, 195, 0, 0.2)",
              borderColor: "rgba(255, 195, 0, 1)",
              borderWidth: 3,
              pointRadius: 6,
              data: [],
            },
          ],
        },
        lineChartOptions: {
          legend: {
            position: "bottom",
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Day",
                },
              },
            ],
            yAxes: [
              {
                display: true,
                type: "linear",
                scaleLabel: {
                  display: true,
                  labelString: "Number of Cases",
                },
              },
            ],
          },
        },
      },

      //Recovery chart data.
      chartDataRecoveries: {
        data: {
          labels: [],
          datasets: [
            {
              type: "line",
              label: this.format(this.$route.params.country1) + " Recoveries",
              fill: true,
              backgroundColor: "rgba(26, 137, 60, 0.2)",
              borderColor: "rgba(26, 137, 60, 1)",
              borderWidth: 3,
              pointRadius: 6,
              data: [],
            },
            {
              type: "line",
              label: this.format(this.$route.params.country2) + " Recoveries",
              fill: true,
              backgroundColor: "rgba(255, 195, 0, 0.2)",
              borderColor: "rgba(255, 195, 0, 1)",
              borderWidth: 3,
              pointRadius: 6,
              data: [],
            },
          ],
        },
        lineChartOptions: {
          legend: {
            position: "bottom",
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Day",
                },
              },
            ],
            yAxes: [
              {
                display: true,
                type: "linear",
                scaleLabel: {
                  display: true,
                  labelString: "Number of Recoveries",
                },
              },
            ],
          },
        },
      },

      //Death chart data.
      chartDataDeaths: {
        data: {
          labels: [],
          datasets: [
            {
              type: "line",
              label: this.format(this.$route.params.country1) + " Deaths",
              fill: true,
              backgroundColor: "rgba(26, 137, 60, 0.2)",
              borderColor: "rgba(26, 137, 60, 1)",
              borderWidth: 3,
              pointRadius: 6,
              data: [],
            },
            {
              type: "line",
              label: this.format(this.$route.params.country2) + " Deaths",
              fill: true,
              backgroundColor: "rgba(255, 195, 0, 0.2)",
              borderColor: "rgba(255, 195, 0, 1)",
              borderWidth: 3,
              pointRadius: 6,
              data: [],
            },
          ],
        },
        lineChartOptions: {
          legend: {
            position: "bottom",
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Day",
                },
              },
            ],
            yAxes: [
              {
                display: true,
                type: "linear",
                scaleLabel: {
                  display: true,
                  labelString: "Number of Deaths",
                },
              },
            ],
          },
        },
      },
    };
  },
  methods: {
    //Get all the data for country 1 and store in the state
    getCountry1Data() {
      let url =
        "https://api.covid19api.com/total/country/" + this.country1.name;
      fetch(url, { method: "GET" })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          //This section looks at getting data for the top section of the page
          //This will be displayed as stand alone data.
          let today = jsonData.length - 1;
          this.country1.confirmed = jsonData[today].Confirmed;
          this.country1.recovered = jsonData[today].Recovered;
          this.country1.dead = jsonData[today].Deaths;
          this.country1.changeData.confirmed =
            jsonData[today].Confirmed - jsonData[today - 1].Confirmed;
          this.country1.changeData.recovered =
            jsonData[today].Recovered - jsonData[today - 1].Recovered;
          this.country1.changeData.dead =
            jsonData[today].Deaths - jsonData[today - 1].Deaths;
        });
    },

    //Get all the data for country 2 and store in the state
    getCountry2Data() {
      let url =
        "https://api.covid19api.com/total/country/" + this.country2.name;
      fetch(url, { method: "GET" })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          //This section looks at getting data for the top section of the page
          //This will be displayed as stand alone data.
          let today = jsonData.length - 1;
          this.country2.confirmed = jsonData[today].Confirmed;
          this.country2.recovered = jsonData[today].Recovered;
          this.country2.dead = jsonData[today].Deaths;
          this.country2.changeData.confirmed =
            jsonData[today].Confirmed - jsonData[today - 1].Confirmed;
          this.country2.changeData.recovered =
            jsonData[today].Recovered - jsonData[today - 1].Recovered;
          this.country2.changeData.dead =
            jsonData[today].Deaths - jsonData[today - 1].Deaths;
        });
    },

    updateCharts(evt) {
      evt.preventDefault();
    },

    dateFormatter(date) {
      date = date.replace("T", " ");
      date = date.substring(0, 10);
      date = date.replace(/(\b-(?!\s))/g, " ");
      let year = date.substring(0, 4);
      let month = date.substring(5, 7);
      let day = date.substring(8, 10);
      return day + "/" + month + "/" + year;
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
    this.getCountry1Data();
    this.getCountry2Data();

    const ctx = document.getElementById("chart").getContext("2d");
    const ctx1 = document.getElementById("chartRecoveries").getContext("2d");
    const ctx2 = document.getElementById("chartDeaths").getContext("2d");

    //Load the chart data variables with data and options and load to canvases
    this.charts.chart = new Chart(ctx, {
      type: this.chartData.type,
      data: this.chartData.data,
      options: this.chartData.lineChartOptions,
    });

    this.charts.chart1 = new Chart(ctx1, {
      type: this.chartDataRecoveries.type,
      data: this.chartDataRecoveries.data,
      options: this.chartDataRecoveries.lineChartOptions,
    });

    this.charts.chart2 = new Chart(ctx2, {
      type: this.chartDataDeaths.type,
      data: this.chartDataDeaths.data,
      options: this.chartDataDeaths.lineChartOptions,
    });
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
  align-items: center;
}

.countryTitles {
  font-size: 2.2em;
}

.dataSection {
  padding-top: 20px;
  padding-bottom: 20px;
}

.err {
  padding-top: 30px;
  font-size: 1.3em;
}

.chartSection {
  padding-top: 50px;
}

canvas {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  width: 75%;
  height: 30%;
  color: black;
  display: block;
}

.charts {
  margin-top: 50px;
  margin-bottom: 50px;
}

.chart-container {
  position: relative;
  height: 50vh;
  width: 100%;
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

@media screen and (max-width: 990px) {
  #compare {
    padding-top: 15%;
  }
}

@media screen and (max-width: 812px) {
  .chart-container {
    height: 80vh;
  }
}

@media screen and (max-width: 710px) {
  .titleSection {
    padding-bottom: 5%;
  }

  .chartSection {
    padding-top: 30px;
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
  #compare {
    padding-top: 20%;
  }
  .dataSection {
    padding-top: 2%;
    padding-bottom: 2%;
  }
  .chart-container {
    height: 50vh;
  }
}
</style>
