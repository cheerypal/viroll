<template>
  <div>
    <nav
      class="custom-navbar fixed-top"
      v-bind:style="{
        paddingBottom: searchBarControls.searchButton ? '1%' : '5%',
      }"
    >
      <div class="container">
        <div class="flex-navbar">
          <a href="#" class="brand-logo">VIROLL</a>
          <form class="nav-form" id="search" @submit="go">
            <div class="flex-form">
              <input
                type="text"
                v-model="searchBar.value"
                class="custom-input"
                placeholder="Country"
                v-on:keyup="countryComplete"
              />
              <div class="input-group-append">
                <button class="btn" type="submit">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div v-show="autoComplete.length != 0">
              <ul class="searchList">
                <li
                  class="searchItem"
                  v-for="country in autoComplete"
                  :key="country"
                  @click="selectCountry(country)"
                >
                  {{ format(country) }}
                </li>
              </ul>
            </div>
          </form>
          <div>
            <div class="flex-navbar" id="menu">
              <router-link :to="{ name: 'home' }" class="nav-link">
                Home
              </router-link>
              <router-link :to="{ name: 'allCountries' }" class="nav-link">
                Country
              </router-link>
              <router-link :to="{ name: 'compare' }" class="nav-link">
                Compare
              </router-link>
            </div>
          </div>
          <button
            id="searchBtn"
            class="btn"
            type="button"
            @click="searchBarMobile"
            v-bind:style="{
              visibility: searchBarControls.searchButton
                ? 'visible'
                : 'hidden ',
              display: searchBarControls.searchButton
                ? 'block !important'
                : 'none !important',
            }"
          >
            <i class="fa fa-search"></i>
          </button>
          <button
            id="closeSearch"
            class="btn"
            type="button"
            @click="searchBarMobile"
            v-bind:style="{
              visibility: searchBarControls.closeS ? 'visible' : 'hidden',
              display: searchBarControls.closeS ? 'block ' : 'none',
            }"
          >
            <i class="fa fa-times"></i>
          </button>
          <form
            class="nav-form"
            id="sMobile"
            @submit="go"
            v-bind:style="{
              visibility: searchBarControls.sBar ? 'visible' : 'hidden',
              display: searchBarControls.sBar ? 'block' : 'none',
            }"
          >
            <div class="flex-form">
              <input
                type="text"
                v-model="searchBar.value"
                class="custom-input"
                placeholder="Country"
                v-on:keyup="countryComplete"
              />
              <div class="input-group-append">
                <button class="btn" type="submit">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div v-show="autoComplete.length != 0">
              <ul class="searchList">
                <li
                  class="searchItem"
                  v-for="country in autoComplete"
                  :key="country"
                  @click="selectCountry(country)"
                >
                  {{ format(country) }}
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      searchBar: {
        value: "",
      },
      searchBarControls: {
        searchButton: true,
        sBar: false,
        closeS: false,
      },
      countries: [],
      autoComplete: [],
    };
  },
  methods: {
    //Search bar method to find countries
    go() {
      let input = this.getCountryNameAbriev(
        this.formatSearchInput(this.searchBar.value)
      );
      this.$router.push({
        name: "country",
        params: { name: input },
      });
    },

    //Format the input from the search bar so that the API can read and get data for the search result.
    formatSearchInput(text) {
      return text
        .split(" ")
        .join("-")
        .toLowerCase();
    },

    //Change the search bar for mobile devices.
    searchBarMobile() {
      if (this.searchBarControls.searchButton === true) {
        this.searchBarControls.searchButton = false;
        this.searchBarControls.sBar = true;
        this.searchBarControls.closeS = true;
      } else {
        this.searchBarControls.searchButton = true;
        this.searchBarControls.sBar = false;
        this.searchBarControls.closeS = false;
      }
    },

    //Slang words for countries function
    getCountryNameAbriev(country) {
      switch (country) {
        case "uk":
          return "united-kingdom";
        case "britain":
          return "united-kingdom";
        case "scotland":
          return "united-kingdom";
        case "england":
          return "united-kingdom";
        case "wales":
          return "united-kingdom";
        case "northern-ireland":
          return "united-kingdom";
        case "america":
          return "united-states";
        case "usa":
          return "united-states";
        case "us":
          return "united-states";
        case "uae":
          return "united-arab-emirates";
        default:
          return country;
      }
    },

    //getAllCountries
    getAllCountries() {
      let url = "https://api.covid19api.com/countries";
      fetch(url, { method: "GET" })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          for (let i in jsonData) {
            this.countries.push(jsonData[i].Country.toLowerCase());
          }
          this.countries.sort();
        })
        .catch(() => {});
    },

    //Autocomplete for all the Countries with available data
    countryComplete() {
      let input = this.searchBar.value.toLowerCase();
      this.autoComplete = [];
      if (input == "") {
        return;
      }
      for (let i in this.countries) {
        if (this.countries[i].startsWith(input)) {
          this.autoComplete.push(this.countries[i]);
          if (this.autoComplete.length >= 10) {
            break;
          }
        }
      }
    },

    //When you click a country it will take you to the countries data page showing stats
    selectCountry(country) {
      this.searchBar.value = this.format(country);
      this.go();
      location.reload();
    },

    //Formatters
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
    this.getAllCountries();
  },
};
</script>
<style scoped>
.brand-logo {
  font-size: 2.2em;
  font-family: "Kanit-Black";
  color: black;
  padding-right: 4%;
}

.brand-logo:hover {
  color: black;
  cursor: pointer;
  text-decoration: none;
}

.custom-navbar {
  padding-top: 1%;
  border: none;
  background-color: white;
}

.flex-form {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.custom-input {
  flex: 2;
  border: none;
}

.custom-button {
  width: 20%;
}

.flex-navbar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap;
  justify-content: space-between;
  text-align: center;
  align-items: baseline;
}

.nav-form {
  width: 50%;
  padding-left: 10px;
  padding-right: 10px;
  border: 2px solid black;
}

.nav-link {
  color: black;
  text-align: center;
  font-size: 1.4em;
}

#search {
  visibility: visible;
}

#searchBtn {
  visibility: hidden !important;
  display: none !important;
}

#sMobile {
  visibility: hidden;
  display: none;
}

#closeSearch {
  visibility: hidden;
  display: none;
}

.searchList {
  text-align: left;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.searchItem {
  padding: 5px;
  font-family: "Roboto-Black";
  font-size: 1.2em;
}

.searchItem:hover {
  cursor: pointer;
  background-color: #e7e7e7;
}

.fa {
  font-size: 1.3em;
}

@media screen and (max-width: 1200px) {
  .nav-form {
    width: 30%;
  }
}

@media screen and (max-width: 1000px) {
  .brand-logo {
    padding-right: 0;
  }
}

@media screen and (max-width: 992px) {
  #search {
    visibility: hidden;
    display: none;
  }
  #searchBtn {
    visibility: visible !important;
    display: block !important;
  }

  #sMobile {
    visibility: hidden;
    display: block;
  }
  #closeSearch {
    visibility: hidden;
  }

  .nav-form {
    width: 100%;
  }
  .container {
    min-margin: 1%;
  }
}

@media screen and (max-width: 700px) {
  #menu {
    display: none;
  }

  .fa {
    font-size: 1.7em;
    font-weight: bold;
  }
}
</style>
