<template>
  <div>
    <nav id="nav-bot" class="fixed-bottom custom-navbar">
      <div class="container">
        <div class="flex-nav">
          <router-link :to="{ name: 'home' }" class="nav-link" href="#">
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
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavBot",
};
</script>
<style scoped>
#nav-bot {
  display: none;
}

.custom-navbar {
  padding-top: 2%;
  padding-bottom: 3%;
  background-color: white;
}

.nav-link {
  font-size: 1.3em;
  font-family: "Roboto-Reg";
}

.flex-nav {
  display: flex;
  flex-wrap: wrap;
  flex-flow: row wrap;
  flex-direction: row;
  justify-content: space-between;
}

@media screen and (max-width: 700px) {
  #nav-bot {
    display: block;
  }
}

@media screen and (max-width: 330px) {
  .nav-link {
    font-size: 1.1em;
  }
}
</style>
