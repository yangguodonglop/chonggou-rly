<template>
  <div id="content">
    <div class="left border">
      <img src="@/assets/neimaer.jpg" class="img-active" alt="" >
      <div class="name-active">
        <p style="font-size:16px;">李小雷</p>
        <p>公司董事长，资深音乐策划人</p>
      </div>
    </div>
    <div class="center">
      <div class="test_two_box">
        <video controls="true" controlslist="nodownload" id="myVideo" class="video-js" width="100%">
          <source src="@/assets/oceans.mp4" type="video/mp4" />
        </video>
      </div>
    </div>

    <div class="right border">
        <img src="@/assets/meixi.jpg" class="img-active" alt="" >
      <div class="name-active">
        <p style="font-size:16px;">徐鹏</p>
        <p>公司董事长，资深音乐制作人</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  // randomMusic,
  // findMusicByType,
  // findMusicOrderByHot,
  // randomVideo,
  // findSingerOrderByHot
} from "network/uhome.js";
// import MusicList from "components/common/musics/MusicList";
// import Rank from "components/common/rank/Rank";
// import SRank from "components/common/rank/SRank";
export default {
  name: "Contents",
  data() {
    return {};
  },
  components: {
    // MusicList,
    // Rank,
    // SRank
  },
  mounted() {
    this.initVideo();
  },
  methods: {
    initVideo() {
      //初始化视频方法
      let myPlayer = this.$video(myVideo, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: "800px",
        //设置视频播放器的显示高度（以像素为单位）
        height: "400px"
      });
    }
  }
};
</script>

<style>
#content {
  display: flex;
}
.myVideo-dimensions{
  width: 100%!important;
  height: 560px;
}

#content .center {
  /* display: flex; */
  width: 928px;
  margin: 0 auto;
}
.img-active{
  max-width: 300px;
 height:450px;
 border-radius: 5px;
 margin-top: 30px;

}

#content .center .cleft {
  display: flex;
  flex-direction: column;
  width: 700px;
  padding: 20px 20px 30px 20px;
  border-bottom: 1px solid #999;
  border-right: 1px solid #999;
}

#content .center .cright {
  display: flex;
  flex-direction: column;
  padding: 20px 10px 30px 10px;
  width: 200px;
  border-bottom: 1px solid #999;
}

#content .border {
  flex: 1;
  background-color: #eeeeee;
  height: auto;
  border-bottom: 1px solid #999;
}

#content .left {
  border-right: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
  .name-active{
    width: 100%;
    font-size: 20px;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
  }
    .name-active p{
    width: 100%;
    font-size: 16px;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
    margin: 0;
    
  }
#content .right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-left: 1px solid #999;
}

#content .circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 5px solid #f00;
  margin: 10px 10px;
}

#content .random-music {
  display: flex;
  flex-direction: column;
  height: 479px;
  margin-bottom: 20px;
}

#content .random-music .title {
  display: flex;
  height: 33px;
  align-items: center;
  padding: 0 10px 0 34px;
  border-bottom: 2px solid #c10d0c;
}

#content .random-music .title span {
  font-size: 20px;
}

#content .random-music .title .btn span {
  font-size: 12px;
  margin-bottom: 4px;
}

#content .shu {
  width: 0;
  height: 15px;
  border-left: 1px solid #787878;
  margin-right: 10px;
}

#content .btn {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-left: 10px;
  margin-right: 10px;
}

#content .hot-music {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  height: 479px;
}

#content .hot-music .title {
  display: flex;
  height: 33px;
  align-items: center;
  padding: 0 10px 0 34px;
  border-bottom: 2px solid #c10d0c;
}

#content .hot-music .title span {
  font-size: 20px;
  margin-bottom: 4px;
}

#content .video {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  height: 257px;
}

#content .video .title {
  display: flex;
  height: 33px;
  align-items: center;
  padding: 0 10px 0 34px;
  border-bottom: 2px solid #c10d0c;
  margin-bottom: 20px;
}

#content .video .title span {
  font-size: 20px;
  margin-bottom: 4px;
}

#content .el-carousel__item {
  background-color: #f5f5f5;
}

#content .video .imgs {
  display: flex;
  flex-direction: column;
}

#content .video img {
  width: 100px;
  height: 100px;
}

#content .video .imgs span {
  width: 100px;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

#content .el-carousel--horizontal {
  overflow: hidden;
  border: 1px solid #d5d5d5;
}

#content .music-rank .title {
  display: flex;
  height: 33px;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

#content .singer-rank .title {
  display: flex;
  height: 33px;
  align-items: center;
  margin-top: 42px;
  border-bottom: 1px solid #ccc;
}

#content .wrap {
  display: flex;
  position: fixed;
  width: 980px;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 0;
  z-index: 3;
}

#content audio {
  height: 43px;
}

#content .wrap .btn .prev,
#content .wrap .btn .next {
  display: inline-block;
  width: 24px;
  height: 24px;
}

#content .wrap .btn .stop {
  display: none;
  margin-left: 10px;
  margin-right: 10px;
}

#content .wrap .btn .play {
  margin-left: 10px;
  margin-right: 10px;
}

#content .wrap .btn .play img {
  display: inline-block;
  width: 34px;
  height: 34px;
}

#content .wrap .btn .stop img {
  display: inline-block;
  width: 34px;
  height: 34px;
}

#content .wrap .btn a img {
  width: 24px;
  height: 24px;
}

#content .wrap .sing-img {
  width: 35px;
  height: 35px;
  margin: 0px 15px 0px 0px;
}

#content .wrap .plays {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 466px;
}

#content .wrap .plays .info {
  position: relative;
  top: -5px;
  height: 17px;
  padding-bottom: 5px;
}

#content .wrap .plays span:nth-child(1) {
  color: #fff;
  font-size: 12px;
  margin-right: 20px;
}

#content .wrap .plays span:nth-child(2) {
  color: #888;
  font-size: 12px;
  margin-right: 20px;
}

#content .wrap .plays .play-bar {
  display: flex;
  align-items: center;
}

#content .wrap .plays .play-bar .grey {
  position: relative;
  width: 100%;
  height: 9px;
  border-radius: 30px;
  background-color: #777;
  margin-right: 10px;
}

#content .wrap .plays .play-bar .red {
  position: absolute;
  width: 0px;
  top: 0px;
  height: 9px;
  border-radius: 30px;
  background-color: #f00;
}

#content .wrap .plays .play-bar .time {
  position: absolute;
  right: -60px;
  top: 17px;
  height: 14px;
  font-size: 12px;
  color: #777;
}

#content .wrap .plays .play-bar .sound {
  position: absolute;
  top: 14px;
  right: -100px;
  width: 24px;
  height: 24px;
  text-align: center;
}

#content .wrap .plays .play-bar .sound .sound-bar {
  display: none;
  position: relative;
  top: -170px;
  text-align: center;
  background-color: #333;
  padding: 15px 0 10px 0;
}

#content .wrap .plays .play-bar .reload {
  position: absolute;
  top: 15px;
  right: -130px;
  width: 24px;
  height: 24px;
}

#content .wrap .plays .play-bar .circle {
  position: absolute;
  top: -13px;
  left: -15px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 5px solid #fff;
  background-color: #f00;
}

#content .el-slider__button {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #f00;
  border: 3px solid #fff;
}

#content .el-slider__bar {
  background-color: #f00;
}

#content .el-slider.is-vertical {
  position: relative;
  left: -7px;
}
</style>
