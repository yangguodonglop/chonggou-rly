<template>
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
</template>

<script>
import fmtDate from "common/js/Date.js";
import { getProductionSong, aboutMusicTag,openFile,openFileActive,baseUrl } from "network/home.js";

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

      songText:"sdsads",
      auditionCodeUrl:""
    };
  },
  created(){

  },
  mounted() {
       console.log(baseUrl)
    //this.findMusicById(this.mid);
    this.musicListlyricsFile()
     this.musicListDemo()
  },
   watch: {
    userInfo(val) {
      console.log(val)
      // this.keyArr = [];
      // this.keyArr = val.funcGroup;
      this.$nextTick(() => {
        console.log(baseUrl)
       
        this.musicListlyricsFile()
        this.musicListDemo()
      });
    }
   },
  methods: {
        //获取歌词
    musicListDemo() {
      console.log(this.userInfo)

      const param = {
    token: this.token,
    songID: this.userInfo.id,
    fileCode: this.userInfo.demoFile,
    category: "audition"
      };
//       let tempStr=JSON.stringify(param)
//       console.log(tempStr)
//             const Base64 = require('js-base64').Base64
// tempStr = Base64.encode(tempStr)

let tempStr = JSON.stringify(param);
      let tempStr1 = JSON.stringify(param);
      console.log(tempStr);
      const Base64 = require("js-base64").Base64;
      //tempStr = Base64.encode(tempStr)
      tempStr = Base64.encodeURL(tempStr);
      tempStr1=window.btoa(tempStr1);

    
this.auditionCodeUrl=baseUrl+'/openFile/'+tempStr
      // openFileActive(tempStr).then(res => {
      //  // console.log(res);
      //   this.auditionCodeUrl=res
     
      // });
    },
      //获取歌词
    musicListlyricsFile() {
      console.log(this.userInfo)

      const param = {
    token: this.token,
    songID: this.userInfo.id,
    fileCode: this.userInfo.lyricsFile,
    category: "lyric"
      };
      let tempStr=JSON.stringify(param)
      console.log(tempStr)
            const Base64 = require('js-base64').Base64
tempStr = Base64.encodeURL(tempStr)
console.log(tempStr)
      openFileActive(tempStr).then(res => {
        console.log(res);
        this.songText=res
     
      });
    },
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
