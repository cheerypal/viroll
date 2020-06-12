<template>
  <div>
    <NavBar />
    <div id="compare">
      <div class="container">
        <h1>{{ format(country1.name) }} & {{ format(country2.name) }}</h1>
        <h3>{{ issueName }} Statistics</h3>
        <hr />
        <div v-show="country1.confirmed != ''">
          <div v-show="country2.confirmed != ''">
            <div class="dataSection">
              <h2 class="dataImportant">Yesterday</h2>
              <CompareData
                :countryO="country1.changeData"
                :countryT="country2.changeData"
                :countryOName="format(country1.name)"
                :countryTName="format(country2.name)"
              />
            </div>
            <div class="dataSection">
              <h2 class="dataImportant">Total</h2>
              <CompareData
                :countryO="country1"
                :countryT="country2"
                :countryOName="format(country1.name)"
                :countryTName="format(country2.name)"
              />
            </div>
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
            <hr />
          </div>
        </div>
        <!--Error with finding data chunk-->
        <div v-show="country1.confirmed == ''">
          <div class="dataSection">
            <h2>
              Unfortunately we don't have data for {{ format(country1.name) }}
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
              <br />
              or
              <br />
              visit
              <router-link
                class="nav-links bold-link"
                :to="{ name: 'country', params: { name: country2.name } }"
              >
                {{ format(country2.name) }} </router-link
              >country page.
            </p>
          </div>
        </div>
        <div v-show="country2.confirmed == ''">
          <div class="dataSection">
            <h2>
              Unfortunately we don't have data for {{ format(country2.name) }}
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
              <br />
              or
              <br />
              visit
              <router-link
                class="nav-links bold-link"
                :to="{ name: 'country', params: { name: country1.name } }"
              >
                {{ format(country1.name) }} </router-link
              >country page.
            </p>
          </div>
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
    CompareData
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
          dead: ""
        }
      },
      country2: {
        name: this.$route.params.country2,
        confirmed: "",
        recovered: "",
        dead: "",
        changeData: {
          confirmed: "",
          recovered: "",
          dead: ""
        }
      },
      issueName: "Coronavirus",
      charts: {
        chart: "",
        chart1: "",
        chart2: ""
      },

      form: {
        daily: true,
        increments: 1
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
              data: []
            },
            {
              type: "line",
              label: this.format(this.$route.params.country2) + " Cases",
              fill: true,
              backgroundColor: "rgba(255, 195, 0, 0.2)",
              borderColor: "rgba(255, 195, 0, 1)",
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
              data: []
            },
            {
              type: "line",
              label: this.format(this.$route.params.country2) + " Recoveries",
              fill: true,
              backgroundColor: "rgba(255, 195, 0, 0.2)",
              borderColor: "rgba(255, 195, 0, 1)",
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
              data: []
            },
            {
              type: "line",
              label: this.format(this.$route.params.country2) + " Deaths",
              fill: true,
              backgroundColor: "rgba(255, 195, 0, 0.2)",
              borderColor: "rgba(255, 195, 0, 1)",
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
    //Get all the data for country 1 and store in the state
    getCountry1Data() {
      let url =
        "https://api.covid19api.com/total/country/" + this.country1.name;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
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
        })
        .catch(() => {});
    },

    //Get all the data for country 2 and store in the state
    getCountry2Data() {
      let url =
        "https://api.covid19api.com/total/country/" + this.country2.name;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
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
        })
        .catch(() => {});
    },

    //gets data for the cases chart - country 1
    getChartDataByCountry(chart, increments, daily) {
      let url =
        "https://api.covid19api.com/total/country/" + this.country1.name;
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
            if (i % increments == 0) {
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

          //Get min and max for the graph
          chart.update();
        })
        .catch(err => {
          console.log(err);
        });
    },

    //get chart data for the recoveries chart  - country 1
    getChartDataByCountryRecoveries(chart, increments, daily) {
      let url =
        "https://api.covid19api.com/total/country/" + this.country1.name;
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
            if (i % increments == 0) {
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
        });
    },

    //get chart data for the death chart  - country 1
    getChartDataByCountryDeaths(chart, increments, daily) {
      let url =
        "https://api.covid19api.com/total/country/" + this.country1.name;
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
            if (i % increments == 0) {
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
        });
    },

    //This function will get the data from the second country and place it in the data section to be used for the chart
    getCountry2Cases(chart, increments, daily) {
      let url =
        "https://api.covid19api.com/total/country/" + this.country2.name;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          if (this.chartData.data.datasets[1].data.length > 0) {
            this.chartData.data.datasets[1].data = [];
          }
          let today = jsonData.length - 1;
          for (let i = today; i > 0; i--) {
            if (i % increments == 0) {
              this.chartData.data.datasets[1].data.push(jsonData[i].Confirmed);
            }
          }
          if (daily === true) {
            let size = this.chartData.data.datasets[1].data.length;
            for (let i = 0; i < size; i++) {
              let j = i + 1;
              this.chartData.data.datasets[1].data[i] =
                this.chartData.data.datasets[1].data[i] -
                this.chartData.data.datasets[1].data[j];

              if (this.chartData.data.datasets[1].data[i] < 0) {
                this.chartData.data.datasets[1].data[i] = 0;
              }
            }
          }
          this.chartData.data.datasets[1].data.reverse();
          chart.update();
        })
        .catch(() => {});
    },

    //This function will get the data from the second country and place it in the data section to be used for the chart
    getCountry2Recov(chart, increments, daily) {
      let url =
        "https://api.covid19api.com/total/country/" + this.country2.name;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          if (this.chartDataRecoveries.data.datasets[1].data.length > 0) {
            this.chartDataRecoveries.data.datasets[1].data = [];
          }
          let today = jsonData.length - 1;
          for (let i = today; i > 0; i--) {
            if (i % increments == 0) {
              this.chartDataRecoveries.data.datasets[1].data.push(
                jsonData[i].Recovered
              );
            }
          }
          if (daily === true) {
            let size = this.chartDataRecoveries.data.datasets[1].data.length;
            for (let i = 0; i < size; i++) {
              let j = i + 1;
              this.chartDataRecoveries.data.datasets[1].data[i] =
                this.chartDataRecoveries.data.datasets[1].data[i] -
                this.chartDataRecoveries.data.datasets[1].data[j];

              if (this.chartDataRecoveries.data.datasets[1].data[i] < 0) {
                this.chartDataRecoveries.data.datasets[1].data[i] = 0;
              }
            }
          }
          this.chartDataRecoveries.data.datasets[1].data.reverse();
          chart.update();
        })
        .catch(() => {});
    },

    //This function will get the data from the second country and place it in the data section to be used for the chart
    getCountry2Deaths(chart, increments, daily) {
      let url =
        "https://api.covid19api.com/total/country/" + this.country2.name;
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          if (this.chartDataDeaths.data.datasets[1].data.length > 0) {
            this.chartDataDeaths.data.datasets[1].data = [];
          }
          let today = jsonData.length - 1;
          for (let i = today; i > 0; i--) {
            if (i % increments == 0) {
              this.chartDataDeaths.data.datasets[1].data.push(
                jsonData[i].Deaths
              );
            }
          }
          if (daily === true) {
            let size = this.chartDataDeaths.data.datasets[1].data.length;
            for (let i = 0; i < size; i++) {
              let j = i + 1;
              this.chartDataDeaths.data.datasets[1].data[i] =
                this.chartDataDeaths.data.datasets[1].data[i] -
                this.chartDataDeaths.data.datasets[1].data[j];

              if (this.chartDataDeaths.data.datasets[1].data[i] < 0) {
                this.chartDataDeaths.data.datasets[1].data[i] = 0;
              }
            }
          }
          this.chartDataDeaths.data.datasets[1].data.reverse();
          chart.update();
        })
        .catch(() => {});
    },

    //Function will generate charts and update them with data that was search for
    generateCharts(chart, chart1, chart2, increments, daily) {
      this.getChartDataByCountry(chart, increments, daily);
      this.getCountry2Cases(chart, increments, daily);
      this.getChartDataByCountryRecoveries(chart1, increments, daily);
      this.getCountry2Recov(chart1, increments, daily);
      this.getChartDataByCountryDeaths(chart2, increments, daily);
      this.getCountry2Deaths(chart2, increments, daily);
    },

    //Function is called when the user want to filter the charts
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
    }
  },
  mounted: function() {
    //Get summary data for the countries.
    this.getCountry1Data();
    this.getCountry2Data();

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

    //Generate the charts when the page loads.
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

.countryName-flex {
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.dataImportant {
  color: #1a893c;
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
