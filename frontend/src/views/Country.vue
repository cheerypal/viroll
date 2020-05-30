<template>
  <div>
    <NavBar />
    <div
      id="country"
      :style="{
        backgroundImage:
          'url(' +
          require('../assets/country-sil/' + countryName + '.gif') +
          ')',
      }"
    >
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
            :cases="countryData.currentInfected"
            :recovered="countryData.recovered"
            :deaths="countryData.totalDeaths"
          />
          <div class="text-right sub">
            <p></p>
            <p>
              * Represents the change in data from yesterday and today<br />
              ** Active Cases - people currently infected
            </p>
          </div>
        </div>
        <div class="dataSection">
          <h2>Active Cases - last 10 days</h2>
          <canvas id="chart" class="charts" />
        </div>
        <hr />
        <div class="newsSection">
          <h1>News</h1>
          <h3>Today</h3>
        </div>
        <hr />
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

//chart.js

import Chart from "chart.js";

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
      backgroundImage:
        "../assets/country-sil/" + this.$route.params.name + ".png",

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

              data: [],
            },
          ],
        },
        lineChartOptions: {
          legend: {
            position: "bottom",
          },
          responsive: true,
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
                ticks: {},
              },
            ],
          },
        },
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

    //Get data for the chart for the past 10 days.
    getChartDataByCountry(chart) {
      let url = "http://api.covid19api.com/total/country/" + this.countryName;
      fetch(url, { method: "GET" })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          let today = jsonData.length - 1;
          let cap = today - 10;
          for (let i = today; i > cap; i--) {
            this.chartData.data.labels.push(
              this.dateFormatter(jsonData[i].Date)
            );
            this.chartData.data.datasets[0].data.push(jsonData[i].Active);
          }
          this.chartData.data.labels.reverse();
          this.chartData.data.datasets[0].data.reverse();

          chart.update();
          //Get min and max for the graph
          console.log(this.chartData.data.datasets[0].data);
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
    generateChart(chart) {
      this.getChartDataByCountry(chart);
    },
  },
  mounted: function() {
    this.getAllDataFromCountry();
    const ctx = document.getElementById("chart").getContext("2d");
    let chart = new Chart(ctx, {
      type: this.chartData.type,
      data: this.chartData.data,
      options: this.chartData.lineChartOptions,
    });
    //Load data on page load.
    this.generateChart(chart);
  },
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

.custom-container {
  padding-right: 10%;
}

.titleSection {
  padding-bottom: 20px;
}

.dataSection {
  padding-top: 20px;
  padding-bottom: 20px;
}

.newsSection {
  padding-top: 20px;
  padding-bottom: 20px;
}

.charts {
  margin-top: 50px;
  margin-bottom: 50px;
}

.sub {
  padding-top: 20px;
  font-size: 0.7em;
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
  .custom-container {
    padding-right: 4%;
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

  .custom-container {
    padding-right: 4%;
  }

  .dataSection {
    padding-top: 2%;
    padding-bottom: 2%;
  }
}
</style>
