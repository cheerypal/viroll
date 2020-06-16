<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="dataFlex">
      <div class="dataItem">
        <h3>Cases</h3>
        <h2 class="dataImportant">
          {{ formatNums(infected) }}
        </h2>
      </div>
      <div class="dataItem">
        <h3>Recoveries</h3>
        <h2 class="dataImportant">{{ formatNums(recovered) }}</h2>
      </div>
      <div class="dataItem">
        <h3>Deaths</h3>
        <h2 class="dataImportant">{{ formatNums(deaths) }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "todays_Data",
  props: ["title", "infected", "recovered", "deaths"],
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
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
