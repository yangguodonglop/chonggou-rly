<template>
  <div id="music-check">
    <el-radio-group v-model="size">
      <el-radio label="">默认</el-radio>
      <el-radio label="medium">中等</el-radio>
      <el-radio label="small">小型</el-radio>
      <el-radio label="mini">超小</el-radio>
    </el-radio-group>
    <el-descriptions
      class="margin-top"
      title="歌曲信息"
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
          歌曲编号
        </template>
        {{ music.musicid }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌曲名称
        </template>
        {{ music.musicname }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌曲图片
        </template>
        <img :src="music.musicphotourl" alt="" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌曲热度
        </template>
        {{ music.musichot }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌曲类型
        </template>
        {{ musicType.musictypename }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌词地址
        </template>
        {{ music.lyricurl }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌手
        </template>
        {{ singer.singername }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          歌曲地址
        </template>
        <!-- <audio controls height="100" width="100" :src="getMusicUrl"></audio> -->
        {{ music.songurl }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-star-on"></i>
          创建时间
        </template>
        {{ music.time | dateFmt }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { findMusicById } from "network/home.js";
import fmtDate from "common/js/Date.js";
export default {
  name: "MusicCheck",
  data() {
    return {
      size: "",
      mid: this.$route.query.mid,
      music: {},
      singer: {},
      musicType: {},
      musicPictureUrl: "",
      musicUrl: ""
    };
  },
  mounted() {
    this.findMusicById(this.mid);
  },
  methods: {
    back() {
      this.$router.back();
    },
    findMusicById(mid) {
      findMusicById(mid).then(res => {
        // console.log(res);
        res.musicphotourl =
          "http://localhost:8090/musicstatic/" + res.musicphotourl;
        this.music = res;
        this.singer = res.singer;
        this.musicType = res.musictype;
      });
    }
  },
  filters: {
    dateFmt(date) {
      let d = new Date(date);
      return fmtDate(d, "yyyy-MM-dd hh:mm:ss");
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
