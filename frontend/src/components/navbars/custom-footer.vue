<template>
  <div>
    <div
      id="custom-footer"
      v-bind:style="{
        backgroundColor: cookie ? 'black' : 'white',
        color: cookie ? 'white' : 'black'
      }"
    >
      <div class="container">
        <div class="flex-foot">
          <router-link
            :to="{ name: 'about' }"
            class="spacer dataItem"
            v-bind:style="{
              color: cookie ? 'white' : 'black'
            }"
          >
            About
          </router-link>
          <a
            class="spacer dataItem"
            href="https://github.com/cheerypal/viroll"
            v-bind:style="{
              color: cookie ? 'white' : 'black'
            }"
          >
            Github
          </a>
        </div>
        <div class="text-center">
          <p class="dataItem">Darkmode</p>
          <p>
            <label class="switch">
              <input
                type="checkbox"
                v-model="form.checked"
                @input="darkMode"
                value="true"
              />
              <span class="slider round"></span>
            </label>
          </p>
        </div>
        <div class="text-center">
          Data recorded up to: {{ dateFormatter(updatedAt) }} -
          {{ timeFormatter(updatedAt) }}am
          <br />
          <br />
        </div>
        <div class="text-center">
          Data was fetched from
          <a
            v-bind:style="{
              color: cookie ? 'white' : 'black'
            }"
            class="dataItem"
            href="https://covid19api.com/"
            >COVID19API</a
          >.
          <br />
          An API created by
          <a
            v-bind:style="{
              color: cookie ? 'white' : 'black'
            }"
            class="dataItem"
            href="https://ksred.me/"
            >Kyle Redelinghuys</a
          >
          who sourced the data from
          <a
            v-bind:style="{
              color: cookie ? 'white' : 'black'
            }"
            class="dataItem"
            href="https://github.com/CSSEGISandData/COVID-19"
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
      form: {
        checked: this.$cookies.get("dark-mode")
      },
      cookie: ""
    };
  },
  methods: {
    async darkMode() {
      await this.$nextTick();
      if (this.form.checked === null) {
        this.$cookies.remove("dark-mode");
        this.$cookies.set("dark-mode", true);
      } else {
        this.$cookies.remove("dark-mode");
        this.$cookies.set("dark-mode", "");
      }
      location.reload();
    },

    checkCookie() {
      if (this.$cookies.get("dark-mode") === null) {
        this.cookie = false;
      } else {
        this.cookie = true;
      }
    },

    //get update time from api
    getTimeUpdated() {
      let url = "https://api.covid19api.com/total/country/united-kingdom";
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
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
    }
  },
  mounted: function() {
    this.getTimeUpdated();
    this.checkCookie();
  }
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

.switch {
  position: relative;
  display: inline-block;
  margin-top: 0px;
  margin-bottom: 10px;
  width: 50px;
  height: 23px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #bb20ff;
}

input:focus + .slider {
  box-shadow: 0 0 1px #bb20ff;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 40px;
}

.slider.round:before {
  border-radius: 50%;
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
