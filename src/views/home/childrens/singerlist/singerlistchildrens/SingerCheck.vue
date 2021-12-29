<template>
  <div id="singer-check">
    <el-radio-group v-model="size">
      <el-radio label="">默认</el-radio>
      <el-radio label="medium">中等</el-radio>
      <el-radio label="small">小型</el-radio>
      <el-radio label="mini">超小</el-radio>
    </el-radio-group>
    <el-descriptions
      class="margin-top"
      title="歌手信息"
      :column="1"
      :size="size"
      border
    >
      <template slot="extra">
        <el-button type="primary" size="small" @click="back">返回</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌手编号
        </template>
        {{ singer.singerid }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌手名称
        </template>
        {{ singer.singername }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌手图片
        </template>
        <img :src="singer.singerphotourl" alt="" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌手热度
        </template>
        {{ singer.singerhot | hotFilter }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌手类型
        </template>
        {{ singerType.typename }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌手所属
        </template>
        {{ singer.address }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { findSingerById } from "network/home.js";
export default {
  name: "SingerCheck",
  data() {
    return {
      size: "",
      singer: {},
      singerType: {}
    };
  },
  created() {
    this.findSingerById(this.$route.query.sid);
  },
  methods: {
    back() {
      this.$router.back();
    },
    findSingerById(sid) {
      findSingerById(sid).then(res => {
        // console.log(res);
        res.singerphotourl =
          "http://localhost:8090/musicstatic/" + res.singerphotourl;
        this.singer = res;
        this.singerType = res.singertype;
      });
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
img {
  width: 100px;
  height: 100px;
}
</style>
