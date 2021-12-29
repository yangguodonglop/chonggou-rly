<template>
  <div id="srank">
    <ul>
      <li v-for="(item, index) in info" :key="index">
        <span class="index">{{ index + 1 }}</span>
        <a href="javascript:void(0);" @click="itemClick(item.singerid)"
          ><span class="musicname">{{ item.singername }}</span></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SRank",
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
    itemClick(sid) {
      this.$router.push({
        path: "/singer",
        query: {
          sid
        }
      });
    }
  },
  computed: {}
};
</script>

<style scoped>
#srank ul {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  border: 2px solid #eee;
}

#srank ul li {
  display: flex;
  flex: 1;
  list-style: none;
  height: 40px;
  line-height: 40px;
  padding: 0;
  margin: 0;
}

#srank ul li a {
  text-decoration: none;
}

#srank ul li a:hover {
  text-decoration: underline;
  color: #000;
}

#srank ul li .musicname {
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

#srank ul li:nth-child(1) span {
  color: #c10d0c;
}

#srank ul li:nth-child(2) span {
  color: #c10d0c;
}

#srank ul li:nth-child(3) span {
  color: #c10d0c;
}

#srank ul li .index {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
  color: #666;
}

#srank ul li:nth-child(2n + 1) {
  background-color: #999;
}

#srank ul li:nth-child(2n) {
  background-color: #ccc;
}
</style>
