<template>
  <div>
    <nav id="nav-bot" class="fixed-bottom custom-navbar">
      <div class="container">
        <div class="flex-nav">
          <a class="nav-link" href="#">Home</a>
          <a class="nav-link" href="#">Countries</a>
          <a class="nav-link" href="#">Account</a>
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
}

.nav-link {
  font-size: 1.3em;
  font-family: "Kanit-Reg";
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
