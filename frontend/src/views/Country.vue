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
            <Summary
              title="Yesterday"
              :infected="countryChange.currentInfected"
              :recovered="countryChange.recovered"
              :deaths="countryChange.totalDeaths"
            />
          </div>
          <div class="dataSection">
            <Summary
              title="Total"
              :infected="countryData.currentInfected"
              :recovered="countryData.recovered"
              :deaths="countryData.totalDeaths"
            />
          </div>
          <hr />
          <div class="compareSection">
            <div class="flex-form">
              <div class="form-title">
                <h3>Compare {{ format(countryName) }} with:</h3>
              </div>
              <form class="custom-form-filter form-inline" @submit="compare">
                <div>
                  <select
                    class="form-control custom-select"
                    v-model="cForm.country2"
                  >
                    <option disabled value>Country</option>
                    <option
                      v-for="country in countries"
                      :key="country"
                      :value="country"
                    >
                      {{ format(country) }}
                    </option>
                  </select>
                </div>
                <div>
                  <button class="custom-button" type="submit">Compare</button>
                </div>
              </form>
            </div>
          </div>
          <hr />
          <div class="chartSection">
            <h1>Charts</h1>
            <div class="flex-form">
              <div class="form-title">
                <h3>Filter Charts</h3>
              </div>
              <form
                class="custom-form-filter form-inline"
                @submit="updateCharts"
              >
                <div>
                  <select
                    class="form-control custom-select"
                    v-model="form.daily"
                  >
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
        </div>

        <!--Error with finding data chunk-->
        <div v-show="countryData.currentInfected == ''">
          <div class="dataSection">
            <h2>
              Unfortunately we don't have data for {{ format(countryName) }}
            </h2>
            <p class="err">
              Please visit the
              <router-link class="nav-links bold-link" :to="{ name: 'home' }">
                countries
              </router-link>
              page for the full list of
              <router-link class="nav-links bold-link" :to="{ name: 'home' }">
                countries
              </router-link>
              <br />
              or
              <br />
              search for another country using the search bar
            </p>
          </div>
        </div>
      </div>
    </div>
    <CustomFooter />
  </div>
</template>
<script>
//Navbars
import NavBar from "../components/navbars/nav";
import CustomFooter from "../components/navbars/custom-footer";
//data components
import Summary from "../components/data-templates/summary.vue";

//chart.js
import Chart from "chart.js";

export default {
  name: "countryPage",
  components: {
    NavBar,
    Summary,
    CustomFooter
  },
  data() {
    return {
      //Main data stored.
      countryName: this.$route.params.name,
      issueName: "Coronavirus",

      //Data for the country
      countryData: {
        currentInfected: "",
        totalInfected: "",
        totalDeaths: "",
        recovered: ""
      },

      //Data for the country that changed between yesterday and today
      countryChange: {
        currentInfected: "",
        totalDeaths: "",
        recovered: ""
      },

      //chart data objects for the charts that are on this page.
      charts: {
        chart: "",
        chart1: "",
        chart2: ""
      },

      //Form data objects that hold the default data for the form. This data controls what the graph looks like from load and from the filter button is clicked
      form: {
        daily: true,
        increments: 1
      },

      //compare form data objects
      cForm: {
        country1: this.$route.params.name,
        country2: ""
      },

      countries: [],

      //chart data for confirmed Cases and its own chart characteristics
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
          maintainAspectRatio: false,
          hover: {
            mode: "nearest",
            intersect: true
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
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
          tooltips: {
            mode: "index",
            intersect: false
          },
          maintainAspectRatio: false,
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

      //this is the dataset for the death chart
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
          tooltips: {
            mode: "index",
            intersect: false
          },
          maintainAspectRatio: false,
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

    //get all other countries that are available for the
    getAllOtherCountries() {
      let url = "https://api.covid19api.com/countries";
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          for (let i in jsonData) {
            if (jsonData[i].Slug === this.cForm.country1) {
              continue;
            }
            this.countries.push(jsonData[i].Slug);
          }
          this.countries.sort();
        });
    },

    //compare form submit function
    compare() {
      this.$router.push({
        name: "compareCountries",
        params: {
          country1: this.cForm.country1,
          country2: this.cForm.country2
        }
      });
    },

    //Get data for the confirmed cases chart
    getChartDataByCountry(chart, increments, daily) {
      let url = "https://api.covid19api.com/total/country/" + this.countryName;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          //checks to make sure that if the there is already data available then it will delete all the current data before adding new data to the chart
          if (this.chartData.data.datasets[0].data.length > 0) {
            this.chartData.data.labels = [];
            this.chartData.data.datasets[0].data = [];
          }

          //gets todays index in the jsonArray and places it in the chart data
          let today = jsonData.length - 1;

          //This is the standard loop to get all the data for the country that is being queried
          //Increments will take a value given by the user to increment so many days and store the value for that day
          for (let i = today; i > 0; i--) {
            if (i % increments == 0 || i === today) {
              this.chartData.data.labels.push(
                this.dateFormatter(jsonData[i].Date)
              );
              this.chartData.data.datasets[0].data.push(jsonData[i].Confirmed);
            }
          }

          //This is code that is run to get the daily increase and decrease for the given stat
          if (daily === true) {
            let size = this.chartData.data.datasets[0].data.length;
            for (let i = 0; i < size; i++) {
              let j = i + 1;
              this.chartData.data.datasets[0].data[i] =
                this.chartData.data.datasets[0].data[i] -
                this.chartData.data.datasets[0].data[j];

              //If the value is a value that is below 0 then the value will be replaced by 0.
              if (this.chartData.data.datasets[0].data[i] < 0) {
                this.chartData.data.datasets[0].data[i] = 0;
              }
            }
          }

          //This will reverse the data so that it is past to present on the graph
          this.chartData.data.labels.reverse();
          this.chartData.data.datasets[0].data.reverse();

          chart.update();
          //Get min and max for the graph
        })
        .catch(err => {
          console.log(err);
          this.checkIfCountryExists();
        });
    },

    //get chart data for the recoveries chart
    getChartDataByCountryRecoveries(chart, increments, daily) {
      let url = "https://api.covid19api.com/total/country/" + this.countryName;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          //checks to make sure that if the there is already data available then it will delete all the current data before adding new data to the chart
          if (this.chartDataRecoveries.data.datasets[0].data.length > 0) {
            this.chartDataRecoveries.data.labels = [];
            this.chartDataRecoveries.data.datasets[0].data = [];
          }
          //gets todays index in the jsonArray and places it in the chart data
          let today = jsonData.length - 1;

          //This is the standard loop to get all the data for the country that is being queried
          //Increments will take a value given by the user to increment so many days and store the value for that day
          for (let i = today; i > 0; i--) {
            if (i % increments == 0 || i === today) {
              this.chartDataRecoveries.data.labels.push(
                this.dateFormatter(jsonData[i].Date)
              );
              this.chartDataRecoveries.data.datasets[0].data.push(
                jsonData[i].Recovered
              );
            }
          }

          //This is code that is run to get the daily increase and decrease for the given stat
          if (daily === true) {
            let size = this.chartDataRecoveries.data.datasets[0].data.length;
            for (let i = 0; i < size; i++) {
              let j = i + 1;
              this.chartDataRecoveries.data.datasets[0].data[i] =
                this.chartDataRecoveries.data.datasets[0].data[i] -
                this.chartDataRecoveries.data.datasets[0].data[j];

              if (this.chartDataRecoveries.data.datasets[0].data[i] < 0) {
                this.chartDataRecoveries.data.datasets[0].data[i] = 0;
              }
            }
          }

          //This will reverse the data so that it is past to present on the graph
          this.chartDataRecoveries.data.labels.reverse();
          this.chartDataRecoveries.data.datasets[0].data.reverse();

          chart.update();
        })
        .catch(err => {
          console.log(err);
          this.checkIfCountryExists();
        });
    },

    //get chart data for the death chart
    getChartDataByCountryDeaths(chart, increments, daily) {
      let url = "https://api.covid19api.com/total/country/" + this.countryName;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          //checks to make sure that if the there is already data available then it will delete all the current data before adding new data to the chart
          if (this.chartDataDeaths.data.datasets[0].data.length > 0) {
            this.chartDataDeaths.data.labels = [];
            this.chartDataDeaths.data.datasets[0].data = [];
          }

          //gets todays index in the jsonArray and places it in the chart data
          let today = jsonData.length - 1;

          //This is the standard loop to get all the data for the country that is being queried
          //Increments will take a value given by the user to increment so many days and store the value for that day
          for (let i = today; i > 0; i--) {
            if (i % increments == 0 || i === today) {
              this.chartDataDeaths.data.labels.push(
                this.dateFormatter(jsonData[i].Date)
              );
              this.chartDataDeaths.data.datasets[0].data.push(
                jsonData[i].Deaths
              );
            }
          }

          //This will reverse the data so that it is past to present on the graph
          if (daily === true) {
            let size = this.chartDataDeaths.data.datasets[0].data.length;
            for (let i = 0; i < size; i++) {
              let j = i + 1;
              this.chartDataDeaths.data.datasets[0].data[i] =
                this.chartDataDeaths.data.datasets[0].data[i] -
                this.chartDataDeaths.data.datasets[0].data[j];

              if (this.chartDataDeaths.data.datasets[0].data[i] < 0) {
                this.chartDataDeaths.data.datasets[0].data[i] = 0;
              }
            }
          }

          //This will reverse the data so that it is past to present on the graph
          this.chartDataDeaths.data.labels.reverse();
          this.chartDataDeaths.data.datasets[0].data.reverse();

          chart.update();
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
    generateCharts(chart, chart1, chart2, increments, daily) {
      this.getChartDataByCountry(chart, increments, daily);
      this.getChartDataByCountryRecoveries(chart1, increments, daily);
      this.getChartDataByCountryDeaths(chart2, increments, daily);
    },

    //This function is called when the filter form is submitted. This will update the graphs depending on the data that was given in the form.
    updateCharts(evt) {
      this.generateCharts(
        this.charts.chart,
        this.charts.chart1,
        this.charts.chart2,
        this.form.increments,
        this.form.daily
      );
      evt.preventDefault();
    },

    /*
    This function may get used later on when the country page eventually uses images.

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
    this.getAllOtherCountries();

    //Set up variables for the charts
    const ctx = document.getElementById("chart").getContext("2d");
    const ctx1 = document.getElementById("chartRecoveries").getContext("2d");
    const ctx2 = document.getElementById("chartDeaths").getContext("2d");

    //Load the chart data variables with data and options and load to canvases
    this.charts.chart = new Chart(ctx, {
      type: this.chartData.type,
      data: this.chartData.data,
      options: this.chartData.lineChartOptions
    });

    this.charts.chart1 = new Chart(ctx1, {
      type: this.chartDataRecoveries.type,
      data: this.chartDataRecoveries.data,
      options: this.chartDataRecoveries.lineChartOptions
    });

    this.charts.chart2 = new Chart(ctx2, {
      type: this.chartDataDeaths.type,
      data: this.chartDataDeaths.data,
      options: this.chartDataDeaths.lineChartOptions
    });

    //Load data on page load.
    this.generateCharts(
      this.charts.chart,
      this.charts.chart1,
      this.charts.chart2,
      this.form.increments,
      this.form.daily
    );
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
  padding-bottom: 50px;
}

.dataSection {
  padding-top: 20px;
  padding-bottom: 20px;
}

.compareSection {
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

.dataImportant {
  color: #1a893c;
}

.custom-form-filter {
  margin-bottom: 10px;
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

@media screen and (max-width: 812px) {
  .chart-container {
    height: 80vh;
  }
}

@media screen and (max-width: 710px) {
  .chartSection {
    padding-top: 30px;
  }

  .compareSection {
    padding-top: 10%;
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

  .compareSection {
    padding-top: 2%;
    padding-bottom: 2%;
  }

  .chart-container {
    height: 50vh;
  }
}
</style>
