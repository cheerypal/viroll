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
  name: "404",
  components: {
    NavBar,
    NavBot,
  },
};
</script>
