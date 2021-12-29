<template>
  <div id="song">
    <div class="subnav"></div>
    <div class="content">
      <div class="left border"></div>
      <div class="center1">
        <div class="cleft1">
          <div class="cimg">
            <img :src="musicInfo.musicphotourl" alt="" />
            <span></span>
          </div>
          <div class="music-info">
            <div>
              <i class="icon-music"></i>
              <span>{{ musicInfo.musicname }}</span>
            </div>
            <div class="singer-info">
              <div>
                <span>{{ "歌手：" + singer.singername }}</span>
              </div>
              <div>
                <span>{{ "歌手热度：" + singer.singerhot }}</span>
              </div>
            </div>
            <div class="music-infos">
              <div>
                <span>{{ "歌曲类型：" + musicType.musictypename }}</span>
              </div>
              <div>
                <span>{{ "歌曲热度：" + musicInfo.musichot }}</span>
              </div>
            </div>
            <div class="icon-play">
              <div class="play">
                <a href="javascript:void(0);" @click="onlyPlay(musicInfo)">
                  <img src="../../../../assets/播放.png" alt="" />
                  <span>播放</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="cright1">
          <div class="same-music">
            <div class="title">
              <span>相似歌曲</span>
            </div>
            <div class="info" v-for="(item, index) in sameMusic" :key="index">
              <div class="music-img">
                <img :src="item.musicphotourl" alt="" />
              </div>
              <div class="infos">
                <a href="javascript:void(0);" @click="musicClick(item.musicid)">
                  <div class="music-name">{{ item.musicname }}</div>
                </a>
                <div class="music-singer">{{ item.singer.singername }}</div>
              </div>
              <div class="play">
                <a href="javascript:void(0);" @click="onlyPlay(item)"
                  ><img src="../../../../assets/播放(black).png" alt=""
                /></a>
              </div>
            </div>
          </div>
          <div class="same-music">
            <div class="title">
              <span>相似歌手</span>
            </div>
            <div class="info" v-for="(item, index) in sameSinger" :key="index">
              <div class="music-img">
                <img :src="item.singerphotourl" alt="" />
              </div>
              <div class="infos">
                <div class="music-name">
                  <a
                    href="javascript:void(0);"
                    @click="itemClick(item.singerid)"
                    >{{ item.singername }}</a
                  >
                </div>
                <div class="music-singer">{{ item.address }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right border"></div>
    </div>
    <div class="wrap">
      <div class="btn">
        <a class="prev" ref="prev" href="javascript:void(0)" @click="">
          <img src="../../../../assets/上一首.png" alt="" />
        </a>
        <a class="play" ref="play" href="javascript:void(0)" @click="play()">
          <img src="../../../../assets/播放.png" alt="" />
        </a>
        <a class="stop" ref="stop" href="javascript:void(0)" @click="play()">
          <img src="../../../../assets/暂停.png" alt=""
        /></a>
        <a class="next" ref="next" href="javascript:void(0)" @click="">
          <img src="../../../../assets/下一首.png" alt="" />
        </a>
      </div>
      <div class="sing-img">
        <img
          ref="mimg"
          :src="musicPhotoUrl"
          alt=""
          style="display: none;width: 100%;height: 35px;margin: 0px 15px 0px 0px;"
        />
      </div>
      <div class="plays">
        <div class="info">
          <span>{{ music.musicname }}</span>
          <span>{{ singerName }}</span>
        </div>
        <div class="play-bar">
          <div class="grey" ref="grey">
            <div class="red" ref="red">
              <div class="circle" ref="circle"></div>
            </div>
          </div>
          <div class="time">{{ musicCurrentTime + " / " + musicTime }}</div>
          <div class="sound">
            <a href="javascript:void(0)" @click="sound"
              ><img
                src="../../../../assets/声音放大.png"
                alt=""
                style="width:20px;height:20px;"
            /></a>
            <div class="sound-bar" ref="sound">
              <el-slider
                v-model="value"
                vertical
                height="100px"
                class="slider"
                ref="slider"
                @input="volumeInput"
              >
              </el-slider>
            </div>
          </div>
          <div class="reload">
            <a href="javascript:void(0)" @click="reload"
              ><img
                src="../../../../assets/重放.png"
                alt=""
                style="width: 20px; height: 20px;"
            /></a>
          </div>
        </div>
      </div>
      <audio id="audio" ref="audio" src="" style="marginLeft:100px"></audio>
    </div>
  </div>
</template>

<script>
import { findMusicById } from "network/home.js";
import {
  findSameMusicByMusicType,
  findSameSingerByTypeid
} from "network/uhome.js";
export default {
  name: "Song",
  data() {
    return {
      musicInfo: {},
      singer: {},
      musicType: {},
      sameMusic: [],
      sameSinger: [],
      // 当前播放音乐的总时间
      musicTime: "0:00",
      // 当前播放的音乐时间
      musicCurrentTime: "0:00",
      // 时间步长
      step: 1,
      // 定时器
      time: "",
      // 滑块的值默认100
      value: 100,
      // 是否显示声音条
      isShow: false,
      playWidth: 0,
      music: {},
      musicPhotoUrl: "",
      singerName: ""
    };
  },
  mounted() {
    this.findMusicById(this.$route.query.musicid);
    setTimeout(() => {
      this.findSameMusicByMusicType(this.musicInfo.musictypeid);
      this.findSameSingerByTypeid(this.singer.typeid);
    }, 100);
  },
  methods: {
    findMusicById(musicid) {
      findMusicById(musicid).then(res => {
        console.log(res);
        res.musicphotourl =
          "http://localhost:8090/musicstatic/" + res.musicphotourl;
        res.songurl = "http://localhost:8090/musicstatic/" + res.songurl;
        this.musicInfo = res;
        this.singer = res.singer;
        this.musicType = res.musictype;
      });
    },
    findSameMusicByMusicType(musicTypeId) {
      findSameMusicByMusicType(musicTypeId).then(res => {
        console.log(res);
        res.forEach(data => {
          data.musicphotourl =
            "http://localhost:8090/musicstatic/" + data.musicphotourl;
          data.songurl = "http://localhost:8090/musicstatic/" + data.songurl;
        });
        this.sameMusic = res;
      });
    },
    findSameSingerByTypeid(typeid) {
      findSameSingerByTypeid(typeid).then(res => {
        console.log(res);
        res.forEach(data => {
          data.singerphotourl =
            "http://localhost:8090/musicstatic/" + data.singerphotourl;
        });
        this.sameSinger = res;
      });
    },
    play() {
      if (
        this.$refs.audio.src !==
        "http://localhost:8080/song?musicid=" + this.musicInfo.musicid
      ) {
        let ctime;
        // 灰条
        var grey = document.getElementsByClassName("grey")[0];
        // 红条
        var red = document.getElementsByClassName("red")[0];
        // 灰条的宽度
        var greyWidth = grey.clientWidth;
        // 获取圆圈的class
        var circle = document.getElementsByClassName("circle")[0];

        // 底部栏的播放
        if (!this.isPlay) {
          this.$refs.audio.play();
          setTimeout(() => {
            ctime = this.$refs.audio.duration;
            this.musicTime = this.getDuration(ctime);
          }, 200);
          this.time = setInterval(() => {
            // console.log(this.musicCurrentTime);
            // 当前播放时间与完整时间相等就结束
            if (parseInt(ctime) === this.step) {
              clearInterval(this.time);
              this.next();
            }
            // 记录时间步长 在点击播放后继续开始
            this.musicCurrentTime = this.getMusicCurrentTime(this.step);
            this.step++;
            // 计算宽度 总长除以时间
            this.playWidth += greyWidth / ctime;
            // 设置红条的宽度
            red.style.width = this.playWidth + "px";
            // 设置圆圈的左偏移量
            circle.style.left = this.playWidth - 15 + "px";
          }, 1000);
          this.$refs.play.style.display = "none";
          this.$refs.stop.style.display = "inline";
          this.isPlay = true;
        } else {
          this.$refs.audio.pause();
          // 记录暂停后当前的播放时间
          this.currentTime = this.$refs.audio.currentTime;
          this.$refs.stop.style.display = "none";
          this.$refs.play.style.display = "inline";
          // 点击暂停后 清除定时器
          clearInterval(this.time);
          this.isPlay = false;
        }
      }
    },
    onlyPlay(data) {
      // console.log(data);
      // 每点击新的一首歌清除定时器
      clearInterval(this.time);
      // 歌曲的完整时间
      let ctime;
      // 灰条
      var grey = document.getElementsByClassName("grey")[0];
      // 红条
      var red = document.getElementsByClassName("red")[0];
      // 灰条的宽度
      var greyWidth = grey.clientWidth;
      // 初始宽度
      var width = 0;
      // 获取圆圈的class
      var circle = document.getElementsByClassName("circle")[0];
      red.style.width = width + "px";
      // 设置圆圈的左偏移量
      circle.style.left = width - 15 + "px";
      // clearInterval(this.time);
      this.musicCurrentTime = "0:00";
      this.step = 1;
      // 图片上的播放与底部播放栏的播放分开
      // 如果当前的播放时间为0 则给url赋值
      this.$refs.audio.src = data.songurl;
      this.$refs.audio.play();
      setTimeout(() => {
        ctime = this.$refs.audio.duration;
        this.musicTime = this.getDuration(ctime);
      }, 200);
      this.time = setInterval(() => {
        // 当前播放时间与完整时间相等就结束
        if (parseInt(ctime) === this.step) {
          clearInterval(this.time);
        }
        // 计算当前播放时间
        this.musicCurrentTime = this.getMusicCurrentTime(this.step);
        this.step++;
        // 计算宽度 总长除以时间
        width += greyWidth / ctime;
        this.playWidth = width;
        // 设置红条的宽度
        red.style.width = width + "px";
        // 设置圆圈的左偏移量
        circle.style.left = width - 15 + "px";
      }, 1000);
      // 使播放消失 暂停出现
      this.$refs.play.style.display = "none";
      this.$refs.stop.style.display = "inline";
      this.$refs.mimg.style.display = "inline";
      // 保存播放的歌曲url
      this.music = data;
      this.singerName = data.singer.singername;
      this.saveMusicUrl = data.songurl;
      this.musicPhotoUrl = data.musicphotourl;
      this.isPlay = true;
    },
    isAction(param) {
      // 给组件绑定原生事件，否则无法生效
      if (param === 0) {
        this.action = 0;
      } else {
        this.action = 1;
      }
    },
    getDuration(data) {
      // 将时间秒转换为0:00格式
      if (data > 60) {
        var minuter = data / 60;
        var second = data % 60;
      }
      if (second >= 10) {
        data = parseInt(minuter) + ":" + parseInt(second);
      } else {
        data = parseInt(minuter) + ":0" + parseInt(second);
      }
      return data;
    },
    getMusicCurrentTime(data) {
      // 将当前播放时间转换为0:00格式
      var minuter = data / 60;
      var second = data % 60;
      if (second >= 10) {
        data = parseInt(minuter) + ":" + parseInt(second);
      } else {
        data = parseInt(minuter) + ":0" + parseInt(second);
      }
      return data;
    },
    sound() {
      if (!this.isShow) {
        this.$refs.sound.style.display = "block";
        this.isShow = true;
      } else {
        this.$refs.sound.style.display = "none";
        this.isShow = false;
      }
    },
    volumeInput() {
      // 滑块的数据改变时触发（使用鼠标拖曳时，活动过程实时触发）
      this.$refs.audio.volume = this.value / 100;
    },
    reload() {
      clearInterval(this.time);
      this.musicCurrentTime = "0:00";
      this.step = 1;
      let ctime;
      // 灰条
      var grey = document.getElementsByClassName("grey")[0];
      // 红条
      var red = document.getElementsByClassName("red")[0];
      // 灰条的宽度
      var greyWidth = grey.clientWidth;
      // 初始宽度
      var width = 0;
      // 获取圆圈的class
      var circle = document.getElementsByClassName("circle")[0];
      this.$refs.audio.load();
      this.$refs.audio.play();
      setTimeout(() => {
        ctime = this.$refs.audio.duration;
        this.musicTime = this.getDuration(ctime);
      }, 200);
      this.time = setInterval(() => {
        // console.log(this.musicCurrentTime);
        // 当前播放时间与完整时间相等就结束
        if (this.$refs.audio.ended || parseInt(ctime) === this.step) {
          clearInterval(this.time);
          this.next();
        }
        // 记录时间步长 在点击播放后继续开始
        this.musicCurrentTime = this.getMusicCurrentTime(this.step);
        this.step++;
        // 计算宽度 总长除以时间
        width += greyWidth / ctime;
        // 设置红条的宽度
        red.style.width = width + "px";
        // 设置圆圈的左偏移量
        circle.style.left = width - 15 + "px";
      }, 1000);
    },
    itemClick(sid) {
      this.$router.push({
        path: "/singer",
        query: {
          sid
        }
      });
    },
    musicClick(musicid) {
      this.$router.push({
        path: "song",
        query: {
          musicid
        }
      });
    }
  }
};
</script>

<style>
#song .subnav {
  background-color: #c20c0c;
  border-bottom: 5px solid #a40011;
}

#song .content {
  display: flex;
}

#song .border {
  flex: 1;
  background-color: #eeeeee;
  height: 520px;
  border-bottom: 1px solid #999;
}

#song .center1 {
  display: flex;
  height: 520px;
  width: 928px;
}

#song .center1 .cleft1 {
  display: flex;
  width: 556px;
  height: 433px;
  margin: 0 auto;
  border-bottom: 1px solid #999;
  padding: 47px 30px 40px 39px;
  border-right: 1px solid #999;
}

#song .center1 .cright1 {
  display: flex;
  flex-direction: column;
  width: 303px;
  height: 480px;
  border-bottom: 1px solid #999;
  padding: 20px 20px 20px 20px;
}

#song .center1 .cright1 .same-music .title {
  height: 23px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

#song .center1 .cright1 .same-music .title span {
  font-size: 12px;
  color: #333;
  font-weight: bold;
}

#song .center1 .cright1 .same-music .info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 60px;
  background-color: #ccc;
  margin-top: 5px;
}

#song .center1 .cright1 .same-music .info .music-img {
  margin-right: 10px;
  margin-left: 10px;
}

#song .center1 .cright1 .same-music .info .music-img img {
  width: 50px;
  height: 50px;
}

#song .center1 .cright1 .same-music .info .infos a {
  color: #333;
  text-decoration: none;
}

#song .center1 .cright1 .same-music .info .infos a:hover {
  text-decoration: underline;
}

#song .center1 .cright1 .same-music .info .infos .music-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

#song .center1 .cright1 .same-music .info .infos .music-name a {
  color: #333;
  text-decoration: none;
}

#song .center1 .cright1 .same-music .info .infos .music-name a:hover {
  text-decoration: underline;
}

#song .center1 .cright1 .same-music .info .infos .music-singer {
  font-size: 12px;
  color: #666;
}

#song .center1 .cright1 .same-music .info .play {
  margin-left: auto;
  margin-right: 30px;
}

#song .center1 .cright1 .same-music .info .play img {
  width: 16px;
  height: 16px;
}

#song .left {
  border-right: 1px solid #999;
}

#song .right {
  border-left: 1px solid #999;
}

#song .center1 .cimg {
  position: relative;
  width: 198px;
  height: 198px;
  margin-right: 20px;
}

#song .center1 .cimg img {
  width: 130px;
  height: 130px;
  margin: 34px;
}

#song .center1 .cimg span {
  position: absolute;
  width: 206px;
  height: 205px;
  top: -4px;
  left: -4px;
  background-position: -140px -580px;
  background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?2d1d1b7f1af4fa6da7dff9d72b4936fd");
}

#song .center1 .music-info {
  display: flex;
  flex-direction: column;
  width: 350px;
}

#song .center1 .music-info span {
  font-size: 24px;
  vertical-align: middle;
}

#song .center1 .music-info .icon-music {
  display: inline-block;
  width: 54px;
  height: 24px;
  margin-right: 10px;
  vertical-align: middle;
  background-position: 0 -463px;
  background-image: url("https://s2.music.126.net/style/web2/img/icon.png?678c47fad4a114dea212a64e017e34ba");
}

#song .center1 .music-info .singer-info,
#song .center1 .music-info .music-infos {
  margin: 10px 0;
  color: #777;
  font-size: 12px;
}

#song .center1 .music-info .singer-info div,
#song .center1 .music-info .music-infos div {
  margin-bottom: 10px;
}

#song .center1 .music-info .singer-info span,
#song .center1 .music-info .music-infos span {
  font-size: 12px;
  vertical-align: middle;
}

#song .center1 .music-info .icon-play {
  display: flex;
  width: 70px;
  height: 25px;
  background-color: #2078cf;
  padding: 5px;
  border-radius: 10px;
}

#song .center1 .music-info .icon-play a {
  text-decoration: none;
  color: #fff;
}

#song .center1 .music-info .icon-play:hover {
  background-color: #218dfa;
}

#song .center1 .music-info .icon-play span {
  font-size: 15px;
  vertical-align: middle;
}

#song .center1 .music-info .icon-play img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 10px;
}

#song .wrap {
  display: flex;
  position: fixed;
  width: 980px;
  left: -17px;
  right: 0;
  margin: 0 auto;
  bottom: 0;
  z-index: 3;
}

#song audio {
  height: 43px;
}

#song .wrap .btn .prev,
#song .wrap .btn .next {
  display: inline-block;
  width: 24px;
  height: 24px;
}

#song .wrap .btn .stop {
  display: none;
  margin-left: 10px;
  margin-right: 10px;
}

#song .wrap .btn .play {
  margin-left: 10px;
  margin-right: 10px;
}

#song .wrap .btn .play img {
  display: inline-block;
  width: 34px;
  height: 34px;
}

#song .wrap .btn .stop img {
  display: inline-block;
  width: 34px;
  height: 34px;
}

#song .wrap .btn a img {
  width: 24px;
  height: 24px;
}

#song .wrap .sing-img {
  width: 35px;
  height: 35px;
  margin: 0px 15px 0px 0px;
}

#song .wrap .plays {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 466px;
}

#song .btn {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 10px;
  margin-right: 10px;
}

#song .wrap .plays .info {
  position: relative;
  top: -5px;
  height: 17px;
  padding-bottom: 5px;
}

#song .wrap .plays span:nth-child(1) {
  color: #fff;
  font-size: 12px;
  margin-right: 20px;
}

#song .wrap .plays span:nth-child(2) {
  color: #888;
  font-size: 12px;
  margin-right: 20px;
}

#song .wrap .plays .play-bar {
  display: flex;
  align-items: center;
}

#song .wrap .plays .play-bar .grey {
  position: relative;
  width: 100%;
  height: 9px;
  border-radius: 30px;
  background-color: #777;
  margin-right: 10px;
}

#song .wrap .plays .play-bar .red {
  position: absolute;
  width: 0px;
  top: 0px;
  height: 9px;
  border-radius: 30px;
  background-color: #f00;
}

#song .wrap .plays .play-bar .time {
  position: absolute;
  right: -60px;
  top: 17px;
  height: 14px;
  font-size: 12px;
  color: #777;
}

#song .wrap .plays .play-bar .sound {
  position: absolute;
  top: 14px;
  right: -100px;
  width: 24px;
  height: 24px;
  text-align: center;
}

#song .wrap .plays .play-bar .sound .sound-bar {
  display: none;
  position: relative;
  top: -170px;
  text-align: center;
  background-color: #333;
  padding: 15px 0 10px 0;
}

#song .wrap .plays .play-bar .reload {
  position: absolute;
  top: 15px;
  right: -130px;
  width: 24px;
  height: 24px;
}

#song .wrap .plays .play-bar .circle {
  position: absolute;
  top: -13px;
  left: -15px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 5px solid #fff;
  background-color: #f00;
  margin: 10px 10px;
}

#song .el-slider__button {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #f00;
  border: 3px solid #fff;
}

#song .el-slider__bar {
  background-color: #f00;
}

#song .el-slider.is-vertical {
  position: relative;
  left: -7px;
}
</style>
