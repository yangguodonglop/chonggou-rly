<template>
  <div id="video-check">
    <el-radio-group v-model="size">
      <el-radio label="">默认</el-radio>
      <el-radio label="medium">中等</el-radio>
      <el-radio label="small">小型</el-radio>
      <el-radio label="mini">超小</el-radio>
    </el-radio-group>
    <el-descriptions
      class="margin-top"
      title="视频信息"
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
          视频编号
        </template>
        {{ videoInfo.videoid }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          视频名称
        </template>
        {{ videoInfo.videoname }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          视频图片
        </template>
        <img :src="videoInfo.videophoto" alt="" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          视频地址
        </template>
        {{ videoInfo.videourl }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { findVideoById } from "network/home.js";
export default {
  name: "VideoCheck",
  data() {
    return {
      size: "",
      videoInfo: {}
    };
  },
  created() {
    this.findVideoById(this.$route.query.vid);
  },
  methods: {
    back() {
      this.$router.back();
    },
    findVideoById(vid) {
      findVideoById(vid).then(res => {
        console.log(res);
        res.videophoto = "http://localhost:8090/musicstatic/" + res.videophoto;
        this.videoInfo = res;
      });
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
