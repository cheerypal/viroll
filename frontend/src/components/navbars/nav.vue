<template>
  <div>
    <nav class="custom-navbar fixed-top">
      <div class="container">
        <div class="flex-navbar">
          <a href="#" class="brand-logo">VIROLL</a>
          <form class="nav-form" id="search">
            <div class="flex-form">
              <input type="text" class="custom-input" placeholder="Country" />
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
          <button id="searchBtn" class="btn" type="button">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "navbar",
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
    visibility: visible;
    display: block;
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
