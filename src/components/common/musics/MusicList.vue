<template>
  <div id="musiclist">
    <music-list-item
      v-for="(item, index) in musicInfo"
      :key="index"
      :item="item"
      @play="play"
    ></music-list-item>
  </div>
</template>

<script>
import MusicListItem from "./MusicListItem";
export default {
  name: "MusicList",
  data() {
    return {};
  },
  props: {
    musicInfo: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    MusicListItem
  },
  mounted() {},
  methods: {
    play(data) {
      this.$emit("play", data);
    }
  }
};
</script>

<style scoped>
#musiclist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
}
</style>
