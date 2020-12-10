<template>
  <div>
    <h2 v-bind:style="{ color: cookie ? 'white' : 'black' }">
      Country Ranking*
    </h2>
    <div class="dataFlex">
      <div class="dataItem">
        <h3
          v-bind:style="{
            color: cookie ? 'white' : 'black'
          }"
        >
          Cases
        </h3>
        <h2 class="dataImportant">{{ caseR }}/{{ total }}</h2>
      </div>
      <div class="dataItem">
        <h3
          v-bind:style="{
            color: cookie ? 'white' : 'black'
          }"
        >
          Recoveries
        </h3>
        <h2 class="dataImportant">{{ recoveryR }}/{{ total }}</h2>
      </div>
      <div class="dataItem">
        <h3
          v-bind:style="{
            color: cookie ? 'white' : 'black'
          }"
        >
          Deaths
        </h3>
        <h2 class="dataImportant">{{ deathR }}/{{ total }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ranking",
  props: ["caseR", "recoveryR", "deathR", "total"],
  data() {
    return {
      cookie: ""
    };
  },
  methods: {
    checkCookie() {
      if (this.$cookies.get("dark-mode") === null) {
        this.cookie = false;
      } else {
        this.cookie = true;
      }
    }
  },
  mounted: function() {
    this.checkCookie();
  }
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
.dataItem {
  width: 10%;
}

@media screen and (max-width: 840px) {
  .dataItem {
    width: 27%;
  }
}

@media screen and (max-width: 720px) {
  .dataImportant {
    font-size: 1.4em;
  }
}
</style>
