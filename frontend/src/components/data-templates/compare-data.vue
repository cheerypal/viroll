<template>
  <div>
    <div class="dataSection">
      <h2>{{ countryOName }}</h2>
      <div class="flex-data-compare">
        <div class="dataItem">
          <h3>Cases</h3>
          <h2 class="dataImportant">
            {{ formatNums(countryO.confirmed) }}
          </h2>
        </div>
        <div class="dataItem">
          <h3>Recoveries</h3>
          <h2 class="dataImportant">
            {{ formatNums(countryO.recovered) }}
          </h2>
        </div>
        <div class="dataItem">
          <h3>Deaths</h3>
          <h2 class="dataImportant">
            {{ formatNums(countryO.dead) }}
          </h2>
        </div>
      </div>
    </div>
    <div class="dataSection">
      <h2>{{ countryTName }}</h2>
      <div class="flex-data-compare">
        <div class="dataItem">
          <h3>Cases</h3>
          <h2 class="dataImportant">
            {{ formatNums(countryT.confirmed) }}
          </h2>
        </div>
        <div class="dataItem">
          <h3>Recoveries</h3>
          <h2 class="dataImportant">
            {{ formatNums(countryT.recovered) }}
          </h2>
        </div>
        <div class="dataItem">
          <h3>Deaths</h3>
          <h2 class="dataImportant">
            {{ formatNums(countryT.dead) }}
          </h2>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>
<script>
export default {
  name: "compare_data",
  props: ["countryO", "countryT", "countryOName", "countryTName"],
  methods: {
    formatNums(number) {
      return number.toLocaleString();
    },
  },
};
</script>
<style scoped>
.flex-compare {
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.flex-data-compare {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.dataSection {
  padding-top: 20px;
  padding-bottom: 20px;
}

.dataImportant {
  color: #1a893c;
}

.dataItem {
  width: 10%;
}

@media screen and (max-width: 840px) {
  .dataItem {
    width: 27%;
  }
}

@media screen and (max-width: 710px) {
  .flex-compare {
    padding-top: 5px;
  }
}
</style>
