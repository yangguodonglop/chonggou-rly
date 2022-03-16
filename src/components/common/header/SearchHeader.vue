<template>
  <div id="search-header">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SearchHeader"
};
</script>

<style scoped>
#search-header {
  background-color: #e9e9e9;
  height: 90px;
  background-image: url("../../../assets/header.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
      display: flex;
    align-items: center;
}
</style>
