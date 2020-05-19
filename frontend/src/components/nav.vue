<template>
  <div>
    <nav class="custom-navbar">
      <div class="container">
        <div class="flex-navbar">
          <a href="#" class="brand-logo">VIROLL</a>
          <form class="nav-form">
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
            <div class="flex-navbar">
              <a class="nav-link" href="#">Home</a>
              <a class="nav-link" href="#">Compare</a>
              <a class="nav-link" href="#">Account</a>
            </div>
          </div>
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
.custom-navbar-top {
  padding-top: 1%;
}

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
</style>
