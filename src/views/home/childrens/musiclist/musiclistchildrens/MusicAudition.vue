<template>
  <el-dialog
      :close-on-click-modal="false"
      :footer="false"
      title="试听"
      :visible="true"
      :before-close="handleDialogClose" 
      customClass="customWidth-audition"
    >
  <div id="music-check">
    <div style="display: flex;justify-content: center;flex-direction: column;">
      <div style="display: flex;justify-content: center;">
        <audio :src="auditionCodeUrl" controls="controls" id="music1" controlslist="nodownload"></audio>
      </div>
      <div
        style="margin-top: 20px;text-indent: 20px;max-height: 500px;white-space: pre-wrap;overflow-y: auto;padding: 10px 20px;"
      >{{songText}}</div>
    </div>
  </div>
  </el-dialog>
</template>

<script>
import fmtDate from "common/js/Date.js";
import {
  getProductionSong,
  aboutMusicTag,
  openFile,
  openFileActive,
  baseUrl
} from "network/home.js";

export default {
  name: "MusicCheck",
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      token: JSON.parse(localStorage.getItem("userInfo")).token,

      size: "",
      mid: this.$route.query.mid,
      music: {},
      singer: {},
      musicType: {},
      musicPictureUrl: "",
      musicUrl: "",

      songText: "sdsads",
      auditionCodeUrl: ""
    };
  },
  created() {},
  mounted() {
    //this.findMusicById(this.mid);
    this.musicListlyricsFile();
    this.musicListDemo();
  },
  watch: {
    userInfo(val) {
      // this.keyArr = [];
      // this.keyArr = val.funcGroup;
      this.$nextTick(() => {

        this.musicListlyricsFile();
        this.musicListDemo();
      });
    }
  },
  methods: {
    handleDialogClose(){
    var audio = document.getElementById("music1");
      audio.pause();
      this.$emit('editaudition')
    },
      
    //获取歌曲
    musicListDemo() {
       
      let fileCode=''
      if(this.userInfo.progressRateActive<599){
        fileCode=this.userInfo.demoFile
      }else{
      fileCode=this.userInfo.mixFile
      }
      console.log(this.userInfo)
      const param = {
        token: this.token,
        songID: this.userInfo.id,
        fileCode: fileCode,
        category: "audition"
      };
      console.log(param)
      let tempStr = JSON.stringify(param);
      const Base64 = require("js-base64").Base64;
      //tempStr = Base64.encode(tempStr)
      debugger
      tempStr = Base64.encodeURL(tempStr);
     // tempStr1=window.btoa(tempStr1);
      this.auditionCodeUrl = baseUrl + "/openFile/" + tempStr;
      console.log(this.auditionCodeUrl)
      // openFileActive(tempStr).then(res => {
      //  // console.log(res);
      //   this.auditionCodeUrl=res

      // });
    },
    //获取歌词
    musicListlyricsFile() {

      const param = {
        token: this.token,
        songID: this.userInfo.id,
        fileCode: this.userInfo.lyricsFile,
        category: "lyric"
      };
      let tempStr = JSON.stringify(param);
      let tempStr1 = JSON.stringify(param);
      const Base64 = require("js-base64").Base64;
      tempStr = Base64.encodeURL(tempStr);
      console.log
          tempStr1=window.btoa(tempStr1);
      openFileActive(tempStr).then(res => {
        console.log(res)
        this.songText = res;
      });
    },
    back() {
      this.$router.back();
    },
    findMusicById(mid) {
      findMusicById(mid).then(res => {
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
