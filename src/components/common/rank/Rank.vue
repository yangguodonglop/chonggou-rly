<template>
  <div id="rank">
    <ul>
      <li v-for="(item, index) in info" :key="index">
        <span class="index">{{ index + 1 }}</span>
        <a href="javascript:void(0);" @click="itemClick(item.musicid)"
          ><span class="musicname">{{ item.musicname }} </span>
        </a>
        <a href="javascript:void(0);" @click="play(item)">
          <img src="../../../assets/播放(black).png" alt=""
        /></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Rank",
  data() {
    return {};
  },
  props: {
    info: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {},
  methods: {
    itemClick(musicid) {
      this.$router.push({
        path: "/song",
        query: {
          musicid
        }
      });
    },
    play(param) {
      this.$emit("play", param);
    }
  },
  computed: {}
};
</script>

<style scoped>
#rank ul {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  border: 2px solid #eee;
}

#rank ul li {
  position: relative;
  display: flex;
  flex: 1;
  list-style: none;
  height: 40px;
  line-height: 40px;
  padding: 0;
  margin: 0;
}

#rank ul li a {
  text-decoration: none;
}

#rank ul li a:hover {
  text-decoration: underline;
  color: #000;
}

#rank ul li .musicname {
  /* 设置dib会让a的下划线失效 */
  display: flex;
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
  margin-left: 10px;
  color: #000 !important;
}

#rank ul li img {
  position: absolute;
  right: 10px;
  top: 13px;
  width: 16px;
  height: 16px;
}

#rank ul li:nth-child(1) span {
  color: #c10d0c;
}

#rank ul li:nth-child(2) span {
  color: #c10d0c;
}

#rank ul li:nth-child(3) span {
  color: #c10d0c;
}

#rank ul li .index {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
  color: #666;
}

#rank ul li:nth-child(2n + 1) {
  background-color: #999;
}

#rank ul li:nth-child(2n) {
  background-color: #ccc;
}
</style>
