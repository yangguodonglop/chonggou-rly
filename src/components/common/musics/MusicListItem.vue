<template>
  <div id="music-list-item">
    <div class="music">
      <div class="music-img">
        <a href="javascript:void(0);" @click="itemClick(item.musicid)">
          <img :src="item.musicphotourl" alt="../../../assets/占位图.png" />
        </a>
        <div class="music-hot">
          <span
            ><i class="el-icon-headset"></i>{{ item.musichot | hotFilter }}
            <a href="javascript:void(0);" @click="play(item)">
              <img src="../../../assets/播放(black).png" alt=""
            /></a>
          </span>
        </div>
      </div>
      <div class="music-title">
        <span>{{ item.musicname }}</span>
      </div>
      <div class="music-singer">
        <span>{{ item.singer.singername }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicListItem",
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
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
      // console.log(param);
      this.$emit("play", param);
    }
  },
  filters: {
    hotFilter(val) {
      if (val < 10000) {
        return val;
      } else if (10000 <= val < 100000000) {
        return val / 10000 + "万";
      } else {
        return val / 100000000 + "亿";
      }
    }
  }
};
</script>

<style scoped>
#music-list-item .music {
  margin-bottom: 20px;
}

#music-list-item .music .music-img {
  position: relative;
  height: 150px;
}

#music-list-item .music .music-img img {
  flex: 1;
  width: 130px;
  height: 150px;
}

#music-list-item .music .music-img .music-hot {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #333;
  height: 27px;
  line-height: 27px;
  opacity: 0.8;
  background-color: #ccc;
}

#music-list-item .music .music-img .music-hot i {
  margin-right: 5px;
}

#music-list-item .music .music-img .music-hot span {
  font-size: 12px;
  margin-left: 10px;
}

#music-list-item .music .music-img .music-hot img {
  position: absolute;
  top: 7px;
  right: 10px;
  width: 16px;
  height: 16px;
}

#music-list-item .music .music-img .music-hot img:hover {
  color: #fff;
}

#music-list-item .music .music-title span {
  font-size: 14px;
}

#music-list-item .music .music-singer span {
  font-size: 12px;
  color: #666;
}
</style>
