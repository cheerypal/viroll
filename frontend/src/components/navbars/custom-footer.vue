<template>
  <div>
    <div id="custom-footer">
      <div class="container">
        <hr />
        <div class="flex-foot">
          <router-link :to="{ name: 'about' }" class="spacer dataItem">
            About
          </router-link>
          <a class="spacer dataItem" href="https://github.com/cheerypal/viroll">
            Github
          </a>
        </div>
        <div class="text-center">
          Data updated on {{ dateFormatter(updatedAt) }} at
          {{ timeFormatter(updatedAt) }}am
          <br />
          <br />
        </div>
        <div class="text-center">
          Data was fetched from
          <a class="dataItem" href="https://covid19api.com/">COVID19API</a>.
          <br />
          An API created by
          <a class="dataItem" href="https://ksred.me/">Kyle Redelinghuys</a> who
          sourced the data from
          <a class="dataItem" href="https://github.com/CSSEGISandData/COVID-19"
            >Johns Hopkins CSSE</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "customFooter",
  data() {
    return {
      updatedAt: "",
    };
  },
  methods: {
    //get update time from api
    getTimeUpdated() {
      let url = "https://api.covid19api.com/total/country/united-kingdom";
      fetch(url, { method: "GET" })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          this.updatedAt = jsonData[jsonData.length - 1].Date;
        });
    },

    //formatting methods
    //date format to dd/mm/yyyy
    dateFormatter(date) {
      date = date.replace("T", " ");
      date = date.substring(0, 10);
      date = date.replace(/(\b-(?!\s))/g, " ");
      let year = date.substring(0, 4);
      let month = date.substring(5, 7);
      let day = date.substring(8, 10);
      return day + "/" + month + "/" + year;
    },

    //time format to get time from time stamp string
    timeFormatter(time) {
      time = time.substring(11, 16);
      return time;
    },
  },
  mounted: function() {
    this.getTimeUpdated();
  },
};
</script>
<style scoped>
#custom-footer {
  padding-bottom: 70px;
}

.flex-foot {
  font-size: 1.3em;
  min-height: 10vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}

.dataItem {
  font-family: "Roboto-Black";
}

.fa {
  font-size: 1.5em;
}

.spacer {
  text-align: center;
  width: 20%;
}

@media screen and (max-width: 770px) {
  .spacer {
    width: 30%;
  }
}

@media screen and (max-width: 500px) {
  .spacer {
    padding-bottom: 10px;
    width: 50%;
  }
}
</style>
