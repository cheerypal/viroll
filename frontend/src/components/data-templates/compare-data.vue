<template>
  <div>
    <div class="flex-compare">
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
  </div>
</template>
<script>
export default {
  name: "compare_data",
  props: ["countryO", "countryT"],
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

.dataItem {
  width: 20%;
  padding-right: 40px;
}
.dataImportant {
  color: #1a893c;
}
</style>
