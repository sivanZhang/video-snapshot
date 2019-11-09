<template>
  <div
    id="playerBox"
    class="player-box"
    v-loading="playerLoading"
    :element-loading-text="playerLoadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <image-draw
      ref="imageDraw"
      class="img-vision"
      :style="{display:!videoPlayerIsShow?'block':'none'}"
      :width="width"
      :height="height"
      @getDrawImage="getDrawImage"
      @getEditMode="getEditMode"
    ></image-draw>
    <div id="videoPlayer">
      <!-- :style="{display:videoPlayerIsShow?'block':'none'}   没有列表时候不显示播放插件 -->
      <video id="myVideo" class="video-js">
        <source :src="videoUrl" type="video/mp4" />
      </video>
      <!-- <div :style="{display:videoPlayerNoVideoIsShow?'block':'none'}">暂无视频</div> -->
    </div>

    <el-row id="playerToolbar" v-if="isLoadVideo">
      <el-col :span="1" class="bar-item">
        <el-button
          class="btn-item btn-play"
          title="播放/暂停"
          :icon="playerControls.stateIcon"
          @click="playerPlay"
          type="text"
        ></el-button>
      </el-col>
      <el-col :span="18" class="bar-item">
        <span class="text">{{playerCurrentFrame}}帧 / {{playerFormatCurrentPostion}}</span>
        <div class="slider">
          <el-slider v-model="playerPercentage" :show-tooltip="false" @change="handleSliderChange"></el-slider>
        </div>
        <span class="text">{{playerDurationFrame}}帧 / {{playerFormatDuration}}</span>
      </el-col>
      <el-col :span="5" class="bar-item right">
        <span style="color:#fff;">音量:{{playerVolume*10}}</span>
        <el-button-group class="btn-group">
          <el-button class="btn-item" title="音量调小" @click="changeVolume('sub')">
            <img :src="iconLower" />
          </el-button>
          <el-button class="btn-item" title="音量调大" @click="changeVolume('add')">
            <img :src="iconIncrease" />
          </el-button>
          <el-button class="btn-item" title="截图" @click="handleMark">
            <img :src="iconMark" />
          </el-button>
          <!--<el-button class="btn-item" @click="changeFullscreen"><img :src="iconFullscreen"/></el-button>-->
        </el-button-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VideoCapture from "video-capture";
import kscreenshot from "kscreenshot";
import { setInterval, clearInterval } from "timers";
import iconIncrease from "./icons/icon-increase.png";
import iconLower from "./icons/icon-lower.png";
import iconFullscreen from "./icons/icon-fullscreen.png";
import iconMark from "./icons/icon-mark.png";
import { Loading } from "element-ui";
import ImageDraw from "@/components/ImageDraw";
import { constants } from "crypto";

export default {
  components: { ImageDraw },
  name: "VideoPlayer",
  
  props: {
    url: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      videoUrl: "",
      videoPlayer: null,
      isLoadVideo: false,
      playerLoading: false,
      videoPlayerNoVideoIsShow: true,
      playerLoadingText: "视频加载中",
      iconIncrease: iconIncrease,
      iconLower: iconLower,
      iconFullscreen: iconFullscreen,
      iconMark: iconMark,
      videoPlayerIsShow: true,
      kscreenshot: null,
      fullscreen: false,
      playerControls: {
        stateIcon: "el-icon-video-pause"
      },
      playerVolume: 0.8,
      playerDuration: 0,
      playerFormatDuration: "00:00",
      playerCurrentPostion: 0,
      playerFormatCurrentPostion: "00:00",
      playerCurrentFrame: 0,
      playerDurationFrame: 0,
      playerPercentage: 0,
      initNextVideoUrl: null,
      currentProject: null,
      currentProjectIndex: 0,
      projectLists: new Array()
    };
  },
  created() {},
  mounted() {
    this.initVideo();
    //this.videoPlayerNoVideoIsShow=false;
    this.handelKeyDown()
    this.width = document.getElementById("playerBox").offsetWidth;
    this.height = document.getElementById("playerBox").offsetHeight;
  },
  methods: {
    stopHandel() {
      window.removeEventListener("keydown", this.keyDownCallback, false);
    },
    handelKeyDown() {
      window.addEventListener("keydown", this.keyDownCallback, false);
    },
    keyDownCallback(event) {
      let frameTime = 1 / 25;
      var _self = this;
      let e = event || window.event || arguments.callee.caller.arguments[0];
      if (_self.videoPlayerIsShow) {
        _self.playerControls.stateIcon = "el-icon-video-play";
        if (e && e.keyCode === 37) {
          //left arrow
          _self.videoPlayer.pause();
          _self.videoPlayer.currentTime(
            Math.max(0, _self.videoPlayer.currentTime() - frameTime)
          );
        } else if (e && e.keyCode === 39) {
          //right arrow
          _self.videoPlayer.pause();
          _self.videoPlayer.currentTime(
            Math.min(
              _self.videoPlayer.duration(),
              _self.videoPlayer.currentTime() + frameTime
            )
          );
        } else if (e && e.keyCode === 32) {
          e.preventDefault();
          if (_self.videoPlayer.paused()) {
            _self.videoPlayer.play();
            _self.playerControls.stateIcon = "el-icon-video-pause";
            _self.playerStepInterval();
          } else {
            _self.videoPlayer.pause();
            _self.playerControls.stateIcon = "el-icon-video-play";
          }
        }
      }
    },
    /**
     * 加载视频资源
     */
    initVideoUrl(project, pWidth, pHeight) {
      var _self = this;
      _self.currentProject = project;
      this.isLoadVideo = true;
      let url = project.url;

      _self.playerControls.stateIcon = "el-icon-video-pause";
      (this.videoPlayerNoVideoIsShow = false), (this.videoUrl = url);
      this.videoPlayer.width(pWidth + "px");
      this.videoPlayer.height(pHeight + "px");
      this.videoPlayer.src(this.videoUrl);
      this.videoPlayer.load(this.videoUrl);
      this.videoPlayer.play();
      setTimeout(() => {
        _self.playerStepInterval();
      }, 1000);
    },
    initNextVideo(index, videoProjects) {
      this.currentProjectIndex = index;
      this.projectLists = videoProjects;
    },
    /**
     * video.js
     */
    initVideo() {
      var _self = this;
      this.videoPlayer = videojs(
        myVideo,
        {
          controls: false,
          autoplay: false,
          width: "0px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "0px",
          preload: "auto",
          volume: this.playerVolume / 100,
          plugins: {
            framebyframe: {
              fps: 25,
              steps: [
                { text: "-5", step: -5 },
                { text: "-1", step: -1 },
                { text: "+1", step: 1 },
                { text: "+5", step: 5 }
              ]
            }
          }
        },
        function() {
          this.on("ended", function() {
            _self.$message.warning("正在切换下一个视频源");
            setTimeout(() => {
              if (_self.currentProjectIndex == _self.projectLists.length - 1) {
                _self.currentProjectIndex = 0;
              } else {
                _self.currentProjectIndex += 1;
              }

              _self.currentProject =
                _self.projectLists[_self.currentProjectIndex];
              _self.$emit("getCurrentPlayId", _self.currentProject); //为了切换播放列表
              _self.videoUrl = _self.currentProject.url;
              _self.videoPlayer.src(_self.currentProject.url);
              _self.videoPlayer.load(_self.currentProject.url);
              _self.videoPlayer.pause();
              _self.videoPlayer.autoplay(true);
              _self.playerStepInterval();
            }, 1000);
          });
        }
      );
    },

    playerPlay() {
      if (this.videoPlayer.paused()) {
      }
      if (this.videoPlayerIsShow) {
        if (this.videoPlayer.paused()) {
          this.videoPlayer.play();
          this.playerControls.stateIcon = "el-icon-video-pause";
          this.playerStepInterval();
        } else {
          this.videoPlayer.pause();
          this.playerControls.stateIcon = "el-icon-video-play";
        }
      } else {
        this.$message.error("处于视频标注模式");
      }
    },
    playerStepInterval() {
      this.playerDuration = this.videoPlayer.duration();
      this.playerFormatDuration = this.formatSeconds(this.playerDuration);
      this.playerDurationFrame = this.calcFrame(this.playerDuration);
      var _self = this;
      setInterval(function() {
        _self.playerCurrentPostion = _self.videoPlayer.currentTime();
        _self.playerFormatCurrentPostion = _self.formatSeconds(
          _self.playerCurrentPostion
        );
        _self.playerCurrentFrame = _self.calcFrame(_self.playerCurrentPostion);
        _self.playerPercentage =
          (_self.playerCurrentPostion / _self.playerDuration) * 100;
      }, 1000 / 25);
    },
    changeVolume: function(type) {
      if (this.videoPlayerIsShow) {
        this.videoPlayer.muted(false);
        console.log(this.playerVolume);
        if ("add" == type) {
          if (this.playerVolume < 1) {
            this.playerVolume += 0.1;
          }
        } else if ("sub" == type) {
          if (this.playerVolume > 0) {
            this.playerVolume -= 0.1;
          }
        }
        this.playerVolume = Math.round(this.playerVolume * 10) / 10;
        this.videoPlayer.volume(this.playerVolume);
      } else {
        this.$message.error("处于视频标注模式");
      }
    },

    getEditMode(mode) {
      this.videoPlayerIsShow = mode;
      this.$emit("getCurrentVideoMode", mode);
    },
    handleSliderChange(data) {
      if (this.videoPlayerIsShow) {
        let time = (this.playerDuration * data) / 100;
        console.log(time);
        this.videoPlayer.currentTime(time);
      } else {
        this.$message.error("处于视频标注模式");
      }
    },
    /**
     * 发起截图
     */
    async handleMark() {
      this.$emit("getCurrentVideoMode", !this.videoPlayerIsShow);
      if (this.videoPlayerIsShow) {
        let _self = this;
        if (this.videoPlayer.currentTime() > 0) {
          _self.playerLoading = true;
          _self.playerLoadingText = "正在获取视频流...";
          this.videoPlayer.pause();
          this.playerControls.stateIcon = "el-icon-video-play";
          let { dataURL, width, height } = await new VideoCapture(
            this.videoUrl
          ).capture(_self.playerCurrentPostion);
          this.$refs.imageDraw.loadImage(dataURL);
          this.videoPlayerIsShow = false;
          _self.playerLoading = false;
        } else {
          this.$message.error("时间是大于0的数字");
        }
      } else {
        this.$message.error("已处于视频标注模式");
      }
    },
    /**
     * 截图回调
     */
    getDrawImage(drawImage) {
      var obj = {
        currentFrame: this.calcFrame(this.videoPlayer.currentTime()),
        imgUrl: drawImage,
        currentPosition: this.videoPlayer.currentTime(),
        currentProject: this.currentProject //选中
      };
      this.$emit("getCutImg", obj);
      this.videoPlayerIsShow = true;
      this.$emit("getCurrentVideoMode", true);
    },
    calcFrame(time) {
      let frameTime = 1000 / 25; //一帧多少毫秒
      let frames = (time * 1000) / frameTime;
      frames = Math.ceil(frames);
      return frames;
    },
    formatSeconds(value) {
      if (window.isNaN(value)) {
        // this.$message.error('无效视频')
        return "00:00";
      }
      var value = parseInt(value);
      var second = value % 60;
      var minute = (value - second) / 60;
      var hour = (minute - (minute % 60)) / 60;
      if (hour != 0) {
        minute = minute % 60;
        return (
          (hour < 10 ? "0" + hour : hour) +
          ":" +
          (minute < 10 ? "0" + minute : +minute) +
          ":" +
          (second < 10 ? "0" + second : second)
        );
      } else {
        if (minute === 0) {
          return "00:" + (second < 10 ? "0" + second : second);
        } else if (minute > 0) {
          return (minute < 10 ? "0" + minute : +minute) + ":" + second;
        }
      }
      /*var theTime = parseInt(value)// 秒
        var middle = 0// 分
        var hour = 0// 小时

        if (theTime > 60) {
          middle = parseInt(theTime / 60)
          theTime = parseInt(theTime % 60)
          if (middle > 60) {
            hour = parseInt(middle / 60)
            middle = parseInt(middle % 60)
          }
        }
        var result = '00:00'
        theTime = parseInt(theTime)
        if (theTime < 10) {
          result = '0' + theTime
        } else {
          result = theTime
        }
        if (middle > 0) {
          middle = parseInt(middle)
          if (middle < 10) {
            result = '0' + middle + ':' + result
          } else {
            result = '' + middle + ':' + result

          }
        }
        if (hour > 0) {
          result = '' + parseInt(hour) + ':' + result
        }
        if ((result + '').split(':').length == 1) {
          result = '00:' + result
        }
        return result*/
    }
  }
};
</script>


<style lang="scss">
.player-box {
  width: 100%;
  height: 100%;
  position: relative;
  #videoPlayer {
    text-align: center;
    font-size: 18px;
    line-height: 200px;
  }
  .img-vision {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 109;
    text-align: center;
    background: #000;
  }
}

#playerToolbar {
  font-size: 12px;
  width: 100%;
  background-color: #000;
  z-index: 1000;
  .bar-item {
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      color: #fff;
      text-align: right;
    }
    &.right {
      justify-content: center;
    }
    .slider {
      margin: 0 10px;
      width: 68%;
      color: #fff;
    }
  }

  .btn-item {
    border: none;
    border-radius: none;
    background: transparent;
    padding: 0;
    color: #fff;
    margin-left: 8px;
    img {
      height: 24px;
    }
  }

  .btn-play {
    font-size: 24px;
  }
}
</style>
