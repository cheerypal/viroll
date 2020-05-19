<template>
  <div>
    <NavBar />
    <NavBot />
  </div>
</template>

<script>
import NavBar from "../components/navbars/nav";
import NavBot from "../components/navbars/nav-bottom";
export default {
  name: "home",
  components: {
    NavBar,
    NavBot,
  },
};
</script>
