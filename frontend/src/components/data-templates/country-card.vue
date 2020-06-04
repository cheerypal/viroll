<template>
  <div class="card-container">
    <router-link
      class="custom-link"
      :to="{ name: 'country', params: { name: countryName } }"
    >
      <div class="custom-card">
        <h4 class="custom-card-heading">{{ format(countryName) }}</h4>
        <p class="custom-card-subheading">
          <span class="cases">{{ formatNums(cases) }}</span> cases
        </p>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "country-card",
  props: ["countryName", "cases"],
  methods: {
    remover(text) {
      return text.replace(/-/g, " ");
    },
    format(text) {
      let country = text.replace(/(\b[a-z](?!\s))/g, function(x) {
        return x.toUpperCase();
      });

      return this.remover(country);
    },
    formatNums(number) {
      return number.toLocaleString();
    },
  },
};
</script>
<style scoped>
.card-container {
  transition: all 0.2s ease-in-out;
  width: 30%;
}

.custom-card {
  padding: 30px;
  margin-bottom: 20px;
  border: solid 3px #000;
  text-align: center;
  background-position: right;
  background-repeat: no-repeat;
  background-size: 40%;
  background-color: rgba(255, 255, 255, 0.2);
  background-blend-mode: lighten;
  transition: all 0.2s ease-in-out;
}

.custom-link {
  font-family: "Roboto-Black";
}

.cases {
  color: #1a893c;
  font-family: "Roboto-Black";
}

.custom-card:hover {
  border: solid 3px #1a893c;
  background-color: rgba(255, 255, 255, 0);
  background-blend-mode: lighten;
}

.custom-card-subheading {
  padding: 0;
  margin: 0;
}

.custom-card-heading {
  font-family: "Roboto-Black";
  padding: 0;
  margin: 0;
}

.data {
  font-family: "Roboto-Black";
  color: #1a893c;
}

@media screen and (max-width: 770px) {
  .card-container {
    width: 45%;
  }
}

@media screen and (max-width: 500px) {
  .card-container {
    width: 100%;
  }
}
</style>
