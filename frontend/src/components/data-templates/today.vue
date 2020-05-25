<template>
  <div>
    <h2>Today</h2>
    <div class="dataFlex">
      <div class="dataItem">
        <h3>New Infected</h3>
        <h2 class="dataImportant">{{ formatNums(infected) }}</h2>
      </div>
      <div class="dataItem">
        <h3>New Recoveries</h3>
        <h2 class="dataImportant">{{ formatNums(recovered) }}</h2>
      </div>
      <div class="dataItem">
        <h3>New Deaths</h3>
        <h2 class="dataImportant">{{ formatNums(deaths) }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "todays_Data",
  props: ["infected", "recovered", "deaths"],
  methods: {
    formatNums(number) {
      return number.toLocaleString();
    },
  },
};
</script>
<style scoped>
.dataImportant {
  color: #1a893c;
}

.dataFlex {
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
