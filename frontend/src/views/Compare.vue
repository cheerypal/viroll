<template>
  <div>
    <NavBar />
    <div id="compare">
      <div class="container">
        <div class="titleSection">
          <h1>Compare Countries</h1>
          <h3>{{ issueName }} Statistics</h3>
        </div>
        <hr />
        <div class="dataSection">
          <h2>Compare any two countries of your liking below*</h2>
          <form class="form-compare" @submit="compareCountries">
            <div>
              <select
                class="custom-select compare-select"
                required="required"
                v-model="form.country1"
              >
                <option disabled value>Country 1</option>
                <option
                  v-for="country in countries"
                  :key="country"
                  :value="formatSearchInput(country)"
                  >{{ country }}</option
                >
              </select>
            </div>
            <div>
              <select
                class="custom-select compare-select"
                required="required"
                v-model="form.country2"
              >
                <option disabled value>Country 2</option>
                <option
                  v-for="country in countries"
                  :key="country"
                  :value="formatSearchInput(country)"
                  >{{ country }}</option
                >
              </select>
            </div>
            <div>
              <button class="custom-button compare-button" type="submit">
                Compare
              </button>
            </div>
          </form>
          <div class="sub">
            <p>*Some Countries will not have any data recorded</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "../components/navbars/nav";

export default {
  name: "Compare",
  components: {
    NavBar
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
    compareCountries() {
      this.$router.push({
        name: "compareCountries",
        params: {
          country1: this.form.country1,
          country2: this.form.country2
        }
      });
    },

    //Function to all the countries stored on the api.
    getAllCountries() {
      let url = "https://api.covid19api.com/countries";
      fetch(url, { method: "GET" })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          for (let i in jsonData) {
            this.countries.push(this.format(jsonData[i].Slug));
          }
          this.countries.sort();
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

    formatSearchInput(text) {
      return text
        .split(" ")
        .join("-")
        .toLowerCase();
    }
  },
  mounted: function() {
    //Function that is called on page load.
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
  padding-top: 50px;
  padding-bottom: 20px;
}

.form-compare {
  width: 30vw;
  margin-top: 30px;
}

.compare-select {
  margin: 5px 0px;
  margin-right: 5px;
}

.compare-button {
  margin: 5px 0px;
  margin-right: 5px;
}

.sub {
  padding-top: 40px;
  font-size: 0.7em;
}

@media screen and (max-width: 990px) {
  #compare {
    padding-top: 15%;
  }
}

@media screen and (max-width: 800px) {
  .form-compare {
    width: 50vw;
  }
}

@media screen and (max-width: 710px) {
  .dataSection {
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
}
</style>
