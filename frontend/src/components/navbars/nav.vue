<template>
  <div>
    <nav
      class="custom-navbar fixed-top"
      v-bind:style="{
        paddingBottom: searchBarControls.searchButton ? '1%' : '5%'
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
              />
              <div class="input-group-append">
                <button class="btn" type="submit">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
          <div>
            <div class="flex-navbar" id="menu">
              <a class="nav-link" href="#">Home</a>
              <router-link
                :to="{ name: 'country', params: { name: 'united-kingdom' } }"
                class="nav-link"
                >Country</router-link
              >
              <a class="nav-link" href="#">Account</a>
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
                : 'none !important'
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
              display: searchBarControls.closeS ? 'block ' : 'none'
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
              display: searchBarControls.sBar ? 'block' : 'none'
            }"
          >
            <div class="flex-form">
              <input
                type="text"
                v-model="searchBar.value"
                class="custom-input"
                placeholder="Country"
              />
              <div class="input-group-append">
                <button class="btn" type="submit">
                  <i class="fa fa-search"></i>
                </button>
              </div>
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
        value: ""
      },
      searchBarControls: {
        searchButton: true,
        sBar: false,
        closeS: false
      }
    };
  },
  methods: {
    //Search bar method to find countries
    go() {
      let input = this.formatSearchInput(this.searchBar.value);
      console.log(input);

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

    //Change the
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
    mounted: function() {}
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
