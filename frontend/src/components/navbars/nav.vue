<template>
  <div>
    <nav
      class="custom-navbar fixed-top"
      v-bind:style="{
        backgroundColor: cookie ? 'black' : 'white',
        color: cookie ? 'white' : 'black'
      }"
    >
      <div class="container">
        <div class="flex-navbar">
          <router-link
            :to="{ name: 'home' }"
            class="brand-logo"
            v-bind:style="{
              color: cookie ? 'white' : 'black'
            }"
          >
            VIROLL
          </router-link>
          <form
            class="nav-form"
            id="search"
            @submit="go"
            v-bind:style="{
              backgroundColor: cookie ? 'rgba(14, 14, 14, 0.9)' : 'white',
              color: cookie ? 'white' : 'black',
              borderColor: cookie ? '#8E8E8E' : 'black'
            }"
          >
            <div class="flex-form">
              <input
                type="text"
                v-model="searchBar.value"
                class="custom-input"
                placeholder="Country"
                v-on:keyup="countryComplete"
                v-bind:style="{
                  backgroundColor: cookie ? 'rgba(14, 14, 14, 0.9)' : 'white',
                  color: cookie ? 'white' : 'black'
                }"
              />
              <div class="input-group-append">
                <button class="btn" type="submit">
                  <i
                    class="fa fa-search"
                    v-bind:style="{
                      color: cookie ? 'white' : 'black'
                    }"
                  ></i>
                </button>
              </div>
            </div>
            <div v-show="autoComplete.length != 0">
              <ul
                class="searchList"
                v-bind:style="{
                  backgroundColor: cookie ? 'rgba(14, 14, 14, 0.9)' : 'white',
                  color: cookie ? 'white' : 'black'
                }"
              >
                <li
                  class="searchItem"
                  v-for="country in autoComplete"
                  :key="country"
                  @click="selectCountry(country)"
                  v-bind:style="{
                    backgroundColor: cookie ? 'rgba(14, 14, 14, 0.9)' : 'white',
                    color: cookie ? 'white' : 'black'
                  }"
                >
                  {{ format(country) }}
                </li>
              </ul>
            </div>
          </form>
          <div id="dropMenu " @click="showNav">
            <i class="button fa fa-bars"></i>
          </div>
        </div>
      </div>
      <transition name="fade">
        <ul
          v-if="clicked"
          class="custom-nav-mobile fixed-top"
          v-bind:style="{
            backgroundColor: cookie
              ? 'rgba(14, 14, 14, 0.9)'
              : 'rgba(255, 255, 255, 0.9)',
            color: cookie ? 'white' : 'black'
          }"
        >
          <router-link
            :to="{ name: 'home' }"
            class="nav-link-logo nav-link"
            v-bind:style="{
              color: cookie ? 'white' : 'black'
            }"
          >
            VIROLL
          </router-link>
          <li>
            <form
              class="nav-form"
              id="searchMobile"
              @submit="go"
              v-bind:style="{
                backgroundColor: cookie ? 'rgba(14, 14, 14, 0.9)' : 'white',
                color: cookie ? 'white' : 'black',
                borderColor: cookie ? '#8E8E8E' : 'black'
              }"
            >
              <div class="flex-form">
                <input
                  type="text"
                  v-model="searchBar.value"
                  class="custom-input"
                  placeholder="Country"
                  v-on:keyup="countryComplete"
                  v-bind:style="{
                    backgroundColor: cookie ? 'rgba(14, 14, 14, 0.9)' : 'white',
                    color: cookie ? 'white' : 'black'
                  }"
                />
                <div class="input-group-append">
                  <button class="btn" type="submit">
                    <i
                      class="fa fa-search"
                      v-bind:style="{
                        color: cookie ? 'white' : 'black'
                      }"
                    ></i>
                  </button>
                </div>
              </div>
              <div v-show="autoComplete.length != 0">
                <ul
                  class="searchList"
                  v-bind:style="{
                    backgroundColor: cookie ? 'rgba(14, 14, 14, 0.9)' : 'white',
                    color: cookie ? 'white' : 'black'
                  }"
                >
                  <li
                    class="searchItem"
                    v-for="country in autoComplete"
                    :key="country"
                    @click="selectCountry(country)"
                    v-bind:style="{
                      backgroundColor: cookie
                        ? 'rgba(14, 14, 14, 0.9)'
                        : 'white',
                      color: cookie ? 'white' : 'black'
                    }"
                  >
                    {{ format(country) }}
                  </li>
                </ul>
              </div>
            </form>
          </li>
          <li>
            <router-link
              v-bind:style="{
                color: cookie ? 'white' : 'black'
              }"
              :to="{ name: 'home' }"
              class="nav-link"
            >
              Countries
            </router-link>
          </li>
          <li>
            <router-link
              v-bind:style="{
                color: cookie ? 'white' : 'black'
              }"
              :to="{ name: 'compare' }"
              class="nav-link"
            >
              Compare
            </router-link>
          </li>
          <li>
            <router-link
              v-bind:style="{
                color: cookie ? 'white' : 'black'
              }"
              :to="{ name: 'about' }"
              class="nav-link"
            >
              About
            </router-link>
          </li>
          <li @click="showNav">
            <i
              class="nav-link closeBut fa fa-times"
              v-bind:style="{
                color: cookie ? 'white' : 'black'
              }"
            ></i>
          </li>
        </ul>
      </transition>
    </nav>
  </div>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      searchBar: {
        value: ""
      },
      clicked: false,
      countries: [],
      autoComplete: [],
      cookie: ""
    };
  },
  methods: {
    //Function to open and close the navigation bar
    showNav() {
      if (this.clicked === false) {
        this.clicked = true;
      } else {
        this.clicked = false;
      }
    },

    //Search bar method to find countries
    go() {
      let input = this.getCountryNameAbriev(
        this.formatSearchInput(this.searchBar.value)
      );
      this.$router.push({
        name: "country",
        params: { name: input }
      });
    },

    //Format the input from the search bar so that the API can read and get data for the search result.
    formatSearchInput(text) {
      return text
        .split(" ")
        .join("-")
        .toLowerCase();
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
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          for (let i in jsonData) {
            this.countries.push(jsonData[i].Slug.toLowerCase());
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
          if (this.autoComplete.length >= 8) {
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

    checkCookie() {
      if (this.$cookies.get("dark-mode") === null) {
        this.cookie = false;
      } else {
        this.cookie = true;
      }
    }
  },
  mounted: function() {
    this.getAllCountries();
    this.checkCookie();
  }
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
  background-color: rgba(255, 255, 255, 1);
  padding-bottom: 1%;
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
  font-family: "Roboto-Reg";
  font-size: 1em;
  background-color: white;
}

.nav-link {
  color: black;
  padding: 10px;
  text-align: center;
  font-size: 1.4em;
  transition: all 0.1s ease-in-out;
  animation: fadeIn 1s 1 ease-in-out;
}

.nav-link:hover {
  color: black;
  text-align: center;
  font-size: 1.7em;
}

.nav-link-logo {
  font-family: "Kanit-Black";
  margin-bottom: 50px;
  font-size: 1.8em;
}

.nav-link-logo:hover {
  font-size: 2em;
}

.searchList {
  text-align: left;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: white;
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

.button {
  font-size: 2.2em;
  padding: 10px 20px;
}

.button:hover {
  cursor: pointer;
}

#dropMenu {
  margin: 10px;
}

#searchMobile {
  display: none;
}

.closeBut {
  padding-top: 50px;
  padding-bottom: 20px;
}

.closeBut:hover {
  cursor: pointer;
}

.custom-nav-mobile {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: black;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin: 0;
  padding: 0;
  padding-bottom: 100px;
  list-style: none;
  text-align: center;
  font-family: "Roboto-Black";
  font-size: 1.5em;
  transition: all 1s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media screen and (max-width: 1200px) {
  .nav-form {
    width: 50%;
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

  .nav-link-logo {
    margin-bottom: 10px;
  }

  #searchMobile {
    visibility: visible;
    display: block;
    transition: all 0.1s ease-in-out;
    animation: fadeIn 1s 1 ease-in-out;
  }

  .searchItem {
    font-size: 1em;
  }
  .nav-form {
    width: 100%;
  }

  .closeBut {
    padding: 10px;
  }
}

@media screen and (max-width: 700px) {
  .fa {
    font-size: 1.7em;
    font-weight: bold;
  }
}
</style>
