<template>
  <div>
    <NavBar />
    <div id="country">
      <div class="container">
        <div class="titleSection">
          <h1>{{ format(countryName) }}</h1>
          <h3>{{ issueName }} Statistics</h3>
        </div>
        <hr />
        <div v-show="countryData.currentInfected != ''">
          <div class="dataSection">
            <Today
              :infected="countryChange.currentInfected"
              :recovered="countryChange.recovered"
              :deaths="countryChange.totalDeaths"
            />
          </div>
          <div class="dataSection">
            <Total
              :cases="countryData.currentInfected"
              :recovered="countryData.recovered"
              :deaths="countryData.totalDeaths"
            />
            <div class="text-right sub">
              <p>
                * Represents the change in data from yesterday and today<br />
              </p>
            </div>
          </div>
          <hr />
          <div class="dataSection">
            <h2>Confirmed Cases</h2>
            <canvas id="chart" class="charts" />
          </div>
          <hr />
          <div class="dataSection">
            <h2>Recoveries</h2>
            <canvas id="chartRecoveries" class="charts" />
          </div>
          <hr />
          <div class="dataSection">
            <h2>Deaths</h2>
            <canvas id="chartDeaths" class="charts" />
          </div>
          <hr />
        </div>
        <div v-show="countryData.currentInfected == ''">
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
  </div>
</template>
<script>
//Navbars
import NavBar from "../components/navbars/nav";

//data components
import Today from "../components/data-templates/today.vue";
import Total from "../components/data-templates/total.vue";

//chart.js
import Chart from "chart.js";

export default {
  name: "countryPage",
  components: {
    NavBar,

    Today,
    Total
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
        recovered: ""
      },
      countryChange: {
        currentInfected: "",
        totalDeaths: "",
        recovered: ""
      },

      image: "../assets/country-sil/" + this.$route.params.name + ".gif",

      //chart data for Active Cases and its own chart characteristics
      chartData: {
        data: {
          labels: [],
          datasets: [
            {
              type: "line",
              label: "Cases",
              fill: true,
              backgroundColor: "rgba(26, 137, 60, 0.2)",
              borderColor: "rgba(26, 137, 60, 1)",
              borderWidth: 3,
              pointRadius: 6,

              data: []
            }
          ]
        },
        lineChartOptions: {
          legend: {
            position: "bottom"
          },
          responsive: true,
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Day"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                type: "linear",
                scaleLabel: {
                  display: true,
                  labelString: "Number of Cases"
                }
              }
            ]
          }
        }
      },

      //this is the dataset for the recovery chart
      chartDataRecoveries: {
        data: {
          labels: [],
          datasets: [
            {
              type: "line",
              label: "Recoveries",
              fill: true,
              backgroundColor: "rgba(26, 137, 60, 0.2)",
              borderColor: "rgba(26, 137, 60, 1)",
              borderWidth: 3,
              pointRadius: 6,
              data: []
            }
          ]
        },
        lineChartOptions: {
          legend: {
            position: "bottom"
          },
          responsive: true,
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Day"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                type: "linear",
                scaleLabel: {
                  display: true,
                  labelString: "Number of Recoveries"
                }
              }
            ]
          }
        }
      },

      //this is the dataset for the recovery chart
      chartDataDeaths: {
        data: {
          labels: [],
          datasets: [
            {
              type: "line",
              label: "Deaths",
              fill: true,
              backgroundColor: "rgba(26, 137, 60, 0.2)",
              borderColor: "rgba(26, 137, 60, 1)",
              borderWidth: 3,
              pointRadius: 6,
              data: []
            }
          ]
        },
        lineChartOptions: {
          legend: {
            position: "bottom"
          },
          responsive: true,
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Day"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                type: "linear",
                scaleLabel: {
                  display: true,
                  labelString: "Number of Deaths"
                }
              }
            ]
          }
        }
      }
    };
  },
  methods: {
    //Main fetch script
    getAllDataFromCountry() {
      let url = "https://api.covid19api.com/total/country/" + this.countryName;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          //All time values
          let cData = jsonData[jsonData.length - 1];
          this.countryData.currentInfected = cData.Confirmed;
          this.countryData.totalDeaths = cData.Deaths;
          this.countryData.recovered = cData.Recovered;
          if (this.countryData.currentInfected === "NaN") {
            this.checkIfCountryExists();
          }
          //Daily increases
          let cData2 = jsonData[jsonData.length - 2];
          this.countryChange.currentInfected =
            cData.Confirmed - cData2.Confirmed;
          this.countryChange.totalDeaths = cData.Deaths - cData2.Deaths;
          this.countryChange.recovered = cData.Recovered - cData2.Recovered;
        })
        .catch(err => {
          console.log(err);
          this.checkIfCountryExists();
        });
    },

    //Get data for the confirmed cases chart for the past 10 days.
    getChartDataByCountry(chart) {
      let url = "https://api.covid19api.com/total/country/" + this.countryName;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          //gets todays index in the jsonArray and places it in the chart data
          let today = jsonData.length - 1;
          this.chartData.data.labels.push(
            this.dateFormatter(jsonData[today].Date)
          );
          this.chartData.data.datasets[0].data.push(jsonData[today].Confirmed);

          for (let i = today; i > 0; i--) {
            if (i % 14 == 0) {
              this.chartData.data.labels.push(
                this.dateFormatter(jsonData[i].Date)
              );
              this.chartData.data.datasets[0].data.push(jsonData[i].Confirmed);
            }
          }

          this.chartData.data.labels.reverse();
          this.chartData.data.datasets[0].data.reverse();

          chart.update();
          //Get min and max for the graph
          console.log(this.chartData.data.datasets[0].data);
        })
        .catch(err => {
          console.log(err);
          this.checkIfCountryExists();
        });
    },

    //get chart data for the recoveries chart for the past 10 days.
    getChartDataByCountryRecoveries(chart) {
      let url = "https://api.covid19api.com/total/country/" + this.countryName;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          //gets todays index in the jsonArray and places it in the chart data
          let today = jsonData.length - 1;

          this.chartDataRecoveries.data.labels.push(
            this.dateFormatter(jsonData[today].Date)
          );
          this.chartDataRecoveries.data.datasets[0].data.push(
            jsonData[today].Recovered
          );

          for (let i = today; i > 0; i--) {
            if (i % 14 == 0) {
              this.chartDataRecoveries.data.labels.push(
                this.dateFormatter(jsonData[i].Date)
              );
              this.chartDataRecoveries.data.datasets[0].data.push(
                jsonData[i].Recovered
              );
            }
          }

          this.chartDataRecoveries.data.labels.reverse();
          this.chartDataRecoveries.data.datasets[0].data.reverse();

          chart.update();

          console.log(this.chartDataRecoveries.data.datasets[0].data);
        })
        .catch(err => {
          console.log(err);
          this.checkIfCountryExists();
        });
    },

    //get chart data for the recoveries chart for the past 10 days.
    getChartDataByCountryDeaths(chart) {
      let url = "https://api.covid19api.com/total/country/" + this.countryName;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          let today = jsonData.length - 1;

          this.chartDataDeaths.data.labels.push(
            this.dateFormatter(jsonData[today].Date)
          );
          this.chartDataDeaths.data.datasets[0].data.push(
            jsonData[today].Deaths
          );

          for (let i = today; i > 0; i--) {
            if (i % 14 == 0) {
              this.chartDataDeaths.data.labels.push(
                this.dateFormatter(jsonData[i].Date)
              );
              this.chartDataDeaths.data.datasets[0].data.push(
                jsonData[i].Deaths
              );
            }
          }
          this.chartDataDeaths.data.labels.reverse();
          this.chartDataDeaths.data.datasets[0].data.reverse();

          chart.update();

          console.log(this.chartDataDeaths.data.datasets[0].data);
        })
        .catch(err => {
          console.log(err);
          this.checkIfCountryExists();
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

    dateFormatter(date) {
      date = date.replace("T", " ");
      date = date.substring(0, 10);
      date = date.replace(/(\b-(?!\s))/g, " ");
      let year = date.substring(0, 4);
      let month = date.substring(5, 7);
      let day = date.substring(8, 10);
      return day + "/" + month + "/" + year;
    },

    //chart generation must pass chart through to where the chart receives the data so that the chart can update.
    //All charts will display data that reflects every 2 week milestones.
    generateCharts(chart, chart1, chart2) {
      this.getChartDataByCountry(chart);
      this.getChartDataByCountryRecoveries(chart1);
      this.getChartDataByCountryDeaths(chart2);
    },

    /*
    checkImageExists(image) {
      if (image) {
        console.log("ss");
        return "";
      }
      console.log("coolio");
      return image;
    },
    */

    //Checker function that is triggered when an error is found by one of the fetches when a country that was searched for doesnt exist
    //Functions forwards the user to the 404 page that revolves around the searched for country
    checkIfCountryExists() {
      if (this.countryData.currentInfected != "")
        this.$router.push({
          name: "NotFound",
          param: { name: this.countryName }
        });
    }
  },

  mounted: function() {
    //Get data for the country that was searched for.
    this.getAllDataFromCountry();

    //Set up variables for the charts
    const ctx = document.getElementById("chart").getContext("2d");
    const ctx1 = document.getElementById("chartRecoveries").getContext("2d");
    const ctx2 = document.getElementById("chartDeaths").getContext("2d");

    let chart = new Chart(ctx, {
      type: this.chartData.type,
      data: this.chartData.data,
      options: this.chartData.lineChartOptions
    });

    let chart1 = new Chart(ctx1, {
      type: this.chartDataRecoveries.type,
      data: this.chartDataRecoveries.data,
      options: this.chartDataRecoveries.lineChartOptions
    });

    let chart2 = new Chart(ctx2, {
      type: this.chartDataDeaths.type,
      data: this.chartDataDeaths.data,
      options: this.chartDataDeaths.lineChartOptions
    });

    //Load data on page load.
    this.generateCharts(chart, chart1, chart2);
  }
};
</script>

<style scoped>
#country {
  min-height: 100vh;
  padding-top: 150px;
  background-position: right;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: rgba(255, 255, 255, 0.6);
  background-blend-mode: lighten;
}

.dataSection {
  padding-top: 20px;
  padding-bottom: 20px;
}

.newsSection {
  padding-top: 20px;
}

.charts {
  margin-top: 50px;
  margin-bottom: 50px;
}

.sub {
  padding-top: 20px;
  font-size: 0.7em;
}

.err {
  padding-top: 30px;
  font-size: 1.3em;
}

canvas {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  width: 75%;
  height: 30%;
  color: black;
}

@media screen and (max-width: 1366px) {
  #country {
    background-color: rgba(255, 255, 255, 0.8);
  }
}

@media screen and (max-width: 990px) {
  #country {
    padding-top: 15%;
    background-size: 60%;
    background-color: rgba(255, 255, 255, 0.9);
  }
}

@media screen and (max-width: 710px) {
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
    padding-top: 20%;
    background-size: 100%;
    background-position: right;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .dataSection {
    padding-top: 2%;
    padding-bottom: 2%;
  }
}
</style>
