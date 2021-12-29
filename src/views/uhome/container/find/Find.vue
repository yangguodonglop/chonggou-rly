<template>
  <div id="find">
    <div class="subnav"></div>
    <swiper></swiper>
    <contents></contents>
  </div>
</template>

<script>
import Swiper from "./findchildrens/Swiper";
import Contents from "./findchildrens/Contents";
export default {
  name: "Find",
  data() {
    return {};
  },
  components: {
    Swiper,
    Contents
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.subnav {
  background-color: #c20c0c;
  border-bottom: 5px solid #a40011;
}
</style>
