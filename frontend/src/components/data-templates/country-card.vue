<template>
  <div
    class="custom-card"
    :style="{
      backgroundImage:
        'url(' + require('../../assets/flags/' + countryName + '.gif') + ')',
    }"
  >
    <h4 class="custom-card-heading">{{ format(countryName) }}</h4>
    <p class="custom-card-subheading">
      More Details <i class="animatedArrow fa fa-angle-double-right"></i>
    </p>
  </div>
</template>
<script>
export default {
  name: "country-card",
  props: ["countryName"],
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
  },
};
</script>
<style scoped>
.custom-card {
  padding: 30px;
  margin-bottom: 20px;
  border: solid 1px rgba(202, 202, 202, 0.6);
  border-radius: 20px;
  width: 33%;
  background-position: right;
  background-repeat: no-repeat;
  background-size: 40%;
  background-color: rgba(255, 255, 255, 0.2);
  background-blend-mode: lighten;
  transition: all 0.3s ease-in-out;
}

.custom-card:hover {
  border: solid 1px #1a893c;
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
</style>
